import type { ReactChild, ReactChildren } from 'react';
import React from 'react';

const defaultState = {
  succeeded: false,
  error: '',
  processing: false,
  disabled: true,
  clientSecret: '',
};

type CheckoutState = {
  readonly succeeded: boolean;
  readonly error: string;
  readonly processing: boolean;
  readonly disabled: boolean;
  readonly clientSecret: string;
};

const CheckoutContext = React.createContext<CheckoutState | undefined>(undefined);
const CheckoutDispatchContext = React.createContext<Dispatch | undefined>(undefined);

type Action =
  | { readonly type: 'SUCCESS'; readonly payload: boolean }
  | { readonly type: 'ERROR'; readonly payload: string }
  | { readonly type: 'PROCESS'; readonly payload: boolean }
  | { readonly type: 'DISABLE'; readonly payload: boolean }
  | { readonly type: 'CLIENTSECRET'; readonly payload: string };

type Dispatch = (action: Action) => void;

export function checkoutReducer(state: CheckoutState, action: Action) {
  switch (action.type) {
    case 'SUCCESS':
      return { ...state, succeeded: action.payload };
    case 'ERROR':
      return { ...state, error: action.payload };
    case 'PROCESS':
      return { ...state, processing: action.payload };
    case 'DISABLE':
      return { ...state, disabled: action.payload };
    case 'CLIENTSECRET':
      return { ...state, clientSecret: action.payload };
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

interface AuxProps {
  readonly children: ReactChild | ReactChildren;
}

function CheckoutProvider({ children }: AuxProps) {
  const [state, dispatch] = React.useReducer(checkoutReducer, defaultState);
  return (
    <CheckoutContext.Provider value={state}>
      <CheckoutDispatchContext.Provider value={dispatch}>
        {children}
      </CheckoutDispatchContext.Provider>
    </CheckoutContext.Provider>
  );
}

function useCheckoutState() {
  const context = React.useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckoutState must be used within a CheckoutProvider');
  }
  return context;
}

function useCheckoutDispatch() {
  const context = React.useContext(CheckoutDispatchContext);
  if (context === undefined) {
    throw new Error('useCheckoutDispatch must be used within a CheckoutProvider');
  }
  return context;
}

export { CheckoutProvider, useCheckoutState, useCheckoutDispatch };
