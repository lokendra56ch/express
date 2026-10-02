import http from "http";
import express from "express";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import mongoose from "mongoose";

const PORT = 8080;

//* creating express app instance
const app = express();

//* creating http server
// const server = http.createServer(handler);
const server = http.createServer(app);

//* connect database
mongoose
  .connect("mongodb://localhost:27017/", {
    dbName: "team_18",
    autoCreate: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("---- Database connection error ------");
    console.log(error);
  });

//? express app -> request handler
// post / -> handler

//* parse req json body to js obj
app.use(express.json()); // raw-data -> parse [js obj] => req.body ={}

//! middlewares
// const middleware = (req, res, next) => {
//   console.log("middleware 1", req.path);

//   req.user = {
//     name: "abc",
//   };
//   next();
// };

// app.use(middleware);
// app.use((req, res, next) => {
//   console.log("middleware 2");
//   console.log(req.user); //
//   // console.log(req.query); //
//   if (!req.user) {
//     res.status(500).json({
//       message: "unauthorized. Access denied",
//       status: "fail",
//       success: false,
//       data: null,
//     });
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   console.log("middleware 3", req.path);
//   next();
// });

//* express routing
// get / -> handler
//app.method(route,handler)
app.get("/", (req, res) => {
  res.json({
    message: "server is up & running",
    success: true,
    status: "success",
    data: null,
  });
});

//* using routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

//* path not found
app.use((req, res, next) => {
  next({
    message: `can not ${req.method}  on ${req.path}`,
    status: "fail",
    statusCode: 404,
  });
});

//* listening on port
server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
  console.log("press ctrl+c to close server");
});

//! error handler
app.use((error, req, res, next) => {
  console.log(error);

  const message = error?.message ?? "Internal server error";
  const statusCode = error?.statusCode ?? 500;
  const status = error?.status ?? "error";
  const success = error?.success ?? false;

  res.status(statusCode).json({
    message,
    status,
    success,
    data: null,
  });
});

//! req object
//* req.path -> current req path : /users , /products
//* req.method -> current req method : GET , POST ....

//* req.params => route parameters => object
// /users/:id
// req /users/1 => req.params => {id:'1'}
// req /users/100 => req.params => {id:'100'}
// req /users/xyz => req.params => {id:'xyz'}

// /users/:x  => req.params => {x:'100'}

//? /posts/:userId/:postId
// /posts/1/2  => {userId:'1',postId:'2'}

//* req.query => query parameter => object
//- filter , pagination , sorting

//! req.body => object

// const userJson = JSON.stringify({
//   data: user,
//   message: "user created",
//   status: "success",
//   success: true,
// });
// console.log(typeof userJson);
// console.log(JSON.parse(userJson));

// console.log(user);
// res.send(userJson);

// url
//- protocol://host/path?query
//- http://example.com/users?name=john&page=1&limit=10&sort=desc
// {name:'john',page:"1",limit:'10', sort:'desc'}

// SMS
// students crud
// departments crud
// teachers  crud
// class & sections crud

//* REST API
//? REST -> Representational State Transfer
//? API ->

//* 1. client - server arch.

//* 2. stateless

//* 3. uniform interface
// get  /users  -> get all users
// post /users

// get /getAllUsers [bad]
// post /createUsers

//* 4. use meaningful http methods
//* 5. send meaningful status code
//? 100-199  -> informational
//? 200-299  -> success
//? 300-399  -> redirect
//? 400-499  -> client error
//? 500-599  -> server side error

//* 200 -> ok
//* 201 -> created
//
//* 400 -> bad request
//* 401 -> unauthorized
//* 403 -> forbidden
//* 404 -> not found
//
//* 500 -> internal server error
//* 502 -> bad gateway

//* 6. layered arch
// load balancer , reverse proxy , api gateway

//* 7. code on demand ->

//* 8. everything is resource
// [users , products , categories]

//* endpoint / path / route
// /users , /products

//* uri
// /users
//* url
// http://localhost:8080/users

//! RESTful API

//? RE -> resource are represented using standard data format [usually json]
//? S -> current state of the resource [users , products , categories]
//? T -> represented resource transferred between client & server

//? REST API: is a architectural principles that used to design web apis
//? that allows different services to communicate over http

// sql     -> NoSql
// database  -> database
// table     -> collection
// row     -> document
// column  -> fields

//* middlewares

// client -> req -> server  -> controller
// req , res obj & next function

//? req  -> controller [api + auth]
//? auth-mid => auth
//? req -> auth -> controller [ api ]

// req -> mid1 -> mid2 -> mid3 -> ....midn  -> controller

//?
//? 1. executes any code/logic
//? 2. can modify req & res obj
//? 3. call next middleware
//? 4. can end req-res cycle

//* types of middleware
//? 1. application level
//? 2. route level
//? 3. error handler
// (error , req , res ,next) =>{}
