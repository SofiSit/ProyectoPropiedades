import * as React from "react";
import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Axios from "../config/Axios";
import Listado from "./Listado";
import "../App.css";

const Form = () => {
  const [filter, setFilter] = useState("categoria");
  const [categories, setCategories] = useState([]);
  const [subFilter, setSubFilter] = useState("");
  const [filterList, setFilterList] = useState([]);

  const getAllCategories = async () => {
    try {
      const catList = await Axios.get("/categories");
      setCategories(catList.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      let query = "";
      if (filter === "categoria") {
        query = `categoryId=${subFilter}`;
      }
      if (filter === "locacion") {
        query = `location=${subFilter}`;
      }
      if (filter === "precio") {
        query = `priceOrder=${subFilter}`;
      }
      const props = await Axios.get(`/properties?${query}`);
      setFilterList(props.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      {console.log("filter", filter)}
      {console.log("SUBfilter", subFilter)}
      <form onSubmit={onSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "lightgrey",
            paddingBlock: "15px",
            paddingTop: "30px",
          }}
        >
          <FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "12px",
                backgroundColor: "lightgrey",
                fontFamily: "monospace",
              }}
            >
              <h3>Busca tu casa por:</h3>
            </Box>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                checked={filter === "categoria"}
                value="categoria"
                control={<Radio color="default" />}
                label="Categoria"
                onChange={(e) => setFilter(e.target.value)}
              />
              <FormControlLabel
                checked={filter === "locacion"}
                value="locacion"
                control={<Radio color="default" />}
                label="Locacion"
                onChange={(e) => setFilter(e.target.value)}
              />
              <FormControlLabel
                checked={filter === "precio"}
                value="precio"
                control={<Radio color="default" />}
                label="Precio"
                onChange={(e) => setFilter(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "lightgrey",
            paddingBlock: "15px",
          }}
        >
          {filter === "locacion" && (
            <div class="form-floating">
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                onChange={(e) => setSubFilter(e.target.value)}
              >
                <option value="">Seleccione Locacion</option>
                <option value="España">España</option>
                <option value="Canada">Canada</option>
                <option value="Argentina">Argentina</option>
              </select>
            </div>
          )}
          {filter === "categoria" && (
            <div class="form-floating">
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                onChange={(e) => setSubFilter(e.target.value)}
              >
                <option value="">Seleccione Categoria</option>
                {categories.map((cat) => (
                  <option value={cat.id} key={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {filter === "precio" && (
            <div class="form-floating">
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                onChange={(e) => setSubFilter(e.target.value)}
              >
                <option value="">Seleccione precio</option>
                <option value="descendente">Mayor-Menor</option>
                <option value="ascendente">Menor-Mayor</option>
              </select>
            </div>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "12px",
            backgroundColor: "lightgrey",
          }}
        >
          <button
            type="submit"
            disabled={subFilter === ""}
            class="btn btn-dark"
          >
            Ver Lista
          </button>
        </Box>
      </form>
      <Listado filterList={filterList} />
      <Box>
        <section className="back-img">
          <div class="container">
            <h3>Alquila y vende con nosotros</h3>

            <Box>
              <br />
              <Link
                to="/contacto"
                style={{
                  color: "lightgray",
                  textDecoration: "none",
                  fontFamily: "unset",
                }}
              >
                <button type="button" class="btn btn-dark">
                  Contactanos
                </button>
              </Link>
            </Box>
          </div>
        </section>
      </Box>
    </div>
  );
};
export default Form;
