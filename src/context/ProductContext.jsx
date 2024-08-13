import { createContext, useContext, useReducer } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, allProducts: action.payload };
    case 'FILTER_PRODUCTS':
      const filteredProducts = state.allProducts.filter(product => product.name.toLowerCase().includes(action.payload.toLowerCase()));
      return { ...state, filteredProducts };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    allProducts: [],
    filteredProducts: [],
  });

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
