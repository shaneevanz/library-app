import { Book } from "@/models/Book";
import React, { useState } from "react";

type Props = {
  bookData?: Book;
};

const AddEdit: React.FC<Props> = ({ bookData }) => {
  const [book, setBook] = useState<Book | null>(null);

  const onSave = () => {
    if (bookData) {
      updateBook();
    } else {
      createBook();
    }
  };

  const createBook = () => {};

  const updateBook = () => {};

  return (
    <div>
      <form
        onSubmit={() => {
          onSave;
        }}
      >
        <input name="title" type="text" />
        <input name="author" type="text" />
        <button type="submit" className="px-4 py-3 rounded bg-green-500">Save</button>
      </form>
    </div>
  );
};

export default AddEdit;
