import { Menu } from "@grammyjs/menu";
import { MyContext } from "../types/context.type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const feedbackmenu = new Menu<MyContext>("feedback", { onMenuOutdated: "Updated, try now."})
    .text("◀️", async (ctx) => {
        if(ctx.session.feedbackState > 0){
            ctx.session.feedbackState = ctx.session.feedbackState - 1
            await updateFeedback (ctx);
        }
        else {
            ctx.session.feedbackState = 0
        }
    })
    .text(
        (ctx) => `${ctx.session.feedbackState}`,
        (ctx) => {}, 
    )
    .text("▶️",async  (ctx) => {
        if(ctx.session.feedbackState < ctx.session.feedback-1){
            ctx.session.feedbackState = ctx.session.feedbackState + 1
            await updateFeedback (ctx);
        }
        else {
            ctx.session.feedbackState = ctx.session.feedbackState-1
            await updateFeedback (ctx)
        }
    }).row()
    .text("Leave your feedback ", async (ctx) => {
            await ctx.conversation.enter("feedbackConvo");
        }).row();


async function updateFeedback (ctx : MyContext) {

    let temptextDb = await prisma.feedback.findFirst({
        where : {
            index : ctx.session.feedbackState
        }})
    if (temptextDb){
        await ctx.editMessageText(`<< ${temptextDb.content}
From : ${temptextDb.first_name}`)
}}        

export default feedbackmenu ;