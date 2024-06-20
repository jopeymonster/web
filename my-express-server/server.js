
const express = require("express");
const app = express();
// const port = 3000

app.get("/", function (req, res) {
  console.log(req);
  res.send("Request logged");
});

app.get("/contact", function (req, res){
  res.send("Contact me: joe@thethompsons.fam");
});

app.get("/about", function (req, res){
  res.send("<html><head><title>About</title></head><body><h1>Hola!</h1><br><h2>Mi llamo JoeThompson y estoy un padre.</h2><br>Yo hablo espanol y ingles y yo como manzanas y pan, y bebo agua.</body></html>");
});

// app.get("/", (req, res) => {
//   res.send("Hello Joe!")
// })

// app.listen("/", () => {
//   console.log("Example app listening on port ${port}");
// })

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
