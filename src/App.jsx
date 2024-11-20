import { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddItemModal from "./AddItemModal";
import ItemsList from "./ItemsList";

function App() {
  const [list, setList] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchList = async () => {
    const response = await axios.get("https://to-do-list-a79dc-default-rtdb.europe-west1.firebasedatabase.app/list.json");
    const fetchedList = [];
    for (const key in response.data) {
      fetchedList.push({
        id: key,
        value: response.data[key].value,
        category: response.data[key].category,
        date: response.data[key].date,
      });
    }
    let temp = fetchedList;
    setList(temp);
    setTempList(temp);
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (category === "") {
      setList(tempList);
      return;
    }
    const filteredList = tempList.filter((item) => item.category === category);
    setList(filteredList);
  }, [category]);


  const searchList = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setList(tempList);
      return;
    }
    const filteredList = list.filter((item) => item.value.toLowerCase().includes(search.toLowerCase()));
    setList(filteredList);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-5xl text-center mb-12 text-white">To Do List</h1>
      <div className="flex items-center gap-2 mb-12 w-[90%] lg:w-[70%] xl:w-[50%] md:mx-auto">
        <div className="relative grow">
          <input onChange={searchList} className="w-full outline-none bg-transparent border border-white p-2 rounded-lg focus:border-[#6C63FF] duration-200 text-white focus:placeholder:opacity-0 placeholder:duration-300" type="text" placeholder="Search" />
          <i className="fa-solid fa-magnifying-glass absolute text-white hover:text-[#6C63FF] cursor-pointer duration-200 top-[50%] translate-y-[-50%] right-3"></i>
          <AddItemModal />
        </div>
        <select onChange={(e) => setCategory(e.target.value)} className="cursor-pointer text-center h-[42px] px-2 bg-[#6C63FF] hover:bg-[#5750cf] duration-200 text-white font-medium outline-none rounded-lg">
          <option value="">All</option>
          <option value="Work">Work</option>
          <option value="Educational">Educational</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <ItemsList list={list} setList={setList} />
      <ToastContainer autoClose={2500} theme="light" newestOnTop={true} />
    </main>
  );
}

export default App;
