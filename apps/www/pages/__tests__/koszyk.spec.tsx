import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import CartPage from '../koszyk';

test('tests works', () => {
  render(<CartPage />);

  expect(screen.getByText('Koszyk zakupowy')).toBeDefined();
});
