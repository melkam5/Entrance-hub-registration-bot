import { Menu } from "@grammyjs/menu";
import { PrismaClient } from "@prisma/client";
import { loc } from "../config/locales";
import { lan } from "../middlewares/fechUserData.middleware";
import { MyContext } from "../types/context.type";
import { ObjectKey } from "../types/loc.type";
import { isKeyObject } from "util/types";

const prisma = new PrismaClient();

const feedbackmenu = new Menu<MyContext>("feedback", { onMenuOutdated: "Updated, try now."})
    .text("◀️", async (ctx) => {
        if(ctx.session.feedbackState > 0){
            ctx.session.feedbackState = parseInt(ctx.update.callback_query.message?.reply_markup?.inline_keyboard[0][1].text ? ctx.update.callback_query.message?.reply_markup?.inline_keyboard[0][1].text : '0' ) - 1
            await updateFeedback (ctx);
        }
        else {
            ctx.session.feedbackState = 0
            await updateFeedback (ctx);
        }
    })
    .text(
        (ctx) => `${ctx.session.feedbackState}`,
        (ctx) => {}, 
    )
    .text("▶️",async  (ctx) => {
        const fs = parseInt(ctx.update.callback_query.message?.reply_markup?.inline_keyboard[0][1].text ? ctx.update.callback_query.message?.reply_markup?.inline_keyboard[0][1].text : '0' )
        if(fs < ctx.session.feedback-1){
            ctx.session.feedbackState = fs + 1
            await updateFeedback (ctx);
        }
        else {
            await ctx.answerCallbackQuery("end of feedbacks")
        }
    }).row()
    .text((ctx) => loc[ctx.userData.lang as ObjectKey].menu_leave_feedback , async (ctx) => {
            await ctx.conversation.enter("feedbackConvo");
        }).row();


async function updateFeedback (ctx : MyContext) {
    const fs = parseInt(ctx.update.callback_query?.message?.reply_markup?.inline_keyboard[0][1].text ? ctx.update.callback_query.message?.reply_markup?.inline_keyboard[0][1].text : '0' )
    
    let temptextDb = await prisma.feedback.findFirst({
        where : {
            index : ctx.session.feedbackState
        }})
    if (temptextDb){
        await ctx.editMessageText(`<< ${temptextDb.content}
From : ${temptextDb.first_name}`)
}}        

export default feedbackmenu ;