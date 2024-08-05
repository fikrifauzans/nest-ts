import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Base64Interface } from '../interface/base64.interface';

@Injectable()
export class FileService {
  saveBase64File(base64Object: Base64Interface): any {
    const { base64string, fileName } = base64Object;

    const publicDir = path.join(__dirname, '../..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // Hilangkan prefix base64
    const base64Image = base64string.split(';base64,').pop();

    if (!base64Image) {
      throw new Error('Invalid base64 string');
    }

    // Dapatkan timestamp saat ini
    const timestamp = Date.now();

    // Tentukan nama file baru dengan timestamp
    const newFileName = `${timestamp}_${fileName}`;

    // Tentukan path file
    const filePath = path.join(publicDir, newFileName);

    // Tulis file
    fs.writeFileSync(filePath, base64Image, { encoding: 'base64' });
  

    return { filePath, fileName: newFileName };
  }
}
