import { Menu } from "@grammyjs/menu";
import { bot_user_name, referalBonus } from "../config/botData";
import { loc } from "../config/locales";
import { lan } from "../middlewares/fechUserData.middleware";
import { MyContext } from "../types/context.type";
import { ObjectKey } from "../types/loc.type";

const inviteMenu = new Menu<MyContext>("invite-menu" , { onMenuOutdated: false })
    .submenu( (ctx) => loc[ctx.userData.lang as ObjectKey].menu_get_post  , "how-it-works" ,async (ctx) => {
        await ctx.editMessageCaption({caption : `<b>     ‼️ይመዝገቡ ፣ ይማሩ ፣ ይሸለሙ ‼️</b>

  📝በEntrance Hub Ethiopia Online ትምህርት ቤት ሲማሩ እና ወዳጆን ለትምህርት ሲጋብዙ ልዩ ሽልማት እንዲያገኙ አመቻችተናል ‼️ ይቀላቀሉን እና ይማሩ ‼️ የእውቀቶ አድማስ ከፍ ባለ ቁጥር የሽልማት መጠኖን በእጥፍ ያሳድጋሉ። 
            
  🎁 ከእርሶ የሚጠበቀው ወደ እኛ ወዳጆን በመጋበዝ እንዲማር ማድረግ ብቻ ነው ‼️ በጋበዙት የተማሪ መጠን ከአንድ ተማሪ 15% _20% ሽልማት ያገኛሉ ‼️
            
  🎁 10 ተማሪ በመጋብ በአማካኝ እስከ 200 ብር ይሸለሙ ‼️ የመጋበዝ አቅሞን በማስፋት 50000 ብር ድረስ ከ Entrance Hub Ethiopia ይሸለሙ ‼️
            
  <pre>     🥇ይህ የእርሶ የመጋበዣ Link ነው ‼️</pre>
        
  👉 https://t.me/${bot_user_name}?start=ehr${ctx.userData.tg_id}
        
  እናስተምራለን ፣ እንሸልማለን ፣ ለጥሩ ውጤት እናበቃለን ።`, parse_mode : "HTML"})
        }).row()
    .text((ctx) => loc[ctx.userData.lang as ObjectKey].menu_cash_out, async (ctx)=>{
        if(referalBonus.minwith_value < ((ctx.refferalData.payed*referalBonus.point_valueBirr)-ctx.userData.credited )){
            await ctx.conversation.enter("cashOutConvo");
        }
        else {
            await ctx.answerCallbackQuery(loc[lan as ObjectKey].notify_insufficient)
    }
});

const subOfInviteMenu = new Menu<MyContext>("how-it-works")
    .text((ctx) => loc[ctx.userData.lang as ObjectKey].menu_forward_this, (ctx)=> {}).row()
    .back((ctx) => loc[ctx.userData.lang as ObjectKey].menu_back,async (ctx ) => {
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_invite_page(ctx), parse_mode: "HTML"   })}
    );

inviteMenu.register(subOfInviteMenu)    

export default inviteMenu ;