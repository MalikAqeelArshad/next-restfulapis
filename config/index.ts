import connectDB from "./db";

const apiResponse = async (data: any, statusCode = 200, headers = {}) => {
   headers = { "Content-Type": "application/json", ...headers };
   return new Response(JSON.stringify(data), { status: statusCode, headers });
};

const apiError = async (error: any, statusCode = 500) => {
   const errorMessage = error?.error?._message || error?.error?.message;
   const data = Boolean(error?.constructor === String)
      ? { message: error }
      : { message: error?.message || errorMessage, error: errorMessage };
   return await apiResponse(data, statusCode);
};

export { connectDB as default, apiResponse, apiError };
