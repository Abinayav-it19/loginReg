import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [data, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const token = sessionStorage.getItem('token');
  const authAxios = axios.create({
    baseURL: "https://reqres.in/api",
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  const { first_name, last_name, email } = data;
  const onInputChange = e => {
    setUser({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await authAxios.put('https://reqres.in/api/users/${id}', data);
    history.push("/");
  };

  const loadUser = () => {
    const temp_data = JSON.parse(sessionStorage.getItem('data'));
    var temp;
    for (var i = 0; i < temp_data.length; i++) {
      if (temp_data[i].id == id) {
        temp = i;
        break;
      }
    }
    setUser(temp_data[temp]);
  };
  function updateUser() {
    const temp_data = JSON.parse(sessionStorage.getItem('data'));
    var temp;
    for (var i = 0; i < temp_data.length; i++) {
      if (temp_data[i].id == id) {
        temp = i;
        break;
      }
    }
    temp_data[temp].first_name = data.first_name;
    temp_data[temp].last_name = data.last_name;
    temp_data[temp].email = data.email;
    sessionStorage.setItem('data', JSON.stringify(temp_data));
  }
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="First Name"
              name="first_name"
              value={first_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Last Name"
              name="last_name"
              value={last_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={() => updateUser()}>Update</button>
        </form>
      </div>
    </div>
  );
};
export default EditUser;