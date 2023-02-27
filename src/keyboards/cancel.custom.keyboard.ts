import { Keyboard } from "grammy";
import { loc } from "../config/locales";

export const cancelKeyboard = new Keyboard()
    .text("❌ Cancel")
	.resized()
    .persistent();