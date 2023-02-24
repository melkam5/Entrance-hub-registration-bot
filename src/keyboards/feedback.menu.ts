import { Menu } from "@grammyjs/menu";
import { FeedbackData } from "../dbModel";
import { MyContext } from "../types/context.type";

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
        let temptextDb
        temptextDb = (await FeedbackData.find({ indexx: ctx.session.feedbackState}))
    
        if (temptextDb){
            await ctx.editMessageText(`<< ${temptextDb[0].text}
    From : ${temptextDb[0].first_name}`)
    }}        

export default feedbackmenu ;