import userModel from "../models/userModel.js"

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Added to Cart Successfully!"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error adding item to cart!"})
    }
}

// const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { itemId } = req.body;

//     if (!itemId) {
//       return res.status(400).json({ success: false, message: "Item ID is required" });
//     }

//     const userData = await userModel.findById(userId);
//     const cartData = userData.cartData || {};

//     if (!cartData[itemId]) {
//       cartData[itemId] = 1;
//     } else {
//       cartData[itemId] += 1;
//     }

//     await userModel.findByIdAndUpdate(userId, { cartData });

//     res.status(200).json({ success: true, message: "Added to Cart Successfully!" });
//   } catch (error) {
//     console.error("Add to Cart Error:", error);
//     res.status(500).json({ success: false, message: "Error adding item to cart" });
//   }
// };


// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from Cart Successfully!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing item from cart!" });
    }
};


// const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { itemId } = req.body;

//     if (!itemId) {
//       return res.status(400).json({ success: false, message: "Item ID is required" });
//     }

//     const userData = await userModel.findById(userId);
//     const cartData = userData.cartData || {};

//     if (cartData[itemId] && cartData[itemId] > 0) {
//       cartData[itemId] -= 1;

//       // ✅ If count reaches zero, completely remove item from cartData
//       if (cartData[itemId] === 0) {
//         delete cartData[itemId];
//       }
//     } else {
//       return res.status(404).json({ success: false, message: "Item not found in cart" });
//     }

//     await userModel.findByIdAndUpdate(userId, { cartData });

//     res.status(200).json({ success: true, message: "Removed from Cart Successfully!" });
//   } catch (error) {
//     console.error("Remove from Cart Error:", error);
//     res.status(500).json({ success: false, message: "Error removing item from cart" });
//   }
// };


// Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success: true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error getting cart details!"})
    }
}

// const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const userData = await userModel.findById(userId);
//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({
//       success: true,
//       cartData: userData.cartData || {},
//     });
//   } catch (error) {
//     console.error("Get Cart Error:", error);
//     res.status(500).json({ success: false, message: "Error getting cart details" });
//   }
// };



export {addToCart, removeFromCart, getCart}