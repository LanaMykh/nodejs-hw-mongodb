import { v2 as cloudinary } from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.config({
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const deleteFileFromCloudinary = async (fileForDelete) => {
  try {
    await cloudinary.uploader.destroy(fileForDelete);
    console.log(`File ${fileForDelete} deleted from Cloudinary`);
  } catch (error) {
    console.error(`Failed to delete file ${fileForDelete}`, error);
  }
};
