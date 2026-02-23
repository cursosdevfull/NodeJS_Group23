# Script PowerShell para solucionar el error "The stub received bad data" en Docker Desktop Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Solucionando error de Docker Credential Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$dockerConfig = "$env:USERPROFILE\.docker\config.json"
$backupConfig = "$dockerConfig.backup"

if (-not (Test-Path $dockerConfig)) {
    Write-Host "ERROR: No se encontro el archivo de configuracion de Docker" -ForegroundColor Red
    Write-Host "Ruta: $dockerConfig" -ForegroundColor Yellow
    exit 1
}

Write-Host "Respaldando configuracion actual..." -ForegroundColor Yellow
Copy-Item $dockerConfig $backupConfig -Force

Write-Host "Leyendo configuracion actual..." -ForegroundColor Yellow
$config = Get-Content $dockerConfig -Raw | ConvertFrom-Json

Write-Host "Desactivando credsStore..." -ForegroundColor Yellow

if ($config.PSObject.Properties.Name -contains "credsStore") {
    $config.credsStore = ""
    Write-Host "credsStore encontrado y desactivado" -ForegroundColor Green
} else {
    Write-Host "credsStore no estaba configurado (ya estaba bien)" -ForegroundColor Green
}

Write-Host "Guardando configuracion..." -ForegroundColor Yellow
$config | ConvertTo-Json -Depth 10 | Set-Content $dockerConfig

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "SOLUCION APLICADA EXITOSAMENTE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backup creado en: $backupConfig" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ahora puedes ejecutar:" -ForegroundColor Yellow
Write-Host "  aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws" -ForegroundColor White
Write-Host ""
Write-Host "Si necesitas revertir:" -ForegroundColor Yellow
Write-Host "  Copy-Item '$backupConfig' '$dockerConfig' -Force" -ForegroundColor White
Write-Host ""

Write-Host "Presiona cualquier tecla para continuar..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
