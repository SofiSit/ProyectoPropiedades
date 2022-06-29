import axios from 'axios';
const baseURL= 'http://localhost:3001/api'

const Axios = axios.create({ baseURL });// configura los headers, le mandamos el token
Axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');//se guarda el token en el local, cuando se haga la peticion con el A
        token
            ? (config.headers.Authorization = token )
      : delete config.headers.Authorization;

return config;
  },
null,
    { synchronous: true }
);

export default Axios;