import { PrismaClient } from "@prisma/client";
import { MyConversation, MyContext } from "../types/context.type";
import { approval, askPhoneNo } from "./functions";
import { cancelKeyboard } from "../keyboards/cancel.custom.keyboard";
import { mainMenuamh, mainMenu } from "../keyboards/mainmenu.custom.keyboard";


const prisma = new PrismaClient();

export async function nameConvo(conversation :MyConversation, ctx : MyContext) {
    let nameq = '' , schoolq = ''
    if(ctx.userData.lang == 'amh'){
        nameq =`ስምዎት ማን ይባላል ?`
        schoolq=`የትምህርት ቤትዎ ስም ማን ይባላል ?`

    }
    else if (ctx.userData.lang == 'eng'){
        nameq =`What is your name ?`
        schoolq=`What is your School's name ?`
    }

    await ctx.reply(nameq);
        ctx.userData.registered_name = await conversation.form.text()
        console.log(ctx.userData.registered_name)
    await ctx.reply(schoolq);
        ctx.userData.school = await conversation.form.text()
    askPhoneNo(ctx);    
}

export async function schoolConvo(conversation :MyConversation, ctx : MyContext) {
    let schoolq='' , nameq = '' ; 
    if(ctx.userData.lang == 'amh'){
        schoolq=`የትምህርት ቤትዎ ስም ማን ይባላል ?`
        nameq =`ስምዎት ማን ይባላል ?`
    }
    else if (ctx.userData.lang == 'eng'){
        schoolq=`What is your School's name ?`
        nameq =`What is your name ?`
    }
    
    do {
        await ctx.reply(nameq);
        ctx = await conversation.wait();
        
        if (ctx.message?.text === "/cancel") {
            await ctx.reply("Cancelled, leaving!");
            return;
        }
    } 
    while (!ctx.message?.text);
    
    if (ctx.message?.text){
        ctx.session.rname = ctx.message.text ;
    }
    do {
        await ctx.reply(schoolq);
        ctx = await conversation.wait();
        
        if (ctx.message?.text === "/cancel") {
            await ctx.reply("Cancelled, leaving!");
            return;
        }
    } 
    while (!ctx.message?.text);

    if (ctx.message?.text){
        ctx.session.schooln = ctx.message.text ;
    }
    askPhoneNo(ctx)
}


export async function approvalConvo(conversation : MyConversation, ctx : MyContext) {

    do {
        await ctx.reply("የከፈሉበትን ማረጋገጫ ስክሪንሹት(Screenshoot) ወይም የደረስኝ ፎቶ ይላኩ)!", {reply_markup :  cancelKeyboard});
        ctx = await conversation.wait();
        
        if (ctx.message?.text === "/cancel"|| ctx.message?.text === '❌ Cancel') {
            await ctx.reply("Cancelled, leaving!", {reply_markup : ctx.userData.lang=='amh' ?  mainMenuamh : mainMenu});
            return;
        }
    } 
    while (!ctx.message?.photo && !ctx.message?.document );



    try {
        
    if(ctx.message?.photo || ctx.message?.document){
        if(ctx.message?.photo) {
            if(await prisma.waitingListStudent.create({
                data : {
                    student : {
                        connect : {
                            tg_id : String(ctx.chat?.id)
                        }
                    },
                    bank_name : ctx.session.bank,
                    stream : ctx.session.stream,
                    caption : ctx.message.photo[0].file_id
                }
            })){
                await ctx.reply("ማረጋገጫዎ ተልኳል እስክናረጋግጥ ድረስ በትእግስት ይጠብቁ", {reply_markup : ctx.userData.lang == 'amh' ? mainMenuamh : mainMenu });
                await ctx.api.sendPhoto(Number(process.env.ADMIN_ONE), ctx.message.photo[0].file_id, { 
                    caption: `Id : [ ${ctx.chat?.id} ] 
        ➖➖➖➖➖➖➖➖➖➖
        Name : ${ctx.userData.registered_name}
        UserName : ${ctx.userData.username}
        Phone_No : ${ctx.userData. phone_number}
        Bank : ${ctx.session.bank}
        Stream : ${ctx.session.stream}
        ➖➖➖➖➖➖➖➖➖➖
        Caption : ${ctx.message.caption}
        ➖➖➖➖➖➖➖➖➖➖`
                , reply_markup : approval 
            }) 
            }
        }
        else if (ctx.message?.document){
            if(await prisma.waitingListStudent.create({
                data : {
                    student : {
                        connect : {
                            tg_id : String(ctx.chat?.id)
                        }
                    },
                    bank_name : ctx.session.bank,
                    stream : ctx.session.stream,
                    caption : ctx.message.document.file_id,
                }
            })){
                await ctx.reply("ማረጋገጫዎ ተልኳል እስክናረጋግጥ ድረስ በትእግስት ይጠብቁ", {reply_markup : ctx.userData.lang == 'amh' ? mainMenuamh : mainMenu });
                await ctx.api.sendDocument(Number(process.env.ADMIN_ONE) , ctx.message.document.file_id, { 
                    caption: `Id : [ ${ctx.chat?.id} ] 
        ➖➖➖➖➖➖➖➖➖➖
        Name : ${ctx.userData.registered_name}
        UserName : ${ctx.userData.username}
        Phone_No : ${ctx.userData. phone_number}
        Bank : ${ctx.session.bank}
        Stream : ${ctx.session.stream}
        ➖➖➖➖➖➖➖➖➖➖
        Caption : ${ctx.message.caption}
        ➖➖➖➖➖➖➖➖➖➖`
                , reply_markup : approval 
                }) 
            }
        }
    }
    }catch(err){
        await ctx.reply(`<pre>Some ERROR occurred</pre>ስህተት ተከስቷል, እባክዎ እንደገና ለመመዝገብ ይሞክሩ`, {reply_markup : ctx.userData.lang == 'amh' ? mainMenuamh : mainMenu, parse_mode : "HTML" });
    }
}

