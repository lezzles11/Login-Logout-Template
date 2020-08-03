var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var routes = require("./routes");
var errorHandlers = require("./middleware/errorhandlers");
var log = require("./middleware/log");
app.use(log.logger);
app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.set("view engine", "hbs");

app.get("/", routes.index);
app.get("/login", routes.login);
app.post("/login", routes.loginProcess);
app.get("/chat", routes.chat);
app.get("/account/login", routes.login);

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(3000);
console.log("App server running on port 3000");
