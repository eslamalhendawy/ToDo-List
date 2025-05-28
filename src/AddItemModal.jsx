import { useState } from "react";
import axios from "axios";

import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddItemModal = () => {
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [category, setCategory] = useState("Work");
  const url = "https://to-do-list-a79dc-default-rtdb.europe-west1.firebasedatabase.app/list.json";


  const addNewItem = async () => {
    if (newItem === "") {
      toast.error("Please enter a value");
      return;
    }
    const response = await axios.post(url, { value: newItem, category, date: new Date().toISOString().split("T")[0] });
    if (response.status === 200) {
      window.location.reload();
    } else {
      toast.error("An error occurred");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addNewItem();
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="absolute outline-none text-white top-[50%] translate-y-[-50%] right-[-200px] size-[35px] bg-[#6C63FF] hover:bg-[#5750cf] duration-200 flex items-center justify-center rounded-full">
        <i className="fa-solid fa-plus"></i>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="bg-[#252525] border border-white p-6 w-[300px] sm:w-[450px] rounded-lg">
            <h3 className="font-medium text-white text-2xl text-center mb-8">New Item</h3>
            <input onKeyDown={handleEnter} onChange={(e) => setNewItem(e.target.value)} className="w-full outline-none bg-transparent border border-white p-2 rounded-lg focus:border-[#6C63FF] duration-200 text-white focus:placeholder:opacity-0 placeholder:duration-300 mb-4" type="text" placeholder="Add Item" />
            <h3 className="font-medium text-white text-xl mb-4">Category</h3>
            <select onChange={(e) => setCategory(e.target.value)} className="mb-8 w-full text-center py-2 px-2 bg-[#6C63FF] hover:bg-[#5750cf] duration-200 cursor-pointer text-white font-medium outline-none rounded-lg">
              <option value="Work">Work</option>
              <option value="Educational">Educational</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Army">Army</option>
              <option value="Other">Other</option>
            </select>
            <div className="flex justify-between">
              <button onClick={() => setOpen(false)} className="text-[#6C63FF] hover:text-white border-2 border-[#6C63FF] hover:bg-[#6C63FF] duration-200 py-2 w-[100px] rounded-lg cursor-pointer">
                Cancel
              </button>
              <button onClick={addNewItem} className="text-[#6C63FF] hover:text-white border-2 border-[#6C63FF] hover:bg-[#6C63FF] duration-200 py-2 w-[100px] rounded-lg cursor-pointer">
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
