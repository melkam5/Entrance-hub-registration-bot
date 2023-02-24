
/********
 * Keyboards
 */

import { Keyboard, InlineKeyboard } from "grammy"
import { connect } from "mongoose"
import { cbe, coop, telebirr, cbebirr, awash, nib, cooppay, nibbirr } from "./config/bankData"
import { connection_url, admin_one, referalBonus } from "./config/botData"
import { FeedbackData } from "./dbModel"
import { MyContext, MyConversation } from "./types/context.type"

 

const phoneKeyboard = new Keyboard()
phoneKeyboard.requestContact("Share contact").resized()

const phoneKeyboardamh = new Keyboard()
phoneKeyboardamh.requestContact("ስልክ አጋራ").resized()

const locKeyboard = new Keyboard()
locKeyboard.requestLocation("Share location").resized()

const locKeyboardamh = new Keyboard()
locKeyboardamh.requestLocation("አድራሻ አጋራ").resized()

const approval = new InlineKeyboard()
    .text("Decline" , `decline`)
    .text("Approve" , `approve`)


export const langInlineKeyboard = new InlineKeyboard()
.text("English" , "eng")
.text("አማርኛ" ,"amh")

export const inviteInlineKeyboard = new InlineKeyboard()
.text("Share" , "shr").text("status" , "stt").row()
.text("How does it work ?")    



export const selectStream = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖

⁉️ Select your Stream . 

➖➖➖➖➖➖➖➖➖➖➖➖➖➖`

export const selectStreamamh = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖

⁉️ የትምህርት ዘርፍዎትን ይምረጡ 

➖➖➖➖➖➖➖➖➖➖➖➖➖➖`

export const whichGrade = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖

⁉️ Select your grade . 

➖➖➖➖➖➖➖➖➖➖➖➖➖➖
`
export const whichGradeamh = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖

⁉️ የክፍል ደረጃዎትን ይምረጡ  

➖➖➖➖➖➖➖➖➖➖➖➖➖➖
`
export const selectBank = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖

⁉️ Which one of bank do you  prefer . 

➖➖➖➖➖➖➖➖➖➖➖➖➖➖`

export const selectBankamh = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖

⁉️ ከሚከተሉት ዉስጥ ለክፍያ የሚፈልጉትን ባንክ ይምረጡ . 

➖➖➖➖➖➖➖➖➖➖➖➖➖➖`

export const dataclearedamh = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖

⁉️ መረጃዎ ተሰርዞል 

➖➖➖➖➖➖➖➖➖➖➖➖➖➖`

export const datacleared = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖

⁉️ your data is cleared  

➖➖➖➖➖➖➖➖➖➖➖➖➖➖`


export const bankText = `➖➖➖➖➖➖➖➖➖➖➖➖➖

▫️ Account Number : ${''}
▫️ Name : ${' '}
▫️ Amount : 150 ETB
➖➖➖➖➖➖➖➖➖➖➖➖➖ 
❇️ ክፍያውን ከፍለው ሲጨርሱ ተላልፏል የሚለውን ይጫኑ
`


/****************************************** */

export async function askLanguage (ctx: MyContext) {
	
    await ctx.reply(` 👉 Please select your preferred language _
👉 እባክዎ የሚፈልጉትን ቋንቋ ይምረጡ _`
	, {
		reply_markup: langInlineKeyboard
	})
}

export async function askPhoneNo(ctx : MyContext) {
    if(ctx.userData.lang == 'amh'){
        await ctx.reply('እባክዎ ስልክዎትን ያጋሩን _' , {
            reply_markup : phoneKeyboardamh
        })}
    else if(ctx.userData.lang == 'eng'){
        await ctx.reply('Please share your contact _' , {
            reply_markup : phoneKeyboard
        })}
    
}

export async function askLocation (ctx : MyContext) {
    if(ctx.userData.lang == 'eng'){
	    await ctx.reply("Please share your location _" , {reply_markup : locKeyboard})
    }
    else if(ctx.userData.lang == 'amh'){
	    await ctx.reply("እባክዎ አድራሻዎትን ያጋሩ _" , {reply_markup : locKeyboardamh})
    }
}

