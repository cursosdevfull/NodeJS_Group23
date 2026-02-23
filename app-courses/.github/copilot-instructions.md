# GitHub Copilot Instructions - Courses API

You are an expert TypeScript/Node.js developer specializing in **Hexagonal Architecture** (Ports & Adapters pattern). This project follows strict architectural principles with clean separation of concerns. Always prioritize:

1. **Domain-driven design** - Business logic lives in the domain layer
2. **Dependency inversion** - High-level modules don't depend on low-level modules
3. **Testability** - Each layer should be independently testable
4. **Type safety** - Leverage TypeScript's type system fully
5. **SOLID principles** - Especially Single Responsibility and Dependency Inversion

## Project Architecture

### Hexagonal Architecture Structure

Every feature follows this exact structure:

```
features/
  feature-name/
    domain/              # Pure business logic (no dependencies)
      entity.ts          # Domain entities with validation
    ports/               # Interfaces (contracts)
      feature.port.ts    # Repository interface
    adapters/            # Infrastructure implementations
      persistence/       # TypeORM entities
        entity.entity.ts
      dtos/             # Domain ↔ Data transformation
        feature.dto.ts
        index.ts
      feature.adapter.ts # Port implementation
    application/         # Use cases / business workflows
      feature.application.ts
    presentation/        # HTTP layer
      feature.controller.ts
      feature.routes.ts  # Factory pattern for lazy loading
      dtos/             # Validation DTOs
        feature-create.dto.ts
        feature-update.dto.ts
        index.dto.ts
```

### Layer Responsibilities

#### 1. Domain Layer (`domain/`)

**Purpose**: Pure business logic and entities

**Rules**:
- **NEVER** import from infrastructure (TypeORM, Express, etc.)
- **ONLY** use custom exceptions: `DomainValidationException`
- All validations happen in constructor or methods
- Immutable IDs and creation dates
- Use TypeScript types for contracts

**Example**:
```typescript
import { DomainValidationException } from "@shared/exceptions/domain-validation.exception";

type PropsEssential = {
  name: string;
  email: string;
};

type PropsOptional = {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type EntityProps = PropsEssential & Partial<PropsOptional>;
export type EntityUpdateProps = Partial<PropsEssential>;

export class Entity {
  private readonly id?: number;
  private name: string;
  private email: string;
  private active: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;

  constructor(props: EntityProps) {
    // Initialize optional fields
    if (props.id) this.id = props.id;
    if (props.updatedAt) this.updatedAt = props.updatedAt;
    this.active = props.active ?? true;
    this.createdAt = props.createdAt ?? new Date();

    // Validations with DomainValidationException
    if (!props.name || props.name.trim().length === 0) {
      throw new DomainValidationException("Name is required");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.email)) {
      throw new DomainValidationException("Invalid email format");
    }

    // Assign validated values
    this.name = props.name.trim();
    this.email = props.email.toLowerCase();
  }

  update(props: EntityUpdateProps) {
    if (props.name !== undefined) {
      if (props.name.trim().length === 0) {
        throw new DomainValidationException("Name cannot be empty");
      }
      this.name = props.name.trim();
    }

    if (props.email !== undefined) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.email)) {
        throw new DomainValidationException("Invalid email format");
      }
      this.email = props.email.toLowerCase();
    }

    this.updatedAt = new Date();
  }

  delete() {
    this.active = false;
    this.updatedAt = new Date();
  }

  get properties(): EntityProps {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
```

#### 2. Ports Layer (`ports/`)

**Purpose**: Define contracts/interfaces for adapters

**Rules**:
- Pure TypeScript interfaces
- No implementations
- Use domain types, not data types
- Standard CRUD operations: `save`, `findById`, `findAll`, `getByPage`

**Example**:
```typescript
import { Paginated } from "@core/types";
import { Entity } from "../domain/entity";

export type EntityPort = {
  save(entity: Entity): Promise<Entity>;
  findById(id: number): Promise<Entity | null>;
  findAll(): Promise<Entity[]>;
  getByPage(page: number, limit: number): Promise<Paginated<Entity>>;
};
```

#### 3. Adapters Layer (`adapters/`)

**Purpose**: Implement ports and handle external dependencies

##### 3.1 Persistence (`adapters/persistence/`)

**TypeORM Entities** - Infrastructure representation

