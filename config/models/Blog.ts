import { Schema, model, models } from "mongoose";
import { getCategoryByUser } from "./Category";
import { isValidId } from "../helpers";

const BlogSchema = new Schema(
   {
      title: { type: String, required: true },
      description: { type: String },
      user: { type: Schema.Types.ObjectId, ref: "User" },
      category: { type: Schema.Types.ObjectId, ref: "Category" },
   },
   {
      timestamps: true,
   }
);

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;

export const getBlogByUserAndCategory = async (
   id: any,
   userId: any,
   categoryId: any,
   options: any = null
) => {
   var { error }: any = await isValidId(id, "Blog");
   if (error) return { error, status: 400 };
   var { error, status }: any = await getCategoryByUser(categoryId, userId);
   if (error) return { error, status };
   const blog = await Blog.findOne(
      { _id: id, user: userId, category: categoryId },
      options
   );
   return (
      blog ?? {
         error: "Blog not found or does not belong to user or category",
         status: 404,
      }
   );
};
