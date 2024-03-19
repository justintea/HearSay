import "../../App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavbarOut from "../../components/0Navbar/NavbarOut/NavbarOut";
import LandingPageOut from "../0LandingPage/LandingPageOut";
import PaintforhirePage from "../1ServicesPage/1PaintforhirePage";
import AuthPage from "../2AuthPage/AuthPage";
import SignupPage from "../2SignupPage/SignupPage";
import UserPage from "../3UserPage/0UserPage";
import UserInfoPage from "../3UserPage/2UserInfoPage/1UserInfoPage";
import LandingPageIn from "../0LandingPage/LandingPageIn";
import CartconfirmationPage from "../3UserPage/1CartconfirmationPage/CartconfirmationPage";
import UserOrderPage from "../3UserPage/2UserInfoPage/2UserOrderPage";
import UserAddressPage from "../3UserPage/2UserInfoPage/3UserAddressPage";
import UserAddAddressPage from "../3UserPage/2UserInfoPage/4UserAddAddressPage";
import UserEditAddressPage from "../3UserPage/2UserInfoPage/4UserEditAddressPage";

function App() {
  const [user, setUser] = useState(null);
  
  return (
    <>
      {user ? (

        <>
        <Routes>
            <Route path="user" element={<UserPage user={user} setUser={setUser} />}>
              <Route path="" element={<LandingPageIn user={user} />} />
              <Route path="info" element={<UserInfoPage user={user} />} />
              <Route path="paintservices" element={<PaintforhirePage user={user} />} />
              <Route path="cart" element={<CartconfirmationPage user={user} />} />
              <Route path="orders" element={<UserOrderPage user={user} />} />
              <Route path="address" element={<UserAddressPage user={user} />} />
              <Route path="addaddress" element={<UserAddAddressPage user={user} />} />
              <Route path="editaddress" element={<UserEditAddressPage user={user} />} />
            </Route>
          
        </Routes>
      </>
      ) : (
        <>
          <NavbarOut />
          <Routes>
            <Route path="/" element={<LandingPageOut user={user} />} />
            <Route path="login"     element={<AuthPage user={user} setUser={setUser} />}      />
            <Route path="signup" element={<SignupPage setUser={setUser} />}     />
            {/* <Route path="paintservices"   element={<PaintforhirePage user={user} />}      /> */}

            </Routes>
        </>
      )}
    </>
  );
}

export default App;