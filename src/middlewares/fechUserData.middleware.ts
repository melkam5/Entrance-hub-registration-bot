import { NextFunction } from "grammy";
import { FeedbackData, UserDB } from "../dbModel";
import { MyContext } from "../types/context.type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchUserData = async ( ctx: MyContext, next: NextFunction): Promise<void> => {

    let userDatatemp ;
    let tempUserdb ;

    if (ctx.chat && ctx.chat.type != 'group' && ctx.chat.type != 'supergroup' && ctx.chat.type != 'channel' )  {
        ctx.session.feedback = await prisma.feedback.count();

    userDatatemp = await prisma.user.findFirst({where : {tg_id : ctx.chat.id }})

    if( userDatatemp) {
       ctx.userData = userDatatemp
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
			payed : 0 ,
			points : 0 ,
            credited : 0
		}

        if(ctx.hasCommand('start') && ctx.match  ){
            
            let refererId = ctx.match.slice(3) ;
            let refererDb ;
         //   ctx.userData.isInvitedBy =  +refererId

            refererDb = await prisma.user.findFirst({where : {tg_id :  parseInt(refererId.toString())}})

            if(refererDb){
              
                await prisma.refferal.create({
                    data: {
                      invitorId : refererDb?.tg_id ,
                      invitedId : ctx.chat.id 
                    },
                  })
            }
        }
    }

    ctx.userData.lang != null ? lan=ctx.userData.lang : lan='eng';
    await next();
    

    if(ctx.session.rname != '' && !ctx.userData.registered_name){
        ctx.userData.registered_name = ctx.session.rname
    } 
    if(ctx.session.schooln != '' && !ctx.userData.school ){
        ctx.userData.school = ctx.session.schooln
    }
    if(ctx.session.stream != ''){
        ctx.userData.stream = ctx.session.stream
    }

    if( await prisma.user.findFirst({where : {tg_id :ctx.chat.id  }})){
        await prisma.user.update({
            where : {
                tg_id : ctx.chat.id 
            },
            data : 
                ctx.userData
            
        })
    }
    else {
        await  prisma.user.create({
            data : 
                ctx.userData
        })
       
    } 
    }
}

export let lan = 'eng'