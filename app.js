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
  res.status(200).json(books[Math.floor(books.length / 2)]);
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
    // console.log(author);
    // console.log(libro.author);
    // console.log(libro.author.toLowerCase().replace(" ", "-"));
    // console.log(libro.title.toLowerCase().replace(" ", "-"));
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
});

//http:/localhost:3000/year&pages/cervantes

app.get("/:query/:author", (req, res) => {
  console.log(req.params);
  // const [year, pages] = req.params.query.split("&");
  const author = req.params.author;
  // console.log(year);
  // console.log(pages);
  console.log(author);
  // books.forEach(libro => {
  //   if (libro.author.toLowerCase().replace(" ", "-").includes(author.toLowerCase())) {
  //     let respuesta = {
  //       year: libro.year,
  //       pages: libro.pages
  //     }
  //     console.log(respuesta);
  //     res.json(respuesta);
  //   }
  // });
  books.find((libro) => {
    if (libro.author.toLowerCase().replace(" ", "-").includes(author.toLowerCase())) {
      let respuesta = {
        year: libro.year,
        pages: libro.pages
      }
      res.json(respuesta);
    }
  });
});

app.get("/country/count/:country", (req, res) => {
  let country = req.params.country;
  // let contador = 0;
  // books.forEach(book => {
  //   if (book.country.toLowerCase() == country) {
  //     contador++;
  //   }
  // });
  const totalBooks = books.reduce((accumulador, libro) => {
    if (libro.country.toLowerCase() === country.toLowerCase()) {
      accumulador += 1;
    }
    return accumulador;
  }, 0);
  res.json(totalBooks);
});

app.get("/country/at-least/:country", (req, res) => {
  let country = req.params.country;
  let thereIs = false;
  books.forEach(book => {
    if (book.country.toLowerCase() == country) {
      thereIs = true;
    }
    return thereIs;
  });
  // if (books.find(libro => {
  //   if (libro.country.toLowerCase() == country.toLowerCase()) {
  //     thereIs = true;
  //   }
  // }))
    res.json(thereIs);
});

app.get("/pages/all-greater/:pagesMax", (req, res) => {
  const pages = req.params.pagesMax
  let thereIs = true;
  // books.forEach(book => {
  //   if (book.pages < pages) {
  //     thereIs = false;
  //   }
  //   return thereIs;
  // });
  if (books.find(libro => libro.pages < pages)) {
    thereIs = false;
  }
    res.json(thereIs);
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
