import { toast, Slide } from 'react-toastify';

const notify = {
  success: (message) => {
    toast.success(message, {
      hideProgressBar: true,
      transition: Slide,
      autoClose: 2000,
    });
  },
  error: (message) => {
    toast.error(message, {
      hideProgressBar: true,
      transition: Slide,
      autoClose: 2000,
    });
  },
};

export default notify;
