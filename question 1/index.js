const express = require('express');
require('dotenv').config();
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// isse mein apne products ki details nikalunga
const detailsOfProductDifCom = async (req, res) => {
  // console.log("check kar raha hu api")
  const { categoryname, productid } = req.params;
  const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
  for (const company of companies) {
    const url = `${process.env.TEST_SERVER_URL}/companies/${company}/categories/${categoryname}/products/${productid}`;
    try {
      const response = await axios.get(url);
      if (response.data) return res.json(response.data);
    } catch (error) {
      console.error(`Error fetching product details from ${company}:`, error.message);
    }
  }
  res.status(404).json({ error: 'Product not found' });
};
// is method se mein uppr k products ko fetch krke la raha hu
const FetchingProductsFromTop = async (req, res) => {
//   console.log('check kr rha hu api');
  const { categoryname } = req.params;
  const { top, minPrice, maxPrice, sortBy, order, page } = req.query;
  const companies = ['AMZ', 'MYN', 'AZO' ,'FLP', 'SNP'];
  let arrayOfAllProducts = [];
  for (const company of companies) {
    const url = `${process.env.TEST_SERVER_URL}/companies/${company}/categories/${categoryname}/products`;
    const params = {
      top: top,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };
    try {
      const response = await axios.get(url, { params });
      arrayOfAllProducts = arrayOfAllProducts.concat(response.data);
    } catch (error) {
      console.error(`Error fetching products from ${company}:`, error.message);
    }
  }
  if (sortBy && order) {
    arrayOfAllProducts.sort((a, b) => {
      if (order === 'asc') return a[sortBy] > b[sortBy] ? 1 : -1;
       else  a[sortBy] < b[sortBy] ? 1 : -1;
    });
  }
  const paginatedProducts = arrayOfAllProducts.slice((page - 1) * top, page * top);
  res.json(paginatedProducts);
};

// isse products k naam aaenge
const getNameOfProducts = async (req, res) => {
  const { companyname, categoryname } = req.params;
  const { top, minPrice, maxPrice } = req.query;
  const url = `${process.env.TEST_SERVER_URL}/companies/${companyname}/categories/${categoryname}/products`;
  const params = {
    top: top,minPrice: minPrice,maxPrice: maxPrice,
  };
  try {
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error(`Some Error occured ${companyname}:`, error.message);
    res.status(500).json({ error: 'Error fetching products' });
  }
};
app.get('/categories/:categoryname/products/:productid', detailsOfProductDifCom);
app.get('/categories/:categoryname/products', FetchingProductsFromTop);
app.get('/companies/:companyname/categories/:categoryname/products', getNameOfProducts);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
