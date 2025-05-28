import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isdatadisplayed, setIsDataDisplayed] = useState(true);
  const [data, setData] = useState([]);
  const [dataitem, setDataItem] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [apiError, setApiError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [selectedCards, setSelectedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setApiError("");

      try {
        const response = await fetch(
          "https://dummy.restapiexample.com/api/v1/employees"
        );
        if (!response.ok) throw new Error("Failed to fetch employees");

        const result = await response.json();

        if (Array.isArray(result.data)) {
          setData(result.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setApiError("Failed to load employee.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((emp) => emp.id !== id));
    if (dataitem && dataitem.id === id) {
      setDataItem(null);
    }
  };

  const handleSelect = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleButton = () => {
    const trimmedInput = searchItem.trim();

    if (trimmedInput === "") {
      setSearchError("Please enter your ID");
      setDataItem(null);
      setIsDataDisplayed(true);
      return;
    }

    const numberOnlyRegex = /^\d+$/;
    if (!numberOnlyRegex.test(trimmedInput)) {
      setSearchError("Invalid ID. Please enter a number.");
      setDataItem(null);
      setIsDataDisplayed(true);
      return;
    }

    const id = Number(trimmedInput);

    if (isLoading) {
      setSearchError("Please wait, data is still loading.");
      setDataItem(null);
      setIsDataDisplayed(true);
      return;
    }

    if (data.length === 0) {
      setSearchError("No employee data available.");
      setDataItem(null);
      setIsDataDisplayed(true);
      return;
    }

    const found = data.find((emp) => Number(emp.id) === id);

    if (found) {
      setSearchError("");
      setDataItem(found);
      setIsDataDisplayed(false);
    } else {
      setSearchError("Employee not found.");
      setDataItem(null);
      setIsDataDisplayed(true);
    }
  };

  const handleSelectAll = () => {
    if (selectedCards.length === data.length) {
      setSelectedCards([]);
    } else {
      setSelectedCards(data.map((emp) => emp.id));
    }
  };

  const handleDeleteSelected = () => {
    setData(data.filter((emp) => !selectedCards.includes(emp.id)));
    if (dataitem && selectedCards.includes(dataitem.id)) {
      setDataItem(null);
    }
    setSelectedCards([]);
  };

  return (
    <>
      <div className="grid gap-6 bg-[#3c493f] py-6 px-25 min-h-screen">
        <div className="flex justify-between">
          <div className="grid gap-3 h-[5rem]">
            <h1 className="text-4xl text-white font-bold text-left">
              Employees Dashboard
            </h1>
            
            <p className="whitespace-normal text-gray-300 text-wrap text-left">
              Welcome to Employees Dashboard, here you can search the Employee
              by their ID.
              <br /> It will list all the necessary details of the Employee.
            </p>
            
          </div>
          <div className="grid h-[7rem]">
            <div className="flex gap-4 justify-center items-center">
              <div className="grid relative top-3">
                <input
                  placeholder="Enter the ID"
                  value={searchItem}
                  onChange={(e) => {
                    setSearchItem(e.target.value);
                  }}
                  className="h-[2.3rem] w-[15rem] text-white border-2xl border-2 rounded"
                />
                
                <div className="h-5 mt-1 text-center">
                  <p
                    className={`text-sm transition-all duration-200 ${
                      searchError ? "text-red-500 opacity-100" : "opacity-0"
                    }`}
                  >
                    {searchError || "\u00A0"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleButton}
                disabled={isLoading || searchItem.trim() === ""}
                className="px-4 py-2 bg-white text-black rounded disabled:bg-gray-400"
              >
                Search
              </button>
            </div>
            <div className="h-10 grid gap-8">
              <p className="text-gray-300 text-sm relative top-3 text-center">
                Enter the employee ID below and click the
                <span className="font-semibold"> Search</span> button to view
                details.
              </p>
            </div>
          </div>
        </div>

        {apiError && data.length === 0 && (
          <p className="text-red-600">{apiError}</p>
        )}


        {isLoading && (
          <div className="text-white text-center">Fetching data...</div>
        )}

        {isdatadisplayed && data.length > 0 && (
          <div className="grid ">
            <div className="flex justify-end items-center gap-4 mb-4">
              <button
                onClick={handleSelectAll}
                className="bg-[#f0f7f4] text-black px-4 py-2 rounded"
              >
                {selectedCards.length === data.length
                  ? "Unselect All"
                  : "Select All"}
              </button>
              <button
                onClick={handleDeleteSelected}
                disabled={selectedCards.length === 0}
                className={`${
                  selectedCards.length === 0 ? "bg-gray-400" : "bg-red-600"
                } text-white px-4 py-2 rounded`}
              >
                Delete Selected
              </button>
            </div>
            <p className="text-sm text-gray-300 mb-2 text-right">
              Click{" "}
              <span className="font-semibold text-white">"Select All"</span>{" "}
              only if you want to delete all employee records shown below.
            </p>
          </div>
        )}

        {dataitem ? (
          <>
            <div
              className="h-[20rem] w-[20rem]
  grid place-content-evenly items-center
  bg-gradient-to-r from-[#78847c] to-[#b3bfb8]
  text-black rounded-lg
  shadow-lg
  hover:shadow-2xl
  transition-shadow duration-300
  p-6"
              value={searchItem}
            >
              <Link
                to={`/employeeDetails/${dataitem.id}`}
                className="no-underline text-white"
              >
                <p>Employee_ID : {dataitem.id}</p>
                <p>Name : {dataitem.employee_name}</p>
                <p>Salary : {dataitem.employee_salary}</p>
                <p>Age : {dataitem.employee_age}</p>
                <p>Image : {dataitem.profile_image}</p>
              </Link>

              <div className="flex justify-center gap-5 items-center">
                <button
                  className="bg-white h-[3rem] w-[5rem] rounded-xl text-black"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(dataitem.id);
                  }}
                >
                  Delete
                </button>
                <button className="bg-white h-[3rem] w-[5rem] rounded-xl text-black">
                  Edit
                </button>
              </div>
            </div>
          </>
        ) : null}

        {isdatadisplayed ? (
          <div className="flex justify-center items-center flex-wrap gap-4 ">
            {data.map((elem, index) => {
              const isSelected = selectedCards.includes(elem.id);
              return (
                <Link
                  key={index}
                  to={`/employeeDetails/${elem.id}`}
                  className="no-underline text-white"
                >
                  <div
                    className={`h-[20rem] w-[20rem]
  grid place-content-evenly items-center
  bg-gradient-to-r from-[#78847c] to-[#b3bfb8]
  text-black rounded-lg
  shadow-lg
  hover:shadow-2xl
  transition-shadow duration-300
  p-6 ${isSelected ? "border-[#f0f7f4]" : "border-transparent"}`}
                  >
                    <p>Employee_ID : {elem.id}</p>
                    <p>Name : {elem.employee_name}</p>
                    <p>Salary : {elem.employee_salary}</p>
                    <p>Age : {elem.employee_age}</p>
                    <p>Image : {elem.profile_image || "No Image"}</p>
                    <div className="flex justify-center gap-5 items-center">
                      <button
                        className="bg-white h-[3rem] w-[5rem] rounded-xl text-black"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(elem.id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-white h-[3rem] w-[5rem] rounded-xl text-black"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
