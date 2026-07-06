Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("c:\Users\Diyo C D\OneDrive\Desktop\Cluade Portfolio\sakura-portfolio\public\images\cursor.jpg")
$img.Save("c:\Users\Diyo C D\OneDrive\Desktop\Cluade Portfolio\sakura-portfolio\public\images\cursor.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
