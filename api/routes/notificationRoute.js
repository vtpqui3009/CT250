const router = require("express").Router();
const notificationController = require("../controller/notificationController");

router.get("/notification/:id", notificationController.getNotifications);
router.put(
  "/noti/edit/:orderId",
  notificationController.updateNotificationStatus
);
module.exports = router;
