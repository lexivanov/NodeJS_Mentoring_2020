import * as express from "express";
import * as dotenv from "dotenv";

import router from "./router";
import { routes } from "./config/constants";
import { defaultErrorHandler } from "./router/heplers";
import { dbConnect } from "./data-access/dbConnect";

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes.prefix, router);
app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, () => dbConnect(process.env));