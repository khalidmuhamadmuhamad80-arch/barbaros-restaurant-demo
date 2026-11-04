import { useEffect } from 'react';
import './Toast.css';

function Toast({ message, toastId, onClose }) {
  useEffect(() => {
    if (!message) return;

    const timeout = setTimeout(() => {
      onClose();
    }, 1300);

    return () => clearTimeout(timeout);
  }, [message, toastId, onClose]);

  if (!message) return null;

  return (
    <div className="toast-message" role="status" aria-live="polite">
      {message}
    </div>
  );
}

export default Toast;