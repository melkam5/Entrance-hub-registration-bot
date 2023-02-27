import { Menu } from "@grammyjs/menu"
import { MyContext } from "../types/context.type"
import { loc } from "../config/locales"
import { lan } from "../middlewares/fechUserData.middleware"
import { ObjectKey } from "../types/loc.type"
import { getBankData } from "../utiles/functions"


const registerMenu = new Menu<MyContext>("register-menu", { onMenuOutdated: false })
    .submenu("▫️ Grade 12", "grade-12", async (ctx) => {
           await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_stream})    
    }).row()


const subg12 = new Menu<MyContext>("grade-12")
    .submenu(loc[lan as ObjectKey].bmenu_social , "choose-bank" , async (ctx) => {
        ctx.session.stream = 'so'
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_Bank })
    }).submenu(loc[lan as ObjectKey].bmenu_natural ,"choose-bank" ,async (ctx)=>{
        ctx.session.stream = 'na'
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_Bank})}).row()
    .back(loc[lan as ObjectKey].menu_back, async (ctx) => {
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_grade})
    })
    

const choosebank = new Menu<MyContext>("choose-bank",{onMenuOutdated: "Updated, try now."})
    .submenu(loc[lan as ObjectKey].bmenu_cbe , "pay-menu" ,async (ctx)=>{ 
        ctx.session.bank = 'cbe'
        await ctx.editMessageCaption({caption : getBankData('cbe',ctx)||''})
        }).row()
    .submenu(loc[lan as ObjectKey].bmenu_coop , "pay-menu" ,async (ctx)=>{ 
        ctx.session.bank = 'coop'
        await ctx.editMessageCaption({caption : getBankData('coop', ctx)||''})
        }).row()
    .submenu(loc[lan as ObjectKey].bmenu_telebirr ,"pay-menu" , async (ctx)=>{ 
        ctx.session.bank = 'telebirr'
        await ctx.editMessageCaption({caption : getBankData('telebirr' ,ctx)|| ''})})
    .submenu(loc[lan as ObjectKey].bmenu_cbebirr, "pay-menu", async(ctx)=>{ 
        ctx.session.bank = 'cbebirr'
        await ctx.editMessageCaption({caption : getBankData('cbebirr', ctx)||''})
        })
    .submenu(loc[lan as ObjectKey].bmenu_nibbirr, 'pay-menu',async (ctx)=>{
        ctx.session.bank = 'nibbirr'
        await ctx.editMessageCaption({caption : getBankData('nibbirr', ctx)||''})
        }).row()
    .submenu(loc[lan as ObjectKey].bmenu_awash, "pay-menu",async (ctx)=>{ 
        ctx.session.bank = 'awash'
        await ctx.editMessageCaption({caption : getBankData('awash', ctx)||''})
        })
    .submenu(loc[lan as ObjectKey].bmenu_nib, "pay-menu" , async (ctx)=>{
        ctx.session.bank ='nib'
        await ctx.editMessageCaption({caption : getBankData('nib', ctx)||''})
        })
    .submenu(loc[lan as ObjectKey].bmenu_cooppay, "pay-menu", async (ctx)=>{ 
        ctx.session.bank = 'cooppay'
        await ctx.editMessageCaption({caption : getBankData('cooppay', ctx)||''})}).row()
    .back(loc[lan as ObjectKey].menu_back, async (ctx)=> {
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_stream})
    })
    .text(loc[lan as ObjectKey].menu_clear_data  , async  (ctx)=>{
        await ctx.editMessageCaption({ caption : loc[lan as ObjectKey].message_data_cleared_two, reply_markup: { inline_keyboard: []}})
        })


const payMenu = new Menu<MyContext>("pay-menu", {onMenuOutdated: "Updated, try now."})
    .text(loc[lan as ObjectKey].menu_clear_data ,async (ctx)=>{
        await ctx.editMessageCaption({caption :loc[lan as ObjectKey].message_data_cleared_two , reply_markup: {inline_keyboard: []}})
        ctx.session.bank = ''
        ctx.session.stream =''
    })
    .back(loc[lan as ObjectKey].menu_back , async (ctx)=> {
        await ctx.editMessageCaption({caption : loc[lan as ObjectKey].message_select_Bank })}).row()
    .text(loc[lan as ObjectKey].menu_passed , async (ctx)=>{
        await ctx.editMessageCaption( {caption : loc[lan as ObjectKey].menu_passed , reply_markup: { inline_keyboard: []}})
        await ctx.conversation.enter("approvalConvo");
    })

choosebank.register(payMenu)
subg12.register(choosebank)
registerMenu.register(subg12)


export default registerMenu;