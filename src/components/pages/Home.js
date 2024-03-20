import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {
  const [data, setData] = useState([{}]);
  // const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    loadUsers();
  }, []);
  async function loadUsers(updated) {
    if (sessionStorage.getItem('firstTime') == 1) {
      const result = await axios.get("https://reqres.in/api/users", {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      setData(result.data.data);
      sessionStorage.setItem('firstTime', 0)
      sessionStorage.setItem('data', JSON.stringify(result.data.data))
    }
    else if (updated != null) {
      setData(updated);
      sessionStorage.setItem('data', JSON.stringify(updated))
    }
    else {
      setData(JSON.parse(sessionStorage.getItem('data')));
    }
  };


 // Change page
 const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const deleteUser = async id => {
    try {
      const res = await axios.delete(`https://reqres.in/api/users/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      if (res.status == 204) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].id == id) {
            id = i;
            break;
          }
        }
        if (data[i] != null && data[i] != undefined)
          await delete (data[id]);
        const filtered = data.filter(function (el) {
          return el != null;
        });
        loadUsers(filtered)
      }
    }
    catch (e) {
      alert(e.message);
    }
  };
   // Calculate pagination
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="container">
      <div className="py-4">
        <table class="table border shadow">
          <thead class="thead-light">
            <tr>
              <th scope="col">Avatar</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((user) => (
              <tr>
                <td><img src={user.avatar} alt={user.avatar}></img></td>
                <td className="align-middle">{user.first_name + " " + user.last_name}</td>
                <td className="align-middle">{user.email}</td>
                <td className="align-middle">
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                    Edit
      </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => {
                      const confirm = window.confirm("Confirm Delete");
                      if (confirm == true) {
                        deleteUser(user.id);
                      }
                    }}
                  >
                    Delete
      </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
};
export default Home;