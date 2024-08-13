// CheckoutPage.js
// import { useContext } from 'react';
import { useNavigate } from "react-router-dom"
// import { CartContext } from './context/CartContext';

const CheckoutPage = () => {
  const history = useNavigate();
  // const { cartState } = useContext(CartContext);

  const handleCheckout = async () => {
    try {
      // Send cartState.products data to backend (e.g., using fetch or Axios)
      // Redirect to confirmation page on successful payment
      history.push('/confirmation');
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error gracefully
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {/* {cartState.products.map(product => (
          <li key={product.id}>
            {product.name} - {product.amount}
          </li>
        ))} */}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CheckoutPage;
