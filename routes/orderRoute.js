import express from "express";
import authMiddleware from "../middleware/auth.js";
import {placeOrder, verifyOrder, userOrders, listOrders, deleteOrder, updateStatus, getAdminStats} from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", authMiddleware, verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/listorders", listOrders);
orderRouter.delete("/deleteorder/:id", deleteOrder);
orderRouter.get("/getstats", getAdminStats);
orderRouter.post("/updatestatus", updateStatus);


export default orderRouter;