const User = require("../models/user");
const { CreateUser, ForgotPassword, ResetPassword } = require("../modules");
const { readAll } = require("../utils/mongo.api");
const passport = require("passport");

module.exports = (app) => {

  //Example: 
  //localhost:5000/api/user/register?username=test_user@email.com&password=test1&firstName=Test&lastName=User
  app.get("/api/user/register", async (req, res) => {
    try {
      let createdUser = await CreateUser(User, req.query, req, res);
      res.json(createdUser);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.post("/api/user/register", async (req, res) => {
    try {
      let createdUser = await CreateUser(User, req.body, req, res);
      res.json(createdUser);
    } catch (error) {
      res.status(400).json(error);
    }
  });


  app.get("/api/user/login", passport.authenticate("local"), function (req, res) {
    req.session.save((err) => {
      if (err) {
        return res.json({ message: "Failed to sign in", err });
      }

      res.json({ status: "Signed In", authenticated: req.isAuthenticated(), user: req.user, session: req.session });
    });
  });

  app.post("/api/user/login", passport.authenticate("local"), function (req, res) {
    req.session.save((err) => {
      if (err) {
        return res.json({ message: "Failed to sign in", err });
      }

      res.json({ status: "Signed In", authenticated: req.isAuthenticated(), user: req.user, session: req.session });
    });
  });


  app.get("/api/user/current", (req, res) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.get("/api/user/all", async (req, res) => {
    try {
      let users = await readAll(User);
      res.json({ users });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.get("/api/user/logout", function (req, res) {
    let user = req.user;
    req.logout();
    res.json({ status: "Signed Out", user });
  });


  app.get("/api/user/forgot_password", async (req, res) => {
    try {
      let sendForgotPass = await ForgotPassword(User, req.query.username);
      res.json(sendForgotPass);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  });

  app.post("/api/user/forgot_password", async (req, res) => {
    try {
      let sendForgotPass = await ForgotPassword(User, req.body.username);
      res.json(sendForgotPass);
    } catch (error) {
      res.status(400).json(error);
    }
  });


  app.get("/api/user/reset_password/:token", async (req, res) => {
    try {
      let resetPasswordRequest = await ResetPassword(User, req.params.token, req.query.password);
      res.json(resetPasswordRequest);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  });

  app.post("/api/user/reset_password", async (req, res) => {
    try {
      let resetPasswordRequest = await ResetPassword(User, req.body.token, req.body.password);
      res.json(resetPasswordRequest);
    } catch (error) {
      res.status(400).json(error);
    }
  });
};