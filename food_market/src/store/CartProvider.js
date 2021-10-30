import React, { useReducer } from 'react';
import CartContext from "./cart-context";


const defaultCartState = {
  items: [],
  totalAmount: 0
}



const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if(existingCartItem) {
       const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        }
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, action.item]
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      }
    case "REMOVE":
      const existingItemIndex = state.items.findIndex(item => item.id === action.id);
      const existingItem = state.items[existingItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedAfterRemoveItems;
      if (existingItem.amount === 1) {
        updatedAfterRemoveItems = state.items.filter(item => item.id !== action.id)
      } else {
        const updatedItem = {...existingItem, amount: existingItem.amount - 1}
        updatedAfterRemoveItems = [...state.items];
        updatedAfterRemoveItems[existingItemIndex] = updatedItem;
      }
      return {
        items: updatedAfterRemoveItems,
        totalAmount: updatedTotalAmount
      }
    default:
      return defaultCartState;
  }

}


const CartProvider = (props) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  const addItemToCartHandler = item => {
    dispatchCartAction({type: 'ADD', item: item})
  };

  const removeItemFromCartHandler = id => {
    dispatchCartAction({type: 'REMOVE', id: id})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }
  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
};

export default CartProvider;