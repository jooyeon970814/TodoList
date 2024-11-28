import { useState, useEffect } from "react";
import Book from "./Card/BookCard";
//https://fakerapi.it/api/v2/persons?_quantity=1&_gender=female&_birthday_start=2005-01-01
//https://fakerapi.it/api/v2/products?_quantity=1&_taxes=12&_categories_type=uuid
//https://fakerapi.it/api/v2/texts?_quantity=1&_characters=500
//https://fakerapi.it/api/v2/users?_quantity=1&_gender=male
interface type {
  type:
    | "addresses"
    | "books"
    | "companies"
    | "creditCards"
    | "images"
    | "persons"
    | "places"
    | "texts"
    | "users";
}
const FakeAPI = (props: type) => {
  interface Book {
    title: string;
    image: string;
    author: string;
    genre: string;
    isbn: string;
    published: string;
    publisher: string;
    description: string;
  }
  const [books, setBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://fakerapi.it/api/v2/books?_quantity=10")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoaded(true);
      });
  }, []);

  return (
    <div>
      {!loaded ? (
        <p>Loading...</p>
      ) : (
        books.map((book) => (
          <Book
            key={book.isbn}
            title={book.title}
            image={book.image}
            author={book.author}
            genre={book.genre}
            isbn={book.isbn}
            published={book.published}
            publisher={book.publisher}
            description={book.description}
          />
        ))
      )}
    </div>
  );
};

export default FakeAPI;
