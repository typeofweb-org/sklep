import { Content } from 'carbon-components-react';
import React from 'react';

import { LoadingIndicator } from '../loadingIndicator/LoadingIndicator';
import { ToastsContextProvider } from '../toasts/Toasts';

import styles from './contentWrapper.module.scss';

export const ContentWrapper = React.memo<React.PropsWithChildren<{}>>(({ children }) => (
  <ToastsContextProvider>
    <Content className={styles.contentWraper}>{children}</Content>
    <LoadingIndicator />
  </ToastsContextProvider>
));
ContentWrapper.displayName = 'ContentWrapper';
