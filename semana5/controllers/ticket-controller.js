const TicketService = require("../services/ticket-service");
const service = new TicketService();

exports.create = (req, res) => {
  const ticket = service.createTicket(req.body);
  res.status(201).json(ticket);
};

exports.list = (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const tickets = service.list();

  const start = (page - 1) * limit;
  const end = start + Number(limit);

  const paginated = tickets.slice(start, end);

  res.json({
    page: Number(page),
    limit: Number(limit),
    total: tickets.length,
    data: paginated
  });
};


exports.assign = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const ticket = service.assignTicket(id, user);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.changeStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = service.changeStatus(id, status);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.delete = (req, res) => {
  try {
    service.deleteTicket(req.params.id);
    res.json({ message: "Ticket eliminado correctamente" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.notificationsByTicket = (req, res) => {
  const { id } = req.params;
  const notifications = service.getTicketNotifications(id);

  res.json(notifications);
};