export function getBankData(bname : string , ctx :MyContext ){
    let bank, textamh, texteng
    if(bname == 'cbe')
        bank=cbe
    else if(bname == 'coop')
        bank=coop
    else if(bname == 'telebirr')
        bank=telebirr
    else if(bname == 'cbebirr')
        bank=cbebirr
    else if(bname == 'awash')
        bank=awash
    else if(bname == 'nib')
        bank=nib
    else if(bname == 'cooppay')
        bank=cooppay
    else if(bname == 'nibbirr')
        bank=nibbirr
    if(bank) {
        textamh = `➖➖➖➖➖➖➖➖➖➖➖➖➖
▫️ የባንክ ሂሳብ ቁጥር : ${bank.accNumber}
▫️ ስም : ${bank.accName}
▫️ የገንዘብ መጠን : ${referalBonus.tutor_price} ETB
➖➖➖➖➖➖➖➖➖➖➖➖➖ 
❇️ ክፍያውን ከፍለው ሲጨርሱ ተላልፏል የሚለውን ይጫኑ
       `
        texteng =`➖➖➖➖➖➖➖➖➖➖➖➖➖
▫️ Account Number : ${bank.accNumber}
▫️ Name : ${bank.accName}
▫️ Amount : ${referalBonus.tutor_price} ETB
➖➖➖➖➖➖➖➖➖➖➖➖➖ 
❇️ ክፍያውን ከፍለው ሲጨርሱ ተላልፏል የሚለውን ይጫኑ
       `
        if(ctx.userData.lang == 'eng')
            return(texteng)
        else if(ctx.userData.lang == 'amh')
            return (textamh)
    }

}

export async function connectDataBase() {
    console.log(`......`)
    try {
        await connect(connection_url);
        console.log("Connected to mongoDB");
        }
        
    catch (error) {
        console.error(error);
    }
}


/***************************************** */

/********************************* convos  */
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
            if(await ctx.api.sendPhoto(admin_one, ctx.message.photo[0].file_id, { 
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
        })){
            ctx.userData.registered = 0 ;
            await ctx.reply("ማረጋገጫዎ ተልኳል እስክናረጋግጥ ድረስ በትእግስት ይጠብቁ")
        }}
        
        else if (ctx.message?.document){

        if(await ctx.api.sendDocument(admin_one , ctx.message.document.file_id, { 
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
        })){
            ctx.userData.registered = 0 
            await ctx.reply("ማረጋገጫዎ ተልኳል እስክናረጋግጥ ድረስ በትእግስት ይጠብቁ")
        }}
        /*
        else if (ctx.message?.text){
            await ctx.api.sendMessage(admin_one , `Id : [ ${ctx.chat?.id} ] 
    ➖➖➖➖➖➖➖➖➖➖
    Name : ${ctx.userData.registered_name}
    UserName : ${ctx.userData.username}
    Phone_No : ${ctx.userData. phone_number}
    Bank : ${ctx.session.bank}
    Stream : ${ctx.session.stream}
    ➖➖➖➖➖➖➖➖➖➖
    Transaction_Id : ${ctx.message.text}
    ➖➖➖➖➖➖➖➖➖➖` 
        , {reply_markup : approval
        })}*/
        
    }
}
/********************************* */

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
 Invited  : ${ctx.userData.invited.length-1}
 Joined   : ${ctx.userData.payed.length-1}
 Current Balance :${((ctx.userData.payed.length-1)*22.5 - ctx.userData.credited)}
 Credited : ${ctx.userData.credited}
 +++++++++++++++++++
 BankAccount : ${bankaccount}
 Amount : ${amount}