**Rules**:
- Extend `CommonEntity` from `@core/extends/common`
- Use TypeORM decorators
- Name convention: `EntityData`
- Store foreign keys as IDs (not relations)

**Example**:
```typescript
import { CommonEntity } from "@core/extends/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "entities" })
export class EntityData extends CommonEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: "varchar", length: 255 })
  public name!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  public email!: string;

  @Column({ type: "int", nullable: true })
  public relatedEntityId?: number;
}
```

##### 3.2 DTOs (`adapters/dtos/`)

**Purpose**: Transform between Domain ↔ Data layers

**Rules**:
- Use `plainToInstance` from `class-transformer`
- Handle both single entities and arrays
- Bi-directional transformation: `fromDomainToData` and `fromDataToDomain`

**Example**:
```typescript
import { plainToInstance } from "class-transformer";
import { Entity } from "../../domain/entity";
import { EntityData } from "../persistence/entity.entity";

export class EntityDto {
  static fromDomainToData(
    domain: Entity | Entity[],
  ): EntityData | EntityData[] {
    if (Array.isArray(domain)) {
      return domain.map(
        (entity) => EntityDto.fromDomainToData(entity) as EntityData,
      );
    }

    return plainToInstance(EntityData, domain.properties);
  }

  static fromDataToDomain(
    data: EntityData | EntityData[],
  ): Entity | Entity[] {
    if (Array.isArray(data)) {
      return data.map(
        (entity) => EntityDto.fromDataToDomain(entity) as Entity,
      );
    }

    return new Entity({
      id: data.id,
      name: data.name,
      email: data.email,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
```

##### 3.3 Adapter Implementation (`adapters/feature.adapter.ts`)

**Purpose**: Implement port interface with TypeORM repository

**Rules**:
- Constructor injection of TypeORM `Repository<EntityData>`
- Implement all port methods
- Transform domain ↔ data using DTOs
- Catch and wrap errors in `GenericException`
- Log errors for debugging

**Example**:
```typescript
import { Paginated } from "@core/types";
import { GenericException } from "@shared/exceptions/generic.exception";
import { Repository } from "typeorm";
import { Entity } from "../domain/entity";
import { EntityPort } from "../ports/entity.port";
import { EntityDto } from "./dtos";
import { EntityData } from "./persistence/entity.entity";

export class EntityAdapter implements EntityPort {
  constructor(private readonly entityRepository: Repository<EntityData>) {}

  async save(entity: Entity): Promise<Entity> {
    try {
      const data = EntityDto.fromDomainToData(entity) as EntityData;
      await this.entityRepository.save(data);
      return entity;
    } catch (error) {
      console.log("Error in EntityAdapter.save:", error);
      throw new GenericException(500, "Error saving entity", "");
    }
  }

  async findById(id: number): Promise<Entity | null> {
    try {
      const entity = await this.entityRepository.findOne({
        where: { id, active: true },
      });
      return entity ? (EntityDto.fromDataToDomain(entity) as Entity) : null;
    } catch (error) {
      console.log("Error in EntityAdapter.findById:", error);
      throw new GenericException(500, "Error finding entity", "");
    }
  }

  async findAll(): Promise<Entity[]> {
    try {
      const data = await this.entityRepository.find({
        where: { active: true },
      });
      return EntityDto.fromDataToDomain(data) as Entity[];
    } catch (error) {
      console.log("Error in EntityAdapter.findAll:", error);
      throw new GenericException(500, "Error finding entities", "");
    }
  }

  async getByPage(page: number, limit: number): Promise<Paginated<Entity>> {
    try {
      const [data, total] = await this.entityRepository.findAndCount({
        where: { active: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        items: EntityDto.fromDataToDomain(data) as Entity[],
        total,
        page,
        limit,
      };
    } catch (error) {
      console.log("Error in EntityAdapter.getByPage:", error);
      throw new GenericException(500, "Error paginating entities", "");
    }
  }
}
```

#### 4. Application Layer (`application/`)

**Purpose**: Orchestrate use cases and business workflows

**Rules**:
- Constructor injection of port interface
- Implement business use cases: `create`, `update`, `delete`, `findById`, `findAll`, `getByPage`
- Handle "not found" scenarios
- Return domain entities or their properties

