const prisma = require("../prisma/index.js");
const seed = async (numAuthors = 20, booksPerAuthor = 3) => {
  for (let i = 0; i < numAuthors; i++) {
    const booksarray = [];
    for (let j = 0; j < booksPerAuthor; j++) {
      booksarray.push({ title: `Book ${i}${j}` });
    }
    await prisma.author.create({
      data: {
        name: `Author ${i}`,
        books: {
          create: booksarray,
        },
      },
    });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
