import { Composer } from "grammy";
import { loc } from "../config/locales";
import mainMenu from "../keyboards/mainmenu.custom.keyboard";
import { lan } from "../middlewares/fechUserData.middleware";
import { MyContext } from "../types/context.type";
import { ObjectKey } from "../types/loc.type";

const composer  = new Composer <MyContext> ();

composer.command('start', async (ctx)=>{
    await ctx.reply(loc[lan as ObjectKey].message_select_option , {reply_markup : mainMenu})
})


export default composer ;