import { session } from "grammy";

export const sessionMid = session({ initial: () => ( { stream :'' , bank : '', feedback:1, feedbackState : 0, schooln:'', rname:''})})