import "../Containers/Style.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StudentProfileEdit = (props) => {
    const [name, setName] = useState(props.user.name);
    const [testimonial, setTestimonial] = useState(props.user.testimonial ? props.user.testimonial : "");
    const [school, setSchool] = useState(props.user.school ? props.user.school : "");
    const editStudent = (e) => {
        const student = { name, school, testimonial };
        e.preventDefault();
        axios.put("http://localhost:3001/student/" + props.user._id, student).then((updated) => {
            toast.success("Profile has been updated Successfully!");
            axios.get("http://localhost:3001/student/" + props.user._id).then((data) => {
                props.handleUserChange(data.data);
            }).catch((err) => {
                toast.warn("Fetch failed!");
            })
        }).catch((err) => {
            toast.error("Information could not be updated!");
            console.log(err);
        });
    }

    if (props.user.itemType === 'Tutor') {
        return null;
    } else {
        return (
            <div>
                <form id="myForm" className="" onSubmit={editStudent} encType="multipart/form-data">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" id="name"
                            value={name} onChange={e => setName(e.target.value)}></input>
                    </div>
                    <br></br>

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Email" id="email"
                            value={props.user.email} readOnly={true}></input>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="School" id="school"
                            value={school} onChange={e => setSchool(e.target.value)}></input>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <textarea className="form-control text-area-height" placeholder="Add a testimonial..." value={testimonial}
                            onChange={e => setTestimonial(e.target.value)}>
                        </textarea>
                    </div>
                    <br></br>
                    <input type="submit" className="btn btn-primary" value="Update"></input>
                    <Link to={"/"} className="btn btn-warning m-2">Close</Link>
                </form>
            </div>
        );
    }
}

export default StudentProfileEdit;