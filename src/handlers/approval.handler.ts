import { PrismaClient } from "@prisma/client";
import { bot } from "../bot";
const prisma = new PrismaClient();


export const approvalHandler = async (req: any, res: any) => {

    const {tg_id, action } = req.body;
    try {
        const student = await prisma.waitingListStudent.findFirst({where : {stusent_tg_Id : String(tg_id)}});
        if (student){
            const tutor_class = await prisma.tutorialClass.findFirst({where : {stream : student.stream } })  
            
            if ( action == "approve") {
                const ivtlink = await bot.api.createChatInviteLink(Number( tutor_class?.class_tg_id),{member_limit: 1});
                if( await bot.api.sendMessage(tg_id, ` You are approved 
 <pre>use the following link to join , ! Beware this is a one time link </pre>  
  ---------------------
 ክፍያዎት በትክክል ተፈጽሟል
 <pre>ቲቶሪያል የሚሰጥበትን ቻናል ለመቀላቅል ከታች ያለዉን ሊንክ ይጠቀሙ . ! ማስጠንቀቂያ ይህ ሊንክ ለእርስዎ ብቻ ነው የሚያገለግለዉ ለሌላ ሰው አያጋሩ </pre>
    ${ivtlink['invite_link']}`, {parse_mode : "HTML"} ) )
                {
                    await prisma.registeredStudent.create({
                        data : {
                            classof : tutor_class?.name ?? 'd',
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
