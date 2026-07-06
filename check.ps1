Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("c:\Users\Diyo C D\OneDrive\Desktop\Cluade Portfolio\sakura-portfolio\public\images\cherry-blossom.png")
Write-Host "Dimensions: $($img.Width)x$($img.Height)"
$img.Dispose()
