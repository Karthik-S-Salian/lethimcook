import { v2 as cloudinary } from "cloudinary";
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

type UploadResponse = {
    secure_url: string;
};

cloudinary.config({
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export const uploadStream = async (buffer: Uint8Array, options: any) => {
    return new Promise<UploadResponse>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(options, (error, result) => {
                if (error) return reject(error);
                resolve(result as unknown as UploadResponse);
            })
            .end(buffer);
    });
};

function svgStringToUint8Array(svgString: string) {
    // Convert the SVG string to a Buffer
    const buffer = Buffer.from(svgString, 'utf-8');
    // Create a Uint8Array from the Buffer
    const uint8Array = new Uint8Array(buffer);
    return uint8Array;
}

export async function generateProfileImage(seed: string) {
    const avatar = createAvatar(thumbs, { seed });

    const svg = avatar.toString();
    return await uploadStream(svgStringToUint8Array(svg), {
        folder: "astro",
    })

}