type PropsEssential = {
    title: string;
}

type PropsOptional = {
    id: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type CourseProps = PropsEssential & Partial<PropsOptional>;
export type CourseUpdateProps = PropsEssential

export class Course {
    private readonly id?: number;
    private title: string;
    private active!: boolean;
    private readonly createdAt: Date;
    private updatedAt: Date | undefined;

    constructor(props: CourseProps) {
        if (props.id) this.id = props.id;
        if (props.updatedAt) this.updatedAt = props.updatedAt;
        this.active = props.active ?? true;
        this.createdAt = props.createdAt ?? new Date();

        if (props.title.trim().length === 0) {
            throw "Title cannot be empty";
        }
        if (props.title.length < 3 || props.title.length > 255) {
            throw "Title must be between 3 and 255 characters long";
        }
        this.title = props.title;
    }

    delete() {
        this.active = false;
        this.updatedAt = new Date();
    }

    update(props: CourseUpdateProps) {
        if (props.title.trim().length === 0) {
            throw "Title cannot be empty";
        }
        if (props.title.length < 3 || props.title.length > 255) {
            throw "Title must be between 3 and 255 characters long";
        }

        this.title = props.title;
        this.updatedAt = new Date();
    }

    get properties(): CourseProps {
        return {
            id: this.id,
            title: this.title,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}