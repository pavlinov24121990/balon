'use client'
import '../scss/HardReset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderNavigation } from '../components/HeaderNavigation';
import { MyCarousel } from '@/components/MyCarousel';
import { fetchCompany } from '../helpers/api/fetchCompany';
import { Company } from "helpers/interface/interfaces";
import { useEffect, useState } from 'react';

const Home = () => {
  const defaultCompany = { title: "", id: null, formatted_phone: "", description: "", name: "", phone: "", image_urls: [""], address: "", email: "", logo_url: "" }
  const [company, setCompany] = useState<Company>(defaultCompany);

  useEffect(() => {
    fetchCompany().then(data => { setCompany(data) });
  }, []);
  
  return (
    <main>
      <HeaderNavigation />
      <MyCarousel company={ company }/>
    </main>
  );
}

export default Home;
