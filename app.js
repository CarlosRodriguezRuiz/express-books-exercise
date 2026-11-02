const express = require("express"); //Importar modulo de express
const books = require("./data/books.json");

const app = express(); //Crear el servidor
const port = 3000;

// app.get('/', (req, res) => {
// res.send('Hello World!');
// });

app.get("/all", (req, res) => {
  res.status(200).json(books);
});

app.get("/all", (req, res) => {
  res.status(200).json(books);
});

app.get("/first", (req, res) => {
  res.status(200).json(books[0]);
});

app.get("/last", (req, res) => {
  res.status(200).json(books[books.length - 1]);
  console.log(books[books.length - 1]);
});

app.get("/middle", (req, res) => {
  const middle = Math.floor(books.length / 2);

  console.log(`Total libros ${books.length}`);
  console.log(`Libro de la mitad ${Number(books[middle])}`);

  res.status(200).json(books[middle]);
});

app.get("/middle", (req, res) => {
  const middle = Math.floor(books.length / 2);

  console.log(`Total libros ${books.length}`);
  console.log(`Libro de la mitad ${Number(books[middle])}`); //No va

  res.status(200).json(books[middle]);
});

// app.get("/author/dante-alighieri", (req, res) => {
//   const author = "Dante Alighieri";
//   if (author) {
//     const book = books.find((libro) => libro.author === author);
//     if (book) {
//       res.json(book.title);
//     } else {
//       res.status(404).json({});
//     }
//   } else {
//     res;
//   }
// });

//http://localhost:3000/author/dante-alighieri
app.get("/author/:author", (req, res) => {
  let author = req.params.author;

  books.forEach((libro) => {
    console.log(author);
    console.log(libro.author);
    console.log(libro.author.toLowerCase().replace(" ", "-"));
    console.log(libro.title.toLowerCase().replace(" ", "-"));
    if (libro.author.toLowerCase().replace(" ", "-") === author.toLowerCase()) {
      let respuesta = libro.title;
      console.log(respuesta);
      res.json(respuesta);
    }
  });
});

app.get("/country/:author", (req, res) => {
  let author = req.params.author;

  books.find((libro) => {
    if (libro.author.toLowerCase().replace(" ", "-") === author.toLowerCase()) {
      let respuesta = libro.country;
      console.log(respuesta);
      res.json(respuesta);
    }
  });

  // books.forEach((libro) => {
  //   if (libro.author.toLowerCase().replace(" ", "-") === author.toLowerCase()) {
  //     let respuesta = libro.country;
  //     console.log(respuesta);
  //     res.json(respuesta);
  //   }
  // });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
