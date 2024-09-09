import { Schema, model, models } from "mongoose";
import { isValidId } from "../helpers";
import { getUser } from "./User";

const CategorySchema = new Schema(
   {
      title: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: "User" },
   },
   {
      timestamps: true,
   }
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;

export const getCategoryByUser = async (
   id: any,
   userId: any,
   options: any = null
) => {
   var { error }: any = await isValidId(id, "Category");
   if (error) return { error, status: 400 };
   var { error, status }: any = await getUser(userId);
   if (error) return { error, status };
   const category = await Category.findOne({ _id: id, user: userId }, options);
   return (
      category ?? {
         error: "Category not found or does not belong to user",
         status: 404,
      }
   );
};
