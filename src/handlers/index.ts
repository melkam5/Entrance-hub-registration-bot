
import { Composer } from "grammy";
import { MyContext } from "../types/context.type";
import callbackk from "./callback.handler";
import command from "./command.handler";
import message from "./onmessage.handler";



const composer  = new Composer <MyContext> ();
composer.use( callbackk, command, message);

export default composer;