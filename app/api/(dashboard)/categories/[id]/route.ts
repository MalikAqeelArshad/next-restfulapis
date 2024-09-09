import connectDB, { apiResponse, apiError } from "@/config";
import { Category, getCategoryByUser } from "@/config/models";

export const PATCH = async (req: Request, { params }: any) => {
   try {
      await connectDB();
      const { id } = params;
      const { userId } = await req.json();
      const category = await getCategoryByUser(id, userId, "title user");
      if (category?.error) return apiError(category.error, category.status);
      return apiResponse(category);
   } catch (error: any) {
      return apiError({ message: "Error in fetching category", error });
   }
};

export const PUT = async (req: Request, { params: { id } }: any) => {
   try {
      await connectDB();
      const { title, userId } = await req.json();
      if (!title) return apiError("Title is required", 400);
      
      const { error, status } = await getCategoryByUser(id, userId);
      if (error) return apiError(error, status);

      const updatedCategory = await Category.findByIdAndUpdate(
         { _id: id },
         { title },
         { new: true }
      );
      return apiResponse({
         message: "Category is updated successfully",
         category: updatedCategory,
      });
   } catch (error: any) {
      return apiError({ message: "Error in updating category", error });
   }
};

export const DELETE = async (req: Request, { params: { id } }: any) => {
   try {
      await connectDB();
      const { userId } = await req.json();

      const { error, status } = await getCategoryByUser(id, userId);
      if (error) return apiError(error, status);
      
      const deletedCategory = await Category.findByIdAndDelete({ _id: id });
      return apiResponse({
         message: "Category is deleted successfully",
         category: deletedCategory,
      });
   } catch (error: any) {
      return apiError({ message: "Error in deleting category", error });
   }
};
