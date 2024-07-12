import {Router , Routes ,Route} from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Container>
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/products/:productId" element={<ProductList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
