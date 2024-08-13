import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signup from './utils/Signup'
import Login from './utils/Login'
import ConfirmOtp from './utils/ConfirmOtp';
import NewPassword from './utils/NewPassword';
import ForgetPassword from './utils/ForgetPassword';


import { useAuthContext } from './utilsHook/useAuthContext'


import Navbar from './component/Navbar';
import Home from './component/Home';
import Footer from './component/Footer';
import Settings from './pages/Settings';


import './App.css'
// import Categories_Section from './component/Categories_Section';
import Category from './component/Category';
import ProductList from './component/ProductList';
import ProductView from './component/ProductView';


// import Cart from './component/Cart';
import Cart from './Orderandshipping/Cart';
import Favorites from './Orderandshipping/Favorites';
import OpenOrder from './Orderandshipping/OpenOrder';
import ClosedOrder from './Orderandshipping/ClosedOrder';
import Checkout from './Orderandshipping/CheckOut';
import DashBoard from './Orderandshipping/DashBoard';
import Account_update from './pages/Account_update';
import Security_check from './pages/Security_check';
import { Account_updateProvider } from './context/Account_update_context';



const App = () => {
  const { user } = useAuthContext()

  return (
    <Router>
      <div className='App'>
        <Navbar />
          <Routes>
            <Route path='/settings' element={!user ? <Login /> : <Settings />} />
            <Route path='/Login' element={!user ? <Login /> : <Home />} />
            <Route path='/Signup' element={!user ? <Signup /> : <Home />} />
            <Route path='/ForgetPassword' element={!user ? <ForgetPassword /> : <Home />} />
            <Route path='/ConfirmOtp' element={ !user ? <ConfirmOtp /> : <Home />} />
            <Route path='/NewPassword' element={<NewPassword />} />
          </Routes> 

          <Routes>
            <Route path='/' exact element={<Category />} />
            <Route path='/products/:category' element={<ProductList />} />
            <Route path='/products/:category/:productId' element={<ProductView />} />
          </Routes>
          <Routes>
            <Route path='/products/:category/:productId/OpenOrder' exact element={ !user ? <Login /> :<OpenOrder/>} />
            <Route path='/products/:category/:productId/ClosedOrder' exact element={ !user ? <Login /> :<ClosedOrder/>} />
            <Route path='/products/:category/:productId/Favorites' exact element={ !user ? <Login /> :<Favorites/>} />
            <Route path='/cart' exact element={ !user ? <Login /> :<Cart/>} />
            <Route path='/products/:category/:productId/cart/:checkout' element={ !user ? <Category /> : <Checkout />} />
            <Route path='/products/:category/:productId/cart/:checkout' element={ !user ? <Category /> : <Checkout />} />
            <Route path='/dashboard' element={<DashBoard />} />
          </Routes>

          
          <Account_updateProvider >
            <Routes>
              <Route path='/Account_update' element={ user ? <Account_update /> : <Home />} />
              <Route path='/Security_check' element={ user ? <Security_check /> : <Home />} />
            </Routes>
          </Account_updateProvider>
          
          
          <Footer />
      </div>
    </Router>

  )
}


export default App