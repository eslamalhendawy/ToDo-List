import { useState } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image from "/assets/emptyList.png";

const ItemsList = ({ list }) => {
  const [open, setOpen] = useState(false);
  const [updatedItem, setUpdatedItem] = useState("");
  const [category, setCategory] = useState("Work");
  const [updatedName, setUpdatedName] = useState("");

  const deleteItem = async (e) => {
    await axios.delete(`https://to-do-list-a79dc-default-rtdb.europe-west1.firebasedatabase.app/list/${e}.json`);
    window.location.reload();
  };

  const openModal = (e) => {
    setOpen(true);
    setUpdatedItem(e);
    setUpdatedName(e.value);
  };

  const editItem = async () => {
    if (updatedName === "") {
      toast.error("Please enter a value");
      return;
    }
    const response = await axios.put(`https://to-do-list-a79dc-default-rtdb.europe-west1.firebasedatabase.app/list/${updatedItem.id}.json`, { value: updatedName, category, date: new Date().toISOString().split("T")[0] });
    if (response.status === 200) {
      window.location.reload();
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      editItem();
    }
  };

  return (
    <div className="lg:w-[70%] xl:w-[65%] md:mx-auto">
      {list.length != 0 ? (
        list.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-[#6C63FF] py-4">
            <h3 className="text-white font-medium text-xl capitalize mb-4 sm:mb-0">{item.value}</h3>
            <div className="flex items-center gap-3 text-lg text-white">
              <p>{item.category}</p>
              <p className="">{item.date}</p>
              <div className="flex items-center gap-6">
                <button onClick={() => openModal(item)} className="hover:text-[#6C63FF] duration-200">
                  <i className="fa-solid fa-edit"></i>
                </button>
                <button onClick={() => deleteItem(item.id)} className="hover:text-[#6C63FF] duration-200">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <img src={image} />
          <p className="text-white font-medium text-xl">List Is Empty</p>
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="bg-[#252525] border border-white p-6 w-[300px] sm:w-[450px] rounded-lg">
            <h3 className="font-medium text-white text-2xl text-center mb-8">Edit Item</h3>
            <input value={updatedName} onKeyDown={handleEnter} onChange={(e) => setUpdatedName(e.target.value)} className="w-full outline-none bg-transparent border border-white p-2 rounded-lg focus:border-[#6C63FF] duration-200 text-white focus:placeholder:opacity-0 placeholder:duration-300 mb-8" type="text" placeholder="Edit Item" />
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
              <button onClick={() => setOpen(false)} className="text-[#6C63FF] hover:text-white border-2 border-[#6C63FF] hover:bg-[#6C63FF] duration-200 py-2 w-[100px] rounded-lg">
                Cancel
              </button>
              <button onClick={() => editItem()} className="text-[#6C63FF] hover:text-white border-2 border-[#6C63FF] hover:bg-[#6C63FF] duration-200 py-2 w-[100px] rounded-lg">
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ItemsList;
