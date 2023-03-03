import { Composer } from "grammy";
import { loc } from "../config/locales";
import { lan } from "../middlewares/fechUserData.middleware";
import { MyContext } from "../types/context.type";
import { ObjectKey } from "../types/loc.type";
import { mainMenuamh, mainMenu } from "../keyboards/mainmenu.custom.keyboard";

const composer  = new Composer <MyContext> ();

composer.command('start', async (ctx)=>{
    await ctx.reply(loc[lan as ObjectKey].message_select_option , {reply_markup :ctx.userData.lang=='amh' ? mainMenuamh : mainMenu, parse_mode: "HTML" })
})

composer.command("cancel", async (ctx) => {
    await ctx.conversation.exit();
});

export default composer ;