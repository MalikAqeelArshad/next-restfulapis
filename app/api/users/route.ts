import connectDB, { apiResponse, apiError } from "@/config";
import { fnQueryParams, isValidId } from "@/config/helpers";
import { User } from "@/config/models";

export const GET = async (req: Request) => {
   try {
      await connectDB();
      const { skip, limit }: any = fnQueryParams(req);
      const users = await User.find({}, "name email").skip(skip).limit(limit);
      return apiResponse(users);
   } catch (error: any) {
      return apiError({ message: "Error in fetching users", error });
   }
};

export const POST = async (req: Request) => {
   try {
      await connectDB();
      const { name, email, password } = await req.json();
      if (!name || !email || !password)
         return apiError("Please fill all the required fields", 400);
      
      const newUser = new User({ name, email, password });
      await newUser.save();
      return apiResponse(
         { message: "User is created successfully", user: newUser },
         201
      );
   } catch (error: any) {
      return apiError({ message: "Error in creating user", error });
   }
};

export const PUT = async (req: Request) => {
   try {
      const { _id, name, email } = await req.json();
      const { error } = await isValidId(_id, "User");
      if (error || !name)
         return apiError(error || "Name field is required", 400);

      await connectDB();
      const updatedUser = await User.findOneAndUpdate(
         { _id },
         { name, email },
         { new: true }
      );
      if (!updatedUser) return apiError("User not found in the database", 404);
      return apiResponse({
         message: "User is updated successfully",
         user: updatedUser,
      });
   } catch (error: any) {
      return apiError({ message: "Error in updating user", error });
   }
};

export const DELETE = async (req: Request) => {
   try {
      const { _id } = await req.json();
      const { error } = await isValidId(_id, "User");
      if (error) return apiError(error, 400);

      await connectDB();
      const deletedUser = await User.findByIdAndDelete(_id);
      if (!deletedUser) return apiError("User not found in the database", 404);
      return apiResponse({
         message: "User is deleted successfully",
         user: deletedUser,
      });
   } catch (error: any) {
      return apiError({ message: "Error in deleting user", error });
   }
};
