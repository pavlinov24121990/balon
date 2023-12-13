'use server'
import AdminLayout from '@/app/admin/AdminLayout';
import { fetchCookie } from '../api/route';
import Form from './Form'

const Home = async () => {
  const response = await fetchCookie();
  const cookies: string | null = response.headers.get('set-cookie');
  return (
    <AdminLayout>
      <Form product={null} cookies={cookies} />
    </AdminLayout>
  );
}

export default Home;
