import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function useCartItem(id, img, name, price, quantity) {
  const cartItems = useSelector((state) => state.cart);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(cartItems.some((item) => item.id === id));
  }, [cartItems, id]);

  const item = {
    id: id,
    img: img,
    name: name,
    price: price,
    quantity: quantity,
  };

  return { item, isInCart };
}

export default useCartItem;