**Example**:
```typescript
import { Entity, EntityUpdateProps } from "../domain/entity";
import { EntityPort } from "../ports/entity.port";

export class EntityApplication {
  constructor(private readonly port: EntityPort) {}

  create(props: { name: string; email: string }) {
    const entity = new Entity(props);
    return this.port.save(entity);
  }

  async update(id: number, props: EntityUpdateProps) {
    const entity = await this.port.findById(id);
    if (!entity) {
      throw new Error("Entity not found");
    }
    entity.update(props);
    await this.port.save(entity);
    return entity.properties;
  }

  async delete(id: number) {
    const entity = await this.port.findById(id);
    if (!entity) {
      throw new Error("Entity not found");
    }
    entity.delete();
    await this.port.save(entity);
  }

  findById(id: number) {
    return this.port.findById(id);
  }

  findAll() {
    return this.port.findAll();
  }

  getByPage(page: number, limit: number) {
    return this.port.getByPage(page, limit);
  }
}
```

#### 5. Presentation Layer (`presentation/`)

##### 5.1 Controller (`presentation/feature.controller.ts`)

**Purpose**: Handle HTTP requests and responses

**Rules**:
- Constructor injection of application service
- Handle three types of exceptions:
  1. `DomainValidationException` → 400
  2. `GenericException` → use exception status
  3. `Error` → 500
- Return JSON responses
- Extract and validate request data

**Example**:
```typescript
import {
  DomainValidationException,
  GenericException,
} from "@shared/exceptions";
import { Request, Response } from "express";
import { EntityApplication } from "../application/entity.application";

export class EntityController {
  constructor(private readonly application: EntityApplication) {}

  async create(req: Request, res: Response) {
    try {
      const result = await this.application.create(req.body);
      res.json(result);
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await this.application.update(
        Number(req.params.id),
        req.body,
      );
      res.json(result);
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.application.delete(Number(req.params.id));
      res.json({ message: "Entity deleted successfully" });
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const result = await this.application.findById(Number(req.params.id));
      res.json(result);
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.application.findAll();
      res.json(result);
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }

  async getByPage(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await this.application.getByPage(page, limit);
      res.json(result);
    } catch (error) {
      if (error instanceof DomainValidationException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof GenericException) {
        res
          .status(error.status)
          .json({ message: error.message, stack: error.stack });
      } else {
        res.status(500).json({
          message: (error as Error).message,
          stack: (error as Error).stack,
        });
      }
    }
  }
}
```

##### 5.2 Routes (`presentation/feature.routes.ts`)

**Purpose**: Define HTTP routes and wire up dependencies

**Rules**:
- **CRITICAL**: Use **Factory Pattern** for lazy loading
- Export `createFeatureRouter()` function
- Import `DatabaseBootstrap` to get repositories
- Apply validation middlewares from `@shared/middlewares`
- Apply authentication/authorization guards
- Bind controller methods

**Example**:
```typescript
import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { IdDto, PaginationDto } from "@shared/dtos";
import { validationSchemes } from "@shared/middlewares";
import express from "express";
import { EntityAdapter } from "../adapters/entity.adapter";
import { EntityData } from "../adapters/persistence/entity.entity";
import { EntityApplication } from "../application/entity.application";
import { EntityPort } from "../ports/entity.port";
import { EntityController } from "./entity.controller";

class EntityRoutes {
  router: express.Router;

  constructor(private readonly controller: EntityController) {
    this.router = express.Router();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.router.get("/", this.controller.findAll.bind(this.controller));

    this.router.get(
      "/page",
      validationSchemes({
        validator: PaginationDto,
        kindOfParameters: "query",
      }),
      this.controller.getByPage.bind(this.controller),
    );

    this.router.get(
      "/:id",
      validationSchemes({
        validator: IdDto,
        kindOfParameters: "params",
      }),
      this.controller.findById.bind(this.controller),
    );

    this.router.post("/", this.controller.create.bind(this.controller));

    this.router.put("/:id", this.controller.update.bind(this.controller));

    this.router.delete(
      "/:id",
      validationSchemes({
        validator: IdDto,
        kindOfParameters: "params",
      }),
      this.controller.delete.bind(this.controller),
    );
  }
}

// FACTORY PATTERN - Lazy initialization after DB connection
export const createEntityRouter = (): express.Router => {
  const entityRepository =
    DatabaseBootstrap.dataSource.getRepository(EntityData);
  const port: EntityPort = new EntityAdapter(entityRepository);
  const application = new EntityApplication(port);
  const controller = new EntityController(application);
  return new EntityRoutes(controller).router;
};

export const router = createEntityRouter();
```

