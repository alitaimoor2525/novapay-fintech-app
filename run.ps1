# Run Expo — Install babel preset and start
$env:PATH = "C:\Program Files\nodejs\" + [System.IO.Path]::PathSeparator + $env:PATH
Set-Location "D:\FinTech\NovaPayApp"

Write-Host "Installing babel-preset-expo..." -ForegroundColor Yellow
npm install --save-dev babel-preset-expo
npx expo install --fix

Write-Host ""
Write-Host "Starting Expo dev server..." -ForegroundColor Cyan
npx expo start --clear
