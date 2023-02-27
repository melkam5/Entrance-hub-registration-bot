import { Keyboard } from "grammy";
import { lan } from "../middlewares/fechUserData.middleware";
import { loc } from "../config/locales";
import { ObjectKey } from "../types/loc.type";

export const mainMenu = new Keyboard()
    .text(loc['eng'].menu_register ).text(loc[lan as ObjectKey].menu_invite).row()
    .text(loc['eng'].menu_contact ).text(loc[lan as ObjectKey].menu_feedback).row()
    .text(loc['eng'].menu_language).text(loc[lan as ObjectKey].menu_help).row()
	.resized();

export const mainMenuamh = new Keyboard()
    .text(loc['amh'].menu_register ).text(loc[lan as ObjectKey].menu_invite).row()
    .text(loc['amh'].menu_contact ).text(loc[lan as ObjectKey].menu_feedback).row()
    .text(loc['amh'].menu_language).text(loc[lan as ObjectKey].menu_help).row()
	.resized();    



// (ctx) => loc[ctx.userData.lang as ObjectKey]