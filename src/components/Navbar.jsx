import React from "react";
import "./css/Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userCreator } from "../redux/actions/userActions";

const Navbar = () => {
  let history = useHistory();
  let dispatch = useDispatch();

  let userStatus = useSelector((state) => state);

  const [show, handleShow] = useState(false);

  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <Link to="/">
        <img
          src="https://raw.githubusercontent.com/Jassi10000/AlanEats/main/frontend/src/images/AlanEatsLogo.png?token=ANRAM22WN3F2X3GD3MJVOSDBYNRZM"
          alt="alan eat"
        />
      </Link>

      <div className="nav_search">
        <input type="text" placeholder="Search" />
        <SearchIcon className="nav_searchIcon" />
      </div>
      <div className="nav_header">
        {!user ? (
          <span
            className="nav_signin"
            onClick={() => {
              history.push("/signin");
            }}
          >
            Sign In
          </span>
        ) : (
          <div className="loggedUser">
            <img className="user_logo" src={user[0].userImage} />
            <div className="loggedUser_info">
              <h4>{user[0].name}</h4>
              <button
                className="logout_Btn"
                onClick={() => {
                  localStorage.removeItem("user logged in");
                  dispatch(userCreator(false));
                  history.push("/signin");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        <div
          className="nav_cart"
          onClick={() => {
            history.push("/checkout");
          }}
        >
          <ShoppingBasketIcon className="cartIcon" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
