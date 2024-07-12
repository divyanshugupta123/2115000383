import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { Grid, Pagination } from '@mui/material';
const ProductList = () => {
  const [products, functionforSet] = useState([]);
  useEffect(() => {
    const productsCalling = async () => {
      const response = await axios.get('http://localhost:3000/categories/All/products', {
        params: {
          top: 10,
          page: page,
        },
      });
      functionforSet(response.data.products);
      setTotalPages(response.data.totalPages);
    }
    productsCalling();
  });
  return (
    <>
      <Grid container>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
    </>
  );
};
export default ProductList;
