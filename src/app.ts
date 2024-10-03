import express from 'express';
import router from "./routes";
import cors from "cors";

import ExpressAdapter from "./adapters/ExpressAdapter";

const app = new ExpressAdapter();

app.use(express.json());
app.use(cors());
app.use('/api/v1', router);

export default app;
