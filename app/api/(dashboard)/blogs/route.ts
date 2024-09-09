import connectDB, { apiResponse, apiError } from "@/config";
import { Blog, getCategoryByUser } from "@/config/models";
import { fnQueryParams } from "@/config/helpers";

export const GET = async (req: Request) => {
   try {
      await connectDB();
      const {
         userId,
         categoryId,
         skip,
         limit,
         keywords,
         startDate,
         endDate,
      }: any = fnQueryParams(req);

      const { error, status } = await getCategoryByUser(categoryId, userId);
      if (error) return apiError(error, status);

      const filter: any = { user: userId, category: categoryId };
      if (keywords) {
         filter.$or = [
            { title: { $regex: keywords, $options: "i" } },
            { description: { $regex: keywords, $options: "i" } },
         ];
      }

      if (startDate && endDate) {
         filter.createdAt = { $gte: startDate, $lte: endDate };
      } else if (startDate) {
         filter.createdAt = { $gte: startDate };
      } else if (endDate) {
         filter.createdAt = { $lte: endDate };
      }

      const blogs = await Blog.find(filter, "title description user category")
         .skip(skip)
         .limit(limit);
      return apiResponse(blogs);
   } catch (error: any) {
      return apiError({ message: "Error in fetching blogs", error });
   }
};

export const POST = async (req: Request) => {
   try {
      const { title, description, userId, categoryId } = await req.json();
      if (!title) return apiError("Title is required", 400);

      await connectDB();
      const { error, status } = await getCategoryByUser(categoryId, userId);
      if (error) return apiError(error, status);
      
      const newBlog = new Blog({
         title,
         description,
         user: userId,
         category: categoryId,
      });
      await newBlog.save();
      return apiResponse(
         { message: "Blog is created successfully", blog: newBlog },
         201
      );
   } catch (error: any) {
      return apiError({ message: "Error in creating blog", error });
   }
};
