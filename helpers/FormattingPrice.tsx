const Price = ({ price }: { price: number }) => {
  const formattedPrice = (price / 100).toLocaleString('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return <p className="price mb-5">{formattedPrice}</p>;
};

export default Price;
