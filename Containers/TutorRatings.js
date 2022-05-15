import EditReview from "./EditReview";
import StarRatings from "react-star-ratings";

const TutorRatings = (props) => {
    return (
        <div className="row">
            <h3 className="text-primary">Reviews and Ratings</h3><br></br><br></br>
            {props.selectedTutor.topTenReviews.map((ttreview, id) => (
                <>
                    <h5>{ttreview.review}</h5>
                    <p>By: {ttreview.studentName}</p>

                    <div>
                        <em>Ratings:</em>
                        <StarRatings
                            rating={ttreview.stars}
                            starRatedColor="blue"
                            numberOfStars={5}
                            name="rating"
                            starDimension="10px"
                            starSpacing="2px"
                        /></div>
                    <EditReview studentId={props.user ? props.user._id : "0"} reviewerId={ttreview.studentId}></EditReview>
                    <br></br>
                    <hr></hr>
                </>
            ))}
        </div>
    )
}

export default TutorRatings;