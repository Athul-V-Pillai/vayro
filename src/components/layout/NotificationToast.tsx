import React from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toast, hideToast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-in">
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-2xl backdrop-blur-xl ${
        toast.type === 'success'
          ? 'bg-surface/95 border-teal/40 text-slate-100 shadow-teal-glow/20'
          : toast.type === 'alert'
          ? 'bg-surface/95 border-amber/40 text-slate-100 shadow-amber-glow/20'
          : 'bg-surface/95 border-white/20 text-slate-100'
      }`}>
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-teal flex-shrink-0" />}
        {toast.type === 'alert' && <AlertTriangle className="w-5 h-5 text-amber flex-shrink-0" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />}

        <p className="text-sm font-medium flex-1">{toast.message}</p>

        <button
          onClick={hideToast}
          className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
