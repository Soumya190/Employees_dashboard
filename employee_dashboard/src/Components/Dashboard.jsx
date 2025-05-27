import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isdatadisplayed, setIsDataDisplayed] = useState(true);
  const [data, setData] = useState([]);
  const [dataitem, setDataItem] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [displayederror, setDisplayedError] = useState("");
  const [showFull, setShowFull] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(
          "https://dummy.restapiexample.com/api/v1/employees"
        );
        console.log(response);
        let data = await response.json();
        console.log(data);
        console.log(data.data[0].id);
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleButton = () => {
    if (searchItem.trim() === "") {
      setDisplayedError("Please enter your ID");
      setDataItem(null);
      setIsDataDisplayed(true);
      return;
    }

    const id_value = data.find((emp) => emp.id === parseInt(searchItem));
    if (id_value) {
      setDisplayedError("");
      setDataItem(id_value);
      setIsDataDisplayed(false);
    } else {
      setDisplayedError("Please Enter your ID");
      setDataItem(null);
      setIsDataDisplayed(true);
    }
  };

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
      <div className="grid gap-[2rem] bg-[#3c493f] py-3 px-4">
        <div className="flex justify-between">
          <div className="grid">
            <h1 className="text-4xl  font-bold text-left">
              Employees Dashboard
            </h1>
            <div className="w-full ">
              <p className="whitespace-normal text-wrap text-left">
                Welcome to Employees Dashboard, here you can search the Employee
                by their ID.
                <br /> It will list all the necessary details of the Employee.
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <div className="grid">
              <input
                placeholder="Enter the ID"
                value={searchItem}
                onChange={(e) => {
                  setSearchItem(e.target.value);
                }}
                className="h-[2.3rem] w-[15rem] text-black border-2xl border-2 rounded"
              />
              {displayederror && (
                <p className="text-red-600">{displayederror}</p>
              )}
            </div>
            <button
              onClick={handleButton}
              className="h-10 w-20 rounded-md bg-black text-white"
            >
              Search
            </button>
          </div>
        </div>
        <div
          onClick={() => setShowFull(!showFull)}
          className="bg-gradient-to-r from-[#78847c] to-[#b3bfb8] p-6 rounded-xl shadow-lg text-white text-sm space-y-4 w-full max-w-3xl mx-auto cursor-pointer transition-all duration-300"
        >
          <h1 className="text-xl font-semibold underline decoration-white">
            How to Use
          </h1>

          {showFull && (
            <>
              <p className="">Search Employee by ID</p>
              <ul className="list-disc list-inside space-y-1 text-sm pl-4">
                <li>
                  Enter a valid Employee ID (e.g., 1, 2, 3, etc.) in the input
                  field at the top.
                </li>
                <li>
                  Click the
                  <span className="font-semibold text-black bg-white px-2 py-0.5 rounded">
                    Search
                  </span>
                  button.
                </li>
                <li>
                  If a matching employee is found, their details will be
                  displayed below.
                </li>
              </ul>

              <h1 className="text-2xl font-bold underline decoration-white pt-4">
                View All Employees
              </h1>
              <p>
                If no search is performed, the page will load and display a list
                of all available employees.
              </p>
              <p className="font-semibold">Each entry shows:</p>
              <ul className="list-decimal list-inside pl-4 space-y-1">
                <li>Employee ID</li>
                <li>Name</li>
                <li>Salary</li>
                <li>Age</li>
              </ul>
            </>
          )}
        </div>

        {isdatadisplayed && data.length > 0 && (
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
        )}

        {dataitem ? (
          <>
            <div
              className="h-[20rem] grid place-content-evenly bg-gradient-to-r from-[#78847c] to-[#b3bfb8] items-center w-[20rem] text-black rounded"
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
                    className={`h-[20rem] w-[20rem] grid place-content-center bg-[#78847c] items-center text-white rounded-xl border-4 ${
                      isSelected ? "border-[#f0f7f4]" : "border-transparent"
                    }`}
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
                      <button className="bg-white h-[3rem] w-[5rem] rounded-xl text-black">
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
