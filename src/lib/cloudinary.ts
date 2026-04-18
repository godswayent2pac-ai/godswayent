import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';

export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
  },
});

export const getCloudinaryUrl = (publicId: string) => {
  return cld.image(publicId).toURL();
};
