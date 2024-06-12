require("./db");
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const env = require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Routes
try {
  const articleRoute = require("./src/routes/articleRoute")
  app.use("/article_on_snf", articleRoute)

  const awardRoute = require("./src/routes/awardRoute")
  app.use("/award", awardRoute)

  const birthdayRoute = require("./src/routes/birthdayRoutes")
  app.use("/birthday", birthdayRoute)

  const homecarsoalRoute = require("./src/routes/homecarsoalRoute")
  app.use("/homecarsoal", homecarsoalRoute)

  const cleanwaterRoute = require("./src/routes/cleanwaterRoute")
  app.use("/cleanwater", cleanwaterRoute)

  const eduactionalfacilitiesRoute = require("./src/routes/eduactionalfacilitiesRoute")
  app.use("/eduactionalfacilities", eduactionalfacilitiesRoute)

  const envconservationRoute = require("./src/routes/envconservationRoute")
  app.use("/envconservation", envconservationRoute)

  const medecalprojectRoute = require("./src/routes/medecalprojectRoute")
  app.use("/medecalproject", medecalprojectRoute)

  const shahidjawanRoute = require("./src/routes/shahidjawanRoute")
  app.use("/shahidjawan", shahidjawanRoute)

  const teamfounderparticipantRoute = require("./src/routes/teamfounderparticipantRoute")
  app.use("/teamfounderparticipant", teamfounderparticipantRoute)

  const teammentorRoute = require("./src/routes/teammentorRoute")
  app.use("/teammentor", teammentorRoute)

  const nriparticipantRoute = require("./src/routes/nriparticipantRoute")
  app.use("/nriparticipant", nriparticipantRoute)

  const stateparticipantRoute = require("./src/routes/stateparticipantRoute")
  app.use("/stateparticipant", stateparticipantRoute)

  const newspaperRoute = require("./src/routes/newspaperRoute")
  app.use("/newspaper", newspaperRoute)

  const home2cardsRoute = require("./src/routes/home2cardsRoute")
  app.use("/home2cards", home2cardsRoute)

  const home4cardsRoute = require("./src/routes/home4cardsRoute")
  app.use("/home4cards", home4cardsRoute)


  const contactRoute = require("./src/routes/contactRoute")
  app.use("/contact", contactRoute)

  const loginRoutes = require("./src/routes/userRoutes");
  app.use("/auth", loginRoutes);

} catch (error) {
  console.error("Error while loading routes:", error);
}

app.get("/", (req, res) => {
  res.send(`Server is running on port no. ${process.env.APP_PORT}`);
});

// Start server
try {
  app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port no. ${process.env.APP_PORT}`);
  });
} catch (error) {
  console.error("Error while starting server:", error);
}
