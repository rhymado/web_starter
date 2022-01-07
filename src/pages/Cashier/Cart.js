import React from "react";

function Card(props) {
  const { product, onClickItem } = props;
  return (
    <div className="bg-light m-1" style={{ cursor: "pointer" }}>
      <p className="h4">{product.name}</p>
      <p>{product.price}</p>
      <button onClick={onClickItem}>remove item</button>
    </div>
  );
}

function Cart(props) {
  const { cart, removeFromCart } = props;
  return (
    <div className="bg-success col-sm-4">
      <h1>Cart</h1>
      {cart.map((cartItem, idx) => (
        <Card
          product={cartItem}
          key={idx}
          onClickItem={() => removeFromCart(cartItem)}
        />
      ))}
    </div>
  );
}
export default Cart;
