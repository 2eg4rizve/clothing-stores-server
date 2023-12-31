const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mjrato5.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mjrato5.mongodb.net/?retryWrites=true&w=majority`;

//storeDB
//hzE7qAl38IuFxjFE

// const uri =
//   "mongodb+srv://storeDB:hzE7qAl38IuFxjFE@cluster0.mjrato5.mongodb.net/?retryWrites=true&w=majority";

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mjrato5.mongodb.net/?retryWrites=true&w=majority`;

console.log("process.env.DB_USER : ",process.env.DB_USER);
console.log("process.env.DB_PASS : ",process.env.DB_PASS);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();

    const shopsCollection = client.db("clothingStoresDB").collection("shops");
    const productsCollection = client
      .db("clothingStoresDB")
      .collection("products");

    //post shop
    app.post("/shops", async (req, res) => {
      try {
        const newShop = req.body;
        console.log(newShop);

        const result = await shopsCollection.insertOne(newShop);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    // get all shop
    app.get("/shops", async (req, res) => {
      try {
        const cursor = shopsCollection.find();
        const result = await cursor.toArray();

        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    //post product
    app.post("/products", async (req, res) => {
      try {
        const newProduct = req.body;
        console.log(newProduct);

        const result = await productsCollection.insertOne(newProduct);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    // get all product
    app.get("/products", async (req, res) => {
      try {
        const cursor = productsCollection.find();
        const result = await cursor.toArray();

        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    //delete product
    app.delete("/products/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        console.log(id);

        const result = await productsCollection.deleteOne(query);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });


      //update one product
      app.put("/products/:id", async (req, res) => {
        try {
          const id = req.params.id;
  
          console.log("update id : ", id);
  
          const filter = { _id: new ObjectId(id) };
  
          const options = { upsert: true };
  
          const updatedProduct = req.body;
  
          //const newProduct = { UserName, userEmail, photo, productName, bandName, type, price, shortDescription, rating }
  
          const product = {
            $set: {
              // userName: updatedProduct.UserName,
              // userEmail: updatedProduct.userEmail,
              // photo: updatedProduct.photo,
  
              // rating: updatedProduct.rating,
  
              ...updatedProduct,
            },
          };
  
          const result = await productsCollection.updateOne(filter, product, options);
          res.send(result);
        } catch (err) {
          console.log(err);
        }
      });
  

    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });

    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Clothing Shop IS RUNNING ");
});

app.listen(port, () => {
  console.log(`Clothing Shop is running on Port , ${port}`);
});


//https://clothing-stores-server-djthpirce-2eg4rizve.vercel.app