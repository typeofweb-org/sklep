import { InlineLoading, Modal } from 'carbon-components-react';
import React from 'react';
import ReactDOM from 'react-dom';

import type { Nil } from '../../../../api/src/types';
import type { Product } from '../productsList/ProductListUtils';

type DeleteProductConfirmationModalProps = {
  readonly isOpen: boolean;
  readonly product: Nil<Product>;
  readonly handleDelete: (productId: number) => void;
  readonly handleClose: () => void;
  readonly status: 'loading' | 'success' | 'error' | 'idle';
};

const statusToPrimaryText = (
  status: DeleteProductConfirmationModalProps['status'],
): React.ReactNode => {
  switch (status) {
    case 'loading':
      return <InlineLoading status="active" description="Usuwanie..." />;
    case 'success':
      return <InlineLoading status="finished" description="Usuwanie..." />;
    default:
      return 'Usuń produkt';
  }
};

export const DeleteProductConfirmationModal = React.memo<DeleteProductConfirmationModalProps>(
  ({ isOpen, product, handleDelete, handleClose, status }) => {
    const submit = React.useCallback(() => {
      if (product) {
        return handleDelete(Number(product.id));
      }
    }, [handleDelete, product]);
    const primaryButtonText = statusToPrimaryText(status);
    const primaryButtonDisabled = status === 'loading' || status === 'success';

    if (typeof document === 'undefined') {
      return null;
    }

    return ReactDOM.createPortal(
      <Modal
        id="transactional-passive-modal"
        danger={true}
        modalHeading={`Czy na pewno chcesz usunąć produkt ${product?.name}? Ta operacja jest nieodwracalna.`}
        modalLabel="Usunięcie tego produktu z bazy nie będzie miało wpływu na już zrealizowane zamówienia."
        primaryButtonText={primaryButtonText}
        primaryButtonDisabled={primaryButtonDisabled}
        secondaryButtonText="Anuluj"
        open={isOpen}
        onRequestClose={handleClose}
        onRequestSubmit={submit}
        onSecondarySubmit={handleClose}
        style={{ width: '100%' }}
      />,
      document.body,
    );
  },
);
DeleteProductConfirmationModal.displayName = 'DeleteProductConfirmationModal';
