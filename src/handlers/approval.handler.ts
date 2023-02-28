import { PrismaClient } from "@prisma/client";
import { bot } from "../bot";
import { private_channel_na, private_channel_so } from "../config/botData";
const prisma = new PrismaClient();


export const approvalHandler = async (req: any, res: any) => {

    const {tg_id, action, className, class_tg_id } = req.body;
    try {    
        if (await prisma.waitingListStudent.findFirst({where : {stusent_tg_Id : String(tg_id)}})){  

            if ( action == "approve") {

                const ivtlink = await bot.api.createChatInviteLink(Number(class_tg_id),{member_limit: 1});
                if( await bot.api.sendMessage(tg_id, `You are approved , use the following link to join . ! Beware this is a one time link  
  ---------------------
ክፍያዎት በትክክል ተፈጽሟል , ቲቶሪያል የሚሰጥበትን ቻናል ለመቀላቅል ከታች ያለዉን ሊንክ ይጠቀሙ . ! ማስጠንቀቂያ ይህ ሊንክ ለእርስዎ ብቻ ነው የሚያገለግለዉ ለሌላ ሰው አያጋሩ  ,
    ${ivtlink['invite_link']}` ) )
                {
                    await prisma.registeredStudent.create({
                        data : {
                            classof : className,
                            student : {
                                connect : {
                                    tg_id : String(tg_id)
                                }
                            }
                        }
                })
        }
        }
        else if (action == "decline") {
            try {
                await bot.api.sendMessage(tg_id , `Your request is declined
  ----------------
ጥያቄዎት ተቀባይነት አላገኘም ፣ ክፍያውን በትክክል ይፈጽሙ  `)
            } catch (e){
                console.log(e)
            }
        }
        await prisma.waitingListStudent.delete({where:{stusent_tg_Id : String(tg_id)}})
        res.status(200).json({message: "success"});
        } else {
            res.status(400).json({message: "invalid request"});
        }
    } catch (e) {
        res.status(500).json({ message: "Server Error" });
   }
};
