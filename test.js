const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const mitu = async () => {
  const pkk = await prisma.user.create({
    data: {
      tg_id: 1232121456,
      first_name: "abebe",
      username: "mitu",
      lang: "amh",
      phone_number: "+251932294322",
      stream: "na",
      registered: {
        create: {
          classof: "C",
        },
      },
    },
  });

  console.log(pkk);
};

mitu();
