import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineSaveAs } from "react-icons/md";
import { FaPlus, FaTimes } from "react-icons/fa";
import 'tailwindcss/tailwind.css';
import { useSelector } from "react-redux";

function ToDo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [unique, setUnique] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.usermanage);
  

  const fetchTodos = async () => {
    try {      
      const response = await axios.get('http://127.0.0.1:8000/todos/', {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`
            }
        });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    console.log(isAuthenticated);
    
    fetchTodos();
  },[todos]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setTodo(newValue);

    const isUnique = !todos.some((obj) => obj.text === newValue);
    setUnique(isUnique);
  };

  const addTodo = async () => {
    let foundDuplicate = false;

    todos.forEach((obj) => {
      if (obj.text === todo) {
        foundDuplicate = true;
        setUnique(false);
      }
    });

    if (!foundDuplicate) {
      if (editId !== null) {
        try {
          await axios.put(`http://127.0.0.1:8000/todos/${editId}/`, { text: todo }, {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`
            }
        });
          setTodos(
            todos.map((obj) => {
              if (obj.id === editId) {
                obj.text = todo;
                return obj;
              }
              return obj;
            })
          );
        } catch (error) {
          console.error('Error updating todo:', error);
        }
      } else {
        try {
          console.log(isAuthenticated); 
          const response = await axios.post('http://127.0.0.1:8000/todos/', { text: todo }, {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`
            }
        });
          setTodos([...todos, response.data]);
          setTodo("");
          setUnique(true);
        } catch (error) {
          console.error('Error adding todo:', error);
        }
      }
      setTodo("");
      setEditId(null);
    }
  };

  const inputValue = useRef(null);
  useEffect(() => {
    inputValue.current.focus();
  }, []);

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/todos/${id}/`, {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`
            }
        });
      setTodos(todos.filter((value) => id !== value.id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const onEdit = (id) => {
    let editTodo = todos.find((value) => value.id === id);
    setTodo(editTodo.text);
    let todoId = editTodo.id;
    setEditId(todoId);
    setUnique(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-700 shadow-lg rounded-lg p-5 w-80 mx-auto">
        <div className="text-center mb-5">
          <h1 className="text-2xl text-gray-200">ToDo List</h1>
          <h2 className="text-lg text-gray-400 mt-3">Whoop, I forgot that</h2>
        </div>

        <div
          className={`input flex justify-between items-center mb-5 p-3 border ${
            unique ? 'border-gray-500' : 'border-red-500'
          } rounded-full bg-gray-600`}
        >
          <input
            value={todo}
            ref={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="🖊️ Add item..."
            className="flex-1 border-none outline-none pl-3 text-white bg-transparent"
          />
          {editId == null ? (
            <FaPlus
              onClick={addTodo}
              className="text-xl text-gray-400 ml-3 cursor-pointer"
              title="Add"
            />
          ) : (
            <MdOutlineSaveAs
              onClick={addTodo}
              className="text-xl text-gray-400 ml-3 cursor-pointer"
              title="Save"
            />
          )}
        </div>
        {!unique ? (
          <p className="text-red-500 text-center mt-0 mb-5">Sorry, you already added that</p>
        ) : null}
        <div className="todos mt-5">
          {todos.map((item) => (
            <div
              key={item.id}
              className="todo flex justify-between items-center bg-gray-600 p-3 mb-2 rounded-full shadow-md"
            >
              <div className="flex items-center">
                <input
                  title="Complete"
                  onChange={async (e) => {
                    try {
                      await axios.put(`http://127.0.0.1:8000/todos/${item.id}/`, {
                        text: item.text,
                        status: e.target.checked,
                      }, {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`
            }
        });
                      setTodos(
                        todos.map((obj) => {
                          if (obj.id === item.id) {
                            obj.status = e.target.checked;
                            return obj;
                          }
                          return obj;
                        })
                      );
                    } catch (error) {
                      console.error('Error updating todo status:', error);
                    }
                  }}
                  checked={item.status}
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer"
                />
                <p
                  className={`ml-3 text-white ${
                    item.status ? 'line-through' : ''
                  }`}
                >
                  {item.text}
                </p>
              </div>
              <div className="flex items-center">
                <FiEdit3
                  className="text-xl text-gray-400 ml-3 cursor-pointer"
                  onClick={() => onEdit(item.id)}
                  title="Edit"
                />
                <FaTimes
                  className="text-xl text-gray-400 ml-3 cursor-pointer"
                  onClick={() => onDelete(item.id)}
                  title="Delete"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
