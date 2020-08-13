import * as express from "express";
import * as dotenv from "dotenv";

import router from "./router";
import { routes } from "./config/constants";
import { defaultErrorHandler } from "./router/heplers";

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes.prefix, router);
app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, () => console.log(`Server started on port ${process.env.APP_PORT}`));