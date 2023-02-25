const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const mitu = async () => {
  const pkk = await prisma.user.findFirst({
    where: {
      tg_id: 1232121456,
    },
  });

  console.log(pkk);
};

mitu();
