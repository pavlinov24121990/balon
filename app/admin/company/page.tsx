'use client'
import 'scss/HardReset.css';
import 'scss/admin/NavPanel.scss';
import { fetchCompany } from "helpers/api/fetchCompany.ts";
import * as React from 'react';
import { useState, useEffect } from 'react';
import Form from './Form';

interface Company {
  title: string;
  description: string;
  name: string;
  phone: string;
  image_urls: string[];
  address: string;
  email: string;
  logo: string;
}

const defaultCompany: Company = {title: "", description: "", name: "", phone: "", image_urls: [""], address: "", email: "", logo: ""}

const Home: React.FC = () => {

  const [company, setCompany] = useState<Company>(defaultCompany);

   useEffect(() => {
    fetchCompany().then((data: Company) => {
      setCompany(data);
    });
   }, []);
  
  return (
    <main className="company">
      <Form company={ company }/>
    </main>
  );
}

export default Home;
