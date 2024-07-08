import Login from "@/components/modals/Login";
import Signup from "@/components/modals/Signup";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import OTP from "./modals/OTP";
import { useDispatch, useSelector } from "react-redux";
import { removeUserCredentials } from "@/features/authSlice";

const NavBar = () => {
  const { userCredentials } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);

  // handle login/signup button click on home page NAV
  const handleButtonClick = () => {
    setIsLoginModalOpen((prev) => !prev);
    // EDGE CASE: if user clicks on login/signup button when signup modal is open the intention is to close all the modals
    if (isSignupModalOpen) {
      setIsSignupModalOpen(false);
      setIsLoginModalOpen(false);
    }
  };

  // handle signup button click inside login modal
  const handleSignupButtonClick = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  // handle login button click inside signup modal
  const handleLoginButtonClick = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const closeSignupLoginModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  const handleLogout = () => {
    // remove user credentials from localStorage
    localStorage.removeItem("savvy-user-credentials");
    // remove user credentials from global state
    dispatch(removeUserCredentials());
  };

  return (
    <nav className="h-full">
      <div className="flex items-center justify-between">
        <Button></Button>
        {userCredentials?.token ? (
          <div>
            <p>{userCredentials.email}</p>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Button onClick={handleButtonClick}>Login/Signup</Button>
        )}
      </div>

      {isLoginModalOpen && (
        <Login handleSignupButtonClick={handleSignupButtonClick} />
      )}
      {isSignupModalOpen && (
        <Signup
          handleLoginButtonClick={handleLoginButtonClick}
          setIsOTPModalOpen={setIsOTPModalOpen}
          closeSignupLoginModal={closeSignupLoginModal}
        />
      )}
      {isOTPModalOpen && <OTP />}
    </nav>
  );
};

export default NavBar;
