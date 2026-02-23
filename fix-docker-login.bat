@echo off
REM Script para solucionar el error "The stub received bad data" en Docker Desktop Windows

echo ========================================
echo Solucionando error de Docker Credential Helper
echo ========================================
echo.

set DOCKER_CONFIG=%USERPROFILE%\.docker\config.json

echo Respaldando configuracion actual...
copy "%DOCKER_CONFIG%" "%DOCKER_CONFIG%.backup" >nul 2>&1

echo.
echo Desactivando credsStore en Docker config...

powershell -Command "(Get-Content '%DOCKER_CONFIG%') -replace '\"credsStore\": \"desktop\"', '\"credsStore\": \"\"' | Set-Content '%DOCKER_CONFIG%'"

echo.
echo ========================================
echo SOLUCION APLICADA
echo ========================================
echo.
echo Se creo un backup en: %DOCKER_CONFIG%.backup
echo.
echo Ahora puedes ejecutar:
echo   aws ecr-public get-login-password --region us-east-1 ^| docker login --username AWS --password-stdin public.ecr.aws
echo.
echo Si necesitas revertir:
echo   copy "%DOCKER_CONFIG%.backup" "%DOCKER_CONFIG%"
echo.
pause
