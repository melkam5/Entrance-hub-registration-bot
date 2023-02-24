import { NextFunction } from "grammy";
import { FeedbackData, UserDB } from "../dbModel";
import { MyContext } from "../types/context.type";

export const fetchUserData = async ( ctx: MyContext, next: NextFunction): Promise<void> => {

    let userDatatemp ;
    let tempUserdb ;

    if (ctx.chat && ctx.chat.type != 'group' && ctx.chat.type != 'supergroup' && ctx.chat.type != 'channel' )  {
        ctx.session.feedback = await FeedbackData.count() ;
    if(await UserDB.exists({tg_id : ctx.chat.id})){
        userDatatemp = await UserDB.find({tg_id : ctx.chat.id})
        ctx.userData = userDatatemp[0]
    }
    else {
        ctx.userData = {
			tg_id : ctx.chat.id ,
			first_name: ctx.chat.first_name,
    		username: ctx.chat.username || '',
            registered_name: '',
            lang : '' ,
			phone_number: '',
            stream: '',
			school : '',
            registered : -1 ,
            isInvitedBy : 0 ,
			invited : [0] ,
			payed : [0] ,
			points : 0 ,
            credited : 0
		}

        if(ctx.hasCommand('start') && ctx.match  ){
            
            let refererId = ctx.match.slice(3) ;
            let refererDb ;
            ctx.userData.isInvitedBy =  +refererId

            refererDb = await UserDB.findById(await UserDB.exists({tg_id : refererId}))
            if(refererDb){
                refererDb.invited.push(ctx.chat.id)
                await refererDb.save();
            }
        }

    }

    ctx.userData.lang != '' ? lan=ctx.userData.lang : lan='eng';
    await next();
    

    if(ctx.session.rname != '' && ctx.userData.registered_name == '' ){
        ctx.userData.registered_name = ctx.session.rname
    } 
    if(ctx.session.schooln != '' && ctx.userData.school == '' ){
        ctx.userData.school = ctx.session.schooln
    }
    if(ctx.session.stream != ''){
        ctx.userData.stream = ctx.session.stream
    }
    if(await UserDB.exists({tg_id : ctx.chat.id})){
        tempUserdb = await UserDB.findById(await UserDB.exists({tg_id : ctx.chat.id}))
        if(tempUserdb) {
            tempUserdb.set(ctx.userData )
            await tempUserdb.save();
            
        }
    }
    else {
        tempUserdb = new UserDB(ctx.userData);
        await tempUserdb.save();
    }
    }
}

export let lan = 'eng'