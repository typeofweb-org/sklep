import { Content } from 'carbon-components-react';
import React from 'react';

import styles from './contentWrapper.module.scss';

export const ContentWrapper = React.memo<React.PropsWithChildren<{}>>(({ children }) => (
  <Content className={styles.contentWraper}>{children}</Content>
));
ContentWrapper.displayName = 'ContentWrapper';
