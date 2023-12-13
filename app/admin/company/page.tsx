'use server'
import * as React from 'react';
import AdminLayout from '../AdminLayout';
import Form from './Form';

const Home = async () => {
  return (
    <AdminLayout>
      <main className="company">
        <Form />
      </main>
    </AdminLayout>
  );
}

export default Home;
