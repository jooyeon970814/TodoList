// thistype 인터페이스 수정: 'title'이 'string'으로 수정
interface BookProps {
  title: string;
  image: string;
  author: string;
  genre: string;
  isbn: string;
  published: string;
  publisher: string;
  description: string;
}

const Book = ({
  title,
  image,
  author,
  genre,
  isbn,
  published,
  publisher,
  description,
}: BookProps) => {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <h3 style={{ fontSize: "1.2rem", margin: "10px 0" }}>{title}</h3>
      <p>
        <strong>Author:</strong> {author}
      </p>
      <p>
        <strong>Genre:</strong> {genre}
      </p>
      <p>
        <strong>ISBN:</strong> {isbn}
      </p>
      <p>
        <strong>Published:</strong> {published}
      </p>
      <p>
        <strong>Publisher:</strong> {publisher}
      </p>
    </article>
  );
};

export default Book;
