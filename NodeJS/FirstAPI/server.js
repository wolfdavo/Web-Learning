var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Use functions are like a layer of code that runs before anything else. When any of the get functions are hit, the server will run the use functions before res.send(). These two make parse the data into json format, and make sure that the url in is a valid encoding format.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//This runs when the JS file is run in node, starts listening on specified port.
app.listen(3000, function() {
  console.log('First API running on port 3000!');
})

//A get request is sending data back from the server
//The / represents the address that needs to be hit in order to send a response.
app.get('/', function(request, response){
  response.send('My first API!');
});

app.get('/another-page', function(request, response){
  response.send('This is the returned JSON for /another-page');
});

//This is an array of objects
var ingredients = [
  {
    "id":"232kAk",
    "text":"eggs"
  },
  {
    "id":"353klj",
    "text":"milk"
  },
  {
    "id":"555jhs",
    "text":"protein"
  },
];

//When someone hits localhost:3000/ingredients, the server will send back the array ingredients in JSON format
app.get('/ingredients', function(req, res){
  res.send(ingredients);
});


//This is a post function, so defines what happens when a client sends something to the server.
//in this case we take the body of the incoming request and put it in a variable. Express knows how to find the body of an incoming request. Then in this example we have done some error checking to make sure the post has content within the body. If it doesn't, response.status is 500 (an error) and we send an eror object back. If the post does have content, we push it into our json object array, and send back a 200 (success) status saying the ingredient has been added to the list.

app.post('/ingredients', function(req, res){
  var ingredient = req.body;
    if(!ingredient || ingredient.text == "") {
      res.status(500).send({error: "Your ingredient must have text"});
    } else {
      ingredients.push(ingredient);
      res.status(200).send(ingredient.text + " has been added to ingredients!");
    }
});





//This is the put function. It changes an item in an API. In this example, we have set up anything after the /: to be the ID for what ingredient is to be changed. The : after the slash means the program knows where to grab that data from. This is known as a URL paramater. Rest of the code is pretty self explanatory.

app.put('/ingredients/:ingredientId', function(req, res){

  var newText = req.body.text;

  if (!newText || newText === "") {
    res.status(500).send({error:"YOU MUST PROVIDE INGREDIENT TEXT"})
  }else {
    var objectFound = false;
    for (var x = 0; x < ingredients.length; x++){
      var ing = ingredients[x];

      if (ing.id === req.params.ingredientId) {
        ingredients[x].text = newText;
        objectFound = true;
        break;
      }
    }

    if (!objectFound) {
      res.status(500).send({error:"Ingredient id not found"});
    }

    res.send(ingredients);

  }
});
