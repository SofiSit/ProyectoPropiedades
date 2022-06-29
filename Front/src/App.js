import React from "react";
import { Route, Routes } from "react-router-dom";
import Contacto from "./commons/Contacto";
import {
  Register,
  Login,
  Home,
  Footer,
  Navbar,
  Listado,
  SingleV,
  AdministracionCat,
  FormAdminCategory,
  FormAdminProperty,
  AdministracionProp,
} from "./components";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alquiler" element={<Listado alquiler={true} />} />
        <Route path="/venta" element={<Listado venta={true} />} />
        <Route path="/categorias/:id" element={<Listado categorias={true} />} />
        <Route path="/single" element={<SingleV />} />
        <Route path="/favoritos" element={<Listado favoritos={true} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route
          path="/administracion/propiedades"
          element={<AdministracionProp />}
        />
        <Route
          path="/administracion/propiedades/formulario"
          element={<FormAdminProperty />}
        />
        {/* <Route
          path="/administracion/categorias"
          element={<AdministracionCat />}
        />
        <Route
          path="/administracion/categorias/formulario"
          element={<FormAdminCategory />}
        /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