➖➖➖➖➖➖➖➖➖➖` 
)}



/********************************** */

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

        if(ctx.message?.text)
            await new FeedbackData({
                indexx : ctx.session.feedback,
                first_name: ctx.from?.first_name ,
                text : ctx.message.text,
                typ : 'txt'
            }).save() 
            await ctx.reply("አስተያየትዎን ተቀብለናል እናመሰግናለን ")
        /*if(ctx.message?.audio){
            await new FeedbackData({
                indexx : ctx.session.feedback,
                first_name: ctx.from?.first_name ,
                text : ctx.message.text,
                typ : 'aud'
            }).save() 
            await ctx.reply("አስተያየትዎን ተቀብለናል እናመሰግናለን ")
            */
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

    
/********************************* */
/*
    */

export const helpmenu1 = `‼️ወደ Entrance Hub Ethiopia ለመዝገብ ምን ምን ያስፈልገኛል❓ 

🥇ኛ ፣  ወደ Entrance hub ትምህርት ቤት ለመቀላቀል ሲያስቡ ፣ በቀዳሚነት ለመማር ፣ ለማወቅ ፣ ለመሸለም ዝግጁ መሆኖን ያረጋግጡ‼️

🎁እኛ ጋር መማር ያሸልማል ፣ የእውቀቶ አድማስ ከፍ ባለ ቁጥር የመሸለም ደረዳዎ በእጥፍ ይደረጃል።  ምክንያቱም በ Entrance Hub ማወቅ ብቻም ሳይሆን ፈጣሪም ትውልድ ለመፍወር ተግተን እንሰራለን ። 

🥈ኛ ፣ Entrance hub Ethiopia ለመቀላቀል ሲያስቡ ፣ በ2ኛ ደረጃ የግሎ ደብተር ወይም ደግሞ ማስታወሻ መያዞን አይርሱ‼️

🏆እኛ ልዩ ነን የምንለው በምክኒያት ነው ‼️ ምክንያቱም በእኛ ብቻ የምታገኟቸው ልዩ የማስታወሻ ፣ Trick እና Formula ይኖራሉ እና በተገቢው መልኩ ማስታወሻ ላይ ሊሰፍሩ ይገባል ❗️

🥉ኛ ፡ ወደ Entrance Hub የትምህርት ማዕከል ለመቀላቀል 150 ብር ቅድሚያ መክፈል ይኖርቦታል ።
በዚህ መሰረት ፣ ለ Tutorial ወይም ደግሞ ለትምህርቶ  ከ9ኛ እስከ 12ኛ በ3ቱም የትምህርት አሰጣጥ ማለትም በቪድዮ ፣ በድምጽ ፣ በTelegraph ለመከታተል 100 ብር ሲሆን የኢትዮጵያ Entrance Examination ወይም ደግሞ የዩንቨርሲቲ መግቢያ ፈትና ከ1990 እስከ 2015 ዓ.ም ሙሉ Exam book እና የ10ኛ የPreparatory መግቢያ ፈትና ከ 1995_2009 ዓ.ም Exam book ሁሉንም በአንድ ላይ ለማግኘት 50 ብር እንዲከፍሉ  እናሳስባለን ‼️

‼️እርሶ የከፈሉት 150 ብር ትምህርት ከተጀመረበት ሰዓት ጀምሮ ለ3 ወር በተከታታይ Tutorial ለመከታተል እና በተጨማሪም የዩኒቨርሲቲ መግቢያ እና የመሰናዶ መግቢያ ፈተናዎች ከ1 ወር ቀደም ብሎ ከላይ የተጠቀሱት ዓ.ም ሁሉንም እስከ የ2015 የዩንቨርሲቲ መግቢያ ፈትና ቀን ድረስ ይቀርባል።

4️⃣ኛ ፡ ወደ Entrance Hub የትምህርት ማዕከል ለመቀላቀል ሲያስቡ ፣ ህልሞ እውን እንደሚሆን እርግጠኛ መሆን ይቻላሉ። Entrance Hub መማር እና ማስተማር ብቻም ሳይሆን ለሁሉም የኢትዮጵያ ተማሪዎች ስራን ይፈጥራል ። 

