const passport = require("passport");

const passportJwt = require("passport-jwt");

const ExtractJwt = passportJwt.ExtractJwt;

const StrategyJwt = passportJwt.Strategy;

const { admin } = require("../models");
const { user } = require("../models");
const { triager } = require("../models");

// passport js middlware that checks for token validation
passport.use(
  "admin",
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    function (jwtPayload, done) {
      if (jwtPayload.role === "admin") {
        return admin
          .findOne({ where: { id: jwtPayload.id } })
          .then((result) => {
            return done(null, result);
          })
          .catch((err) => {
            return done(err);
          });
      } else {
        return done(null, false);
      }
    }
  )
);

passport.use(
  "user",
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    function (jwtPayload, done) {
      if (jwtPayload.role === "user") {
        return user
          .findOne({ where: { id: jwtPayload.id } })
          .then((result) => {
            return done(null, result);
          })
          .catch((err) => {
            return done(err);
          });
      } else {
        return done(null, false);
      }
    }
  )
);
