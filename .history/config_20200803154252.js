// The reason to add a config file is to organize your code
// If you change one thing, you only need to change it here
var config = {
  port: 3000,
  secret: "secret",
  redisUrl: "redis://localhost",
  routes: {
    login: "/login",
    logout: "/logout",
  },
};

module.exports = config;