export async function cashOutConvo(conversation : MyConversation, ctx : MyContext) {

    do {
        await ctx.reply("ምን ያክል ብር ነው ማውጣት የፈለጉት ?");
        ctx = await conversation.wait();
        
        if (ctx.message?.text === "/cancel" || ctx.message?.text === '❌ Cancel') {
            await ctx.reply("Cancelled, leaving!", {reply_markup : ctx.userData.lang=='amh' ?  mainMenuamh : mainMenu});
            return;
        }
    } 
    while (!ctx.message?.text );
    let amount = ctx.message?.text

    do {
        await ctx.reply("የኢትዮጵያ ንግድ ባንክ ሂሳብ ቁጥርዎን ይላኩልን?");
        ctx = await conversation.wait();
        
        if (ctx.message?.text === "/cancel" || ctx.message?.text === '❌ Cancel') {
            await ctx.reply("Cancelled, leaving!", {reply_markup : ctx.userData.lang=='amh' ?  mainMenuamh : mainMenu});
            return;
        }
    } 
    while (!ctx.message?.text );
    let bankaccount = ctx.message?.text
    
   if( await ctx.api.sendMessage(Number(process.env.ADMIN_ONE) , `Id : [ ${ctx.chat?.id} ] 
➖➖➖➖➖➖➖➖➖➖
➖➖➖➖➖➖➖➖➖➖
➖➖➖➖➖➖➖➖➖➖
➖➖➖➖➖➖➖➖➖➖
 Name : ${ctx.userData.registered_name}
 UserName : ${ctx.userData.username}
 Phone_No : ${ctx.userData. phone_number}
 Invited  : ${ctx.refferalData.invited}
 Joined   : ${ctx.refferalData.payed}
 Current Balance :${((ctx.refferalData.payed)*22.5 - ctx.userData.credited)}
 Credited : ${ctx.userData.credited}
 +++++++++++++++++++
 BankAccount : ${bankaccount}
 Amount : ${amount}
➖➖➖➖➖➖➖➖➖➖` 
) ) {
    ctx.reply(`ጥያቄዎት ተልኳል, ምላሽ እስከምንሰጥዎ በትዕግስት ይጠብቁ ‼️`)
}
else {
    ctx.reply(`ጥያቄዎትን መላክ አልተቻለም እንደገና ይሞክሩ ‼️`)
}

}


export async function feedbackConvo (conversation : MyConversation, ctx : MyContext ){
    do {
        if(ctx.userData.lang == "eng")
            await ctx.reply("write down your feedback" , {reply_markup :  cancelKeyboard});
        else if (ctx.userData.lang == "amh")
            await ctx.reply("write down your feedback" , {reply_markup :  cancelKeyboard})
        ctx = await conversation.wait();

        if (ctx.message?.text === "/cancel" || ctx.message?.text === '❌ Cancel') {
            await ctx.reply("Cancelled, leaving!", {reply_markup : ctx.userData.lang=='amh' ?  mainMenuamh : mainMenu});
            return;
        }
        } while (!ctx.message?.text || ctx.message?.text == '❌ Cancel' );

        if(ctx.message?.text) {
            if (await prisma.feedback.create({
                data : {
                    first_name : ctx.from?.first_name ,
                    message_type : 'txt' ,
                    content : ctx.message.text 
                }
            })
            )
            if(ctx.userData.lang == "eng")
                await ctx.reply("Thank you for your helpfull feedback", {reply_markup : mainMenu});
            else if (ctx.userData.lang == "amh")
                await ctx.reply("አስተያየትዎን ተቀብለናል እናመሰግናለን ", {reply_markup : mainMenuamh})
        }
    }

export  async function adminConvo(conversation: MyConversation, ctx: MyContext) {
        do {
            await ctx.reply("Send me a userid ! or /cancel");
            ctx = await conversation.wait();
          
            if (ctx.message?.text === "/cancel" || ctx.message?.text === '❌ Cancel') {
                await ctx.reply("Cancelled, leaving!", {reply_markup : ctx.userData.lang=='amh' ?  mainMenuamh : mainMenu});
              return;
            }
          } while (!ctx.message?.text);

          const tempusId = ctx.message.text ;

          do {
            await ctx.reply("Send me the text message! or /cancel");
            ctx = await conversation.wait();
          
            if (ctx.message?.text === "/cancel") {
              await ctx.reply("Cancelled, leaving!");
              return;
            }
          } while (!ctx.message?.text);
          
          const tempmessage = ctx.message.text ;

          if (tempmessage && tempusId ){
            await ctx.api.sendMessage(tempusId , tempmessage)
          }
}