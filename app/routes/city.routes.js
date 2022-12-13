
module.exports=app=>{
const Cities = require("../controller/city.controller.js");

    const router = require("express").Router();// goi router tu express
    /**
 * @swagger
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       required:
 *         - ID
 *         - Name
 *         - CountryCode
 *         - District
 *         - Population
 *       properties:
 *         Id:
 *           type: int
 *           description: The auto-generated id of the product
 *         Name:
 *           type: string
 *           description: The city name
 *         CountryCode:
 *           type: string
 *           description: The code of country
 *         District:
 *           type: string
 *           description: The name of district 
 *         Population:
 *           type: int
 *           description: The number of people 
 *       example:
 *         id: 111
 *         name: The New Turing Omnibus
 *         countryCode: AKG
 *         district: NewYork
 *         
 */

 /**
  * @swagger
  * tags:
  *   name: Cities
  *   description: The Cities managing API
  */
   /**
 * @swagger
 * /api/tutorials:
 *   post:
 *     summary: Create a new city
 *     tags: [City]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */

    // Create a new Tutorial
    router.post("/", Cities.create);

   
    // Retrieve all Cities or Cities by CountryCode  ?countrycode=NLD
    router.get("/", Cities.findAll);
   /**
 * @swagger
 * /api/tutorials/pagination/{offset}:
 *   get:
 *     summary: Get the city by page
 *     tags: [City]
 *     parameters:
 *       - in: path
 *         name: offset
 *         schema:
 *           type: string
 *         required: true
 *         description: The number of page
 *     responses:
 *       200:
 *         description: The city by number of page
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       404:
 *         description: The city was not found
 */

    //router.get("/published",Cities.findAll);
    // Retrieve list of city for pagination 10 city in 1 page
    router.get("/pagination/:offset", Cities.findAllForPagination);
   /**
 * @swagger
 * /api/tutorials/{id}:
 *   get:
 *     summary: Get the city by page
 *     tags: [City]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The number of page
 *     responses:
 *       200:
 *         description: The city by number of page
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       404:
 *         description: The city was not found
 */
    // Retrieve a single City with id
    router.get("/:id", Cities.findOne);

    // Update a City with id
    router.put("/:id", Cities.update);

    // Delete a City with id
    router.delete("/:id", Cities.delete);

    // Delete all Tutorials
   //  router.delete("/", tutorials.deleteAll);


    app.use('/api/tutorials', router);
   };

