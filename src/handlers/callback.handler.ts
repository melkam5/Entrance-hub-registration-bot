import { Composer } from "grammy";
import { helpmenu1, helpmenu2, helpmnu3 } from "../functions";
import helpinlinekb from "../keyboards/help.inline.keyboard";
import mainMenu from "../keyboards/mainmenu.custom.keyboard";
import { MyContext } from "../types/context.type";


const composer = new Composer <MyContext> ();

composer.callbackQuery('whatneed' , async(ctx)=>{
    await ctx.editMessageText(helpmenu1 )
    await ctx.editMessageReplyMarkup( {reply_markup : helpinlinekb})
})
composer.callbackQuery('howtoregister' , async(ctx)=>{
    await ctx.editMessageText(helpmenu2)
    await ctx.editMessageReplyMarkup( {reply_markup : helpinlinekb})
}) 
composer.callbackQuery('whatneedoro', async(ctx)=>{
    await ctx.editMessageText(helpmnu3)
    await ctx.editMessageReplyMarkup( {reply_markup : helpinlinekb})
})

composer.callbackQuery(['eng', 'amh'], async (ctx) => {
    if(ctx.userData.lang == 'eng' && ctx.match == 'amh') {
        await ctx.reply('ወደ አማርኛ ቀይረዋል' , {reply_markup : mainMenu})
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