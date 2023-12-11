'use server'
import AdminLayout from '@/app/admin/AdminLayout';
import Form from './Form'


const Home: React.FC = () => {
  return (
    <AdminLayout>
      <Form />
    </AdminLayout>
  );
}

export default Home;
