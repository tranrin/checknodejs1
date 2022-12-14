const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const router=require("./app/routes/city.routes.js");
// const app = express();
var corsOptions = {
  origin: "http://127.0.0.1:1337"
};
const options= {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API"
      },
      servers: [
        {
            url: "http://localhost:1337"
        }
      ],
      
    },
    apis:['./app/routes/city.routes.js'],
}

//swagger
const specs = swaggerJsDoc(options)
const app = express()
app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(specs));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */
//route application service

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to demo application." });
});
app.use('/api/tutorials',router);
//require("./app/routes/city.routes.js")(app);

// set port, listen for requests
const port = process.env.PORT || 1337
const hostname = '127.0.0.1';
app.listen(port, () => {
    console.log(`server is running on http://${hostname}:${port}/`)
});