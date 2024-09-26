import cartModel from "../models/Cart.js";
import orderModel from "../models/Order.js";
import userModel from "../models/User.js";

const getCart = async (req, res) => {
  const userCart = await cartModel.find({ userId: req.user.id });
  if (cart) {
    return res
      .status(200)
      .json({ message: "Cart fetched successfully", cart: userCart });
  } else {
    return res.status(404).json({ message: "There is No Cart" });
  }
};

const addToCart = async (req, res) => {
  console.log("cart", req);
  const mealId = req.params.id;
  const quantity = req.body.quantity;
  const userCart = await cartModel.findOne({ userId: req.user.id });

  // if user already have cart
  if (userCart) {
    const mealIndex = userCart.mealItems.findIndex(
      (item) => item.mealId == mealId
    );
    // if user already have this meal in the cart
    if (mealIndex !== -1) {
      userCart.mealItems[mealIndex].quantity += quantity;
    } else {
      userCart.mealItems.push({ mealId, quantity });
    }
    await userCart.save();
    return res
      .status(200)
      .json({ message: "Cart updated successfully", cart: userCart });
  } else {
    // Create a new Cart if it first time to add to cart
    const newCart = new cartModel({
      userId: req.user.id,
      mealItems: [{ mealId, quantity }],
    });

    await newCart.save();
    await userModel.findByIdAndUpdate(req.user.id, { cart: newCart._id });
    return res
      .status(201)
      .json({ message: "Meal Added to Cart successfully", cart: newCart });
  }
};

const removeFromCart = async (req, res) => {
  const userCart = await cartModel.findOne({ userId: req.user.id });
  if (userCart) {
    const findMeal = userCart.mealItems.find(
      (meal) => meal.mealId == req.params.id
    );
    if (findMeal) {
      userCart.mealItems = userCart.mealItems.filter(
        (meal) => meal.mealId != req.params.id
      );
      await userCart.save();
      res.status(200).json({ messgae: "Meal Removed from Cart", userCart });
    } else {
      res.status(409).json({ messgae: "No Meal Found" });
    }
  } else {
    res.status(409).json({ messgae: "No Cart Found" });
  }
};

const clearCart = async (req, res) => {
  const userCart = await cartModel.findOneAndDelete({
    userId: req.user.id,
  });
  if (userCart) {
    res.status(200).json({ messgae: "Cart Removed", userCart });
  } else {
    res.status(409).json({ messgae: "No Cart Found" });
  }
};

const checkOut = async (req, res) => {
  const userCart = await cartModel.findOne({ userId: req.user.id });
  if (!userCart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const shippingDetails = req.body;

  const order = new orderModel({
    userId: req.user.id,
    mealItems: userCart.mealItems,
    shippingDetails: shippingDetails,
  });

  await order.save();
  await userCart.deleteOne({ userId: req.user.id }); // Clear cart after checkout
  res.status(200).json({ message: "Order placed successfully", order });
};

export { getCart, addToCart, removeFromCart, clearCart, checkOut };
