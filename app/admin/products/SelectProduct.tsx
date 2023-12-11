'use client'
import { useState } from "react";

const SelectProduct: React.FC = () => {
  const [active, setActive] = useState<boolean>(true);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActive(e.target.value);
  };
  
  console.log(active)

  return (
    <div>
      <label htmlFor="selectInput">Select an option for Products:</label>
      <select id="selectInput" value={active} onChange={handleSelectChange}>
        <option value={true}>Product active true</option>
        <option value={false}>Product active false</option>
      </select>
    </div>
  );
}

export default SelectProduct;
