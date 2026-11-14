$ErrorActionPreference = 'Stop'
$repo = 'https://github.com/vpsarg711-cmyk/vpsarg-web.git'
$branch = 'preview-menu-fix'

Write-Host 'VPS ARG - Publicacion de PREVIEW (no produccion)' -ForegroundColor Cyan
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw 'Git no esta instalado. Instala Git for Windows y vuelve a ejecutar este archivo.'
}

git --version
if (-not (Test-Path '.git')) {
  git init
}
git add -A
$status = git status --porcelain
if ($status) {
  git commit -m 'Preparar preview VPS ARG con ajuste responsive del menu'
} else {
  Write-Host 'No hay cambios nuevos para confirmar.'
}
$existing = git remote get-url origin 2>$null
if (-not $existing) {
  git remote add origin $repo
} elseif ($existing -ne $repo) {
  throw "El remoto origin ya apunta a otro repositorio: $existing. No se modifico."
}
git branch -M $branch
git push -u origin $branch
Write-Host ''
Write-Host 'Rama enviada. Vercel deberia crear un despliegue Preview si el proyecto esta conectado a este repositorio.' -ForegroundColor Green
Write-Host 'No se hizo merge a main ni se publico en Produccion.' -ForegroundColor Green
