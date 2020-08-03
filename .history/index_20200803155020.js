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
var flashed = require("connect-flash");
var csrf = require("csurf");
var config = require("./config");
var util = require("./middleware/utilities");
app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
  })
);

app.set("view engine", "hbs");
app.use(log.logger);

// Make sure the cookie parser secret is the same as the session
app.use(cookieParser(config.secret));

app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: config.secret,
    saveUninitialized: true,
    resave: true,
    store: new Store({ url: config.redisUrl }),
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(csrf({ cookie: true }));

app.use(util.csrf);
app.use(util.authenticated);
app.use(flashed());
app.use(util.templateRoutes);
app.get("/", routes.index);
app.get(config.routes.login, routes.login);
app.post(config.routes.login, routes.loginProcess);
app.get("/chat", [util.requireAuthentication], routes.chat);
app.get("/account/login", routes.login);
app.get(config.routes.logout, routes.logout);
app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(config.port);
console.log("App server running on port 3000");
