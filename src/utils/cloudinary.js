import 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARY_URL,
});


const uploadOnCloud = async (localFileUrl) => {
    try {
        if (!localStorage) return null

        const response = await cloudinary.uploader.upload(localFileUrl, {
            resource_type: 'auto'
        })
        console.log('file is uploaded', response.url);
    } catch (error) {
        fs.unlink(localFileUrl)
        return null
    }
};

export {uploadOnCloud}