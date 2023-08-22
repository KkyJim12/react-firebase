import "./App.css";
import React, { useState, useEffect } from "react";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo,
      });
      console.log("Document written with ID: ", docRef.id);
      setTodo("");
      setIsLoading(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      console.log("Delete success");
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = async () => {
    try {
      await getDocs(collection(db, "todos")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTodos(newData);
        console.log(todos, newData);
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [isLoading]);

  return (
    <section className="todo-container">
      <div className="todo">
        <h1 className="header">Todo-App</h1>

        <form onSubmit={addTodo}>
          <div>
            <input
              type="text"
              placeholder="What do you have to do today?"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>

        <div style={{ marginTop: 10 }} className="todo-content">
          {todos?.map((todo) => (
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 10,
                justifyContent: "center",
              }}
            >
              <p key={todo.id}>{todo.todo}</p>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ background: "red", color: "white" }}
                type="button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
