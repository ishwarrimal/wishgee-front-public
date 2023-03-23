import React, { useState, useContext } from "react";
import { Link, Router } from "react-router-dom";
import logoRed from "Assets/logo_red.svg";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { auth } from "Components/Firebase/"
import history from "Utils/history";
// import { SignInScreen } from "Components/Firebase";
import routes from "Constants/routes";
import "./style.css";
import UserContext from "Context/userContext";

const SigninComponent = React.lazy(() => import('Components/Firebase/SigninComponent'));

function NavBar() {
  const [user, ] = useContext(UserContext);
  const [showDialog, setShowDialog] = useState(false);
  const [showUserDrop, setShowUserDrop] = useState(false);


  const toggleDialog = () => {
    setShowDialog(true);
  };

  const toggleDrop = () => {
    setShowUserDrop(!showUserDrop);
  }

  const logout = () => {
    auth.signOut()
    history.push(routes.HOME)
    setShowDialog(false)
  }

  return (
    <div className="fixed w-full top-0 z-100 shadow border-top-red">
      {/* <div className="bg-red xl:px-24 lg:px-24 md:px-24 sm:px-12 xxl:px-48  flex items-center justify-between text-sm">
          <div className="text-white font-bold cursor-pointer">
              Instant help: <a href="mailto:contact@wishgee.com">contact@wishgee.com</a>
          </div>
          <ul className="md:inline-flex text-white hidden">
              <li className="ml-2 cursor-pointer"><a href="/#about-wishgee">About</a></li>
              <li className="ml-2 cursor-pointer"><a href="https://blog.wishgee.com/" target="_blank" rel="noopener noreferrer">Blogs</a></li>
              <li className="ml-2 cursor-pointer"><a href="/#faq-wishgee">FAQ</a></li>
              <li className="ml-2 cursor-pointer"><a href="/terms">Terms</a></li>
          </ul>
      </div> */}
      <div className="flex xl:px-24 lg:px-24 md:px-24 sm:px-12 xxl:px-48 px-4 py-2 items-center justify-between bg-white">
          <div className="flex">
              <div className="w-24">
                <Link to="/">
                  <img src={logoRed} className="w-full h-full" alt="wishgee logo" />
              </Link>
              </div>
          </div>
          <div className="top-bar-right">
            {!auth.currentUser ? <button onClick={() => toggleDialog()}>Sign In</button> : 
            (
              <div
                  className="user-box outline-none"
                  onBlur={() => {
                    if (showUserDrop === true) toggleDrop();
                  }}
                  onClick={() => {
                    if (showUserDrop === true || showUserDrop === false)
                      toggleDrop();
                  }}
                  tabIndex="0">
                  <div className="user-image">
                    {user && 
                    user.photoUrl ? 
                    <img src={user && user.photoUrl} alt="" /> :
                    <p className="text-avatar">{user.displayName[0]}</p>
                  }
                  </div>
                  <span>{user && user.displayName}</span>
                  <span className="w-3 pl-1">
                  <img alt="caret up and down" src={require(`Assets/caret-arrow-${showUserDrop ? 'up': 'down'}.svg`)} />
                  </span>

                  {showUserDrop && (
                    <div className="drop-down shadow-md">
                      <Router history={history}>
                        <Link
                            className="hover:no-underline"
                            to={routes.ADD_WISH}>
                          <li
                            onMouseDown={(e) => e.preventDefault()}
                            className="block mt-4 lg:inline-block text-red hover:no-underline cursor-pointer p-2">
                            
                              Make a Wish
                          </li>
                        </Link>
                        <Link
                          className="hover:no-underline"
                          to={routes.DASHBOARD}>
                          <li
                            onMouseDown={(e) => e.preventDefault()}
                            className="block mt-4 lg:inline-block text-red hover:text-gray-700 cursor-pointer p-2">
                              Dashboard
                          </li>
                        </Link>
                        <li
                          className="block mt-4 mb-4 lg:inline-block text-red hover:text-gray-700 cursor-pointer p-2"
                          onClick={() => toggleDrop()}>
                          <div className="text-color" onClick={logout}>
                            Logout
                          </div>
                        </li>
                      </Router>
                    </div>
                  )}
              </div>
            )}
                                  
          </div>
      </div>
      {/* <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
        <div className="container">
          <div className="flex items-center flex-shrink-0 text-white mr-6 w-24">
            <Link to="/">
              <img src={logo} className="w-full h-full" alt="wishgee logo" />
            </Link>
          </div>
          <div className="lg:flex lg:items-center lg:w-auto ">
            <div className="lg:flex-grow"></div>
            <div className="text-sm outline-none">
              {auth.currentUser ? (
                <div
                  className="user-box outline-none"
                  onBlur={() => {
                    if (showUserDrop === true) toggleDrop();
                  }}
                  onClick={() => {
                    if (showUserDrop === true || showUserDrop === false)
                      toggleDrop();
                  }}
                  tabIndex="0">
                  <div className="user-image">
                    <img src={user && user.photoUrl} alt="" />
                  </div>
                  <span>{user && user.displayName}</span>
                  <Arrow className="logged-icon" />

                  {showUserDrop && (
                    <div className="drop-down shadow-md">
                      <Router history={history}>
                        <li
                          onMouseDown={(e) => e.preventDefault()}
                          className="block mt-4 lg:inline-block text-red hover:text-gray-700 hover:no-underline cursor-pointer p-2">
                          <Link
                            className="hover:no-underline"
                            to={routes.ADD_WISH}>
                            Make a Wish
                          </Link>
                        </li>
                        <li
                          onMouseDown={(e) => e.preventDefault()}
                          className="block mt-4 lg:inline-block text-red hover:text-gray-700 cursor-pointer p-2">
                          <Link
                            className="hover:no-underline"
                            to={routes.DASHBOARD}>
                            Dashboard
                          </Link>
                        </li>
                        <li
                          className="block mt-4 mb-4 lg:inline-block text-red hover:text-gray-700 cursor-pointer p-2"
                          onClick={() => toggleDrop()}>
                          <div className="text-color" onClick={logout}>
                            Logout
                          </div>
                        </li>
                      </Router>
                    </div>
                  )}
              </div>
            ) : (
                // <button onClick={() => loginWithRedirect({})}>Log in</button>
                <button className="sign-up-btn text-white" onClick={() => toggleDialog()}><UserComp className="login-icon" /> Log in/Sign up</button>
              )}
          </div>
        </div>
        </div>
      </nav>*/}
      <Modal open={showDialog && !auth.currentUser} onClose={() => setShowDialog(false)} center>
        <h2><b>WishGee</b></h2>
        <SigninComponent />
      </Modal> 
    </div>
  );
}

export default NavBar;
