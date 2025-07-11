const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/compileX";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected successfully to: ${mongoURI}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    if (process.env.NODE_ENV === 'production') {
      console.error("Database connection is required in production. Exiting...");
      process.exit(1);
    } else {
      console.log("Continuing in development mode without database...");
      console.log("Note: Database functionality will be limited");
    }
  }
};

module.exports = connectDB;