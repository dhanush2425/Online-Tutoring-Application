const EditReview = (props) => {
    if (props.studentId === props.reviewerId) {
        return (
            <button className="btn btn-warning btn-width m-1">Edit</button>
        );
    } else {
        return null;
    }
}

export default EditReview;