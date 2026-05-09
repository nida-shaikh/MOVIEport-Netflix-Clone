import { useToast } from '../context/ToastContext';
import { FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

function ToastContainer() {
  const { toasts } = useToast();

  return (
    // Screen ke bottom-right mein fixed
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border backdrop-blur-md animate-fade-in text-sm font-medium transition-all duration-300 ${
            toast.type === 'success' ? 'bg-green-900/80 border-green-500/50 text-green-300' 
            : toast.type === 'error' ? 'bg-red-900/80 border-red-500/50 text-red-300' 
            : 'bg-blue-900/80 border-blue-500/50 text-blue-300'
          }`}
        >
          {toast.type === 'success' && <FiCheckCircle className="text-lg text-green-400" />}
          {toast.type === 'error' && <FiXCircle className="text-lg text-red-400" />}
          {toast.type === 'info' && <FiAlertCircle className="text-lg text-blue-400" />}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;