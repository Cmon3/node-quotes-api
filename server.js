const express = require("express");
const app = express();

const quotes = require("./quotes.json");

app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function(request, response){
  response.json(quotes);
});

app.get("/quotes/:id", function(request, response){
  const index = parseInt(request.params.id) - 1
  console.log(typeof index);
  
  response.send(quotes[index]);
});

app.post('/quotes', function (req, res) {
  const quote = {
    quote: req.query.quote,
    author: req.query.author,
  }
  quotes.push(quote)
  res.send({ id: quotes.length })
})

app.put('/quotes/:id'), function (req, res) {
  const quote = {
    quote: req.query.quote,
    author: req.query.author,
  }
  const index = parseInt(req.param.id) - 1
  const result = quotes.splice(index, 1, quote)
  console.log("removed quote", result);

  res.send(quote)
}

app.delete('/quotes/:id'), function (req, res) {
  const index = parseInt(req.params.id) - 1

  quotes.splice(index, 1, undefined)

  res.status(204).send()
}

app.listen(3000, () => console.log("Listening on port 3000"));
