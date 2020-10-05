import React from 'react';

import { AdminLayout } from '../../../components/admin/adminLayout/AdminLayout';
import { AdminSingleProduct } from '../../../components/admin/adminSingleProduct/AdminSingleProduct';

export default function AdminSingleProductPage() {
  return (
    <AdminLayout>
      <AdminSingleProduct />
    </AdminLayout>
  );
}
