require('dotenv/config')
import express from "express";
import { webhookCallback } from "grammy";
import { bot } from "./bot";
import { approvalHandler } from "./handlers/approval.handler";
import bodyParser from "body-parser";

const domain = String(process.env.DOMAIN);
const secretPath = String(process.env.BOT_TOKEN);
const app = express();

app.use(express.json());
app.use(`/${secretPath}`, webhookCallback(bot, "express"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/api", approvalHandler);

app.listen(Number(process.env.PORT), async () => {
  await bot.api.setWebhook(`${domain}/${secretPath}`);
});
