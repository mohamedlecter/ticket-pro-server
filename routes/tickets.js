const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/tickets");
const multer = require('multer'); // Import multer
const upload = multer({ dest: 'uploads/' }); // Create upload middleware



router.get("/", TicketController.getAllTickets);
router.get("/:id", TicketController.getTicketById);
router.post('/', upload.single('img'), TicketController.createTicket);
router.patch("/:id", TicketController.updateTicket);
router.delete("/:id", TicketController.deleteTicket);

module.exports = router;
