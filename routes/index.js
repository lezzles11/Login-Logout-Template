module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;

function index(req, res) {
  res.cookie("IndexCookie", "This was set from Index");
  res.render("index", {
    title: "Index Page!!",
    cookie: JSON.stringify(req.cookies),
    session: JSON.stringify(req.session),
    signedCookie: JSON.stringify(req.signedCookies),
  });
}
function login(req, res) {
  res.render("login");
}
function loginProcess(req, res) {
  res.redirect("/");
}
function chat(req, res) {
  res.render("chat");
}
