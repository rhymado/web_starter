import React from "react";

function Card(props) {
  const { product, onClickItem } = props;
  return (
    <div
      className="col-sm-4 bg-light m-1"
      style={{ cursor: "pointer" }}
      onClick={onClickItem}
      // onClick={() => onClickItem()}
    >
      <p className="h4">{product.name}</p>
      <p>{product.price}</p>
    </div>
  );
}

function Product({ products, addToCart }) {
  return (
    <main className="bg-secondary col-sm-8">
      <h1>Product</h1>
      <div className="d-flex flex-wrap row">
        {products.length > 0 &&
          products.map((product, idx) => (
            <Card
              product={product}
              key={idx}
              onClickItem={() => addToCart(product)}
            />
          ))}
      </div>
    </main>
  );
}
export default Product;
