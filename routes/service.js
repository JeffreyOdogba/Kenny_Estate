const uuid = require("uuid/v4");

const { Pool } = require("pg");

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

const contactUs = (req,res) => {
    const{fullname,email,tel,suites,moreInformation} = req.body;

    const id  = uuid();

    pool.query(
        "INSERT INTO user_reserves (user_id,fullname,email,phone,suites_selected,more_information) VALUES($1,$2,$3,$4,$5,$6)",
        [id,fullname,email,tel,suites,moreInformation],
        (error,result) => {
            if (error) {
                throw error;
            }
            res.redirect("/");            
        }
    );
    };

module.exports = {
  getAllReserves,
  customEditForHomePage,
  contactUs
};
