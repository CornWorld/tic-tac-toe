import sharp from 'sharp';
import {promises as fs} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateIcons() {
    const sizes = [192, 512];
    const sourceIcon = join(__dirname, '../src/icons/icon.svg');
    const targetDir = join(__dirname, '../public/icons');

    await fs.mkdir(targetDir, {recursive: true});

    for (const size of sizes) {
        await sharp(sourceIcon)
            .resize(size, size)
            .png()
            .toFile(join(targetDir, `icon-${size}x${size}.png`));
    }
}

generateIcons().catch(console.error); 