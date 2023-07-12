const UserModel = require("../models/user");


exports.createUser = async (req, res) => {
  if (
    !req.body.email &&
    !req.body.name &&
    !req.body.password &&
    !req.body.phone
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const user = new UserModel({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    phone: req.body.phone,
  });

  await user
    .save()
    .then((data) => {
      res.send({
        message: "User created successfully!!",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
};

// Retrieve all users from the database.
exports.findAllUsers = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

// Find a single User with an id
exports.findOneUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

// Update a user by the id in the request
exports.updateUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await UserModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({
          message: "User updated successfully."
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a user with the specified id in the request
exports.deleteUser = async (req, res) => {
  await UserModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({
          message: "User deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// create a function for login 

exports.loginUser = async (req, res) => {
  await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    })
    .then((data) => {

      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({
          message: "User login successfully!",
        });
      }
    }
    )
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    }
    );

}