import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../config/Axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormAdminProperty = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  //console.log("estaso", state);
  //const [categories, setCategories] = useState([]);

  /*  const getAllCategories = async () => {
    try {
      const categories = await Axios.get("/categories");
      setCategories(categories.data);
    } catch (error) {
      console.log("Error", error);
    }
  }; */

  const formik = useFormik({
    initialValues: {
      //valores iniciales que va  atener cada campo
      name: state?.name || "",
      description: state?.description || "",
      image: state?.image || "",
      price: state?.price || 0,
      location: state?.location || "",
      onSale: state?.onSale || false,
      toRent: state?.toRent || false,
      categories: state?.categories ? state?.categories[0].id : state[0].id,
    },

    validationSchema: Yup.object({
      // pongo el dato que uqiero validar, si no pasa cae en el error
      name: Yup.string()
        .required("Campo Requerido")
        .max(30, "30 caracteres máximo"),
      description: Yup.string()
        .required("Campo Requerido")
        .max(200, "200 caracteres máximo"),
      image: Yup.string()
        .required("Campo Requerido")
        .max(1000, "1000 caracteres máximo"),
      price: Yup.number()
        .required("Campo Requerido")
        .max(30, "30 caracteres máximo"),
      location: Yup.string()
        .required("Campo Requerido")
        .max(30, "30 caracteres máximo"),
    }),

    onSubmit: async (data) => {
      // caemos en el onsubmit una vez que se validan toda la info anterior
      try {
        const { categories } = data;
        delete data.categories;
        data.categories = [categories];
        console.log("data", data);
        let prop;
        /* if (state.id) {
          console.log("put");
          prop = await Axios.put(`/properties/${state.id}`, data);
        } else {
          console.log("post");
          prop = await Axios.post(`/properties`, data);
        } */
        // prop = await Axios.put(`/properties/${state.id}`, data);

        /* console.log("prop", prop);
        if (prop.data?.id) {
          console.log(`prop`, prop);
          navigate(`/administracion/propiedades`); //  esto no agrega a un array, esto t elleva a una ruta que elija.
        } else {
          console.log(" Error al crear propiedad");
        } */
      } catch (error) {
        console.log("Error", error);
      }
    },
  });
  /* useEffect(() => {
    getAllCategories();
  }, []); */

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
            Descripcion
          </label>
          <input
            value={formik.values.description}
            name="description"
            type="text"
            onChange={formik.handleChange}
            className="form-control"
            id="inputEmail4"
          />
          {formik.touched.description && <p>{formik.errors.description}</p>}
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Imagen
          </label>
          <input
            value={formik.values.image}
            name="image"
            type="text"
            onChange={formik.handleChange}
            className="form-control"
            id="inputEmail4"
          />
          {formik.touched.image && <p>{formik.errors.image}</p>}
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Precio
          </label>
          <input
            value={formik.values.price}
            name="Price"
            type="number"
            onChange={formik.handleChange}
            className="form-control"
            id="inputEmail4"
          />
          {formik.touched.price && <p>{formik.errors.price}</p>}
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Locacion
          </label>
          <input
            value={formik.values.location}
            name="location"
            type="text"
            onChange={formik.handleChange}
            className="form-control"
            id="inputEmail4"
          />
          {formik.touched.location && <p>{formik.errors.location}</p>}
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Venta
          </label>
          {formik.values.onSale === true ? (
            <div className="form-check">
              <input
                onChange={formik.handleChange}
                value={formik.values.onSale}
                name="onSale"
                className="form-check-input"
                type="checkbox"
                checked
                id="flexCheckDefault"
              />
            </div>
          ) : (
            <div className="form-check">
              <input
                onChange={formik.handleChange}
                value={formik.values.onSale}
                name="onSale"
                className="form-check-input"
                type="checkbox"
                id="flexCheckChecked"
              />
            </div>
          )}
          {formik.touched.onSale && <p>{formik.errors.onSale}</p>}
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Alquiler
          </label>
          {formik.values.toRent === true ? (
            <div className="form-check">
              <input
                onChange={formik.handleChange}
                value={formik.values.toRent}
                name="toRent"
                className="form-check-input"
                type="checkbox"
                checked
                id="flexCheckDefault"
              />
            </div>
          ) : (
            <div className="form-check">
              <input
                onChange={formik.handleChange}
                value={formik.values.toRent}
                name="toRent"
                className="form-check-input"
                type="checkbox"
                id="flexCheckChecked"
              />
            </div>
          )}
          {formik.touched.toRent && <p>{formik.errors.toRent}</p>}
        </div>
        <div className="col-12">
          <label className="visually-hidden" htmlFor="autoSizingSelect">
            Categorias
          </label>
          <select
            className="form-select"
            id="autoSizingSelect"
            onChange={formik.handleChange}
            name="categories"
            value={formik.values.categories}
          >
            {state.categories
              ? state.categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              : state.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {state?.id ? "Editar" : "Crear"}
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-3"
            onClick={() => navigate("/administracion/propiedades")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAdminProperty;
