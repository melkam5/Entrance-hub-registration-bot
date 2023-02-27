import { PrismaClient } from "@prisma/client";
import { NextFunction } from "grammy";
import { MyContext } from "../types/context.type";

const prisma = new PrismaClient();

export const fetchUserData = async ( ctx: MyContext, next: NextFunction): Promise<void> => {
    let userDatatemp ;

    if (ctx.chat && ctx.chat.type != 'group' && ctx.chat.type != 'supergroup' && ctx.chat.type != 'channel' )  {
        ctx.session.feedback = await prisma.feedback.count();
    
    userDatatemp = await prisma.user.findFirst({where : {tg_id : ctx.chat.id }})
    ctx.refferalData = {
        invited :await prisma.refferal.count({where : { invitorId : ctx.chat?.id}}) ,
        payed :await prisma.refferal.count({where : { invitorId : ctx.chat?.id, NOT : {invited : {registered : null }} }})
    
    } 

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
            credited : 0
		}

        if(ctx.hasCommand('start') && ctx.match  ){
            
            let refererId = ctx.match.slice(3) ;
            let refererDb ;

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

    console.log(ctx.userData.lang);
    ctx.userData.lang ? lan=ctx.userData.lang : lan='eng';
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

export let lan = 'amh'