import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import { Book } from "@/models/Book";
import { collection, getDocs, query } from "firebase/firestore";
import db from "../../config/firebase.config";
import AddEdit from "./add-edit";

const books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [addEditModal, setAddEditModal] = useState<boolean>(false);

  useEffect(() => {
    const getBooks = async () => {
      const snapshot = await getDocs(query(collection(db, "books")));
      const booksRes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      console.log(booksRes)
      setBooks(booksRes);
    };

    getBooks();
  }, []);

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="p-10 border boder-white rounded w-1/3">
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg mb-3">Book List</h3>
          <button className="bg-green-600 font-semibold px-3 py-2 rounded" onClick={() => setAddEditModal(true)}>
            New Book
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2">
              <th className="w-1/2 py-5 px-2">Title</th>
              <th className="w-1/2 py-5 px-2">Author</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr className="border-b border-gray-400">
                <td className="py-3 px-2">{book.title}</td>
                <td className="py-3 px-2">{book.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        addEditModal && (
          <AddEdit setModal={setAddEditModal} />
        )
      }
    </main>
  );
};

export default books;
