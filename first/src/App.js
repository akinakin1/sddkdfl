import React from "react";
//import { useState } from "react";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Footer from "./layouts/Footer";
import "./App.css";
//import logo from "./Assets/logo.svg";
//import SiparisFormu from "./pages/SiparisFormu";

const App = () => {
  //const [pizzaDetails, setPizzaDetails] = useState({name:"Position Absolute Acılı Pizza", price:"85.50₺"});

  /* const addSth = (item) => {
    setPizzaDetails([...pizzaDetails, item]); 
  };*/
  return (
    <>
      <Header />
      <div className="heading">
        {/* <img src="./Assets/logo.svg" /> */}
        {/* <img src={logo} alt="Teknolojik Yemekler" /> */}
        <h1>
          <a href="/" className="homePagefromLogo">
            Teknolojik Yemekler
          </a>
        </h1>
      </div>

      <Main /* addSth={addSth} */ />
      <Footer />
    </>
  );
};
export default App;
