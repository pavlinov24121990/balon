'use server'
import { fetchCookie } from '../api/route';
import Form from './Form'

const Home = async () => {
  const response = await fetchCookie();
  const cookies: string | null = response.headers.get('set-cookie');
  return (
    <Form product={null} cookies={cookies} />
  );
}

export default Home;