❗️ወደ Entrance Hub የትምህርት ማዕከል በመጋበዝ ብቻ የፈለጉት የብር መጠን ያህል ተከፋይ ይሆናሉ ። በስራዎት ልክ የመከፈል አቅሞን በማሳደግ በትምህርትም ብቻም ሳይሆን በገንዘብም ብቁ ሃብታም ለማድረግ ተግተን እንሰራለን ‼️ ወደ እኛ ተማሪን ሲጋብዙ በአንድ ተማሪ በአማካኝ ከ15% በላይ ይከፈሎታል ። ❗️በዚህ መሰረት 100 ተማሪዎችን ወደ እኛ ቢጋብዙ ከ2000 ብር በላይ ወዲያውኑ በባንክ አካውንቶ እናስገባሎታለን። እርሶ ምንም ሳይደክሙ በትምህርት ቤት ፣ በYou tube ፣ በቴሌግራም ፣ በባነር በመስራት ወዳጅ ዘመዶን በመጋበዝ ሽልማቶን ይቀበላሉ።

መልካም የትምህርት ዘመን እንዲሆንሎት ከወዲሁ እንመኛለን ‼️
💯Entrance hub Ethiopia 💯
` 
export const helpmenu2 = `ወደ Entrance Hub Ethiopia እንዴት መመዝገብ እችላለሁ❓‼️

🎁ወደ Entrance Hub ለመዝገብ ዝግጁ ሲሆኑ እነኝህን የመመዝገቢያ መንገዶችን ቢያከናውን ይበልጥ ይመከራል ። 

1️⃣ኛ ፡ ለEntrance Hub አዲስ ከሆኑ በTelegram Search bar ላይ @EntrnaceHubEthiopia ብለው ሲፈልጉ በመጀመርያ ላይ የሚመጣው ቻናል ፣ በመቀላቀል ቀን በቀን ስለ Entrance Hub Ethiopia የሚለቀቁትን መረጃ በመከታተል ምዝገባውን መፈጸም ይችላሉ።  

2️⃣ኛ፡ ቀጥታ ከመመዝገቢያው የEntrance Hub payment bot ውስጥ በመግባት እነኝህን መንገዶች በመገንዘብ ምዝገባውን መፈጸም ይችላሉ ። 

🥇ኛ ፡ እሄንን Bot በቅድሚያ  @Entrancehub_payment_bot "Start " ይሉታል ። 
በመቀጠል ከሚመጡት አማራጮች መካከል 
"ቋንቋ ይምረጡ" ፣ አማርኛ ፣ English አልያም ደግሞ Afaan Oromo ከሚሉት ውስጥ ይፈልጉትን ቋንቋ ይመርጣሉ ። 

🖊️እኛ ለ ማስተማሪያ አማርኛን መርጠናል ። ቀጥሎ ከሚመጣሎት አማራጮች ስም እና አድራሻ ይጠይቆታል እና በተከታታይ በጥያቄው አማራጭ መሰረት ሙሉ ስሞን እና ትምህርት ቤቶን ያስገባሉ ። 

✒️በመቀጠል በተከታታይ  ስልክ ቁጥሮን እና አድራሻዎን ያጋሩ የሚለውን ቅጽ በመንካት ፣ ስልክ ቁጥሮን እና አድራሻዎትን ያስመዘግባሉ ‼️

በመቀጠል ፣ አሁን ወደ መጨረሻ የመመዝገቢያ ቅጽ ላይ ደርሰናል ‼️ 

‼️በቅድሚያ ❗️ለመዝገብ❗️ የሚለውን Botton እንመልከት። 

❗️ለመዝገብ ሲፈልጉ ፣ ለመዝገብ የሚለውን ቅጽ ይነካሉ ፣ በመቀጠል  የክፍል ደረጃዎትን ይምረጡ የሚል ቅጽ ይመጣል ። Grade 12 የሚለውን በመንካት የትምህርት ዘርፎን ይመርጣሉ ። የተፈጥሮ ሳይንስ እና የማህበራዊ ሳይንስ ከሚሉት ውስጥ የእርሶን የትምህርት ዘርፍ ❗️ሲነኩ ❗️ የክፍያ አማራጮች ይማጣሎታል‼️  በፈለጉት የክፍያ አማራጮችን በመንካት ❗️ተላልፏል❗️ የሚለውን ቅጽ Click ያደርጉ እና 150 ብር የከፈሉበት ደረሰኝ አልያም Transcription Number ይልኩታል። ከእናንተ የሚጠበቀውን ነገር ሁሉም አከናወነዋል ‼️ 🥰
 እኛ አረጋግጠን ፣ ❗️በ5 ደቂቃ❗️ ውስጥ የመግቢያ Link እንልክሎታለን። 

