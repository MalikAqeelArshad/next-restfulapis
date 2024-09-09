import connectDB, { apiResponse, apiError } from "@/config";
import { Category, getUser } from "@/config/models";
import { fnQueryParams } from "@/config/helpers";

export const GET = async (req: Request) => {
   try {
      await connectDB();
      const { skip, limit, userId }: any = fnQueryParams(req);
      const { error, status } = await getUser(userId);
      if (error) return apiError(error, status);
      const categories = await Category.find({ user: userId }, "title user")
         .skip(skip)
         .limit(limit);
      return apiResponse(categories);
   } catch (error: any) {
      return apiError({ message: "Error in fetching categories", error });
   }
};

export const POST = async (req: Request) => {
   try {
      const { title, userId } = await req.json();
      if (!title) return apiError("Title is required", 400);

      await connectDB();
      const { error, status } = await getUser(userId);
      if (error) return apiError(error, status);
      const newCategory = new Category({ title, user: userId });
      await newCategory.save();
      return apiResponse(
         { message: "Category is created successfully", category: newCategory },
         201
      );
   } catch (error: any) {
      return apiError({ message: "Error in creating category", error });
   }
};
