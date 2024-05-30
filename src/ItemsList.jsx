import { useState } from "react";
import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image from "/assets/emptyList.png";

const ItemsList = ({ list, setList }) => {
  const [open, setOpen] = useState(false);
  const [id, setID] = useState("");
  const [updatedItem, setUpdatedItem] = useState("");

  const deleteItem = (e) => {
    const updatedList = list.filter((item) => item.id !== e).reverse();
    localStorage.setItem("todos", JSON.stringify(updatedList));
    setList(updatedList);
    window.location.reload();
  };

  const openModal = (e) => {
    setOpen(true);
    setID(e.id);
    setUpdatedItem(e.value);
  };

  const editItem = () => {
    if (updatedItem === "") {
      toast.error("Please enter a value");
      return;
    }
    const updatedList = list.map((item) => {
      if (item.id === id) {
        item.value = updatedItem;
      }
      return item;
    });
    localStorage.setItem("todos", JSON.stringify(updatedList.reverse()));
    window.location.reload();
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
          <div key={item.id} className="flex justify-between items-center border-b border-[#6C63FF] py-4">
            <h3 className="text-white font-medium text-xl capitalize">{item.value}</h3>
            <div className="flex items-center gap-2 text-lg text-white">
              <p className="">{item.date}</p>
              <button onClick={() => openModal(item)} className="hover:text-[#6C63FF] duration-200">
                <i className="fa-solid fa-edit"></i>
              </button>
              <button onClick={() => deleteItem(item.id)} className="hover:text-[#6C63FF] duration-200">
                <i className="fa-solid fa-trash"></i>
              </button>
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
            <input value={updatedItem} onKeyDown={handleEnter} onChange={(e) => setUpdatedItem(e.target.value)} className="w-full outline-none bg-transparent border border-white p-2 rounded-lg focus:border-[#6C63FF] duration-200 text-white focus:placeholder:opacity-0 placeholder:duration-300 mb-8" type="text" placeholder="Edit Item" />
            <div className="flex justify-between">
              <button onClick={() => setOpen(false)} className="text-[#6C63FF] hover:text-white border-2 border-[#6C63FF] hover:bg-[#6C63FF] duration-200 py-2 w-[100px] rounded-lg">
                Cancel
              </button>
              <button onClick={editItem} className="text-[#6C63FF] hover:text-white border-2 border-[#6C63FF] hover:bg-[#6C63FF] duration-200 py-2 w-[100px] rounded-lg">
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
