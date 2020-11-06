import { ButtonSkeleton, Form, SelectSkeleton } from 'carbon-components-react';
import React from 'react';

export const OrderFormSkeleton = React.memo(() => {
  return (
    <Form>
      <SelectSkeleton />
      <ButtonSkeleton />
    </Form>
  );
});

OrderFormSkeleton.displayName = 'OrdersFormSkeleton';
