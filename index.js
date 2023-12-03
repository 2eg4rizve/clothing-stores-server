const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mjrato5.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mjrato5.mongodb.net/?retryWrites=true&w=majority`;

const uri = "mongodb+srv://storeDB:hzE7qAl38IuFxjFE@cluster0.mjrato5.mongodb.net/?retryWrites=true&w=majority";

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);

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

    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
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