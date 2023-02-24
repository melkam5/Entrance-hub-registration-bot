import { Keyboard } from "grammy";

const mainMenu = new Keyboard()
    .text("❇️ Register" ).text("🧧 Invite" ).row()
    .text("📥 Contact us" ).text("🖌 FeedBack").row()
    .text("🌐 Language" ).text("❓ Help" ).row()
	.resized();

export default mainMenu ;     