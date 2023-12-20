'use server'
import Price from "@/helpers/FormattingPrice";
import React from "react";
import { ShowProductUser } from "../api/route";
import CaouruselUser from "../CaouruselUser";

const Home = async ({ params }: { params: { id: number } }) => {
  try {
    const product = await ShowProductUser(params.id);
    if (!product) {
      return null
    }
    return (
      <div className='d-flex flex-column text-center show-product'>
        <CaouruselUser product={product} />
        <p className="title mb-3">{product.title}</p>
        <p className="title mb-3">{product.description}</p>
        <Price key={product.id} price={product.price} />
      </div>
    );
  } catch (error) {
      console.error('Error loading product:', error);
      return <div>Error loading product</div>;
   }
}

export default Home;
