var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var Store = require("connect-redis")(session);
var routes = require("./routes");
var errorHandlers = require("./middleware/errorhandlers");
var log = require("./middleware/log");
var flash = require("connect-flash");
var csrf = require("csurf");
var config = require("./config");
var util = require("./middleware/utilities");
app.use(log.logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
  })
);

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(session({ secret: "secret" }));
// Make sure the cookie parser secret is the same as the session
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    store: new Store({ url: config.redisUrl }),
  })
);

app.use(csrf());
app.use(util.csrf);
app.use(flash());
app.get("/", routes.index);
app.get("/login", routes.login);
app.post("/login", routes.loginProcess);
app.get("/chat", routes.chat);
app.get("/account/login", routes.login);

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(3000);
console.log("App server running on port 3000");
