import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ErrorMiddleware } from "./modules/middlewares/errorMidleware";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);
app.use(ErrorMiddleware.execute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
