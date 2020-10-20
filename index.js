const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()


const uri = `mongodb+srv://Anwar:${process.env.DB_Password}@cluster0.bqgz7.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


const port = 5000;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventsCollection = client.db("VOLUNTEER-NETWORK").collection("EVENTS");
  const eventTasksCollection = client.db("VOLUNTEER-NETWORK").collection("EVENTTASKS");
  
app.post('/addEvents', (req, res) => {
    const event = req.body;
    eventsCollection.insertOne(event)
    .then(result =>{
        res.send(result.insertedCount)
    })
})

app.get('/eventlists', (req, res) => {
    eventsCollection.find({})
    .toArray((err, documents) =>{
        res.send(documents);
    })
})

app.get('/eventlist/:key', (req, res) => {
    eventsCollection.find({key: req.params.key})
    .toArray((err, documents) =>{
        res.send(documents[0]);
    })
})


app.post('/eventTasks', (req, res) => {
    const eventTasks = req.body;
    eventTasksCollection.insertOne(eventTasks)
    .then(result =>{
        res.send(result.insertedCount > 0)
    })
})

app.get('/individualsEventTask', (req, res) => {
    eventTasksCollection.find({email:req.query.email})
    .toArray((err, documents) => {
        res.send(documents);
    })
})



app.get('/individualsEventTaskk', (req, res) => {
    eventTasksCollection.find({})
    .toArray((err, documents) => {
        res.send(documents);
    })
})



app.delete('/individualsEventTask/:id', (req, res) => {
    eventTasksCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then (result =>{
        res.send(result.deletedCount > 0)
    })
})

app.delete('/individualsEventTaskk/:id', (req, res) => {
    eventTasksCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then (result =>{
        res.send(result.deletedCount > 0)
    })
})

});




app.listen(process.env.PORT || port)