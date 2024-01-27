import { useState } from "react";
import React from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Regiter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success('register');
    try {
      const res = await axios.post(
        // REACT_APP_API created in react .env file
        //'/api/v1/auth' is the route created in node server.js
        // name, email, password, phone, address are the fields we created in user model and saving in the DB
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address }
      );
      if (res.data.success) {
        // res.data.message here we are getting response from data.message which is created in authcontroller
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in registering user!");
    }
  };
  return (
    <Layout title={"Register"}>
      <div className="register">
        <h1>Regiter</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Phone Number"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Address"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Regiter;
