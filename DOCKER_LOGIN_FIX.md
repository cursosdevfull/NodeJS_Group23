# Solución al error "The stub received bad data" en Windows

## Opción 1: Desactivar credsStore (Recomendado para desarrollo)

1. Abre el archivo de configuración de Docker:
```
%USERPROFILE%\.docker\config.json
```

2. Busca la línea:
```json
"credsStore": "desktop"
```

3. Cámbiala a:
```json
"credsStore": ""
```

O simplemente elimina esa línea completa.

4. Guarda el archivo e intenta nuevamente el login.

## Opción 2: Usar variable de entorno (Temporal)

Antes de ejecutar el comando, establece:
```powershell
$env:DOCKER_CONFIG = "$env:TEMP\.docker"
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws
```

## Opción 3: Login directo sin credential helper

```bash
aws ecr-public get-login-password --region us-east-1 > token.txt
type token.txt | docker login --username AWS --password-stdin public.ecr.aws
del token.txt
```

## Para CodePipeline (Ya corregido en buildspec.yml)

El buildspec.yml ya está corregido. Los cambios:
- ✅ Eliminada línea errónea al final del archivo
- ✅ Login a ECR privado configurado correctamente
- ℹ️ Login a ECR público comentado (solo si lo necesitas)

## ¿Necesitas ECR Público?

**NO lo necesitas** si:
- Usas `node:22-alpine` (imagen oficial de Docker Hub) ✅ **TU CASO**
- No tienes límites de rate en Docker Hub

**SÍ lo necesitas** si:
- Docker Hub te da error de rate limit (429 Too Many Requests)
- Usas una imagen personalizada en ECR público: `public.ecr.aws/tu-alias/imagen`
- Configuras pull-through cache en ECR

Para habilitarlo, descomenta las líneas en buildspec.yml:
```yaml
# - echo Logging with ECR Public
# - aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws
```
