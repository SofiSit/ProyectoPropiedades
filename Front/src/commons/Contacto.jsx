import React from "react";
import Box from "@mui/material/Box";

const Contacto = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "lightgrey",
          paddingBlock: "50px",
          paddingTop: "30px",
        }}
      >
        <div class="popup_window" display="flex" justifyContent="center">
          <div class="stepform step1">
            <h4>
              Si estás interesado en vender o alquilar con nosotros, o quieres
              consultar cualquier duda o cuestión, ponte en contacto con
              nosotros a través del formulario.
            </h4>
            <br />
            <div class="itForm">
              <label for="nombreApellidos">Nombre y apellidos*</label>
              <input
                class="form-control"
                type="text"
                placeholder="Escriba aquí su nombre y apellido"
                aria-label="default input example"
              />
            </div>
            <br />
            <div class="itForm">
              <label for="email">Correo electrónico*</label>
              <input
                class="form-control"
                type="text"
                placeholder="Escriba aquí su email"
                aria-label="default input example"
              />
            </div>
            <br />
            <div class="itForm">
              <label for="email">Teléfono</label>
              <input
                class="form-control"
                type="text"
                placeholder="Escriba aquí su telefono"
                aria-label="default input example"
              />
            </div>
            <br />
            <div class="itForm">
              <label for="mensaje">Mensaje*</label>
              <textarea
                class="form-control"
                placeholder="Gracias por contactarte"
                id="floatingTextarea"
              ></textarea>
            </div>{" "}
            <br />
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                backgroundColor: "lightgrey",
              }}
            >
              <br />
              <button type="button" class="btn btn-dark">
                Enviar
              </button>
            </Box>
          </div>
          <br />
          <div class="stepform step2 hide">
            <h4>
              Hemos recibido tu solicitud perfectamente. En breve nos pondremos
              en contacto contigo para resolver todas tus inquietudes.
            </h4>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Contacto;
