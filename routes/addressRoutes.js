const express = require("express");

const { createAddress, updateAddress, deleteAddress, getAddressesWithinDistance} = require("../controllers/addressControllers");

const router = express.Router();

router.post('/', createAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);
router.get('/', getAddressesWithinDistance);

// Sample Route Calls:
// GET localhost:3000/api/v1/address?latitude=51.5074&longitude=0.1278&distance=100000000


module.exports = router;