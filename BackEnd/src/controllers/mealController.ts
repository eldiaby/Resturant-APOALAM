import { apiResponse } from "../utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import Meal from "../models/Meal";
import { catchAsync } from "../utils/catchAsync";

export const getAllMeals = catchAsync(async (req, res) => {
	const meals = await Meal.find({}).lean();
	return apiResponse(res, StatusCodes.OK, ReasonPhrases.OK, meals, {
		count: meals.length,
		path: req.originalUrl,
	});
});

export const getMealById = catchAsync(async (req, res) => {
	const meal = await Meal.findById(req.params.mealId).lean();
	if (!meal) {
		return apiResponse(res, StatusCodes.NOT_FOUND, "Meal not found");
	}
	return apiResponse(res, StatusCodes.OK, "Meal fetched successfully", meal, {
		path: req.originalUrl,
	});
});

export const addMeal = catchAsync(async (req, res) => {
	const { name, description, ingredients, category, price, estimatedTime } =
		req.body;

	if (!req.file) {
		return apiResponse(res, StatusCodes.BAD_REQUEST, "Image is required");
	}

	const imageUrl = `/uploads/${req.file.filename}`;
	const meal = new Meal({
		name,
		description,
		ingredients: Array.isArray(ingredients)
			? ingredients
			: ingredients.split(","),
		category,
		price,
		estimatedTime,
		imageUrl,
	});

	const savedMeal = await meal.save();
	return apiResponse(
		res,
		StatusCodes.CREATED,
		"Meal created successfully",
		savedMeal,
	);
});

export const updateMeal = catchAsync(async (req, res) => {
	const { mealId } = req.params;

	const updatedMeal = await Meal.findByIdAndUpdate(mealId, req.body, {
		new: true,
		runValidators: true,
	});

	if (!updatedMeal) {
		return apiResponse(res, StatusCodes.NOT_FOUND, "Meal not found", null, {
			mealId,
		});
	}

	return apiResponse(
		res,
		StatusCodes.OK,
		"Meal updated successfully",
		updatedMeal,
		{
			mealId,
		},
	);
});

export const deleteMeal = catchAsync(async (req, res) => {
	const { mealId } = req.params;

	const deletedMeal = await Meal.findByIdAndDelete(mealId);

	if (!deletedMeal) {
		return apiResponse(res, StatusCodes.NOT_FOUND, "Meal not found", null, {
			mealId,
		});
	}

	return apiResponse(res, StatusCodes.OK, "Meal deleted successfully", null, {
		mealId,
	});
});
