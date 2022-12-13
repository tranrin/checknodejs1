//typeorm
const sql = require("./db.js");
//entity

// constructor function
const City = function(city) {
  this.id = city.id;//tao constructor khong can tao thuoc tinh
  this.name = city.name;
  this.countryCode = city.countryCode;
  this.district = city.district;
  this.population = city.population;
};

City.create = (newCity, result) => {//create method
  sql.query("INSERT INTO city SET ?", newCity, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

  //  console.log("created tutorial: ", { id: res.insertId, ...newCity });
    result(null, { id: res.insertId, ...newCity });
  });
};

City.findById = (id, result) => {
  sql.query(`SELECT * FROM city WHERE ID = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

City.getAll = (name, result) => {
  let query = "SELECT * FROM world.city;";

  if (name) {
    query += ` WHERE CountryCode LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};
//pagination
City.getAllForPagination = (name, result, offset) => {
  let query = `SELECT * FROM world.city LIMIT 10 OFFSET ${offset-1};`;

  if (name) {
    query += ` WHERE CountryCode LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

City.getAllPublished = result => {
  sql.query("SELECT * FROM world.city;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);//hoi anh xem cai nay co can thiet hay khong
    result(null, res);
  });
};

City.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE city SET Name = ?, District = ?, Population = ? WHERE ID = ?",
    [tutorial.name,tutorial.district, tutorial.population, tutorial.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { ID: id, ...City });//spread operator
      result(null, { ID: id, ...tutorial });
    }
  );
};

City.remove = (id, result) => {
  sql.query("DELETE FROM city WHERE ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

// Product.removeAll = result => {
//   sql.query("DELETE FROM city", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} tutorials`);
//     result(null, res);
//   });
// };

module.exports = City;