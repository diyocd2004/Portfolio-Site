const sharp = require('sharp');
async function processImage() {
  const input = 'c:/Users/Diyo C D/.gemini/antigravity-ide/brain/28f8702f-044e-466f-9ec4-1cfd7a9b5446/media__1783092957410.jpg';
  const output = 'c:/Users/Diyo C D/OneDrive/Desktop/Cluade Portfolio/sakura-portfolio/public/images/cursor.png';
  
  const { data, info } = await sharp(input)
    .resize(64, 64, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    if (r > 230 && g > 230 && b > 230) {
      data[i+3] = 0;
    }
  }
  
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .png()
  .toFile(output);
  console.log('Done!');
}
processImage().catch(console.error);
