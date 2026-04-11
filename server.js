import exp from "express";
import userRoutes from "./routers/user.route.js";

const app = exp();

app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

app.use("/api/v1", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});