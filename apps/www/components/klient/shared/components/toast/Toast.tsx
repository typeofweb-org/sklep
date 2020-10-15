import type { Nil } from '@sklep/types';
import React from 'react';
import ReactDOM from 'react-dom';

export const ToastContext = React.createContext<
  Nil<{
    readonly isVisible: boolean;
    readonly setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }>
>(null);

interface ToastProps {
  readonly isVisible: boolean;
  readonly hideToast: () => void;
}

export const Toast = ({ isVisible, hideToast }: ToastProps) => {
  if (!isVisible) {
    return null;
  }
  setTimeout(() => {
    hideToast();
  }, 2000);
  return ReactDOM.createPortal(
    <div className="absolute top-0 right-0 w-12 h-6 bg-pink-700 mr-6">Dupa</div>,
    document.body,
  );
};

export const ToastContextProvider = ({ children }: { readonly children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const hideToast = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ToastContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
      <Toast hideToast={hideToast} isVisible={isVisible} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
};
