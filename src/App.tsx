// App.tsx
import { Route, Routes, useParams } from 'react-router-dom';
import Home from './pages/home/Home';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import ProductDetails from './pages/product/[productId]/ProductDetails';
import { products } from "./utils/products";
import CartProvider from './providers/CartProvider';
import Cart from './cart/page';
import { Toaster } from 'react-hot-toast';
import NotFound from './pages/notFound/NotFound';
import AddProducts from './admin/add-products/page';
import Admin from './admin/page';
import ManageOrders from './admin/manage-orders/page';
import ManageProducts from './admin/manage-products/page';
import Login from './pages/login/Login';

function App() {

  function ProductDetailsWrapper() {
    const { productId } = useParams();
    const product = products.find((item) => item.id === productId);
    
    if (!product) {
      return <div>Producto no encontrado</div>;
    }
  
    return <ProductDetails product={product} />;
  }

  return ( 
    <CartProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Toaster toastOptions={{
            style:{
              background: 'rgb(51 65 85)',
              color: '#fff'
            }
          }}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetailsWrapper />} />    
            <Route path="/cart" element={<Cart />} />    
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/admin/add-products" element={<AddProducts />} />
            <Route path="/admin/edit-products/:id" element={<AddProducts />} /> 
            <Route path="/admin/manage-orders" element={<ManageOrders />} />
            <Route path="/admin/manage-products" element={<ManageProducts />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound/>} />  
          </Routes>          
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
