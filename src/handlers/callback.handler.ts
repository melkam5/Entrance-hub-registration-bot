import { Composer } from "grammy";
import helpinlinekb from "../keyboards/help.inline.keyboard";
import { MyContext } from "../types/context.type";
import { loc } from "../config/locales";
import { mainMenu, mainMenuamh } from "../keyboards/mainmenu.custom.keyboard";


const composer = new Composer <MyContext> ();

composer.callbackQuery('whatneed' , async(ctx)=>{
    await ctx.editMessageText(loc.eng.message_helpmenu_one )
    await ctx.editMessageReplyMarkup( {reply_markup : helpinlinekb})
})
composer.callbackQuery('howtoregister' , async(ctx)=>{
    await ctx.editMessageText(loc.eng.message_helpmenu_two)
    await ctx.editMessageReplyMarkup( {reply_markup : helpinlinekb})
}) 
composer.callbackQuery('whatneedoro', async(ctx)=>{
    await ctx.editMessageText(loc.eng.message_helpmenu_tree)
    await ctx.editMessageReplyMarkup( {reply_markup : helpinlinekb})
})

composer.callbackQuery(['eng', 'amh'], async (ctx) => {
    if(ctx.userData.lang == 'eng' && ctx.match == 'amh') {
        await ctx.reply('ወደ አማርኛ ቀይረዋል' , {reply_markup : mainMenuamh})
    }
    else if(ctx.userData.lang == 'amh' && ctx.match == 'eng') {
        await ctx.reply('Language changed to English' , {reply_markup : mainMenu})
    }

    if(ctx.match == 'eng' || ctx.match == 'amh') {
        ctx.userData.lang = ctx.match ;
        if(ctx.match == 'eng')
            await ctx.answerCallbackQuery("English is selected");
        else if(ctx.match =='amh')
            await ctx.answerCallbackQuery('አማርኛ ተመርጧል');
        
    }
})


export default composer ;