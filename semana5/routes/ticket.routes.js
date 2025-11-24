const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticket-controller");

router.get("/", controller.list);
router.post("/", controller.create);

router.put("/:id/assign", controller.assign);

router.put("/:id/status", controller.changeStatus);

router.delete("/:id", controller.delete);

router.get("/:id/notifications", controller.notificationsByTicket);


module.exports = router;
