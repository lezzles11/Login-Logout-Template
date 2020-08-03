module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
function index(req, res) {
  res.render("index", { title: "Title!" });
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
