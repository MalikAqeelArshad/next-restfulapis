import connectDB, { apiResponse, apiError } from "@/config";
import { Blog, getBlogByUserAndCategory } from "@/config/models";

export const PATCH = async (req: Request, { params }: any) => {
   try {
      await connectDB();
      const { id } = params;
      const { userId, categoryId } = await req.json();

      const blog = await getBlogByUserAndCategory(
         id,
         userId,
         categoryId,
         "title description user category"
      );
      if (blog?.error) return apiError(blog.error, blog.status);
      return apiResponse(blog);
   } catch (error: any) {
      return apiError({ message: "Error in fetching blog", error });
   }
};

export const PUT = async (req: Request, { params: { id } }: any) => {
   try {
      await connectDB();
      const { title, description, userId, categoryId } = await req.json();
      if (!title) return apiError("Title is required", 400);

      const { error, status } = await getBlogByUserAndCategory(
         id,
         userId,
         categoryId
      );
      if (error) return apiError(error, status);

      const updatedBlog = await Blog.findByIdAndUpdate(
         { _id: id },
         { title, description, user: userId, category: categoryId },
         { new: true }
      );
      return apiResponse({
         message: "Blog is updated successfully",
         blog: updatedBlog,
      });
   } catch (error: any) {
      return apiError({ message: "Error in updating blog", error });
   }
};

export const DELETE = async (req: Request, { params: { id } }: any) => {
   try {
      await connectDB();
      const { userId, categoryId } = await req.json();

      const { error, status } = await getBlogByUserAndCategory(
         id,
         userId,
         categoryId
      );
      if (error) return apiError(error, status);

      const deletedBlog = await Blog.findByIdAndDelete({ _id: id });
      return apiResponse({
         message: "Blog is deleted successfully",
         blog: deletedBlog,
      });
   } catch (error: any) {
      return apiError({ message: "Error in deleting blog", error });
   }
};
