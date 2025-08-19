import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function UploadImageInterceptor(fieldName: string) {
    return FileInterceptor(fieldName, {
        storage: diskStorage({
            destination: './public/uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${fieldName}-${uniqueSuffix}${ext}`);
            },
        }),
        limits: { fileSize: 2 * 1024 * 1024 },
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/^image\//)) {
                return callback(new Error('This is not image file!'), false);
            }
            callback(null, true);
        },
    });
}
