import { Modal } from 'carbon-components-react';
import React from 'react';

import type { Nil } from '../../../../api/src/types';
import type { Product } from '../productsList/ProductListUtils';

type DeleteProductConfirmationModalProps = {
  readonly isOpen: boolean;
  readonly product: Nil<Product>;
  readonly handleDelete: (productId: number) => void;
  readonly handleClose: () => void;
};

export const DeleteProductConfirmationModal = React.memo<DeleteProductConfirmationModalProps>(
  ({ isOpen, product, handleDelete, handleClose }) => {
    const submit = React.useCallback(() => {
      if (product) {
        return handleDelete(Number(product.id));
      }
    }, [handleDelete, product]);
    return (
      <Modal
        id="transactional-passive-modal"
        danger={true}
        modalHeading={`Czy na pewno chcesz usunąć produkt ${product?.name}? Ta operacja jest nieodwracalna.`}
        primaryButtonText="Usuń produkt"
        secondaryButtonText="Anuluj"
        open={isOpen}
        onRequestClose={handleClose}
        onRequestSubmit={submit}
        onSecondarySubmit={handleClose}
        style={{ width: '100%' }}
      ></Modal>
    );
  },
);
DeleteProductConfirmationModal.displayName = 'DeleteProductConfirmationModal';
