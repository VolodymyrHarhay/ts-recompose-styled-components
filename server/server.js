const express = require('express');
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = process.env.PORT || 5000;

let items = [
  {
    id: 1,
    name: 'name11'
  },
  {
    id: 2,
    name: 'name22'
  },
  {
    id: 3,
    name: 'name33'
  }
];

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/getSavedSearches', (req, res) => {
  res.send(items);
});

app.delete('/deleteSavedSearch/:id', (req, res) => {
  let itemsModified = items.filter(item => item.id !== Number(req.params.id));
  items = [...itemsModified];
  res.send(items);
});

app.post('/updateSavedSearch/:id', (req, res) => {

  const { name } = req.body;
  // console.log("body = ", req.body);
  // console.log("name = ", name);
  // console.log("id = ", req.params.id);
  const index = items.findIndex(item => item.id === Number(req.params.id));
  items[index].name = name;
  console.log(items);
  res.send(items);
});