import "../Containers/Style.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";


const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.value}</label>
            </components.Option>
        </div>
    );
};


const TutorProfileEdit = (props) => {
    const [name, setName] = useState(props.user.name);
    const [aboutMe, setAboutMe] = useState(props.user.aboutMe ? props.user.aboutMe : "");
    const [optionSelected, setOptionSelected] = useState(props.user.tutoringSubjects ? props.user.tutoringSubjects.map((item) => new Object({ "value": item, "label": item })) : []);

    const handleChange = (selected) => {
        setOptionSelected(selected);
    }

    const editTutor = (e) => {
        e.preventDefault();

        const tutoringSubjects = optionSelected.map((item) => item.value);
        const tutor = { name, aboutMe, tutoringSubjects };
        axios.put("http://localhost:3001/tutor/" + props.user._id, tutor).then((res) => {
            toast.success("Profile has been updated Successfully!");
            axios.get("http://localhost:3001/tutor/" + props.user._id).then((data) => {
                props.handleUserChange(data.data);
            }).catch((err) => {
                toast.warn("Fetch failed!");
            })
        }).catch((err) => {
            toast.error("Information could not be updated!");
            console.log(err);
        })
    }
    const subjects = [
        { value: "English", label: "English" },
        { value: "Mathematics", label: "Mathematics" },
        { value: "Physics", label: "Physics" },
        { value: "Chemistry", label: "Chemistry" },
        { value: "Biology", label: "Biology" },
        { value: "History", label: "History" },
        { value: "Geography", label: "Geography" },
        { value: "GRE", label: "GRE" },
        { value: "SAT", label: "SAT" },
        { value: "Programming", label: "Programming" }
    ];

    if (props.user.itemType === 'Student') {
        return null;
    } else {
        return (
            <div>
                <form id="myForm" onSubmit={editTutor} className="form-align-items-left" encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="username">Name:</label>
                        <input type="text" className="form-control" placeholder="Name" id="name"
                            value={name} onChange={e => setName(e.target.value)}></input>
                    </div>
                    <br></br>
                    <label >Subjects:</label>
                    <ReactSelect
                        options={subjects}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                            Option
                        }}
                        onChange={handleChange}
                        allowSelectAll={true}
                        value={optionSelected}
                    />
                    <br></br>
                    <div className="form-group">
                        <label>About Me:</label>
                        <textarea className="form-control text-area-height" placeholder="About me..." value={aboutMe}
                            onChange={e => setAboutMe(e.target.value)}>
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

export default TutorProfileEdit;