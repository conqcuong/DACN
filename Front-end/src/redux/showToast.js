import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message, type) => {
  if (type === 'success') {
    toast.success(message);
  } else {
    toast.error(message);
  }
  // Các loại khác (info, warning) nếu cần
};

export default showToast;