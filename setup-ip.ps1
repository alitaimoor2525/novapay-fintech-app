# ─── NovaPay — Auto IP Setup Script ───────────────────────────────────────────
# Run this ONCE before building the APK on any new machine.
# It detects your current Wi-Fi IP and updates src/services/api.js automatically.

$apiFile = "$PSScriptRoot\src\services\api.js"

# Get the active Wi-Fi IPv4 address
$ip = (
  Get-NetIPAddress -AddressFamily IPv4 |
  Where-Object {
    $_.IPAddress -notmatch '^127\.' -and
    $_.IPAddress -notmatch '^169\.254\.' -and
    $_.PrefixOrigin -eq 'Dhcp'
  } |
  Select-Object -First 1
).IPAddress

if (-not $ip) {
  Write-Host "ERROR: Could not detect a Wi-Fi IP address. Make sure you are connected to Wi-Fi." -ForegroundColor Red
  exit 1
}

Write-Host "Detected IP: $ip" -ForegroundColor Cyan

# Read the file and replace the MACHINE_IP line
$content = Get-Content $apiFile -Raw
$updated = $content -replace "const MACHINE_IP = '[^']*';", "const MACHINE_IP = '$ip'; // auto-set by setup-ip.ps1"

if ($content -eq $updated) {
  Write-Host "WARNING: Could not find MACHINE_IP line in api.js. Check the file manually." -ForegroundColor Yellow
  exit 1
}

Set-Content $apiFile $updated -NoNewline
Write-Host "Updated MACHINE_IP to $ip in src/services/api.js" -ForegroundColor Green

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Start the backend:  node backend/server.js"
Write-Host "  2. Build the APK:      npx expo run:android"
Write-Host "  3. Install the APK on the phone (phone must be on the same Wi-Fi as this laptop)"
