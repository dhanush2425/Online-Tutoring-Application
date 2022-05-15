import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Containers/Style.css";
import Flags from "country-flag-icons/react/3x2";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

const Tutors = function (props) {
  const filteredRows = [];
  const filteredText = props.filterText;
  function handleTutorChange(item) {
    props.handleChangeTutor(item);
  }

  let i = 1;
  let subrows = [];
  props.tutorsList.forEach((tutor) => {
    const subjects = tutor.tutoringSubjects.toString();
    if (
      tutor.name.indexOf(filteredText) === -1 &&
      subjects.indexOf(filteredText) === -1
    ) {
      return;
    }
    subrows.push(tutor);
    i++;
    if (((i) % 3) === 0) {
      filteredRows.push(subrows);
      i = 0;
      subrows = [];
    }
  });
  if (subrows.length !== 0) {
    filteredRows.push(subrows);
  }
  return (
    <div className="container">
      {filteredRows.map((tutors, id) => (
        <div className="card-group" key={id}>
          {tutors.map((tutor, id) => (
            <div className="card" key={id}>
              <img
                className=" tutor-img-small"
                src={process.env.PUBLIC_URL + "/images/" + tutor.fileName}
                alt="Card cap"
              ></img>
              <div className="card-body">
                <h5 className="card-title">{tutor.name}</h5>
              </div>
              <div className="card-text">
                <p>
                  <span className="param-padding">
                    <em>Accent:</em> <Flags.US className="flag-icons" />
                  </span>
                  <span className="param-padding">
                    <em>Ratings:</em>
                    <StarRatings
                      rating={tutor.averageRatings}
                      starRatedColor="blue"
                      numberOfStars={5}
                      name="rating"
                      starDimension="10px"
                      starSpacing="2px"
                    />
                  </span>
                  <span className="param-padding">
                    <em>Total Hours:</em> {tutor.totalTutoringHours}
                  </span>
                </p>
                <p>
                  <span>
                    <em>Subjects:</em> {tutor.tutoringSubjects.toString()}
                  </span>
                </p>
                <div>
                  <button
                    className="btn btn-primary align-items-center margin-bottom"
                    value="Profile"
                    onClick={() => handleTutorChange(tutor)}
                  >Profile</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}</div>
  );
};

export default Tutors;
