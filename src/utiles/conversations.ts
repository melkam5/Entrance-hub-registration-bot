import { PrismaClient } from "@prisma/client";
import { admin_one } from "../config/botData";
import { MyConversation, MyContext } from "../types/context.type";
import { askPhoneNo } from "./functions";
import { io } from "../bot";


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
        await ctx.reply("የከፈሉበትን ማረጋገጫ ስክሪንሹት(Screenshoot) ወይም የደረስኝ ፎቶ ይላኩ)!");
        ctx = await conversation.wait();
        
        if (ctx.message?.text === "/cancel") {
            await ctx.reply("Cancelled, leaving!");
            return;
        }
    } 
    while (!ctx.message?.photo && !ctx.message?.document );
    
    if(ctx.message?.photo || ctx.message?.document){
        if(ctx.message?.photo) {
            if(await ctx.api.sendPhoto(2007481788, ctx.message.photo[0].file_id)){
                if(await prisma.waitingListStudent.create({
                    data : {
                        student : {
                            connect : {
                                tg_id : ctx.chat?.id
                            }
                        }
                    }
                }))
                io.on("connection", (socketio: { id: any; }) => {
                    console.log("''''");
                });
                  
            await ctx.reply("ማረጋገጫዎ ተልኳል እስክናረጋግጥ ድረስ በትእግስት ይጠብቁ")
        }}
        
        else if (ctx.message?.document){
            if(await ctx.api.sendDocument(2007481788, ctx.message.document.file_id)){
                if(await prisma.waitingListStudent.create({
                    data : {
                        student : {
                            connect : {
                                tg_id : ctx.chat?.id
                            }
                        }
                    }
                }))

            await ctx.reply("ማረጋገጫዎ ተልኳል እስክናረጋግጥ ድረስ በትእግስት ይጠብቁ")
        }}
    }
}

export async function cashOutConvo(conversation : MyConversation, ctx : MyContext) {

    do {
        await ctx.reply("ምን ያክል ብር ነው ማውጣት የፈለጉት ?");
        ctx = await conversation.wait();
        
        if (ctx.message?.text === "/cancel") {
            await ctx.reply("Cancelled, leaving!");
            return;
        }
    } 
    while (!ctx.message?.text );
    let amount = ctx.message?.text

    do {
        await ctx.reply("የኢትዮጵያ ንግድ ባንክ ሂሳብ ቁጥርዎን ይላኩልን?");
        ctx = await conversation.wait();
        
        if (ctx.message?.text === "/cancel") {
            await ctx.reply("Cancelled, leaving!");
            return;
        }
    } 
    while (!ctx.message?.text );
    let bankaccount = ctx.message?.text


    let approveAdmin = admin_one;
    
    await ctx.api.sendMessage(admin_one , `Id : [ ${ctx.chat?.id} ] 
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
)}


export async function feedbackConvo (conversation : MyConversation, ctx : MyContext ){
    do {
        if(ctx.userData.lang == "eng")
            await ctx.reply("write down your feedback");
        else if (ctx.userData.lang == "amh")
            await ctx.reply("አስተያየትዎን ከስር ጻፉ ");
        
        ctx = await conversation.wait();

        if (ctx.message?.text === "/cancel") {
            await ctx.reply("Cancelled, leaving!");
            return;
        }
        } while (!ctx.message?.text );

        if(ctx.message?.text) {
            if (await prisma.feedback.create({
                data : {
                    first_name : ctx.from?.first_name ,
                    message_type : 'txt' ,
                    content : ctx.message.text 
                }
            })
            )
            await ctx.reply("አስተያየትዎን ተቀብለናል እናመሰግናለን ")
        }
    }

export  async function adminConvo(conversation: MyConversation, ctx: MyContext) {
        do {
            await ctx.reply("Send me a userid ! or /cancel");
            ctx = await conversation.wait();
          
            if (ctx.message?.text === "/cancel") {
              await ctx.reply("Cancelled, leaving!");
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