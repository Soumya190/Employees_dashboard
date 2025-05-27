import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";

const EmployeeDetails = () => {
  const [dataitem, setDataItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
  if (!id) return;

  console.log("Fetching employee with ID:", id);

  fetch(`https://dummy.restapiexample.com/api/v1/employee/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("API response for employee detail:", data);
      if (data.status === "success") {
        setDataItem(data.data);
      } else {
        console.error("API error message:", data.message);
        setDataItem(null);
      }
    })
    .catch((err) => {
      console.error("Error fetching employee:", err);
      setDataItem(null);
    });
}, [id]);

  return (
    <div className="grid place-content-center items-center bg-[#3c493f] h-screen">
        <div className="h-[20rem] w-[20rem] grid place-content-center  bg-[#78847c] items-center text-white rounded-xl border-4">
      {dataitem ? (
        <>
          <div>
            <p>Employee_ID : {dataitem.id}</p>
            <p>Name : {dataitem.employee_name}</p>
            <p>Salary : {dataitem.employee_salary}</p>
            <p>Age : {dataitem.employee_age}</p>
            <p>Image : {dataitem.profile_image}</p>
          </div>
        </>
      ) : (
        <div>Employees data is not listed</div>
      )}
    </div>
    </div>
  );
};

export default EmployeeDetails;
