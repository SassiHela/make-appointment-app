const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const path = require("path");

dotenv.config();

const app = express();

connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/stripe", stripeRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(path.resolve(), "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("API is up and running"));
}

app.use(notFound);

app.use(errorHandler);

//Connection to server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
  );
});