❗️ልብ በሉ ፣ የሚላክሎት Link ለእርሶ ብቻ ነው ‼️ ወደ ሌላ Forward ከተደረገ ፣  አልያም ፣ ሌላ ተማሪ ከገባበት እርሶ ደግመው እኛን መጠየቅ አይችሉም ‼️`

export const helpmnu3 =`‼️Entrance hub galma'uf Mal maltu nu barbachisaa ⁉️

1⃣mana barumsaa Entrance hub  misensaa ta'uuf yoo fetaan  jalqabaa : barachuuf,bekuu fi badhafamuuf  qophii ta'uu keessaan mirkaneffadhaa‼️

😎Nuu waliin yoo barataan ni badhafamtuu waan ta'eef,sadarkaa bekkumsaa kessaan akkuma dabala demuun sadarkaan badhaasa kessaniis dachaan dabalaa deema.   sababnii isaas Entarance hubin bekuu qofaa osoo hin tanee dhalotaa 'creative' ta'ee ijaruuf halkaani guyyaa hojjennaa 
2⃣ Miseensaa ta'uu yoo fetaan dabtaraa yadannoo qabachuu hin dagatinaa‼️
✅mannii barumsaa kenyaa hundaa callaa kan jennuu sababa fii,sababnii isaas  nuu biraa qofattii kan argattaan yadannowan addaa addaa,trick fi formula ni jiruu waan ta'eef kanafuu dabtaraa yadannoo kessan irraattii qabachuun barbachisadhaa
 3⃣ Miseensaa entrance hub ta'uuf jalqabaa qarshii 150 isiin kafalchisaa  : kana jechuun keenya tutorialif kutaa 9-12  bifaa sadiin jechunis videon ,audio fii bifaa barrefaman kennuuf qarshii 100 yoo ta'uu ,akkasumas qormataa biyyolessaa kutaa 10 baraa 1995-2009 fi qormata biyyolessaa sensaa university dalaguf qarshii 50 isiin kafachisaa

‼️ qarshii isiin yeroo jalqabaf kafaltan  barumsii egalamee batiwwaan walittii anan sadiif  tutorial  Fi qormataa biyyolessaa waliin nu dalagsisaa 

 4⃣  entrance hub yoo miseensaa taatan kayyoo fi  abjuun kessan akkaa dhugomuu hin yadda'inaa. Entrance hub  barumasaa qofaa osoo hin tanee barattoota isattiif hojiin ni waan banuuf .
❗️hiriyotaa keessaa garaa mana barnotaa online Entrance hub afferudhan   badhafamtotaa ni ta'uu jechuu dha. hojiin keessanin  sadarkaa badhasaa kessanii guddifachuun barumsaa qofaan osoo hin taane  qarshidhaniis  duressaa isiin  tasisuuf halkaniif guyyaa ni hojjennaa . garaa chanali Barnoota kenyaa yemmuu misensaa nuuf affertaan gidduugalessan baratattii 15% isiinif kafalamaa ❗️.halumaa kanan barataa 100 yemmuu affertan qarshii 2000 Fi isaa ol karaa accounti bankii  kessanitin isiin badhafnaa .❗️kottaa❗️  osoo homaa hin dadhabin  ,mana barumsattii ,YouTube kessanin , telegrami fi banarii keessaan fayadamu dhan hiriyotaa kessaan afferun badhafama ta'aa 

Baraa barnotaa garii akkaa isiinif ta'uuf asuman hawwii keenya ibsinaa    🔆🔅🔅
💯Entrance hub Ethiopia 💯 filannoo jalqabatii`