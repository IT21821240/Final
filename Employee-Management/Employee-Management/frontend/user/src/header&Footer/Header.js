import { React, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { GiShoppingBag } from "react-icons/gi";
import { useCart } from "react-use-cart";
import ShoppingCart from "../components/ShoppingCart";
import "./header.css";

function Header() {
  const [cartsVisibilty, setCartVisible] = useState(false);
  const { addItem, totalUniqueItems, inCart } = useCart();
  return (
    <>
      <header className="header-links">
        <h1>LankaOpticals</h1>
        <div className="header-right">
          <a href="#" className="product-link">
            Product
          </a>

          <a href="#">
            <i className="fa fa-user fa-3x" aria-hidden="true"></i>{" "}
            {/* Profile icon */}
          </a>
          <button
            className="btn shopping-cart-btn"
            onClick={() => setCartVisible(true)}
          >
            <GiShoppingBag size={24} />

            <span className="product-count">{totalUniqueItems}</span>
          </button>
        </div>
      </header>
      <div>
        <ShoppingCart
          visibilty={cartsVisibilty}
          onClose={() => setCartVisible(false)}
        />
      </div>
    </>
  );
}

export default Header;
