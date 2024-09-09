import { Schema, model, models } from "mongoose";
import { isValidId } from "../helpers";

const UserSchema = new Schema(
   {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
   },
   {
      timestamps: true,
   }
);

const User = models.User || model("User", UserSchema);

export default User;

export const getUser = async (userId: any) => {
   const { error } = await isValidId(userId, "User");
   if (error) return { error, status: 400 };
   const user = await User.findById(userId);
   return user ?? { error: "User not found in the database", status: 404 };
};
