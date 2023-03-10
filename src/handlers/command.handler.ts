import { Composer } from "grammy";
import { loc } from "../config/locales";
import { lan } from "../middlewares/fechUserData.middleware";
import { MyContext } from "../types/context.type";
import { ObjectKey } from "../types/loc.type";
import { mainMenuamh, mainMenu } from "../keyboards/mainmenu.custom.keyboard";
import { PrismaClient } from "@prisma/client";
import { bot } from "../bot";
import { photoContact } from "../config/botData";
import { approval } from "../utiles/functions";
const prisma = new PrismaClient();


const composer  = new Composer <MyContext> ();

composer.command('start', async (ctx)=>{
    await ctx.reply(loc[lan as ObjectKey].message_select_option , {reply_markup :ctx.userData.lang=='amh' ? mainMenuamh : mainMenu, parse_mode: "HTML" })
})

composer.command("cancel", async (ctx) => {
    await ctx.conversation.exit();
});


composer.command('refresh', async (ctx)=>{
    if (ctx.chat.id == Number(process.env.ADMIN_ONE)){
        const pending = await prisma.waitingListStudent.findMany()
        pending.forEach(async(student)=>{
            const stdu = await prisma.user.findFirst({where : {tg_id : student.stusent_tg_Id}})
            if (stdu){
                ctx.replyWithPhoto(student.caption || photoContact
                    , { 
                        caption: `Id : [ ${student.stusent_tg_Id} ] 
            ➖➖➖➖➖➖➖➖➖➖
            Name : ${stdu.registered_name}
            UserName : ${stdu.username}
            Phone_No : ${stdu.phone_number}
            Bank : ${student.bank_name}
            Stream : ${student.stream}
            ➖➖➖➖➖➖➖➖➖➖
            Caption : ${"NO CAPTION FOR REFRESH"}
            ➖➖➖➖➖➖➖➖➖➖`
                    , reply_markup : approval 
                })
            }
        }
      )
    }
    else {
        await ctx.reply(loc[lan as ObjectKey].message_select_option , {reply_markup : ctx.userData.lang=='amh' ? mainMenuamh : mainMenu, parse_mode: "HTML" })
    }
})


export default composer ;