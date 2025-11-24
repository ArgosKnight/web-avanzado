const { v4: uuidv4 } = require("uuid");
const NotificationRepository = require("../repositories/notification-repository");
const EmailService = require("./email-service"); 

class NotificationService {
  constructor() {
    this.repo = new NotificationRepository();
    this.emailService = new EmailService();
  }

  create(type, message, ticketId) {
    const notification = {
      id: uuidv4(),
      type,
      message,
      status: "pending",
      ticketId
    };

    // SI ES EMAIL → ENVIAR CORREO
    if (type === "email") {
      this.emailService.sendEmail({
        to: "Correo_Receptor@tecsup.edu.pe",
        subject: "API RESTful - Alertas del sistema de Tickets",
        htmlBody: `<h1>${message}</h1>`
      });
    }

    return this.repo.save(notification);
  }

  list() {
    return this.repo.findAll();
  }
}

module.exports = NotificationService;
