import "../Containers/Style.css";
import Header from "./Header";
import StarRatings from "react-star-ratings";
import UserOperations from "./UserOperations";
import TutorRatings from "./TutorRatings";


const TutorInfo = function (props) {

  console.log(props);
  if (props.selectedTutor) {
    return (
      <div>
        <Header user={props.user} />
        <hr></hr>
        <div className="container align-left">
          <h2 className="text-primary">Tutor Information</h2>
          <div className="container">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-4">
                <img
                  className=" tutor-img-large"
                  src={
                    process.env.PUBLIC_URL +
                    "/images/" + props.selectedTutor.fileName
                  }
                  alt="Tutor Pic"
                ></img>
              </div>
              <div className="col-4">
                <h4 className="text-primary">{props.selectedTutor.name}</h4>
                <h6>
                  <em>{props.selectedTutor.aboutMe}</em>
                </h6>
                <p>
                  <em>Subjects:</em> <strong>{props.selectedTutor.tutoringSubjects.toString()}</strong>
                </p>
                <span>
                  <em>Total Hours:</em> <strong>{props.selectedTutor.totalTutoringHours}</strong>
                </span>
                <div>
                  <em>Ratings:</em>
                  <StarRatings
                    rating={props.selectedTutor.averageRatings}
                    starRatedColor="blue"
                    numberOfStars={5}
                    name="rating"
                    starDimension="10px"
                    starSpacing="2px"
                  /></div>
                <UserOperations user={props.user} selectedTutor={props.selectedTutor} handleChangeTutor={props.handleChangeTutor}></UserOperations>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
          <div className="container-fluid">
            <hr></hr>
            <div className="container-fluid">
              <TutorRatings selectedTutor={props.selectedTutor} user={props.user}></TutorRatings>
            </div>
          </div></div>
      </div>
    );
  }
  return null;
};

export default TutorInfo;
