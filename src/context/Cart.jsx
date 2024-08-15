import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from '../utilsHook/useAuthContext'
export const Cart = createContext();
export const useCart = () => {
    return useContext(Cart);
}


export const CartProvider = ({children}) => {
    const [ CartItems, setCartItems ] = useState([])
    const [ isLoading, setisLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchCartItems = async () => {
            setisLoading(true);
            try {
                const response = await fetch(`https://artprimes-backend.onrender.com/user/cart`, {
                    method: 'GET',
                    credentials: 'include'
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
    
                const data = await response.json();
                setCartItems(data.cart);
                setError(null);
            } catch (err) {
                setError('Error fetching cart items...');
            } finally {
                setisLoading(false);
            }
        };
    
        fetchCartItems();
    }, [CartItems]);
    

// Adding a new item to the cart and if exxist will increment then sen dto the server

    const addItem = async ( productId, quantity ) => {
        setCartItems((prevItems) => {
            const existingItems = prevItems.find(item => item.productId === productId );
            if(existingItems) {
                const updatedItems = prevItems.map(item => 
                    item.productId === productId
                    ? { ...item, quantity: item.quantity + 1}
                    : item
                );
                setCartItems(updatedItems);
                return updatedItems
            }
            const newItems = [ ...prevItems, {productId, quantity}]
            setCartItems(newItems);
            return newItems;
        });
        const url = `https://artprimes-backend.onrender.com/user/cart/add/?productId=${productId}`

        const data = {
            quantity : 1
        }

        try{
            const response = await fetch(url, {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'

            })
            // fetchCartItems(userId)

            if(!response.ok) {
                throw new Error ('Network response was not ok')
            }
            const responseData = await response.json();
        }catch(err){
            setError('Error:', err.message)
        }
    }

    const reduceOne = async ( productId, quantity ) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.productId === productId)
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    const updatedItems = prevItems.map(item => 
                        item.productId === productId
                        ? { ...item, quantity: item.quantity - quantity}
                        : item
                    );
                    setCartItems(updatedItems);
                    return updatedItems
                } else {
                    const updatedItems = prevItems.filter(item => item.productId !== productId);
                    setCartItems(updatedItems);
                } 
            }
            return prevItems;
        })
        const url = `https://artprimes-backend.onrender.com/user/cart/update?productId=${productId}`
        const data = {
            action : "decrease",
            quantity : 1
        }

        try{
            const response = await fetch(url, {
                method : "PUT",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })

            if(!response.ok) {
                throw new Error ('Network response was not ok')
            }
            const responseData = await response.json();
        }catch(err){
            setError(err.message)
        }
    }

    const removeItem = async (ProductId) => {
        const url = `https://artprimes-backend.onrender.com/user/cart/productId=${ProductId}`
        
        const data = {
            productId: ProductId.productId
        }
        setCartItems((prevItems) => prevItems.filter(item => !(item.prevItems === ProductId.productId && item.userId === userId)))
        try{
            const response = await fetch(url, {
                method: "DELETE",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error ('Failed to delete Item')
            }
        }catch(err) {
            setError('Error:', error)
        }
    }
    const clearCart = async () => {
        setCartItems([])
        const url = `https://artprimes-backend.onrender.com/user/cart`

        try{
            const response = await fetch(url, {
                method: "DELETE",
                headers : {
                    'Content-Type' : 'application/json'
                },credentials: 'include'
            })
            if (!response.ok) {

                throw new Error ('Failed to delete Item')
            }
        }catch(err) {
            setError('Error:', err)
        }
    }


    const ShipNow = () => {

    }


    return(
        <Cart.Provider value={{ CartItems, addItem, reduceOne, removeItem, clearCart, ShipNow }}>
            {children}
        </Cart.Provider>
    )
};