##### 5.3 Validation DTOs (`presentation/dtos/`)

**Purpose**: Validate incoming HTTP request data

**Rules**:
- Use `class-validator` decorators
- Separate DTOs for create and update operations
- Export all DTOs from `index.ts`

**Example**:
```typescript
// entity-create.dto.ts
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class EntityCreateDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

// entity-update.dto.ts
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class EntityUpdateDto {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

// index.ts
export * from "./entity-create.dto";
export * from "./entity-update.dto";
```

### Registering Routes in App

**In `app.ts`**, use the factory pattern in `initializeRoutes()`:

```typescript
// Import factory functions using require (lazy loading)
import {createEntityRouter} from "./features/entities/presentation/entity.routes";


initializeRoutes(): void {
  // Create routers
  const routerEntity = createEntityRouter();

  // Register with middlewares
  this.app.use(
    "/entities",
    authenticationGuard,
    response,
    filterResponse(),
    routerEntity,
  );
}
```

## TypeScript Best Practices

### 1. Type Safety
- Use `type` for object shapes, `interface` for contracts
- Avoid `any` - use `unknown` and type guards instead
- Use strict nullability checks (`strictNullChecks: true`)
- Define explicit return types for functions

### 2. Modern TypeScript Features
- Use optional chaining: `obj?.prop`
- Use nullish coalescing: `value ?? defaultValue`
- Use template literal types for string unions
- Use `as const` for immutable objects

### 3. Naming Conventions
- Classes: `PascalCase`
- Interfaces/Types: `PascalCase`
- Functions/Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Private fields: prefix with `_` or use `#`

### 4. Error Handling
```typescript
// Custom exceptions
throw new DomainValidationException("Validation failed");
throw new GenericException(404, "Not found", "");

// Async/await with try-catch
try {
  await someAsyncOperation();
} catch (error) {
  console.log("Error:", error);
  throw new GenericException(500, "Operation failed", "");
}
```

## Node.js Best Practices (v22+)

### 1. ES Modules
- Use ES modules (`import/export`), not CommonJS (`require`)
- Exception: Dynamic imports for lazy loading (routes factories)

### 2. Async Operations
- Always use `async/await` over callbacks
- Handle promise rejections
- Use `Promise.all()` for parallel operations

### 3. Environment Variables

**CRITICAL**: This project uses **Zod** for type-safe environment variable validation.

**Location**: `src/core/environment/env.ts`

**Implementation**:
```typescript
import "dotenv/config";
import { z } from "zod/v4";

const envSchema = z.object({
  PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_SYNCHRONIZE: z
    .string()
    .transform((val) => val === "true" || val === "1"),
  DB_LOGGING: z
    .string()
    .transform((val) => val === "true" || val === "1"),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_PASSWORD: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
```

**Usage in code**:
```typescript
import { env } from "@core/environment/env";

const dbConfig = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  synchronize: env.DB_SYNCHRONIZE,
};
```

**Required `.env` file** (never commit this):
```dotenv
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=course_user
DB_PASSWORD=course_pass123
DB_NAME=course23
DB_SYNCHRONIZE=true
DB_LOGGING=false
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis_pass123
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

**Important Notes**:
- ✅ **Boolean variables**: Use `z.string().transform((val) => val === "true" || val === "1")` 
  - ❌ DON'T use `z.coerce.boolean()` (converts any non-empty string to `true`, including `"false"`)
- ✅ **Numbers**: Use `z.coerce.number()` for automatic string to number conversion
- ✅ **Validation**: App crashes on startup if required env vars are missing or invalid
- ✅ **Type Safety**: Full TypeScript autocomplete for `env` object

### 4. Security
- Never commit `.env` files
- Sanitize user inputs
- Use parameterized queries (TypeORM handles this)
- Implement CORS properly

### 5. Performance
- Use connection pooling (TypeORM default)
- Implement caching strategies
- Use pagination for large datasets
- Avoid N+1 queries

## TypeORM Best Practices

### 1. Entity Definition
```typescript
@Entity({ name: "table_name" })
export class EntityData extends CommonEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: "varchar", length: 255 })
  public name!: string;

  @Column({ type: "int", nullable: true })
  public optionalField?: number;
}
```

### 2. Repository Usage
```typescript
// Use dependency injection
constructor(private readonly repository: Repository<EntityData>) {}

