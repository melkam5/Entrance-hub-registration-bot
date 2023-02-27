import { Menu } from "@grammyjs/menu";
import { referalBonus } from "../config/botData";
import { loc } from "../config/locales";
import { lan } from "../middlewares/fechUserData.middleware";
import { MyContext } from "../types/context.type";
import { ObjectKey } from "../types/loc.type";

const inviteMenu = new Menu<MyContext>("invite-menu" , { onMenuOutdated: false })
    .submenu( loc[lan as ObjectKey].menu_get_post  , "how-it-works" ,async (ctx) => {
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].notify_langSelected})
        }).row()
    .text(loc[lan as ObjectKey].menu_cash_out, async (ctx)=>{
        if(referalBonus.minwith_value < ((ctx.refferalData.payed*referalBonus.point_valueBirr)*ctx.userData.credited )){
            await ctx.conversation.enter("cashOutConvo");
        }
        else {
            await ctx.answerCallbackQuery(loc[lan as ObjectKey].notify_insufficient)
    }
});

const subOfInviteMenu = new Menu<MyContext>("how-it-works")
    .text(loc[lan as ObjectKey].menu_forward_this, (ctx)=> {}).row()
    .back(loc[lan as ObjectKey].menu_back,async (ctx ) => {
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_invite_page(ctx) })}
    );

inviteMenu.register(subOfInviteMenu)    

export default inviteMenu ;