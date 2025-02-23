const { Webhook } = require("svix");
const {
  handleUserCreated,
  handleUserUpdated,
  handleUserDeleted,
} = require("../service/UserHandlers");

const eventsHandler = {
  "user.created": handleUserCreated,
  "user.updated": handleUserUpdated,
  "user.deleted": handleUserDeleted,
};

const WebhooksController = async (req, res) => {
  const secret = process.env.SIGNING_SECRET;
  if (!secret)
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env"
    );

  const wh = new Webhook(secret);
  const { headers, body } = req;
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return void res.status(400).json({
      success: false,
      message: "Error: Missing svix headers",
    });
  }
  let evt;
  try {
    evt = wh.verify(JSON.stringify(body), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (error) {
    console.log("Error: Could not verify webhook:", err.message);
    return void res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const { type, data } = evt;
  console.log(`Received webhook with ID ${data.id} and event type of ${type}`);
  console.log("Webhook payload:", data);
  try {
    const handler = eventsHandler[type];
    if (!handler)
      return void res.status(400).json({
        success: false,
        message: "Error: Event doesn't have a handler",
      });
    await handler(data);
    return void res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return void res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = WebhooksController;
