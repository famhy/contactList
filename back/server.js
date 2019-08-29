const express = require("express");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var assert = require("assert");
// var cros =require("cors");
const app = express();
app.use(bodyParser.json());


// app.use(()=>{
//   bodyParser.json()
//   cros()
// })
// const path = require("path");


const mongo_url = "mongodb://localhost:27017";
const dataBase = "contactDB";

const port = process.env.PORT || 4000;

// var urlencodedparser = bodyParser.urlencoded({ extended: false });
// app.use('view engine',hbs)
mongodb.MongoClient.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  assert.equal(err, null, "data base connect faild");
  const db = client.db(dataBase);
  console.log("-----------------", db.databaseName, "-----------------------");

  app.post("/add", (req, res) => {
   console.log("hello from the other side")
    let newContact = req.body;
    db.collection("contactList").insertOne(newContact, (err, data) => {
      if (err) res.send("cant add contact");
      else {
        console.log(req.body)
        res.send(newContact);
      }
    });
  });
  app.get("/contactlist", (req, res) => {
    // res.sendFile('./index.html')
    db.collection("contactList")
      .find()
      .toArray((err, data) => {
        if (err) res.send("find contact");
        else {
          res.send(data);
        }
      });
  });

  app.put('/modify-contact/:id',(req,res)=>{
    let id=mongodb.ObjectID(req.params.id)
    db.collection("contactList")
    .findOneAndUpdate(
      {_id:id},{$set :{...req.body}},
      (err,data)=>{
          if(err) res.send("can't modify conatact")
          else
          console.log(data)
      }
    )
  })
  
});



// app.use(bodyParser.json())

// app.get("/index.html", (req, res) => {
//   // res.sendFile('./index.html')
//   res.sendFile(path.join(__dirname, "/", "index.html"));
// });

// console.log that your server is up and running

// create a GET route
app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.listen(port, err => {
  if (err) console.log("Connection to port failed");
  console.log(`Listening on port ${port}`);
});
