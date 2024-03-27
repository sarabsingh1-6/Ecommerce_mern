import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth.user]);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success('register');
    try {
      const { data } = await axios.put(
        // REACT_APP_API created in react .env file
        //'/api/v1/auth' is the route created in node server.js
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) toast.error(data.error);
      else {
        setAuth({ ...auth, user: data?.updateUser }); //first get previous values..  updateUser created in the controller
        let userLocalStorage = localStorage.getItem("auth");
        userLocalStorage = JSON.parse(userLocalStorage); //parse string back to object
        userLocalStorage.user = data.updateUser; // from the user that was updated and saved on db
        localStorage.setItem("auth", JSON.stringify(userLocalStorage)); // object to string
        toast.success("Profile updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in registering user!");
    }
  };

  return (
    <Layout title={"Dashboard - Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register">
              <h1>User Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Enter Your Name"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="form-control"
                    id="userEmail"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="form-control"
                    id="UserPass"
                    placeholder="Enter Your Password"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    className="form-control"
                    id="userPhone"
                    placeholder="Enter Your Phone Number"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    className="form-control"
                    id="userAddress"
                    placeholder="Enter Your Address"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
