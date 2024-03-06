const prisma = require("./prisma/index.js");
const express = require("express");
const authors = express();

async function createAuthor(authorData) {
  const author = await prisma.author.create({
    data: authorData,
  });
  return author;
}

async function getAuthor(authorData) {
  const author = await prisma.author.findUnique({
    where: {
      id: +authorData,
    },
  });
  return author;
}

async function changeAuthor(authorData) {
  const updatedAuthor = await prisma.author.update({
    where: {
      authorId: authorData,
    },
    data: { authorData },
  });
  return updatedAuthor;
}

async function deleteAuthor(authorData) {
  const deletedAuthor = await prisma.author.delete({
    where: {
      authorId: authorData,
    },
  });
  return deletedAuthor;
}

async function getAuthorsBooks(authorData) {
  const authorsBooks = await prisma.book.findMany({
    where: {
      authorId: authorData,
    },
  });
  return authorsBooks;
}

authors.get("/authors/:id/books", async (req, res) => {
  const { author } = req.params;
  const authorsBooks = await getAuthorsBooks(author);
  res.send(authorsBooks);
});

authors.delete("/authors/:author", async (req, res) => {
  const { author } = req.params;
  const deletedAuthor = await deleteAuthor(author);
  res.send(deletedAuthor);
});

authors.put("/authors/:author", async (req, res) => {
  const { author } = req.params;
  const updatedAuthor = await changeAuthor(author);
  res.send(updatedAuthor);
});

authors.get("/authors/:author", async (req, res) => {
  const { author } = req.params;
  const theAuthor = await getAuthor(author);
  res.send(theAuthor);
});

authors.post("/authors/:author", async (req, res) => {
  const { author } = req.params;
  const newAuthor = await createAuthor(author);
  res.send(newAuthor);
});

authors.get("/", async (req, res) => {
  const allAuthors = await prisma.book.findMany();
  res.send(allAuthors);
});

authors.listen(4000, () => {
  console.log("Listening on port 4000");
});
