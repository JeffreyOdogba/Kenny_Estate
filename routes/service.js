const uuid = require("uuid/v4");
const { Pool } = require("pg");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
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


// Get All User_Reservers And Suites 

const getReservesAndSuites = async (req, res) => {
  const reserves = (await pool.query("select * from user_reserves")).rows;
  const suites = (await pool.query("select * from suites")).rows;


  res.render("backhouse", {
    title: "admin",
    suites: suites,
    reserves: reserves
  });

  // CHECKING MY DATABASE

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
        console.log(error);
        req.flash('msg', 'Suite already exist!');
        return res.redirect("/admin");
      }
      return res.redirect("/admin");
    }
  );
};

// insert features
const postFeatures = async (req, res) => {
  const id = uuid();

  const { icon, featureName, suiteselectedId, featuredetails } = req.body;

  pool.query('INSERT INTO suites_features (feature_id,feature_name,feature_details,features_logo,suite_id) VALUES($1,$2,$3,$4,$5)', [id, featureName, featuredetails, icon, suiteselectedId],
    (error, results) => {
      if (error) {
        throw error;
      }
      return res.redirect("/admin");
    }
  );

};




// Insert photo and Suit Id
const PostPhoto = (req, res) => {
  const suite_photo_id = uuid();

  upload(req, res, function (err) {
    const { suiteselected } = req.body;
    console.log(req.file);
    var imagePath = req.file.path;
    console.log(suiteselected + " --ID")
    console.log(imagePath);


    pool.query(
      "INSERT INTO suite_photos (suite_photo_id,suite_photo,suite_id) VALUES($1,$2,$3)",
      [suite_photo_id, imagePath, suiteselected],
      (error, result) => {
        if (error) {
          throw error;
        } else {
          console.log(result);
          res.redirect("/admin");
        }
      }
    );
  });



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


//////////////////
//  Manage      //
//    Update    //
//      Delete  //
//              //
//              //  
//////////////////


const getSuitePhoto = async (req, res) => {

  const suiteInfo = await getSuitePhotoCaller();

  console.log(suiteInfo);
  res.render("manage", { title: "manage", suiteInfo: suiteInfo });
};

// Function Caller to get all Suites and 
const getSuitePhotoCaller = async () => {
  const suiteInfo = (await pool.query(
    "WITH CTE AS (select DISTINCT *, ROW_NUMBER () OVER (PARTITION BY suites.suite_id ORDER BY suite_photos.suite_id) as num from suite_photos inner join suites on suite_photos.suite_id = suites.suite_id )SELECT * FROM CTE WHERE num = 1;"
    )).rows;

  //console.log(suiteInfo);
  return suiteInfo;
}

const getFeatures = async (req,res) =>{
  const {suiteid} = req.params;
  console.log(suiteid);

  try {
    const result = (await pool.query("select * from suites_features inner join suites on suites.suite_id = suites_features.suite_id where suites_features.suite_id = $1;",[suiteid]));

    const images = (await pool.query("select suite_photos.suite_photo, suite_photos.suite_photo_id from suite_photos inner join suites on suite_photos.suite_id = suites.suite_id where suites.suite_id = $1;",[suiteid])).rows

    const suiteName = result.rows[0].suite_name;
    if (suiteName === null || suiteName === undefined) {
      res.redirect('/apartment');
    }
    res.render("features", {title:"Suite Features", data:result.rows, suiteName: suiteName, images:images});
  } catch (error) {
    res.redirect('/apartment');
  } 

}


const deletePost = async (req, res) => {
  // const id = req.params.suiteid;
  // console.log("Get ID " + id);

  await pool.query("DELETE FROM suite_photos where suite_photo_id =$1", [req.params.suiteid], (error, result) => {
    if (error) {
      throw error;
    }
    console.log("rResult of DElete " + result)
    res.redirect("/admin/manage");
  });
};





module.exports = {
  getReservesAndSuites,
  customEditForHomePage,
  PostSuite,
  PostPhoto,
  postFeatures,
  getSuitePhoto,
  getFeatures,
  deletePost,
  contactUs,
  getSuitePhotoCaller
};
