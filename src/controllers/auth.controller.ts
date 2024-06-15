import { NextFunction, Request, Response } from "express";
import { UserModel } from "models/user.model";
import passport from "passport";
import bcrypt from "bcryptjs";

export class AuthController {
  public getSignUp = async (req: Request, res: Response, next: NextFunction) => {
    res.render("sign-up-form");
  }
  public postSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const userExists = await UserModel.findOne({username: username});
      if (userExists)
        return res.status(400).json({error: 'User already exists'});

      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        const user = await UserModel.create({
          username: username,
          password: hashedPassword,
        });
        const result = await user.save();
      });

      res.json(req.body);
    } catch(err) {
      return next(err);
    }
  }
  public getLogIn = (req: Request, res: Response, next: NextFunction) => {
    console.log(`request's IP address: ${req.ip}`);
    res.render("log-in");
  }

  public postLogIn = 
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    });

  public getLogOut = (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }
}