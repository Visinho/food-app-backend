import cron from "node-cron";
import Order from "./models/orderModel.js";

cron.schedule("0 0 * * *", async () => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const result = await Order.deleteMany({
      status: "Delivered",
      date: { $lte: threeDaysAgo }
    });

    console.log(`${result.deletedCount} delivered orders older than 3 days deleted.`);
  } catch (error) {
    console.error("Error deleting old delivered orders:", error);
  }
});
