import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/Screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyContacts from "./components/Screens/MyContacts/MyContact";
import LoginScreen from "./components/Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./components/Screens/RegisterScreen/RegisterScreen";
import CreateContact from "./components/Screens/CreateContact/CreateContact";
import SingleContacts from "./components/Screens/SingleContacts/SingleContacts";

function App() {

  const [ search, setSearch ] = useState<any>('');
  return (
    <>
      <BrowserRouter>
        <Header setSearch={setSearch} />
        <main style={{ minHeight: "88vh" }}>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/createcontact' element={<CreateContact />} />
            <Route path='/mypatients/:id' element={<SingleContacts/>} />
            <Route path='/mypatients' element={<MyContacts search={search}/>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
