import React from 'react';

import { AdminLayout } from '../../../components/admin/adminLayout/AdminLayout';
import { AdminSingleOrder } from '../../../components/admin/adminSingleOrder/AdminSingleOrder';

export default function AdminSingleOrderSubpage() {
  return (
    <AdminLayout>
      <AdminSingleOrder />
    </AdminLayout>
  );
}
