/**
 * Utility Function: apiResponse
 * ------------------------------------
 * Purpose:
 *   Provides a standardized structure for all API responses.
 *   This ensures consistency across success and error responses,
 *   making it easier for frontend clients and other consumers to parse results.
 *
 * Standard Response Structure:
 * {
 *   "success": boolean,       // true if statusCode < 400, otherwise false
 *   "message": string,        // descriptive message (e.g., "Meal created successfully")
 *   "metadata": {
 *       "timestamp": string,  // ISO timestamp when the response was sent
 *       ...metadata           // additional metadata (e.g., pagination info, requestId, path)
 *   },
 *   "data": any               // actual data returned by the API (can be object, array, or null)
 * }
 *
 * @param res        Express Response object
 * @param statusCode HTTP status code (e.g., 200, 201, 400, 500)
 * @param message    A descriptive message indicating success or failure
 * @param data       (optional) The main payload/data of the response
 * @param metadata   (optional) Additional metadata (e.g., count, pagination, requestId)
 *
 * @example
 * // Example usage inside a controller
 * import { apiResponse } from "../utils/apiResponse";
 * import { StatusCodes } from "http-status-codes";
 *
 * export const getMeals = async (req, res) => {
 *   const meals = await Meal.find({});
 *   return apiResponse(res, StatusCodes.OK, "Meals fetched successfully", meals, {
 *     count: meals.length,
 *     requestId: req.requestId,
 *   });
 * };
 *
 * // Example success response (200 OK):
 * {
 *   "success": true,
 *   "message": "Meals fetched successfully",
 *   "metadata": {
 *     "timestamp": "2025-09-05T14:35:22.000Z",
 *     "count": 12,
 *     "requestId": "f7c4a3e1-8c9d-4a6b-b1d9-6d1a2c7f9f22"
 *   },
 *   "data": [
 *     { "_id": "1", "name": "Pizza", "price": 12.5 },
 *     { "_id": "2", "name": "Burger", "price": 8.9 }
 *   ]
 * }
 *
 * // Example error response (400 Bad Request):
 * {
 *   "success": false,
 *   "message": "Invalid input data",
 *   "metadata": {
 *     "timestamp": "2025-09-05T14:36:10.000Z",
 *     "requestId": "d1b8a123-48a2-44be-a7e6-bf2412af26af"
 *   },
 *   "data": null
 * }
 */
export const apiResponse = (
	res,
	statusCode: number,
	message: string,
	data: any = null,
	metadata: any = {},
) => {
	res.status(statusCode).json({
		success: statusCode < 400,
		message,
		metadata: {
			timestamp: new Date().toISOString(),
			...metadata,
		},
		data,
	});
};
