import { Request, Response } from "express";
import {v4 as uuidv4 } from "uuid";

export class MessageController {
  public getMessages = (req: Request, res: Response) => {
    return res.send(Object.values(req.context.messages));
  }

  public getMessage = (req: Request, res: Response) => {
    const messageId = req.params.messageId;
    return res.send(req.context.messages[messageId]);
  }

  public postMessage = (req: Request, res: Response) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,
      userId: req.context.me.id,
    };
    req.context.messages[id] = message;
    console.log(message);
    return res.send(message);
  }

  public deleteUser = (req:Request, res:Response) => {
    const {
      [req.params.messageId]: message,
      ...otherMessages
    } = req.context.messages;
    req.context.messages = otherMessages;

    return res.send(message);
  }
}