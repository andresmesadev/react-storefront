import "../../styles/ux.css";

const Toast = ({ toasts }) => {
  return (
    <div className="toastViewport" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast${toast.type.charAt(0).toUpperCase()}${toast.type.slice(1)}`}
          role="status"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
