import  {InlineKeyboard, Keyboard } from "grammy";
import  { Menu} from "@grammyjs/menu";

export const langInlineKeyboard = new InlineKeyboard()
	.text("English" , "eng")
	.text("አማርኛ" ,"amh")
	.text("Oromo" , "oro") ;

export const inviteInlineKeyboard = new InlineKeyboard()
	.text("Share" , "shr").text("status" , "stt").row()
	.text("How does it work ?")    



export const selectStream = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖

    ▪️ Select your Stream . 
   
➖➖➖➖➖➖➖➖➖➖➖➖➖➖`

export const whichGrade = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖
 
▪️ Select your grade . 

➖➖➖➖➖➖➖➖➖➖➖➖➖➖
`
export const selectBank = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖
 
▪️ Which one of bank do you  prefer . 

➖➖➖➖➖➖➖➖➖➖➖➖➖➖`


export const bankText = `➖➖➖➖➖➖➖➖➖➖➖➖➖

▫️ Account Number : ${''}
▫️ Name : ${' '}
▫️ Amount : 50 ETB
➖➖➖➖➖➖➖➖➖➖➖➖➖ 
❇️ ክፍያውን ከፍለው ሲጨርሱ ተላልፏል የሚለውን ይጫኑ
`


