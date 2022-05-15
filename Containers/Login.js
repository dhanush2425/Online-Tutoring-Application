import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    const user = { email, password };
    axios.post("http://localhost:3001/login", user).then((res) => {
      axios.get("http://localhost:3001/tutor/" + res.data.user).then((tutor) => {
        props.handleUserChange(tutor.data);
        navigate("/");
      }).catch((err) => {
        axios.get("http://localhost:3001/student/" + res.data.user).then((student) => {
          props.handleUserChange(student.data);
          navigate("/");
        }).catch((err) => {
        })
      })
    }).catch((err) => {
      toast.error("Please Check Your Email and Password");
      console.log("Need attention!", err);
      e.preventDefault();
    })
  }

  return (
    
    <div className="container-fluid">
      <ToastContainer></ToastContainer>
      <div className="row p-4 m-4"></div>

      <div className="row p-4 m-4">
        <div className="col-md-3">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo"></img></Link>
        </div>

        <div className="col-md-4">
          <h3>Kalisu Login!</h3>
          <form id="myForm" className="form-align-items-left" onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="username">Email:</label>
              <input type="text" className="form-control" placeholder="Email" id="email"
                value={email} onChange={e => setEmail(e.target.value)}>
              </input>
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="username">Password:</label>
              <input type="password" className="form-control" placeholder="Password" id="password"
                value={password} onChange={e => setPassword(e.target.value)}
              ></input>
            </div>
            <br></br>
            <div className="form-group">
              <button className="btn btn-primary"> Log In</button>
              <Link to={'/Signup'} className="btn btn-secondary m-2">Signup?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
