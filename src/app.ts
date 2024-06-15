import "reflect-metadata";
import express, { json } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import { join } from "path";
import { compare } from "bcryptjs";
import { middleware as cache } from "apicache";

import { NODE_ENV, PORT } from "@config";
import { Routes } from "@interfaces/routes.interface";
import { mongoConnection } from "@database/mongoConfig";
import { UserModel } from "@models/user.model";
import { UserMiddleware } from "@middlewares/user.middleware";
import { ErrorMiddleware } from "@middlewares/error.middleware";
import { initializeMongoServer } from "@database/mongoConfigTesting";

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes?: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeViewEngine();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app listening on port ${this.port}`);
    })
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (NODE_ENV == "test")
      await initializeMongoServer();
    else
      await mongoConnection();
  }

  private initializeViewEngine() {
    this.app.set("views", join(__dirname, "views"));
    this.app.set("view engine", "pug");
  }

  private initializeMiddlewares() {

    this.app.use(cache('5 minutes'));
    this.app.use(express.urlencoded({
      extended: false
    }));
    this.app.use(json());

    // Custom Middleware
    this.app.use(UserMiddleware);

    this.app.use(session({
      secret: "cats",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      }
    }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    // passport
    passport.use(
      new Strategy(async (username, password, done) => {
        try {
          console.log("enter strategy and find user");
          const user = await UserModel.findOne({username: username});
          console.log(user);
          if (!user) {
            return done(null, false, {message: "Incorrect username"});
          }
          const match = await compare(password, user.password);
          if (!match) {
            return done(null, false, {message: "Incorrect password"});
          }
          return done(null, user);
        } catch(err) {
          return done(err);
        }
      })
    );
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
      try {
        const user = await UserModel.findById(id);
        done(null, user);
      } catch(err) {
        done(err);
      }
    });
  }

  private initializeRoutes(routes?: Routes[]) {
    routes?.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}