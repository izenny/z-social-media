const Notification = require("../Modals/Notificationschema");
const { findOne } = require("../Modals/Postschema");
const User = require("../Modals/Userschema");
// there is error in deleting existing notification
exports.createNotification = async (req, res) => {
  try {
    const { user, type, content, read } = req.body;
    console.log("Creating notification:", { user, type, content, read });
    const existingNotification = await Notification.findOne({ user, type, content, read });
    if (existingNotification) {
      await existingNotification.deleteOne();
    }
    const newNotification = new Notification({ user, type, content, read });

    const savedNotification = await newNotification.save();
    const userIdd = await User.findById(req.body.user);
    if (!userIdd) {
      return res.status(404).json({ message: "User not found" });
    }
    userIdd.notifications.push(savedNotification._id);
    await userIdd.save();

    res.status(201).json(savedNotification);
  } catch (err) {
    console.error("Error creating notification:", err);
    res.status(400).json({ message: err.message });
  }
};

//notification by user id

exports.getNotificationByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const NotificationByUser = await Notification.find({ user: userId });
    res.status(201).json(NotificationByUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: " notification deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
