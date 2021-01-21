import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import AddressScreen from "./screens/AddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import DateScreen from "./screens/DateScreen";
import PayScreen from "./screens/PayScreen";
import SuccessScreen from "./screens/SuccessScreen";
import CancelScreen from "./screens/CancelScreen";

import { Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Route exact path="/appointment/:id" component={PayScreen} />
        <Route path="/appointment/:id/pay" component={SuccessScreen} />
        <Route path="/appointment/:id/cancel" component={CancelScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/address" component={AddressScreen} />
        <Route path="/date" component={DateScreen} />
        <Route path="/registration" component={RegistrationScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/Register" component={RegisterScreen} />
        <Route exact path="/" component={HomeScreen} />
      </main>
      <Footer />
    </>
  );
};

export default App;
