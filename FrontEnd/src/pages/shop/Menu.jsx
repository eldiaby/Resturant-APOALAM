import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [totalPages, setTotalPages] = useState(Number);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page

  // Fetch meals from API with optional filters and sorting
  const fetchMeals = async () => {
    try {
      let query = `?page=${currentPage}&limit=${itemsPerPage}`;

      if (selectedCategory !== "all") {
        query += `&category=${selectedCategory}`;
      }

      if (sortOption === "A-Z") {
        query += `&sortBy=name&order=asc`;
      } else if (sortOption === "Z-A") {
        query += `&sortBy=name&order=desc`;
      } else if (sortOption === "low-to-high") {
        query += `&sortBy=price&order=asc`;
      } else if (sortOption === "high-to-low") {
        query += `&sortBy=price&order=desc`;
      }

      const response = await fetch(`http://localhost:5000/api/meals${query}`);
      const data = await response.json();

      console.log(data.meals);
      console.log(data.totalPages);
      setTotalPages(data.totalPages);
      setMenu(data.meals); // Set menu to fetched data
      setFilteredItems(data.meals); // Initially, display all items
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch meals when component mounts and when dependencies change
  useEffect(() => {
    fetchMeals();
  }, [currentPage, selectedCategory, sortOption]);

  const filterItems = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when the filter is applied
  };

  const showAll = () => {
    setSelectedCategory("all");
    setCurrentPage(1); // Reset to the first page
  };

  const handleSortChange = (option) => {
    console.log(option);
    setSortOption(option);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  // Pagination logic
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>
            {/* <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Order Now
            </button> */}
          </div>
        </div>
      </div>

      {/* menu shop */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* all category buttons */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("Pizza")}
              className={selectedCategory === "Pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("Vegetarian")}
              className={selectedCategory === "Vegetarian" ? "active" : ""}
            >
              Vegetarian
            </button>
            <button
              onClick={() => filterItems("burger")}
              className={selectedCategory === "burger" ? "active" : ""}
            >
              Burger
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("Pasta")}
              className={selectedCategory === "Pasta" ? "active" : ""}
            >
              Pasta
            </button>
          </div>

          {/* filter options */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2 ">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default"> Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* product card */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 ">
          {menu.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: totalPages,
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
