import React, { ReactNode } from 'react';

export interface User {
  id: Number | null,
  avatar_url: string,
  email: string,
  formatted_phone: string,
  name: string,
  role: string
}

export interface Token {
  name: string,
  path: string,
  value: string
}

export interface Company {
  title: string,
  description: string,
  name: string,
  formatted_phone: string,
  phone: string,
  image_urls: string[],
  address: string,
  email: string,
  logo_url: string,
  id: number | null
}

export interface MyCarouselProps {
  company: Company;
}

export interface FormErrors {
  [key: string]: string[];
}

export interface avatar {
  avatar: File | null;
}

export interface AdminLayoutProps {
  children: ReactNode;
}

// ADMIN

export interface Product {
  id: number,
  title: string,
  description: string,
  price: number,
  image_urls: string[],
  active: string
}

export interface ApiResponse {
  products: Product[],
  pages_count: number
}

export interface ProductProps {
  product: Product | null;
}

export interface ProductPropsAndCockies {
  product: Product | null,
  cookies: string | null
}

export interface CompanyAdmin {
  title: string,
  description: string,
  name: string,
  formatted_phone: string,
  phone: string,
  image_urls: string[],
  address: string,
  email: string,
  logo_url: string,
  id: number | null,
  images: File[],
  logo: File | null
}

export interface ProductListProps {
  cookies: string | null;
}

export interface DeleteProducts {
  productId: number,
  cookies: string | null
}
