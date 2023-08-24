import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "react-bootstrap/Badge";
import {
  faRightToBracket,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar() {
  let data = useCart();
  let [cartView, setCartView] = useState();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/Login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-success navbar-dark">
        <div className="container-fluid" style={{ marginInline: "50px" }}>
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Foodoso
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link
                className="nav-link active fs-5"
                aria-current="page"
                to="/"
                style={{ marginLeft: "35px" }}
              >
                Home
              </Link>
              {localStorage.getItem("authToken") ? (
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myOrder"
                  style={{ marginLeft: "20px" }}
                >
                  My Orders
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className="d-flex">
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link className="btn bg-white text-success mx-1" to="/Login">
                    Login
                  </Link>
                  <Link
                    className="btn bg-white text-success mx-1"
                    to="/createuser"
                  >
                    SignUp
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className="mx-3"
                    to="/"
                    title="Cart"
                    onClick={() => {
                      setCartView(true);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      size="xl"
                      style={{ color: "#1e3050", cursor: "pointer" }}
                    />
                    <Badge pill bg="danger">
                      {data.length}
                    </Badge>
                  </div>
                  {cartView && (
                    <Modal
                      onClose={() => {
                        setCartView(false);
                      }}
                    >
                      <Cart />
                    </Modal>
                  )}
                  <div className="mx-3" title="Logout" onClick={handleLogout}>
                    <FontAwesomeIcon
                      icon={faRightToBracket}
                      size="xl"
                      style={{ color: "#1e3050", cursor: "pointer" }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
