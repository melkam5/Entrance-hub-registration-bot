import { Menu } from "@grammyjs/menu";
import { referalBonus } from "../config/botData";
import { loc } from "../config/locales";
import { lan } from "../middlewares/fechUserData.middleware";
import { MyContext } from "../types/context.type";
import { ObjectKey } from "../types/loc.type";

const inviteMenu = new Menu<MyContext>("invite-menu" , { onMenuOutdated: false })
    .submenu("▫️ Get a post to forward " , "how-it-works" ,async (ctx) => {
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].notify_langSelected})
        }).row()
    .text("💰 Cash out", async (ctx)=>{
        if(referalBonus.minwith_value < ((ctx.userData.points-ctx.userData.credited )* referalBonus.point_valueBirr)){
            await ctx.conversation.enter("cashOutConvo");
        }
        else {
            await ctx.answerCallbackQuery("Insufficient balance")
    }
});

const subOfInviteMenu = new Menu<MyContext>("how-it-works")
    .text("⁉️ Forward the above post", (ctx)=> {}).row()
    .back("⬅️ Back ",async (ctx ) => {
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_invite_page(ctx) })}
    );

inviteMenu.register(subOfInviteMenu)    

export default inviteMenu ;