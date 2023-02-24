import { Menu } from "@grammyjs/menu"
import { getBankData, dataclearedamh, datacleared } from "../functions"
import { MyContext } from "../types/context.type"
import { loc } from "../config/locales"
import { lan } from "../middlewares/fechUserData.middleware"
import { ObjectKey } from "../types/loc.type"


const registerMenu = new Menu<MyContext>("register-menu", { onMenuOutdated: false })
    .submenu("▫️ Grade 12", "grade-12", async (ctx) => {
           await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_stream})    
    }).row()


const subg12 = new Menu<MyContext>("grade-12")
    .submenu("▫️ Social Science" , "choose-bank" , async (ctx) => {
        ctx.session.stream = 'so'
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_Bank })
    }).submenu("▫️ Natural Science" ,"choose-bank" ,async (ctx)=>{
        ctx.session.stream = 'na'
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_Bank})}).row()
    .back("⬅️ Back", async (ctx) => {
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_grade})
    })
    

const choosebank = new Menu<MyContext>("choose-bank",{onMenuOutdated: "Updated, try now."})
    .submenu("▫️ Commercial Bank Of Ethiopia" , "pay-menu" ,async (ctx)=>{ 
        ctx.session.bank = 'cbe'
        await ctx.editMessageCaption({caption : getBankData('cbe',ctx)||''})
        }).row()
    .submenu("▫️ Cooperative Bank Of Oromia" , "pay-menu" ,async (ctx)=>{ 
        ctx.session.bank = 'coop'
        await ctx.editMessageCaption({caption : getBankData('coop', ctx)||''})
        }).row()
    .submenu("▫️ TeleBirr","pay-menu", async (ctx)=>{ 
        ctx.session.bank = 'telebirr'
        await ctx.editMessageCaption({caption : getBankData('telebirr' ,ctx)|| ''})})
    .submenu("▫️ CBE Birr", "pay-menu", async(ctx)=>{ 
        ctx.session.bank = 'cbebirr'
        await ctx.editMessageCaption({caption : getBankData('cbebirr', ctx)||''})
        })
    .submenu("▫️ Nib E-Birr", 'pay-menu',async (ctx)=>{
        ctx.session.bank = 'nibbirr'
        await ctx.editMessageCaption({caption : getBankData('nibbirr', ctx)||''})
        }).row()
    .submenu("▫️ Awash Bank", "pay-menu",async (ctx)=>{ 
        ctx.session.bank = 'awash'
        await ctx.editMessageCaption({caption : getBankData('awash', ctx)||''})
        })
    .submenu("▫️ Nib Bank" , "pay-menu" , async (ctx)=>{
        ctx.session.bank ='nib'
        await ctx.editMessageCaption({caption : getBankData('nib', ctx)||''})
        })
    .submenu("▫️ Coop pay", "pay-menu", async (ctx)=>{ 
        ctx.session.bank = 'cooppay'
        await ctx.editMessageCaption({caption : getBankData('cooppay', ctx)||''})}).row()
    .back("⬅️ ተመለስ", async (ctx)=> {
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_stream})
    })
    .text("⏺ መረጃውን ስርዝ" , async  (ctx)=>{
        await ctx.editMessageCaption({ caption : dataclearedamh, reply_markup: { inline_keyboard: []}})
        })


const payMenu = new Menu<MyContext>("pay-menu", {onMenuOutdated: "Updated, try now."})
    .text("✖️ Clear data" ,async (ctx)=>{
        await ctx.editMessageCaption({caption : datacleared, reply_markup: {inline_keyboard: []}})
        ctx.session.bank = ''
        ctx.session.stream =''
    })
    .back("➖ Back", async (ctx)=> {
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_Bank })}).row()
    .text("✔️ Passed ", async (ctx)=>{
        await ctx.editMessageCaption( {caption : '✔️ Passed', reply_markup: { inline_keyboard: []}})
        await ctx.conversation.enter("approvalConvo");
    })

choosebank.register(payMenu)
subg12.register(choosebank)
registerMenu.register(subg12)


export default registerMenu;