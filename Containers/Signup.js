import React, { useImperativeHandle, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
//import { use } from "../../../../api/routes/tutorRoutes";
//import { parseClassName } from "react-toastify/dist/utils";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailerr,setEmailErr]=useState("");
  const [password, setPassword] = useState("");
  const [passworderr,setPasswordErr]=useState("");
  const [confPassword, setConfPassword] = useState("");
  const [confpassworderr,setConfPasswordErr]=useState("");
  const [userType, setUserType] = useState("Student");
  const [selectedFile, setSelectedFile] = useState();
  const [disabled, setdisabled]=useState(true);
  const navigate = useNavigate();

  const validateEmail = (e) => {
    var emailval=e.target.value
    var validemail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    
    if (emailval.match(validemail)) {
      setEmailErr('')
    } else {
      setEmailErr('Enter a valid email-id such as abc@def.xyz!')
      setdisabled(true)
    }
  }  
  const StrongPassword= (e) =>{
    var passwordValue=e.target.value
    let  strpass=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    if(passwordValue.match(strpass)) 
    {
      setPasswordErr('')
      
    }
    else{
      setPasswordErr('Password should contain 1 UpperCase,1 Numeric Value and 1 Special Character!')
      setdisabled(true)
    }
   
    }

    const ConfirmPass= (e) =>{
      var password1=password
      var password2=e.target.value
      if(password1===password2 && password2===password1)
      {
        setConfPasswordErr('')
        setdisabled(false)
        
      }
      else{
        setConfPasswordErr('Passwords Do Not Match')
        setdisabled(true)
      }
     
      }

  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const userSignup = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('type', userType);
    formData.append('image', selectedFile);
    axios.post("http://localhost:3001/signup", formData).then((res) => {
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
      toast.error("Email Already Exists!");
      console.log("Need attention!");
    })
  }

  return (
    <div className="container-fluid">
      <ToastContainer></ToastContainer>
      <div className="row">
        <div className="col-md-3">
          <Link to="/">
            <img src={'/images/logo.png'} alt="logo"></img></Link>
        </div>

        <div className="col-md-6"> <h1>Kalisu Signup!</h1>
          <br></br>
          <form id="myForm" onSubmit={userSignup} className="form-align-items-left" encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" placeholder="John Doe" id="name"
                value={name} onChange={e => setName(e.target.value)}></input>
            </div>
            <br></br>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text" className="form-control" placeholder="John.Doe@gmail.com" id="email"
                value={email} onChange={e => (setEmail(e.target.value),validateEmail(e))}></input>
                <span style={{}}>{emailerr}</span>
            </div>
            <br></br>

            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input type="password" className="form-control" placeholder="*******" id="pwd"
                value={password} onChange={e => (setPassword(e.target.value),StrongPassword(e))}></input>
                  <span style={{}}>{passworderr}</span>
            </div>
            <br></br>

            <div className="form-group">
              <label htmlFor="confirm">Confirm:</label>
              <input type="password" className="form-control" placeholder="*******" id="confirm"
                 onChange={e => setConfPassword((e.target.value),ConfirmPass(e))}></input>
                 <span style={{}}>{confpassworderr}</span>
            </div>
            <br></br>

            <div className="form-group">
              <label>Upload Profile Picture:</label>
              <input type="file" name="file" className="form-control" onChange={fileChangeHandler} accept="image/png, image/jpeg" />
            </div>
            <br></br>
            <div className="form-group">
              <label>Select Type: </label>
              <label>
                <input className="form-check-input m-2" type="radio" name="userType" id="StudentRadio"
                  value="Student" onChange={e => setUserType(e.target.value)} checked />
                Student
              </label>
              <label>
                <input className="form-check-input m-2" type="radio" name="userType" id="TutorRadio"
                  value="Tutor" onChange={e => setUserType(e.target.value)} />
                Tutor
              </label>
            </div>
            <br></br>
            <input type="submit" disabled={disabled} className="btn btn-primary" value="Signup!"></input>
            <Link to={'/Login'} className="btn btn-secondary m-2">Login?</Link>
          </form>


        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}
export default SignUp;
