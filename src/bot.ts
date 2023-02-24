import { conversations, createConversation } from "@grammyjs/conversations";
import { Bot } from "grammy";
import { connectDataBase, nameConvo, schoolConvo, approvalConvo, feedbackConvo, cashOutConvo, adminConvo } from "./utiles/utiles";
import feedbackmenu from "./keyboards/feedback.menu";
import inviteMenu from "./keyboards/invite.menu";
import registerMenu from "./keyboards/register.menu";
import { askUserData } from "./middlewares/askUserData.middlleware";
import { fetchUserData } from "./middlewares/fechUserData.middleware";
import { sessionMid } from "./middlewares/session.middleware";
import { MyContext } from "./types/context.type";
import handler from './handlers'



connectDataBase()
export const bot = new Bot<MyContext>(process.env.BOT_TOKEN || '')


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

/*
 uprove decline meddleware
*/
bot.use(handler)

// bot.catch(Bot);

bot.api.setMyCommands([
	{ command: "start", description: "Start the bot" },
    { command: "cancel", description: "To cancle conversation" },
	{ command: "register", description: "Register for tutorials" },
	{ command: "invite", description: "Invite people to get points" },
	{ command: "lang", description: "Change language" },
	{ command: "help", description: "Open help" },
	{ command: "contact", description: "Contact us" },
	]);
