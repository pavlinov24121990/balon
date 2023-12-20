'use server'
import * as React from 'react';
import { fetchCookie } from '../products/api/route';
import Form from './Form';

const Home = async () => {
  
  const response = await fetchCookie();
  const cookies: string | null = response.headers.get('set-cookie');
  
  return (
    <div className="company">
      <Form cookies={ cookies }/>
    </div>
  );
}

export default Home;
