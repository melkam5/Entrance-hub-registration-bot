import { Keyboard } from "grammy";
import { lan } from "../middlewares/fechUserData.middleware";
import { loc } from "../config/locales";
import { ObjectKey } from "../types/loc.type";

const mainMenu = new Keyboard()
    .text(loc[lan as ObjectKey].menu_register ).text(loc[lan as ObjectKey].menu_invite).row()
    .text(loc[lan as ObjectKey].menu_contact ).text(loc[lan as ObjectKey].menu_feedback).row()
    .text(loc[lan as ObjectKey].menu_language).text(loc[lan as ObjectKey].menu_help).row()
	.resized();

export default mainMenu ;     