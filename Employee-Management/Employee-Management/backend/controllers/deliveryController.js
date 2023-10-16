const express = require("express");
const router = express.Router();
const Delivery = require("../models/delivery");

// Create a new delivery
router.post("/delivery", async (req, res) => {
  try {
    const delivery = new Delivery({
      orderId: req.body.orderId,
      address: req.body.isShippingAddress
        ? req.body.shippingAddress
        : req.body.address,
      status: req.body.status,
      deliveryDate: req.body.deliveryDate,
      isShippingAddress: req.body.isShippingAddress,
    });
    const savedDelivery = await delivery.save();
    res.status(201).json(savedDelivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all deliveries
router.get("/deliveries", async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single delivery by ID
router.get("/delivery/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a delivery by ID
router.put("/delivery/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    delivery.status = req.body.status;
    delivery.address = req.body.isShippingAddress
      ? req.body.shippingAddress
      : req.body.address;
    delivery.deliveryDate = req.body.deliveryDate;
    delivery.isShippingAddress = req.body.isShippingAddress;
    const updatedDelivery = await delivery.save();
    res.json(updatedDelivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a delivery by ID
router.delete("/delivery/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.json({ message: "Delivery deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
