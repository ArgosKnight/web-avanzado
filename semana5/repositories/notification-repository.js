const BaseRepository = require("./base-repository");

class NotificationRepository extends BaseRepository {
  constructor() {
    super("notifications");
  }
}

module.exports = NotificationRepository;
