import { Composer } from "grammy";
import helpinlinekb from "../keyboards/help.inline.keyboard";
import { MyContext } from "../types/context.type";
import { loc } from "../config/locales";
import { mainMenu, mainMenuamh } from "../keyboards/mainmenu.custom.keyboard";
import { PrismaClient } from "@prisma/client";
import { bot } from "../bot";
const prisma = new PrismaClient();


const composer = new Composer <MyContext> ();

composer.callbackQuery('approve', async (ctx)=>{
    if(ctx.msg){
        try {
        let tempText , tempId , tempUserDb , privateChannel;
        if (ctx.msg.photo || ctx.msg.document) {
            
            tempText = ctx.msg.caption || ''
            tempId = parseInt(tempText.slice(7 , tempText.indexOf("]")-1)) ;
            try {
                await ctx.editMessageCaption({ caption :`You approved user ${tempId}`})
            }catch(error){
                await ctx.reply(`<pre>Some ERROR occurred</pre>`, { parse_mode : "HTML" });
            }
        }
        
        else if (ctx.msg.text){
            tempText= ctx.callbackQuery.message?.text || '';
            tempId = parseInt(tempText.slice(7 , tempText.indexOf("]")-1)) ;
            try {
                await ctx.editMessageReplyMarkup({reply_markup: {inline_keyboard: [],},})
                await ctx.editMessageText(`You approved user ${tempId}`)
            }catch(error){
                await ctx.reply(`<pre>Some ERROR occurred</pre>`, { parse_mode : "HTML" });
            }
        }
        
        const student = await prisma.waitingListStudent.findFirst({where : {stusent_tg_Id : String(tempId)}});
            if (student){
                const tutor_class = await prisma.tutorialClass.findFirst({where : {stream : student.stream } })  
                const ivtlink = await bot.api.createChatInviteLink(Number( tutor_class?.class_tg_id),{member_limit: 1});
                    if( await bot.api.sendMessage(String(tempId), `<i>You are approved,use the following link to join. 
❗️ Beware this is a one time link </i>
    ---------------------
    <i>ክፍያዎት በትክክል ተፈጽሟል, ቲቶሪያል የሚሰጥበትን ቻናል ለመቀላቅል ከታች ያለዉን ሊንክ ይጠቀሙ. 
❗️ ማስጠንቀቂያ ይህ ሊንክ ለእርስዎ ብቻ ነው የሚያገለግለዉ ለሌላ ሰው አያጋሩ</i>
        ${ivtlink['invite_link']}`, {parse_mode : "HTML"} ) )
                    {
                        await prisma.registeredStudent.create({
                            data : {
                                classof : tutor_class?.name ?? 'd',
                                student : {
                                    connect : {
                                        tg_id : String(tempId)
                                    }
                                }
                            }
                        }   
                    )
                }
        }
        await prisma.waitingListStudent.delete({where:{stusent_tg_Id : String(tempId)}})
    }catch(err){
        await ctx.reply(`<pre>Some ERROR occurred, user maight not recived the link</pre>`, { parse_mode : "HTML" });
    }
    }
})


composer.callbackQuery('decline', async (ctx)=>{
    if(ctx.msg){
    let tempText , tempId , tempUserDb;

    if (ctx.msg.photo || ctx.msg.document) {
        
        tempText = ctx.msg.caption || ''
        tempId = parseInt(tempText.slice(7 , tempText.indexOf("]")-1)) ;

        try {
            await ctx.editMessageCaption({ caption :`You declined user ${tempId}`}) 
        }catch(err){
            await ctx.reply(`<pre>Some ERROR occurred</pre>`, { parse_mode : "HTML" });
        }
    }
    
    else if (ctx.msg.text){
        tempText= ctx.callbackQuery.message?.text || '';
        tempId = parseInt(tempText.slice(7 , tempText.indexOf("]")-1)) ;
        try {
            await ctx.editMessageReplyMarkup({ reply_markup: {inline_keyboard: [] }})
            await ctx.editMessageText(`You declined user ${tempId}`)
        }catch(error){
            await ctx.reply(`<pre>Some ERROR occurred</pre>`, { parse_mode : "HTML" });
        }
    }
    if(tempId) {
        try {
            await bot.api.sendMessage(tempId , `Your request is declined
----------------
ጥያቄዎት ተቀባይነት አላገኘም ፣ ክፍያውን በትክክል ይፈጽሙ  `)
await prisma.waitingListStudent.delete({where:{stusent_tg_Id : String(tempId)}})
        } catch (e){
            await ctx.reply(`<pre>Some ERROR occurred</pre>`, { parse_mode : "HTML" });
        }

    }
}})


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