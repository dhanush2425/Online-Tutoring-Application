import Header from "./Header";
import "../Containers/Style.css";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentProfileEdit from './StudentProfileEdit'
import TutorProfileEdit from "./TutorProfileEdit";

const Profile = (props) => {
    return (
        <div>
            <Header user={props.user} />
            <ToastContainer />
            <div className="container-fluid">
                <div className="row m-5">
                    <div className="col-md-5">
                        <img className="tutor-img-large" src={process.env.PUBLIC_URL + "/images/" + props.user.fileName} alt="User_Profile_Picture"></img>
                    </div>
                    <div className="col-md-4">
                        <TutorProfileEdit user={props.user} handleUserChange={props.handleUserChange}></TutorProfileEdit>
                        <StudentProfileEdit user={props.user} handleUserChange={props.handleUserChange}></StudentProfileEdit>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;