const db = require("./config/db");
const { User, Favorite, Category, Property } = require("./models");
require("./models");

// Usuarios
const users = [
  {
    name: "lau",
    lastName: "sit",
    userName: "lauri@gmail.com",
    password: "123456",
  },
  {
    name: "sofi",
    lastName: "sit",
    userName: "sofi@gmail.com",
    password: "123456",
  },
  {
    name: "fer",
    lastName: "carra",
    userName: "fercho@gmail.com",
    password: "123456",
  },
  {
    name: "luna",
    lastName: "carra",
    userName: "luni@gmail.com",
    password: "123456",
  },
];

// Cate
const categories = [
  {
    name: "Casas de Playa",
    image:
      "https://www.deltalight.com/frontend/files/projects/images/source/002898_REA02.jpg",
  },
  {
    name: "Casas Ecologicas",
    image:
      "https://cdn.shopify.com/s/files/1/0566/6396/5893/files/1_7e85c3de-32ab-4d0f-a574-0ea7d5715b65.png?v=1633775087",
  },
  {
    name: "Casas en el Bosque",
    image:
      "https://www.arquitecturaydiseno.es/medio/2021/09/15/casa-moderna-en-los-bosques-de-canada-fachada-iluminada-8053e009-1500x1080_23e82903_1200x630.jpeg",
  },
];

// Prop
const properties = [
  {
    description: "Hermosa casa en medi...",
    name: "Casa del Bosque Luminoso ",
    image: "https://design-milk.com/images/2018/03/180110_Lokal_AFrame-18.jpg",
    price: 690000,
    location: "Bariloche",
    onSale: true,
    toRent: true,
    available: false,
  },
  {
    description: "Exotica y sostenible...",
    name: "Casa Ecologica Canadian ",
    image: "https://img.interempresas.net/fotos/P2941628.jpeg",
    price: 690000,
    location: "Canada",
    toRent: true,
    available: false,
  },
  {
    description: "Lujosa casa a la ori...",
    name: "Casa Soler",
    image:
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/10/19/1019535_v1.jpeg",
    price: 690000,
    location: "España",
    onSale: true,
    toRent: true,
  },
  {
    description: "Excelente oportunida...",
    name: "Casa Patris",
    image:
      "https://www.bbva.com/wp-content/uploads/2021/04/casas-ecolo%CC%81gicas_apertura-hogar-sostenibilidad-certificado--1024x629.jpg",
    price: 780000,
    location: "Argentina",
    onSale: true,
  },
  {
    description: "Belleza natural esta...",
    name: "Casa Niebla",
    image:
      "https://images.adsttc.com/media/images/5721/9e6c/e58e/ced9/f100/001e/large_jpg/Parque_Humano_-_Casa_en_el_bosque_09.jpg?1461821022",
    price: 1000000,
    location: "Argentina",
    onSale: true,
  },
  {
    description: "Amplia y calida caso...",
    name: "Casa Puebla",
    image: "https://reformasenmalaga.eu/wp-content/uploads/Screenshot_396.png",
    price: 250000,
    location: "Canada",
    toRent: true,
  },
  {
    description: "Lo mejor sobre la co...",
    name: "Casa Marina",
    image:
      "https://playasycosta.com/wp-content/uploads/2020/01/casas-prefabricadas.jpg",
    price: 900000,
    location: "España",
    onSale: true,
    toRent: true,
  },
  {
    description: "Majestuosa casa con ...",
    name: "Casa Tesoro",
    image: "https://img.100r.systems/img/912068a0be7b5292159360ff26c74160.jpg",
    price: 2000000,
    location: "España",
    onSale: true,
    toRent: true,
  },
];

let createdProps=[];
let createdCats=[];


db   // queda con promise
  .sync({ force: false })
  .then(() => {
    // Conexión establecida
    console.log("Conexión establecida...");
  })
  .then(() => {
    // Rellenar usuarios
    users.map((user) => User.create(user));
  })
  
  .then(async () => {

    let cat0= await Category.create(categories[0])
    let cat1= await Category.create(categories[1])
    let cat2= await Category.create(categories[2])

    let prop0 = await Property.create(properties[0]);
    let prop1 = await Property.create(properties[1]);
    let prop2 = await Property.create(properties[2]);
    let prop3 = await Property.create(properties[3]);
    let prop4 = await Property.create(properties[4]);
    let prop5 = await Property.create(properties[5]);
    let prop6 = await Property.create(properties[6]);
    let prop7 = await Property.create(properties[7]);

    prop0.addCategory(cat2)
    prop1.addCategory(cat1)
    prop2.addCategory(cat0)
    prop3.addCategory(cat1)
    prop4.addCategory(cat2)
    prop5.addCategory(cat2)
    prop6.addCategory(cat0)
    prop7.addCategory(cat0)

    /* createdProps[0].addCategory(createdCats[2]) //a la propiedad le adherimos una categoria
    createdProps[1].addCategory(createdCats[1]) //a la propiedad le adherimos una categoria
    createdProps[2].addCategory(createdCats[0]) //a la propiedad le adherimos una categoria
    createdProps[3].addCategory(createdCats[1]) //a la propiedad le adherimos una categoria
    createdProps[4].addCategory(createdCats[2]) //a la propiedad le adherimos una categoria
    createdProps[5].addCategory(createdCats[2]) //a la propiedad le adherimos una categoria
    createdProps[6].addCategory(createdCats[0]) //a la propiedad le adherimos una categoria
    createdProps[7].addCategory(createdCats[0]) //a la propiedad le adherimos una categoria */

  });


  //corremos el archivos con node en pack.json