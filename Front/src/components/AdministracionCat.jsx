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
  //const [properties, setProperties] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");

  const getAllCategories = async () => {
    try {
      const categories = await Axios.get("/categories");
      setCategories(categories.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleDelete = (id) => setIdToDelete(id);
  /*  const getAllProperties = async () => {
    try {
      const properties = await Axios.get("/properties");
      setProperties(properties.data);
    } catch (error) {
      console.log("Error", error);
    }
  }; */

  const deleteElement = async () => {
    try {
      console.log("iddelete", idToDelete);
      const deleted = await Axios.delete(`/categories/${idToDelete}`);
      if (deleted) setIdToDelete("");
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getAllCategories();
    //getAllProperties();
  }, []);

  return (
    <div className="m-3">
      <div className="d-flex justify-content-end">
        <Link
          to={`/administracion/categorias/formulario`}
          className="btn btn-success m-3"
        >
          Crear Categoria
        </Link>
      </div>
      <TableContainer component={Paper}>
        {console.log("categories", categories)}
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Imagen</TableCell>
              <TableCell align="right">Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat) => (
              <TableRow
                key={cat.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {cat.name}
                </TableCell>
                <TableCell align="right">{cat.image}</TableCell>
                <TableCell align="right">
                  <div className="d-flex justify-content-center">
                    <div>
                      {/* Button trigger modal */}
                      {console.log("catid", cat.id)}
                      <button
                        type="button"
                        className="mx-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        name={cat.id}
                        value={cat.id}
                        id={cat.id}
                      >
                        <DeleteIcon
                          value={cat.id}
                          onClick={() => handleDelete(cat.id)}
                        />
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
                      to={`/administracion/categorias/formulario`}
                      state={cat}
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
      <Link to={`/administracion/propiedades`} className="btn btn-success m-3">
        Ir a Propiedades
      </Link>
    </div>
  );
};

export default AdministracionCat;
