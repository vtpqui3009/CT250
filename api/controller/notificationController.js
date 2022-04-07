const Notifications = require("../models/notificationModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const notificationController = {
  getNotifications: async (req, res) => {
    try {
      const features = new APIfeatures(
        Notifications.find({ receiverId: req.params.id }),
        req.query
      )
        .sorting()
        .paginating();

      const comments = await features.query;

      res.json({
        status: "success",
        result: comments.length,
        comments,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateNotificationStatus: async (req, res, next) => {
    const notification = await Notifications.findById(req.params.orderId);
    if (!notification) {
      return next(new ErrorHander("Notification not found with this id", 404));
    }
    if (notification.status === "checked") {
      return next(
        new ErrorHander("You have already delivered this order", 400)
      );
    }
    notification.status = req.body.status;
    await notification.save({
      validateBeforeSave: false,
    });
    res.status(200).json({
      success: true,
    });
  },
};

module.exports = notificationController;
