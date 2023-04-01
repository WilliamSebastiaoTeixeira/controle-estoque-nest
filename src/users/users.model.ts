import * as mongoose from "mongoose"

export const UserSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean, 
      required: true
    }
  },
  { timestamps: true }
)

export interface User extends mongoose.Document {
  _id: string;
  nome: string;
  deleted: boolean;
  username: string;
  password: string;
}
