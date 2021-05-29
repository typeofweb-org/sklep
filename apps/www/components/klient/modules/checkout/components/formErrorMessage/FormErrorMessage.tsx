import type { FieldState } from 'final-form';
import React from 'react';

interface FormErrorMessageProps {
  readonly meta: Pick<FieldState<unknown>, 'error' | 'touched'>;
}

export const FormErrorMessage = React.memo<FormErrorMessageProps>(({ meta }) => {
  if (!meta.error || !meta.touched) {
    return null;
  }
  return <span className="text-sm text-red-600">{meta.error}</span>;
});

FormErrorMessage.displayName = 'FormError';
