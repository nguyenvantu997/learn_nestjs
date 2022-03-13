import mongoose from "mongoose";

export interface Cat extends mongoose.Document {
  id: string;
  name: string;
  age: number;
  breed: string;
}