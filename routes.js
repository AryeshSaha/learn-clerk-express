const router = require("express").Router();
const express = require("express");
const WebhooksController = require("./controllers/WebhooksController");

router.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  WebhooksController
);

module.exports = router;
