import {
  ButtonSkeleton,
  Column,
  Form,
  Grid,
  NumberInputSkeleton,
  Row,
  TextAreaSkeleton,
  TextInputSkeleton,
  ToggleSkeleton,
} from 'carbon-components-react';
import React from 'react';

import styles from './ProductsForm.module.scss';

export const ProductsFormSkeleton = React.memo(() => {
  return (
    <Form className={styles.form}>
      <Grid>
        <TextInputSkeleton />
        <Row>
          <Column>
            <NumberInputSkeleton />
          </Column>
          <Column>
            <NumberInputSkeleton />
          </Column>
        </Row>
        <TextAreaSkeleton />
        <ToggleSkeleton />
        <ButtonSkeleton />
      </Grid>
    </Form>
  );
});

ProductsFormSkeleton.displayName = 'ProductsFormSkeleton';
