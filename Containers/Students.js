import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Containers/Style.css";

const Students = function (props) {
  const rows = props.studentsList;

  return (
    <div className="container">
      <h3 className="main-theme-text-color">Student Testimonials</h3>
      <div className="card-group">
        {rows.map((stud, id) => (
          <div className="card" key={id}>
            <img
              className="tutor-img-small"
              src={
                process.env.PUBLIC_URL + "/images/" + stud.fileName
              }
              alt="Card cap"
            ></img>
            <div className="card-body">
              <h5 className="card-title">{stud.name}</h5>
              <p className="card-text">{stud.testimonial}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
