import { NextFunction, InlineKeyboard } from "grammy";
import { bot } from "../bot";
import { public_channel, public_channel_link } from "../config/botData";
import { loc } from "../config/locales";
import { askLanguage, askPhoneNo } from "../functions";
import { MyContext } from "../types/context.type";
import { ObjectKey } from "../types/loc.type";
import { lan } from "./fechUserData.middleware";


export const askUserData = async (ctx: MyContext, next: NextFunction) => {
    if ( ctx.message?.text?.startsWith('/start ehr') ||ctx.update.callback_query || ctx.message?.contact || ctx.userData.tg_id == 1784535518 || (ctx.userData.lang && ctx.userData.phone_number && ctx.chat?.id && ((await bot.api.getChatMember(public_channel|| '', ctx.chat?.id)).status =='member') ) )      
        await next();
        
    if(ctx.userData.lang == '') 
        await askLanguage(ctx);

    else if ((ctx.userData.school == '' ) && (ctx.userData.registered_name) == '') 
        await ctx.conversation.enter("schoolConvo");
    
    else if (ctx.userData.phone_number == '')
        await askPhoneNo(ctx);
    
    else if ( ctx.chat?.id && (await bot.api.getChatMember(public_channel , ctx.chat?.id)).status != 'member')  {
        ctx.reply(loc[lan as ObjectKey].message_invite_join(ctx) , {
            reply_markup : new InlineKeyboard().url("join", public_channel_link ) 
            }
        )
    }
}