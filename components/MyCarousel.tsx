'use client'
import { Carousel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import '../scss/MyCarousel.scss'
import { fetchCompany } from '../helpers/api/fetchCompany.ts';
import Link from "@/node_modules/next/link";

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

const defaultCompany = {title: "", description: "", name: "", phone: "", image_urls: [""], address: "", email: "", logo: ""}

const MyCarousel: React.FC = () => {

  const [company, setCompany] = useState<Company>(defaultCompany);

  useEffect(() => {
    fetchCompany().then(data => {setCompany(data)});
  }, []);

  return (
  <Carousel>
    {company.image_urls.map((imageUrl, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100 fullscreen-image"
          src={`http://localhost:3000${imageUrl}`}
          alt="company foto"
        />
        <Carousel.Caption>
          <p>Весна — лето 2024</p>
          <h3>with love, <br /> to you </h3>
          <Link href="">Перейти в каталог</Link>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

}

export { MyCarousel };
