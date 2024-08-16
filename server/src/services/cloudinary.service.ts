import { Injectable } from '@nestjs/common';

import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiErrorResponse | UploadApiResponse> {
    return new Promise<UploadApiErrorResponse | UploadApiResponse>(
      (resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });

        streamifier.createReadStream(file.buffer).pipe(upload);
      },
    );
  }
  deleteFile(cloudinaryImg: string) {
    const ID = this.getId(cloudinaryImg);

    console.log(ID);
    return new Promise((resolve, reject) => {
      if (!ID) resolve(false);
      cloudinary.uploader.destroy(ID, (error, result) => {
        if (error) resolve(false);
        resolve(true);
      });
    });
  }
  getId(cloudinaryImg: string) {
    try {
      const split = cloudinaryImg.split('/');

      const ID = split[split.length - 1].split('.')[0];

      return ID;
    } catch (e) {
      return '';
    }
  }
}
