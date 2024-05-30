import { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddItemModal = () => {
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setToDos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  const addNewItem = () => {
    if (newItem === "") {
      toast.error("Please enter a value");
      return;
    }
    setToDos([{ id: Math.random(), value: newItem, date: new Date().toISOString().split("T")[0] }, ...toDos ]);
    localStorage.setItem("todos", JSON.stringify([...toDos, { id: Math.random(), value: newItem, date: new Date().toISOString().split("T")[0] }]));
    setOpen(false);
    window.location.reload();
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addNewItem();
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="absolute outline-none text-white top-[50%] translate-y-[-50%] right-[-40px] size-[35px] bg-[#6C63FF] hover:bg-[#5750cf] duration-200 flex items-center justify-center rounded-full">
        <i className="fa-solid fa-plus"></i>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="bg-[#252525] border border-white p-6 w-[300px] sm:w-[450px] rounded-lg">
            <h3 className="font-medium text-white text-2xl text-center mb-8">New Item</h3>
            <input onKeyDown={handleEnter} onChange={(e) => setNewItem(e.target.value)} className="w-full outline-none bg-transparent border border-white p-2 rounded-lg focus:border-[#6C63FF] duration-200 text-white focus:placeholder:opacity-0 placeholder:duration-300 mb-8" type="text" placeholder="Add Item" />
            <div className="flex justify-between">
              <button onClick={() => setOpen(false)} className="text-[#6C63FF] hover:text-white border-2 border-[#6C63FF] hover:bg-[#6C63FF] duration-200 py-2 w-[100px] rounded-lg">
                Cancel
              </button>
              <button onClick={addNewItem} className="text-[#6C63FF] hover:text-white border-2 border-[#6C63FF] hover:bg-[#6C63FF] duration-200 py-2 w-[100px] rounded-lg">
                Add
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddItemModal;
