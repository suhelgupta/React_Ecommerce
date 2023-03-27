
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userSlice";

const NavBar = (props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state)=>state.user)
  const total_item = useSelector((state)=>state.cart.total_item)

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"/home"}>
            Ecommerce
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " to={"/home"}>
                  Home
                </NavLink>
              </li>
              {userState.logedInUser?.isAdmin && 
              <li className="nav-item">
                <NavLink className="nav-link " to={"/products"}>
                  Products
                </NavLink>
              </li>}
              <li className="nav-item">
                <NavLink className="nav-link " to={"/About"}>
                  About
                </NavLink>
              </li>
            </ul>
            <div className="d-flex me-3">
              <div className="navbar-brand me-5">{userState.isUserLoggedIn?`Hello ${userState.logedInUser.firstname}`:`Hello`}</div>
              {!userState.isUserLoggedIn && <NavLink to={"/login"}>
                <button className="btn btn-success me-5" type="submit">
                  Login
                </button>
              </NavLink>}
              {userState.isUserLoggedIn && 
                <NavLink to={"/login"}>
                  <button onClick={()=>{dispatch(logOut())}} className="btn btn-outline-success me-5" type="submit">
                  Logout
                </button>
                </NavLink>
              }
              <NavLink to="/cart">
                <div className="btn btn btn-link">
                  <Badge badgeContent={total_item} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
