import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductFilter from '../components/ProductFilter';

const AllProducts = () => {
  const [iterratio, functionnnforset] = useState({});

  const handleFilter = (filterData) => {
    functionnnforset(filterData);
  };
  return (
    <div>
      <ProductFilter onFilter={handleFilter} />
      <ProductList filters={iterratio} />
    </div>
  );
};

export default AllProducts;
