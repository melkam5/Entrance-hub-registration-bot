import { Composer } from "grammy";
import { photoPyment, photoInvite, photoContact, messangeradmin } from "../config/botData";
import { loc } from "../config/locales";
import { askLanguage} from "../utiles/functions";
import feedbackmenu from "../keyboards/feedback.menu";
import helpinlinekb from "../keyboards/help.inline.keyboard";
import inviteMenu from "../keyboards/invite.menu";
import mainMenu from "../keyboards/mainmenu.custom.keyboard";
import registerMenu from "../keyboards/register.menu";
import { lan } from "../middlewares/fechUserData.middleware";
import { MyContext } from "../types/context.type";
import { ObjectKey } from "../types/loc.type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



const composer  = new Composer <MyContext> ();

composer.on("message:contact" , async (ctx)=>{
	
	if(!ctx.userData.phone_number){
		ctx.userData.phone_number=ctx.message.contact.phone_number
        await ctx.reply('Contact registerd ✔️ ', {
            reply_markup: mainMenu,
        });
        
	}
	
})


composer.on("message:text" , async (ctx)=>{
    if(ctx.msg.text == '❇️ Register'|| ctx.msg.text == '❇️ ለመመዝገብ' || ctx.msg.text == '/register' ) {
        if( await prisma.registeredStudent.findFirst({where : {stusent_tg_Id : ctx.chat.id}})) {
            await ctx.reply(loc[lan as ObjectKey].message_notify_registerd);
        }
        else if (await prisma.waitingListStudent.findFirst({where : {stusent_tg_Id : ctx.chat.id}})){
            await ctx.reply(loc[lan as ObjectKey].message_wait_forReview)
        }
        else {
            await ctx.api.sendPhoto(ctx.chat.id, photoPyment, { caption : loc[lan as ObjectKey].message_select_grade , reply_markup: registerMenu })
        }
    }
    else if(ctx.msg.text == '🧧 Invite' || ctx.msg.text == '🧧 ጋብዝ' || ctx.msg.text == '/invite' ) {
       
        await ctx.api.sendPhoto(ctx.chat.id , photoInvite , { caption : loc[lan as ObjectKey].message_invite_page(ctx), reply_markup: inviteMenu})
    }
    
    else if(ctx.msg.text == '🌐 Language' || ctx.msg.text =='🌐 ቋንቋ' || ctx.msg.text == '/lang' ) {
        await  askLanguage(ctx)
    }
    else if(ctx.msg.text == '📥 Contact us' || ctx.msg.text == '📥 አግኙን' || ctx.msg.text == '/contact' ) {
            await ctx.api.sendPhoto(ctx.chat.id, photoContact, { 
                caption: `📥 Contact us
 ➖➖➖➖➖➖➖➖➖➖➖➖➖

 ✍️ Inbox  : @EntranceHub_Admin
 💌 E-Mail : entrancehubtutorials@gmail.com
 📞 Call   : 0917318110
 ☎️ Call   : 0948398047
 🤖 Developer : @melkam_5
 `})
     
/*
 `📥 ያግኙን
 ➖➖➖➖➖➖➖➖➖➖➖➖➖
        
 ✍️ ለድጋፍ   : @EntranceHub_Admin
 💌 ኢ-ሜይል : entrancehubtutorials@gmail.com
 📞 ስልክ    : 0917318110
 ☎️ ስልክ    : 0948398047
 🤖 አበልጻጊ  : @melkam_5
 ` 
*/
            }

    else if(ctx.msg.text == '❓ Help' || ctx.msg.text == '❓ እርዳታ'|| ctx.msg.text == '/help' ) {
        await ctx.reply( loc.eng.message_helpmenu_one, {reply_markup : helpinlinekb});
    }
    else if (ctx.msg.text == '🖌 አስተያየት' || ctx.msg.text == '🖌 FeedBack'|| ctx.msg.text == '/help'){
        
        await ctx.reply( `<<ለማካበድ አደለም ግን ሶሻሎች history መጽሃፉን ማንበብ እንዴት እንደሚያስጠላ ታቁታላቹ🤮 black መሆኑ ብቻ በቂ ነው እና ቻናሉ ላይ ደግሞ 1ኛ በcolour ነው ሲቀጥል ደግሞ የማያስፈልጉት ዝባዝንኬዎች የሉትም ደሞ የ10 እና የ12ን አንድላይ የሚመሳሰለውን አንድላይ እያረገ የ11 እና የ9ንም በቅርብ እንለቃለን ብለዋል ይሄ ደሞ ጫናችንን በጣም ነው ሚያቀለው geo ደሞ እያንዳንዷን part በአማርኛም እያረጉ ያብራራሉ ይሄ ለሁሉም ትምህርት ነው በዛ ላይ ደሞ የ13 አመት የ entrance ጥያቄ ያሰራሉ (ለእያንዳንዱ unit) so ብትገቡ በጣም ታተርፋላቹ እኔ ደሞ ያልጠቀስኩት እናንተን ሊጠቅማቹ የሚችል ብዙ ነገር አለው የምር እኔም ቆይቼ ስለገባሁ በጣም ነው የቆጨኝ ብቻ ገብታቹ እዩት ውሸት አደለም❤️ (እናመሰግናለን 🙏)
From : kal `, {reply_markup : feedbackmenu})
            
        
    }
    else if (ctx.msg.text == 'admin8964' && ctx.chat.id == messangeradmin){
        if (ctx.chat.id == messangeradmin){
           await ctx.conversation.enter("adminConvo")
        }
    }

    else {
        await ctx.reply(loc[lan as ObjectKey].message_select_option , {reply_markup : mainMenu})
        /*'እባክዎ ከአማራጮቹ አንዱን ይምረጡ'*/
    }
})



export default composer ;