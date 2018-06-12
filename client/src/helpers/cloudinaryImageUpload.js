import axios from 'axios';

const cloudinaryImageUpload = async (file) => {
  // Make an AJAX upload request using axios
  try {
    // Initialize FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', 'meal');
    formData.append('upload_preset', 'a3agftie');
    formData.append('api_key', '553453189171282');
    formData.append('timestamp', parseInt(Date.now() / 1000, 10));
    const headers = { 'X-Requested-With': 'XMLHttpRequest' };
    const { data } = await axios
      .post(
        'https://api.cloudinary.com/v1_1/dikaeinstein/image/upload',
        formData,
        { headers },
      );
    return data.secure_url;
  } catch (error) {
    throw error;
  }
};

export default cloudinaryImageUpload;
