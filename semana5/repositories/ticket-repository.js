const BaseRepository = require("./base-repository");

class TicketRepository extends BaseRepository {
  constructor() {
    super("tickets");
  }
}

module.exports = TicketRepository;
