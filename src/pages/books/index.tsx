import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import { Book } from "@/models/Book";
import { collection, getDocs, query } from "firebase/firestore";
import db from "../../config/firebase.config";
import AddEdit from "./add-edit";
import { FaRegEdit, FaTrash } from "react-icons/fa";

const books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [addEditModal, setAddEditModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const getBooks = async () => {
      const snapshot = await getDocs(query(collection(db, "books")));
      const booksRes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      setBooks(booksRes);
    };

    getBooks();
  }, [addEditModal]);

  useEffect(() => {
    if(!addEditModal) {
      setSelectedBook(null);
    }
  }, [setAddEditModal])

  const openEditModal = (book: Book) => {
    setSelectedBook(book);
    setAddEditModal(true);
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="p-10 border boder-white rounded w-1/3 h-3/4">
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg mb-3">Book List</h3>
          <button
            className="bg-green-600 font-semibold px-3 py-2 rounded"
            onClick={() => setAddEditModal(true)}
          >
            New Book
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2">
              <th className="w-1/2 py-5 px-2">Title</th>
              <th className="w-1/2 py-5 px-2">Author</th>
              <th className="w-1/2 py-5 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr className="border-b border-gray-400">
                <td className="py-3 px-2">{book.title}</td>
                <td className="py-3 px-2">{book.author}</td>
                <td className="py-3 px-2 flex items-center gap-2">
                  <button onClick={() => openEditModal(book)}>
                    <FaRegEdit />
                  </button>
                  <button>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end gap-2 w-full py-6">
          <button className="py-1 px-2 rounded text-center border">1</button>
          <button className="py-1 px-2 rounded text-center border">2</button>
          <button className="py-1 px-2 rounded text-center border">3</button>
        </div>
      </div>
      {addEditModal && <AddEdit setModal={setAddEditModal} bookData={selectedBook} />}
    </main>
  );
};

export default books;
