const express = require('express')
const cors=require('cors')
// const jwt = require('jsonwebtoken');
// const cokkieParser=require('cookie-parser')
require('dotenv').config()
const app = express()
const port = process.env.PORT|| 5000;
//mpddleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nhy8bre.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
   const taskcollection = client.db("taskmanagment").collection("addtask")

   app.post('/addtask',async(req,res)=>{
    const favourititem=req.body;
    const result= await taskcollection.insertOne(favourititem)
    res.send(result)
  })

  app.get('/addtask',async(req,res)=>{
    const result=await taskcollection.find().toArray()
    res.send(result)
  })

  app.get('/addtask/:id',async(req,res)=>{
    const id =req.params.id
    const query={_id:new ObjectId(id)}
    const result=await taskcollection.findOne(query)
    res.send(result)
  })

  app.delete('/addtask/:id',async(req,res)=>{
    const id =req.params.id
    const query={_id:new ObjectId(id)}
    const result=await taskcollection.deleteOne(query)
    res.send(result)
  
  })

  // app.put('/addtask/:id', async (req, res) => {
  //   const id = req.params.id
  //   const filter = { _id: new ObjectId(id) }
  //   const options = { upsert: true };
  //   const updatedproduct = req.body
  //   const product = {
  //     $set: {
  //       tital:updatedproduct.tital,
  //       descript:updatedproduct.descript,
  //       deadline:updatedproduct.deadline,
  //       Priority:updatedproduct.Priority,
        
  //     }
  //   }
  //   const result = await taskcollection.updateOne(filter, product, options)
  //   res.send(result)
  // })
  





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('task management')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })