import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../config/Axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormAdminCategory = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log("estado", state);
  const formik = useFormik({
    initialValues: {
      //valores iniciales que va  atener cada campo
      name: state?.name || "",
      image: state?.image || "",
    },

    validationSchema: Yup.object({
      // pongo el dato que uqiero validar, si no pasa cae en el error
      name: Yup.string()
        .required("Campo Requerido")
        .max(30, "30 caracteres máximo"),
      image: Yup.string()
        .required("Campo Requerido")
        .max(1000, "1000 caracteres máximo"),
    }),

    onSubmit: async (data) => {
      // caemos en el onsubmit una vez que se validan toda la info anterior
      try {
        let cat;
        if (state) {
          cat = await Axios.put(`/categories/${state.id}`, data);
        } else {
          cat = await Axios.post(`/categories`, data);
        }
        if (cat.data?.id) {
          console.log(`cat`, cat);
          navigate(`/administracion/categorias`); //  esto no agrega a un array, esto t elleva a una ruta que elija.
        } else {
          console.log(" Error al crear categoria");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="m-5">
      <h2>Formulario</h2>
      <form onSubmit={formik.handleSubmit} className="row g-3">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Nombre
          </label>
          <input
            value={formik.values.name}
            name="name"
            type="text"
            onChange={formik.handleChange}
            className="form-control"
            id="inputEmail4"
          />
          {formik.touched.name && <p>{formik.errors.name}</p>}
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Imagen
          </label>
          <input
            value={formik.values.image}
            type="text"
            name="image"
            onChange={formik.handleChange}
            className="form-control"
            id="inputEmail4"
          />
          {formik.touched.image && <p>{formik.errors.image}</p>}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Editar-Crear
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-3"
            onClick={() => navigate("/administracion/categorias")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAdminCategory;
