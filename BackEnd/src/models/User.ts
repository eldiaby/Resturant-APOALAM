import argon2 from "argon2";
import ms from "ms";
import { type Document, Schema, model } from "mongoose";
import validator from "validator";

// User Interface (TypeScript)
export interface IUser extends Document {
	userName: string;
	email: string;
	password: string;
	confirmPassword?: string;
	phone: string;
	address: string;
	isEmailVerified: boolean;
	role: "user" | "admin";
	orders: Schema.Types.ObjectId[];
	cart?: Schema.Types.ObjectId;
	reservations?: Schema.Types.ObjectId;
	otp?: string;
	otpExpires?: Date;
	comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
	{
		userName: {
			type: String,
			required: [true, "Your user name is required"],
			trim: true,
			minlength: [3, "User name must be at least 3 characters"],
			validate: {
				validator: (value: string) =>
					validator.isAlphanumeric(value, "en-US", { ignore: " " }),
				message: "User name must contain only letters and numbers",
			},
		},
		email: {
			type: String,
			required: [true, "Your email is required"],
			unique: true,
			lowercase: true,
			trim: true,
			validate: {
				validator: (value: string) => validator.isEmail(value),
				message: "Please provide a valid email",
			},
		},
		password: {
			type: String,
			required: [true, "Your password is required"],
			minlength: [6, "Password must be at least 6 characters"],
			select: false,
			validate: {
				validator: (value: string) =>
					validator.isStrongPassword(value, {
						minLength: 6,
						minLowercase: 1,
						minUppercase: 1,
						minNumbers: 1,
						minSymbols: 0,
					}),
				message:
					"Password must contain at least 1 lowercase, 1 uppercase letter, and 1 number",
			},
		},
		confirmPassword: {
			type: String,
			required: [true, "Confirm password is required"],
			minlength: [6, "Confirm password must be at least 6 characters"],
			validate: {
				validator: function (this: IUser, value: string): boolean {
					return this.password === value;
				},
				message: "Confirm Password should be equal to password",
			},
		},
		phone: {
			type: String,
			required: [true, "Your phone is required"],
			match: [
				/^(\+20|0)1[0-9]{9}$/,
				"Please provide a valid Egyptian phone number",
			],
			unique: true,
		},

		address: {
			type: String,
			required: [true, "Your address is required"],
			trim: true,
			validate: {
				validator: (value: string) => validator.isLength(value, { min: 5 }),
				message: "Address must be at least 5 characters long",
			},
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		orders: [
			{
				type: Schema.Types.ObjectId,
				ref: "Order",
			},
		],
		cart: {
			type: Schema.Types.ObjectId,
			ref: "Cart",
		},
		reservations: {
			type: Schema.Types.ObjectId,
			ref: "Reservation",
		},
		otp: {
			type: String,
			validate: {
				validator: (value: string) => !value || validator.isNumeric(value),
				message: "OTP must contain only numbers",
			},
		},

		otpExpires: {
			type: Date,
			default: () => {
				const expiresIn: string = process.env.OTP_EXPIRES_IN ?? "5m";
				return Date.now() + ms(expiresIn);
			},
			validate: {
				validator: (value: Date) => !value || value > new Date(),
				message: "OTP expiration must be a future date",
			},
		},
	},
	{ versionKey: false, timestamps: true },
);

// 🔐 Hash password before saving with argon2
userSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("password")) return next();

	if (this.password !== this.confirmPassword) {
		return next(new Error("Passwords do not match"));
	}

	try {
		this.password = await argon2.hash(this.password);
		this.confirmPassword = undefined;
		next();
	} catch (err) {
		next(err as Error);
	}
});

// 🛠 Compare password method
userSchema.methods.comparePassword = async function (
	candidate: string,
): Promise<boolean> {
	return argon2.verify(this.password, candidate);
};

const userModel = model<IUser>("User", userSchema);

export default userModel;