// Query with conditions
await this.repository.findOne({
  where: { id, active: true },
});

// Pagination
await this.repository.findAndCount({
  where: { active: true },
  skip: (page - 1) * limit,
  take: limit,
});
```

### 3. Transactions
```typescript
await this.repository.manager.transaction(async (manager) => {
  await manager.save(entity1);
  await manager.save(entity2);
});
```

### 4. Relations (When Needed)
- Store foreign keys as IDs in domain for simplicity
- Use `@ManyToOne`, `@OneToMany` only when needed
- Always specify `nullable` explicitly

## Common Patterns

### 1. Soft Delete
```typescript
delete() {
  this.active = false;
  this.updatedAt = new Date();
}
```

### 2. Timestamps
```typescript
// CommonEntity provides: active, createdAt, updatedAt
@Column({ type: "boolean", default: true })
public active!: boolean;

@CreateDateColumn({ type: "timestamp" })
public createdAt!: Date;

@UpdateDateColumn({ type: "timestamp" })
public updatedAt!: Date;
```

### 3. Enums
```typescript
export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type STATUS_TYPE = keyof typeof Status;
```

### 4. Validation Patterns
```typescript
// Email
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  throw new DomainValidationException("Invalid email");
}

// URL
if (!/^https?:\/\/.+/.test(url)) {
  throw new DomainValidationException("Invalid URL");
}

// Length
if (value.trim().length < 3 || value.trim().length > 100) {
  throw new DomainValidationException("Length must be between 3 and 100");
}

// Positive number
if (amount <= 0) {
  throw new DomainValidationException("Amount must be positive");
}
```

## Testing Guidelines

### Unit Tests
- Test domain entities in isolation
- Mock adapters in application tests
- Test validation logic thoroughly

### Integration Tests
- Test complete flows
- Use test database
- Test error scenarios

### E2E Tests
- Test HTTP endpoints
- Test authentication/authorization
- Test edge cases

## Code Review Checklist

- [ ] Follows hexagonal architecture layers
- [ ] Domain has no infrastructure dependencies
- [ ] Proper dependency injection used
- [ ] DTOs transform domain ↔ data correctly
- [ ] Factory pattern used for routes
- [ ] Validations use `DomainValidationException`
- [ ] Error handling covers all exception types
- [ ] TypeScript types are explicit and correct
- [ ] No N+1 query issues
- [ ] Pagination implemented correctly
- [ ] Soft delete implemented
- [ ] Timestamps updated properly

## Anti-Patterns to Avoid

❌ **DON'T** import infrastructure in domain:
```typescript
// WRONG
import { Repository } from "typeorm";
```

❌ **DON'T** instantiate adapters in domain:
```typescript
// WRONG
const adapter = new EntityAdapter();
```

❌ **DON'T** use string errors in domain:
```typescript
// WRONG
throw "Error message";
```

❌ **DON'T** access repositories directly in controllers:
```typescript
// WRONG
constructor(private repository: Repository<EntityData>) {}
```

❌ **DON'T** load routes before database connection:
```typescript
// WRONG - Routes need DB to be initialized first
// Use factory pattern instead
```

✅ **DO** follow dependency inversion:
```typescript
// CORRECT
constructor(private readonly port: EntityPort) {}
```

✅ **DO** use custom exceptions:
```typescript
// CORRECT
throw new DomainValidationException("Invalid input");
```

✅ **DO** use factory pattern for routes:
```typescript
// CORRECT
export const createEntityRouter = (): express.Router => {
  const repository = DatabaseBootstrap.dataSource.getRepository(EntityData);
  // ... wire dependencies
};
```

## Additional Resources

- **Hexagonal Architecture**: https://alistair.cockburn.us/hexagonal-architecture/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **TypeORM Documentation**: https://typeorm.io/
- **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices

---

**Remember**: When in doubt, follow the existing patterns in `features/users`, `features/courses`, `features/students`, or `features/teachers`. These serve as reference implementations of the hexagonal architecture in this project.
