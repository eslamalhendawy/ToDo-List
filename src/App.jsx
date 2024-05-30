import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddItemModal from "./AddItemModal";
import ItemsList from "./ItemsList";

function App() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setList(JSON.parse(localStorage.getItem("todos")).reverse());
    }
  }, []);

  const searchList = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setList(JSON.parse(localStorage.getItem("todos")).reverse());
      return;
    }
    const filteredList = list.filter((item) => item.value.toLowerCase().includes(search.toLowerCase()));
    setList(filteredList);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-5xl text-center mb-12 text-white">To Do List</h1>
      <div className="relative w-[90%] lg:w-[70%] xl:w-[50%] md:mx-auto mb-12">
        <input onChange={searchList} className="w-full outline-none bg-transparent border border-white p-2 rounded-lg focus:border-[#6C63FF] duration-200 text-white focus:placeholder:opacity-0 placeholder:duration-300" type="text" placeholder="Search" />
        <i className="fa-solid fa-magnifying-glass absolute text-white hover:text-[#6C63FF] cursor-pointer duration-200 top-[50%] translate-y-[-50%] right-3"></i>
        <AddItemModal />
      </div>
      <ItemsList list={list} setList={setList} />
      <ToastContainer autoClose={2500} theme="light" newestOnTop={true} />
    </main>
  );
}

export default App;
