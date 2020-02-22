const Authentication = require("../controllers/authentication");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: true });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = app => {
  // Signup by Email with JWT
  app.post("/signup", Authentication.signup);
  // Signin by Email with JWT
  app.post("/signin", requireSignin, Authentication.signin); //auth route);
  // Fetch by id with JWT
  app.get("/api/user/:id", Authentication.fetchUser);
  // Edit by id with JWT
  app.post("/api/user/:id", Authentication.editUser);
  // delete by id with JWT
  app.delete("/api/user/:id", Authentication.deleteUser);
  // Get User details
  app.post("/api/chatroom/user/:id", Authentication.getUser);

  // Google Auth
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect(`/dashboard/${req._passport.session.user}`);
    }
  );

  // Linkedin
  app.get(
    "/auth/linkedin",
    passport.authenticate("linkedin", {
      scope: ["r_liteprofile", "r_emailaddress", "w_member_social"]
    })
  );
  app.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin", { failureRedirect: "/" }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect(`/dashboard/${req._passport.session.user}`);
    }
  );

  // Logout user
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Current User
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
