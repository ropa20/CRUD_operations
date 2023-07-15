import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { MdEdit, MdVisibility, MdDelete, MdSearch } from "react-icons/md";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pop, setPop] = useState(null);
  const [search, setSearch] = useState("");

  const handlePopoverClick = (item) => {
    if (pop && pop.id === item.id) {
      setPop(null);
    } else {
      setPop(item);
    }
  };

  const closePopover = () => {
    setPop(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sweede.app/DeliveryBoy/Get-Employee/"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://sweede.app/DeliveryBoy/delete-Employee/${id}`
      );
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  function htmlToText(html) {
    const element = document.createElement("div");
    element.innerHTML = html;
    return element.textContent || element.innerText;
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.FirstName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by First Name"
        />
        <span className="search-icon">
          <MdSearch />
        </span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.FirstName + " " + item.LastName}</td>
              <td>{item.DOB}</td>
              <td>{item.StartDate}</td>
              <td>{item.EndDate}</td>
              <td>{htmlToText(item.Description)}</td>
              <td>
                <div className="popover-container">
                  <button
                    onClick={() => handlePopoverClick(item)}
                    className="popover-trigger"
                  >
                    &#8942;
                  </button>
                  {pop && pop.id === item.id && (
                    <div className="popover-content">
                      <Link to={`/edit/${item.id}`}>
                        <button className="crud">
                          <MdEdit /> Edit
                        </button>
                      </Link>
                      <button
                        className="crud"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdDelete /> Delete
                      </button>
                      <Link to={`/view/${item.id}`}>
                        <button className="crud">
                          <MdVisibility /> View
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
