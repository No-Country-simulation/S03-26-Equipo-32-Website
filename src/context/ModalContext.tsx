import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { X } from 'lucide-react';

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

const sizeClass: Record<ModalSize, string> = {
  xs: 'max-w-xs w-full',
  sm: 'max-w-sm w-full',
  md: 'max-w-md w-full',
  lg: 'max-w-lg w-full',
  xl: 'max-w-xl w-full',
  '2xl': 'max-w-2xl w-full',
  '3xl': 'max-w-3xl w-full',
};

interface OpenOptions {
  render: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  size?: ModalSize;
}

interface ModalContextType {
  open: (options: OpenOptions) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<OpenOptions & { visible: boolean }>({
    visible: false,
    render: null,
  });

  const open = useCallback((options: OpenOptions) => {
    setState({
      ...options,
      visible: true,
      showCloseButton: options.showCloseButton ?? true,
    });
  }, []);

  const close = useCallback(() => {
    setState((prev) => {
      prev.onClose?.();
      return { ...prev, visible: false, render: null };
    });
  }, []);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {state.visible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className={`relative bg-white rounded-xl shadow-xl overflow-hidden ${sizeClass[state.size ?? 'md']}`}
          >
            {state.showCloseButton && (
              <button
                onClick={close}
                className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <X size={18} />
              </button>
            )}
            {state.render}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
};
