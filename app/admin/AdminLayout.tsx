import React from 'react';
import { NavPanel } from "@/app/admin/NavPanel";
import type { Metadata } from 'next';
import 'scss/HardReset.css';
import 'scss/admin/NavPanel.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'scss/admin/ProductList.scss';

export const metadata: Metadata = {
  title: 'Balloons',
  description: 'Generated by Balloons',
}

const AdminLayout = ({ children }) => {
  return (
    <div className="admin_nav_panel">
      <NavPanel />
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
