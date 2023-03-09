import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();




const sv = async ()=>{
   return await prisma.waitingListStudent.count()
}

console.log("fds");