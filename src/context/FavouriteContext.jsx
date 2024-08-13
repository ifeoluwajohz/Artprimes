import { useState, createContext } from "react"


export const FavouriteContext = createContext();

export const FavouriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVOURITE':
            return { favourite: action.payload };
        case 'REMOVE_FAVOURITE':
            return { favourite: action.payload };
        case 'REMOVE_ALL':
            return { favourite: null };
        case 'CHECKOUT':
            return { favourite: null };
        default:
            return state;
    }
}

export const FavouriteContextProvider = () =>{
    const [cartItems, setCartItems] = useState([])
    return(
        <FavouriteContext.Provider>
            {Children}
        </FavouriteContext.Provider>
    )
};