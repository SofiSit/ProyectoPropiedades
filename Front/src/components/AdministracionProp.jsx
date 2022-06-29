import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Axios from "../config/Axios";
import { Link } from "react-router-dom";

const AdministracionCat = () => {
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");

  const getAllCategories = async () => {
    try {
      const categories = await Axios.get("/categories");
      setCategories(categories.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getAllProperties = async () => {
    try {
      const properties = await Axios.get("/properties");
      setProperties(properties.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const deleteElement = async () => {
    try {
      console.log("iddelete", idToDelete);
      const deleted = await Axios.delete(`/properties/${idToDelete}`);
      console.log("deleted", deleted);
      if (deleted.status === 200) setIdToDelete("");
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllProperties();
  }, []);

  return (
    <div className="m-3">
      <div className="d-flex justify-content-end">
        <Link
          to={`/administracion/propiedades/formulario`}
          className="btn btn-success m-3"
          state={categories}
        >
          Crear Propiedad
        </Link>
      </div>
      <TableContainer component={Paper}>
        {console.log("properties", properties)}
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align="right">Locacion</TableCell>
              <TableCell align="right">Venta</TableCell>
              <TableCell align="right">Alquiler</TableCell>
              <TableCell align="right">Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((prop) => (
              <TableRow
                key={prop.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {prop.name}
                </TableCell>
                <TableCell align="left">{prop.image}</TableCell>
                <TableCell align="right">{prop.description}</TableCell>
                <TableCell align="right">{prop.price}</TableCell>
                <TableCell align="right">{prop.location}</TableCell>
                <TableCell align="right">
                  {prop.onSale === true ? (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked
                        disabled
                        id="flexCheckDefault"
                      />
                    </div>
                  ) : (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        disabled
                        id="flexCheckChecked"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell align="center">
                  {prop.toRent === true ? (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked
                        disabled
                        id="flexCheckDefault"
                      />
                    </div>
                  ) : (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        disabled
                        id="flexCheckChecked"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell align="right">
                  <div className="d-flex justify-content-center">
                    <div>
                      {/* Button trigger modal */}
                      <button
                        type="button"
                        className="mx-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        value={prop.id}
                        onClick={(e) => setIdToDelete(prop.id)}
                      >
                        <DeleteIcon />
                      </button>
                      {/* Modal */}
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Estas seguro que desea eliminar esta
                                Información?
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="modal-body">...</div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Cancelar
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={deleteElement}
                              >
                                Borrar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/administracion/propiedades/formulario`}
                      state={{ ...prop, categories }}
                    >
                      <BorderColorIcon />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to={`/administracion/categorias`} className="btn btn-success m-3">
        Ir a Categoria
      </Link>
    </div>
  );
};

export default AdministracionCat;
