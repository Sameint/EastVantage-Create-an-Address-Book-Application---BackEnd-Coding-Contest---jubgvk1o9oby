const Address = require('../models/Address');

// Controller to create a new address
const createAddress = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Validate that all required fields are present
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ message: 'Please provide all required information' });
    }

    // Create a new Address document with the input data
    const newAddress = new Address({
      name,
      address,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });

    // Save the new Address document to MongoDB
    const savedAddress = await newAddress.save();

    // Return a success response with the new address data
    return res.status(201).json({ message: 'Address created successfully', address: savedAddress });
  } catch (error) {
    return next(error);
  }
};

// Controller to update an existing address
const updateAddress = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const { id } = req.params;

    // Validate that all required fields are present
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ message: 'Please provide all required information' });
    }

    // Update the existing Address document with the input data
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      {
        name,
        address,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
      { new: true } // Return the updated document
    );

    // Return a success response with the updated address data
    return res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
  } catch (error) {
    return next(error);
  }
};

// Controller to delete an existing address
const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete the address from MongoDB
    await Address.findByIdAndDelete(id);

    // Return a success response
    return res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

// Controller to get addresses within a given distance and location
const getAddressesWithinDistance = async (req, res, next) => {
  try {
    const { latitude, longitude, distance } = req.query;

    // Validate that all required query parameters are present
    if (!latitude || !longitude || !distance) {
      return res.status(400).json({ message: 'Please provide all required information' });
    }

    // Find all addresses within the specified distance from the given location
    const addresses = await Address.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseFloat(distance),
        },
      },
    });

    // Return a success response with the list of addresses
    return res.json({ addresses });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createAddress, updateAddress, deleteAddress, getAddressesWithinDistance };
