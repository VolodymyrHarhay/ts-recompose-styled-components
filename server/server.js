const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


const port = process.env.PORT || 5000;

let items = [
  {
    id: 0,
    name: 'name11',
  },
  {
    id: 1,
    name: 'name22'
  },
  {
    id: 2,
    name: 'name33'
  }
];

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/api/getSavedSearches', (req, res) => {
  res.send(items);
});

app.delete('/api/deleteSavedSearch/:id', (req, res) => {
  let itemsModified = items.filter(item => item.id !== Number(req.params.id));
  items = [...itemsModified];
  res.send(items);
});

app.post('/api/updateSavedSearch/:id', (req, res) => {
  const { name } = req.body;
  const isNewName = !items.filter(x => x.name === name).length;

  if (isNewName) { 
    const index = items.findIndex(item => item.id === Number(req.params.id));
    items[index].name = name;
    res.send({
      items: items,
      isError: false,
      errorMessage: ''
    });
  }
  else {
    res.send({
      items: items,
      isError: true,
      errorMessage: 'Such Save Search is already exist.',
      errorItemId: Number(req.params.id)
    });
  }
});


app.put('/api/saveNewSearch', (req, res) => {
  const { name } = req.body;
  const isNewName = !items.filter(x => x.name === name).length;

  if (isNewName) { 
    const newId = Math.max(...items.map(x => x.id)) + 1;
    items.push({
      id: newId,
      name
    });
    res.send({
      items: items,
      isError: false,
      errorMessage: ''
    });
  }
  else {
    res.send({
      items: items,
      isError: true,
      errorMessage: 'Such Save Search is already exist.'
    });
  }
});