import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.resolve(__dirname, "..", "config.env") });

import multer from "multer";

import morgan from "morgan";

import mailsRouter from "./routes/mealRoutes";

// import mealRoutes from "./routes/mealRoutes.js";
// import reservationRoutes from "./routes/reservationRoutes.js";
// import userRoutes from "./routes/user.js";
// import orderRoute from "./routes/orderRoutes.js";
// import userMangeRoute from "./routes/userManage.js";
// import cartRoute from "./routes/cartRoutes.js";

// import repassword from "./routes/repasswordRoutes.js";
// import router from "./routes/stripe.js";
// Load environment variables

import connectDB from "./config/db";

const app = express();

// Connect to the database
connectDB();

const allowedOrigins = [
	"http://localhost:5174",
	"http://localhost:4200",
	"http://localhost:5173",
];

// Middleware
// app.use(
// 	cors({
// 		origin: function (origin, callback) {
// 			if (!origin || allowedOrigins.indexOf(origin) !== -1) {
// 				callback(null, true);
// 			} else {
// 				callback(new Error("Not allowed by CORS"));
// 			}
// 		},
// 	}),
// );
// app.use("/webhook", express.raw({ type: "application/json" }));

// app.use("/api", router);
// app.use(express.json());

app.use(morgan("dev"));
const multerConfig = multer({ dest: path.resolve(__dirname, "uploads") });
app.use(multerConfig.single("image"));

// // Routes
app.use("/api/v1/meals", mailsRouter);

// app.use("/api", repassword);

// app.use("/api", userRoutes);
// app.use("/api", mealRoutes);
// app.use("/api", reservationRoutes);
// app.use("/api", orderRoute);
// app.use("/api", userMangeRoute);
// app.use("/api", cartRoute);

// // Error handling
// app.use((err, req, res, next) => {
// 	res.status(500).json({ message: err.message });
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
