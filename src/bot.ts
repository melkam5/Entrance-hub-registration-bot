import { conversations, createConversation } from "@grammyjs/conversations";
import { Bot } from "grammy";
import feedbackmenu from "./keyboards/feedback.menu";
import inviteMenu from "./keyboards/invite.menu";
import registerMenu from "./keyboards/register.menu";
import { askUserData } from "./middlewares/askUserData.middlleware";
import { fetchUserData } from "./middlewares/fechUserData.middleware";
import { sessionMid } from "./middlewares/session.middleware";
import { MyContext } from "./types/context.type";
import handler from './handlers';
import { FileFlavor, hydrateFiles } from "@grammyjs/files";
import { nameConvo, schoolConvo, approvalConvo, feedbackConvo, cashOutConvo, adminConvo } from "./utiles/conversations";


export const io = require("socket.io")(3000, {
	cors: {
	  origin: [process.env.ADMIN_FRONT_END_URL],
	},
  })

io.on("connection", (socketio: { id: any; }) => {
	console.log(`connected to ${socketio.id}`);
});


export const bot = new Bot<MyContext>(process.env.BOT_TOKEN || '')

bot.api.config.use(hydrateFiles(bot.token));
bot.use(sessionMid)
bot.use(fetchUserData)
bot.use(conversations());
bot.use(createConversation(nameConvo));
bot.use(createConversation(schoolConvo));
bot.use(createConversation(approvalConvo));
bot.use(createConversation(feedbackConvo));
bot.use(createConversation(cashOutConvo));
bot.use(createConversation(adminConvo));
bot.use(askUserData)
bot.use(inviteMenu);
bot.use(registerMenu);
bot.use(feedbackmenu);
bot.use(handler)

bot.api.setMyCommands([
	{ command: "start", description: "Start the bot" },
    { command: "cancel", description: "To cancle conversation" },
	{ command: "register", description: "Register for tutorials" },
	{ command: "invite", description: "Invite people to get points" },
	{ command: "lang", description: "Change language" },
	{ command: "help", description: "Open help" },
	{ command: "contact", description: "Contact us" },
	]);
