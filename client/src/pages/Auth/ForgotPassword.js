import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success('register');
    try {
      const res = await axios.post(
        // REACT_APP_API created in react .env file
        //'/api/v1/auth' is the route created in node server.js
        // email, password are the fields we created in user model and saving in the DB
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res.data.success) {
        // res.data.message here we are getting response from data.message which is created in authcontroller
        toast.success(res.data.message);
        
        navigate("/login"); // navigate user with there location history
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Email or answer is not correct");
    }
  };
  return (
    <Layout title={'Forgot password'}>
        <div className="register">
        <h1>Rest Password </h1>
        <form onSubmit={handleSubmit}>
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
              type="text"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="form-control"
              id="ans"
              placeholder="In what city were you born?"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter New Password"
              required
            />
          </div>

          

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword