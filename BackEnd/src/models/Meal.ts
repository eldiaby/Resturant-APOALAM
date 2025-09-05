import { Schema, model, Document } from "mongoose";

// Meal interface
export interface IMeal extends Document {
	name: string;
	description: string;
	ingredients: string[];
	category: "breakfast" | "lunch" | "dinner" | "snack";
	price: number;
	estimatedTime?: number;
	imageUrl: string;
	createdAt?: Date;
	updatedAt?: Date;
}

// Meal schema
const mealSchema = new Schema<IMeal>(
	{
		name: {
			type: String,
			required: [true, "Meal name is required"],
			trim: true,
			index: true,
		},
		description: {
			type: String,
			required: [true, "Description is required"],
			trim: true,
		},
		ingredients: {
			type: [String],
			required: [true, "Ingredients are required"],
			validate: {
				validator: (arr: string[]) => arr.length > 0,
				message: "At least one ingredient is required",
			},
		},
		category: {
			type: String,
			required: [true, "Category is required"],
			enum: {
				values: ["breakfast", "lunch", "dinner", "snack"],
				message: "Category must be one of: breakfast, lunch, dinner, snack",
			},
			trim: true,
		},
		price: {
			type: Number,
			required: [true, "Price is required"],
			min: [0, "Price must be greater than or equal to 0"],
		},
		estimatedTime: {
			type: Number,
			min: [1, "Estimated time must be at least 1 minute"],
		},
		imageUrl: {
			type: String,
			required: [true, "Image URL is required"],
			trim: true,
			// match: [
			// 	/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
			// 	"Image URL must be a valid link to an image",
			// ],
		},
	},
	{
		timestamps: true,
	},
);

// Meal model
const Meal = model<IMeal>("Meal", mealSchema);

export default Meal;
