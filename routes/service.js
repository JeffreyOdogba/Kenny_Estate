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

var obj = {};

// Get All User_Reservers And Suites 

const getReservesAndSuites = async (req, res) => {
  const reserves = await (await pool.query("select * from user_reserves")).rows;
  const suites = await (await pool.query("select * from suites")).rows;

  
    res.render("backhouse", {
      title: "admin",
      suites: suites,
      reserves:reserves
    });

    // CHECKING MY DATABASE

    // suites.forEach(function(da){
    //     console.log(da.suite_name);
    // });
//console.log(suites[1]["suite_name"]);
 

};

// Add Custom Edit for Home

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

const PostSuite = (req, res) => {
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
const PostPhoto = (req, res) => {
  var suiteimage;
  const suite_photo_id = uuid(); 
  const {suiteselected} = req.body;
  console.log( suiteselected + " --ID")


  upload(req, res, err => {
     suiteimage = req.file.path;
    if (err) {
      console.log(err);
    } else {
      console.log(suiteimage);
    }
  });

  // pool.query(
  //   "INSERT INTO suite_photos (suite_photo_id,suite_photo,suite_id) VALUES($1,$2, $3)",
  //   [suite_photo_id, suiteimage,suite_id],
  //   (error, result) => {
  //     if (error) {
  //       throw error;
  //     }
  //   }
  // );
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
  getReservesAndSuites,
  customEditForHomePage,
  PostSuite,
  PostPhoto,
  contactUs
};
