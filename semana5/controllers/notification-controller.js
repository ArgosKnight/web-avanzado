const NotificationService = require("../services/notification-service");
const service = new NotificationService();

exports.list = (req, res) => {
  res.status(200).json(service.list());
};
