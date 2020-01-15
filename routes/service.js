const uuid = require("uuid/v4");
const { Pool } = require("pg");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: './public/images',
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage }).single("suiteimage");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "estate",
  password: "password",
  port: 5432
});

pool.on("connect", () => {
  console.log("connected to the database");
});

const getAllReserves = (req, res) => {
  pool.query("select * from user_reserves", (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      return res.render("backhouse", {
        title: "apartment",
        error: false,
        data: results.rows
      });
    } else {
      return res.render("backhouse", {
        title: "apartment",
        error: true,
        data: results.rows
      });
    }
  });
};

const customEditForHomePage = (req, res) => {
  const { estateName, estateDescription } = req.body;
  const id = uuid();
  pool.query(
    "INSERT INTO estate (estate_id,estate_name,estate_description) VALUES($1,$2,$3)",
    [id, estateName, estateDescription],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send({ message: "Post Saved" });
    }
  );
};

// Add Suites and Photo

const AddNewSuites = (req, res) => {
  const {
    suitename,
    address,
    suiteprice,
    numberofrooms,
    suitedescription
  } = req.body;

  var id = uuid();

  pool.query(
    "INSERT INTO suites (suite_id,suite_name,suite_description,num_of_rooms,suite_address,suite_price) VALUES($1,$2,$3,$4,$5,$6)",
    [id, suitename, suitedescription, numberofrooms, address, suiteprice],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.render("backhouse", { title: "Kenny Exotic Rentals", success: "" });
    }
  );
};

// Insert photo 
const insertPhoto = (req, res) => {
  const { suiteimage } = req.body;
  const suite_photo_id = uuid();
  const suite_id = AddSuite();

  

  upload(req, res, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.file);
    }
  });

  pool.query(
    "INSERT INTO suite_photos (suite_photo_id,suite_photo,suite_id) VALUES($1,$2,$3)",
    [suite_photo_id, suiteimage, suite_id],
    (error, result) => {
      if (error) {
        throw error;
      }
    }
  );
};

// Add Suites and Photo

const contactUs = (req, res) => {
  const { fullname, email, tel, suites, moreInformation } = req.body;

  const id = uuid();

  pool.query(
    "INSERT INTO user_reserves (user_id,fullname,email,phone,suites_selected,more_information) VALUES($1,$2,$3,$4,$5,$6)",
    [id, fullname, email, tel, suites, moreInformation],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.render("index", {
          title: "Kenny Exotic Rentals",
          success: "Your request was successfully posted "
        });
      }
    }
  );
};

module.exports = {
  getAllReserves,
  customEditForHomePage,
  AddNewSuites,
  contactUs
};
