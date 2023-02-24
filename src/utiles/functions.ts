import { Keyboard, InlineKeyboard } from "grammy"
import { connect } from "mongoose"
import { cbe, coop, telebirr, cbebirr, awash, nib, cooppay, nibbirr } from "../config/bankData"
import { connection_url, admin_one, referalBonus } from "../config/botData"
import { FeedbackData } from "../dbModel"
import { MyContext, MyConversation } from "../types/context.type"

 

const phoneKeyboard = new Keyboard()
phoneKeyboard.requestContact("Share contact").resized()


export const approval = new InlineKeyboard()
    .text("Decline" , `decline`)
    .text("Approve" , `approve`)


export const langInlineKeyboard = new InlineKeyboard()
.text("English" , "eng")
.text("አማርኛ" ,"amh")

export async function askLanguage (ctx: MyContext) {
	
    await ctx.reply(` 👉 Please select your preferred language _
👉 እባክዎ የሚፈልጉትን ቋንቋ ይምረጡ _`
	, {
		reply_markup: langInlineKeyboard
	})
}

export async function askPhoneNo(ctx : MyContext) {
    await ctx.reply('Please share your contact _' , {
        reply_markup : phoneKeyboard
    })
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


