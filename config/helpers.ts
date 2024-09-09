import { Types } from "mongoose";

export const isValidId = async (id: any, type = "") => {
   if (id && Types.ObjectId.isValid(id)) return { error: false };
   return { error: id ? `Invalid ${type} ID: ${id}` : `${type} ID not found` };
};

export const fnQueryParams = (req: any) => {
   const url = Boolean(req?.constructor === String) ? req : req.url;
   let query: any = Object.fromEntries(new URLSearchParams(url.split("?")[1]));

   if (query?.limit) query.limit = parseInt(query.limit) || 10;
   if (query?.page) {
      query.page = parseInt(query.page) || 1;
      query.skip = (query.page - 1) * (query?.limit || 10);
   }

   if (query?.startDate) query.startDate = `${new Date(query.startDate)}`;
   if (query?.endDate) {
      const endDate = new Date(query.endDate);
      endDate.setDate(endDate.getDate() + 1);
      endDate.setHours(0);
      endDate.setSeconds(-1);
      query.endDate = `${new Date(endDate)}`;
   }
   // console.log("query", query);
   return query;
};
