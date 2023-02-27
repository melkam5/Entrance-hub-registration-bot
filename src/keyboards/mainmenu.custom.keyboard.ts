import { Keyboard } from "grammy";
import { lan } from "../middlewares/fechUserData.middleware";
import { loc } from "../config/locales";

export const mainMenu = new Keyboard()
    .text(loc['eng'].menu_register ).text(loc['eng'].menu_invite).row()
    .text(loc['eng'].menu_contact ).text(loc['eng'].menu_feedback).row()
    .text(loc['eng'].menu_language).text(loc['eng'].menu_help).row()
	.resized();

export const mainMenuamh = new Keyboard()
    .text(loc['amh'].menu_register ).text(loc['amh'].menu_invite).row()
    .text(loc['amh'].menu_contact ).text(loc['amh'].menu_feedback).row()
    .text(loc['amh'].menu_language).text(loc['amh'].menu_help).row()
	.resized();    



// (ctx) => loc[ctx.userData.lang as ObjectKey]