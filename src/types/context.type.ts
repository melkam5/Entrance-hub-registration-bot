import { ConversationFlavor, Conversation } from "@grammyjs/conversations";
import { Context, SessionFlavor } from "grammy";
import { SessionData } from "./session.type";
import { RefferalInterface, UserDataInterface } from "./userData.type";

export type MyContext = Context & ConversationFlavor & { refferalData : RefferalInterface , userData: UserDataInterface; } & SessionFlavor<SessionData> 
export type MyConversation = Conversation<MyContext>;