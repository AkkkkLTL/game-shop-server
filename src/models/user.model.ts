import { Schema, model } from "mongoose";
import { IUser } from "@interfaces/users.interface";

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
export const UserModel = model<IUser>("User", UserSchema);

export const users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
}