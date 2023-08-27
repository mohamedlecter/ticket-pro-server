const TicketsModel = require('../models/tickets');

exports.createTicket = (req, res) => {
        console.log(req.file); // Check the contents of req.file
    const ticket = new TicketsModel({
        title: req.body.title,
        location: req.body.location,
        date: req.body.date,
        minPrice: req.body.minPrice,
        weekDayworkingHours: req.body.weekDayworkingHours,
        weeekEndworkingHours: req.body.weeekEndworkingHours,
        description: req.body.description,
        img: req.file.filename
    });

    ticket
        .save()
        .then((data) => {
            res.send({
                message: "Ticket created successfully!!",
                ticket: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating ticket",
            });
        });
}

exports.getAllTickets = (req, res) => {
    TicketsModel.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tickets",
            });
        });
}

exports.getTicketById = (req, res) => {
    TicketsModel.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Ticket not found with id " + req.params.id,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error retrieving ticket with id " + req.params.id,
            });
        });
}

exports.updateTicket = (req, res) => {
    TicketsModel.findByIdAndUpdate(
        req.params.id, {
            title: req.body.title,
            location: req.body.location,
            date: req.body.date,
            minPrice: req.body.minPrice,
            weekDayworkingHours: req.body.weekDayworkingHours,
            weeekEndworkingHours: req.body.weeekEndworkingHours,
            description: req.body.description,
            img: req.file.filename
        }, {
            new: true,
        }
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Ticket not found with id " + req.params.id,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error updating ticket with id " + req.params.id,
            });
        });
}

exports.deleteTicket = (req, res) => {
    TicketsModel.findByIdAndRemove(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Ticket not found with id " + req.params.id,
                });
            }
            res.send({
                message: "Ticket deleted successfully!",
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Could not delete ticket with id " + req.params.id,
            });
        });
}

exports.deleteAllTickets = (req, res) => {
    TicketsModel.deleteMany({})
        .then((data) => {
            res.send({
                message: `${data.deletedCount} Tickets were deleted successfully!`,
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occurred while removing all tickets.",
            });
        });
}
