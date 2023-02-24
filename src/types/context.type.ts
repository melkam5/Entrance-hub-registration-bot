import { ConversationFlavor, Conversation } from "@grammyjs/conversations";
import { Context, SessionFlavor } from "grammy";
import { SessionData } from "./session.type";
import { UserDataInterface } from "./userData.type";

export type MyContext = Context & ConversationFlavor & { userData: UserDataInterface; } & SessionFlavor<SessionData> 
export type MyConversation = Conversation<MyContext>;