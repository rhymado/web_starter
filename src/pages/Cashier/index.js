import React from "react";
// import { Redirect } from "react-router-dom";

import Product from "./Product";
import Cart from "./Cart";

// import { authContext } from "../../contexts/auth";
import { themeContext } from "../../contexts/theme";

class Cashier extends React.Component {
  state = {
    products: [
      {
        name: "Fried Rice",
        price: 10000,
      },
      {
        name: "Spicy Noodles",
        price: 15000,
      },
      {
        name: "Dimsum (4pc)",
        price: 20000,
      },
      {
        name: "Ice Tea",
        price: 5000,
      },
      {
        name: "Mineral Water",
        price: 3500,
      },
      {
        name: "Lemon Tea",
        price: 7500,
      },
    ],
    cart: [
      {
        name: "Fried Rice",
        price: 10000,
      },
      {
        name: "Mineral Water",
        price: 3500,
      },
      {
        name: "Lemon Tea",
        price: 7500,
      },
    ],
  };
  addToCart = (product) => {
    for (let cartItem of this.state.cart) {
      if (cartItem.name === product.name) {
        return;
      }
    }
    const newCart = [...this.state.cart, product];
    this.setState({
      cart: newCart,
    });
  };
  removeFromCart = (product) => {
    // ambil cartItem selain yang di remove
    const newCart = this.state.cart.filter(
      (cartItem) => cartItem.name !== product.name
    );
    this.setState({
      cart: newCart,
    });
  };
  render() {
    // const auth = this.context;
    // if (!auth.token) {
    //   return <Redirect to="/" />;
    // }
    const { theme, toggleTheme } = this.context;
    return (
      <div className="vh-100 container-fluid m-0">
        <h1>{theme}</h1>
        <button onClick={toggleTheme}>toggle theme</button>
        <div className="row">
          <Product products={this.state.products} addToCart={this.addToCart} />
          <Cart cart={this.state.cart} removeFromCart={this.removeFromCart} />
        </div>
      </div>
    );
  }
}
Cashier.contextType = themeContext;

export default Cashier;
