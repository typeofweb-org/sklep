import type { Nil } from '@sklep/types';
import type { ToastNotificationProps } from 'carbon-components-react';
import { ToastNotification } from 'carbon-components-react';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import styles from './toasts.module.scss';

const ToastsContext = React.createContext<
  Nil<{
    readonly toasts: readonly ToastNotificationProps[];
    readonly setToasts: React.Dispatch<React.SetStateAction<readonly ToastNotificationProps[]>>;
  }>
>(null);

const Toasts = React.memo<{
  readonly toasts: readonly ToastNotificationProps[];
  readonly hideToast: (toast: ToastNotificationProps) => void;
}>(({ toasts, hideToast }) => {
  if (typeof document === 'undefined') {
    return null;
  }

  return ReactDOM.createPortal(
    toasts.map((props) => (
      <ToastNotification
        {...props}
        onCloseButtonClick={() => hideToast(props)}
        timeout={2000}
        className={styles.toast}
        key={props.id}
      />
    )),
    document.body,
  );
});
Toasts.displayName = 'Toasts';

export const ToastsContextProvider = ({ children }: { readonly children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<readonly ToastNotificationProps[]>([]);
  const hideToast = React.useCallback((props: ToastNotificationProps) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== props.id));
  }, []);

  return (
    <ToastsContext.Provider value={{ toasts, setToasts }}>
      {children}
      <Toasts toasts={toasts} hideToast={hideToast} />
    </ToastsContext.Provider>
  );
};

export const useToasts = () => {
  const toastsContext = useContext(ToastsContext);
  if (!toastsContext) {
    throw new Error('Missing ToastsContextProvider!');
  }

  const addToast = React.useCallback(
    (props: ToastNotificationProps) => {
      toastsContext.setToasts((toasts) => [...toasts, { id: String(toasts.length + 1), ...props }]);
    },
    [toastsContext],
  );

  return React.useMemo(() => ({ addToast }), [addToast]);
};
