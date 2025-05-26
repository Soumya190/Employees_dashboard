import React from "react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [isdatadisplayed, setIsDataDisplayed] = useState(true);
  const [data, setData] = useState([]);

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
  return (
    <>
      <div>
        {isdatadisplayed ? (
          <div>
            {data.map((elem, index) => {
              return (
                <div key={index} className="h-[5rem] w-[5rem] bg-black">
                  <p>{elem.id}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
