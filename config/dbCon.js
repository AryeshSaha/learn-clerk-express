const mongoose = require("mongoose");

// Future Proofing
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function DbCon() {
  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);

    console.log(
      `✅ MongoDB Connected: ${mongoose.connection.host} \nDatabase: ${mongoose.connection.name}`
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

module.exports = DbCon;
