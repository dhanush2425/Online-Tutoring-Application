import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-date-picker';
import "../Containers/Style.css";
import { ToastContainer, toast } from 'react-toastify';

const timeSlots = [
    "10:00am",
    "11:00am",
    "12:00pm",
    "01:00pm",
    "02:00pm",
    "03:00pm",
    "04:00pm",
    "05:00pm",
    "06:00pm",
    "07:00pm"
]

const UserOperations = (props) => {
    const navigate = useNavigate();
    const [ratingShow, setRatingShow] = useState(false);
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState("");
    const [message, setMessage] = useState(null);
    const [slotUnavailable, setSlotUnavailable] = useState(false);

    const [enableBookSchedule, setEnableBookSchedule] = useState(false);
    const [pickedDate, setPickedDate] = useState(new Date());

    const [scheduleShow, setScheduleShow] = useState(false);
    const [pickedTime, setPickedTime] = useState("10:00am");


    const handleChangeTime = (e) => {
        setMessage(null);
        setEnableBookSchedule(false);
        setPickedTime(e.target.value);
        console.log(pickedDate);
    }

    const today = new Date()
    const yesterday = new Date(today)

    yesterday.setDate(yesterday.getDate() - 1)


    const handleRatingClose = () => setRatingShow(false);
    const handleRatingShow = () => setRatingShow(true);

    const closeEdit = () => {
        navigate("/");
    }

    const bookAnAppointment = () => {
        const _pDate = (pickedDate.getMonth() + 1) + "/" + pickedDate.getDate() + "/" + pickedDate.getFullYear();
        const _app = {
            tutorId: props.selectedTutor._id,
            studentId: props.user._id,
            date: _pDate,
            time: pickedTime,
            tutorName: props.selectedTutor.name,
            tutorEmail: props.selectedTutor.email,
            studentName: props.user.name,
            studentEmail: props.user.email
        }
        axios.post("http://localhost:3001/appointment", _app).then((data) => {
            toast.success("Your appointment is confirmed!");
            setEnableBookSchedule(false);
            setScheduleShow(false);
        }).catch((err) => {
            toast.error("Error booking your appointment, try another slot professor!");
            console.log(err);
        })
    }

    const checkAvailableSchedule = () => {
        const _pDate = (pickedDate.getMonth() + 1) + "/" + pickedDate.getDate() + "/" + pickedDate.getFullYear();
        axios.get("http://localhost:3001/appointment/tutor/date/time", {
            params: {
                tutorId: props.selectedTutor._id,
                date: _pDate,
                time: pickedTime,
            }
        }
        ).then((res) => {
            if (res.data) {
                setMessage("Slot not available, pick another!");
                setSlotUnavailable(true);
            } else {
                setMessage("Slot available for booking!");
                setEnableBookSchedule(true);
                setSlotUnavailable(false);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const saveReview = () => {
        const revBody = {
            studentId: props.user._id,
            studentName: props.user.name,
            tutorId: props.selectedTutor._id,
            review: review,
            stars: parseInt(rating)
        }
        axios.post("http://localhost:3001/review", revBody).then(async (res) => {
            await new Promise(r => setTimeout(r, 1000));
            axios.get("http://localhost:3001/tutor/" + props.selectedTutor._id).then((updatedTutor) => {
                props.handleChangeTutor(updatedTutor.data);
                handleRatingClose();
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            handleRatingClose();
        })
    }

    if (props.user && props.user.itemType === 'Student') {
        return (
            <>
                <ToastContainer></ToastContainer>
                <Modal show={ratingShow} onHide={handleRatingClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-primary">Rate {props.selectedTutor.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="myForm" className="form-align-items-left" onSubmit={saveReview}>
                            <label htmlFor="rating">Rating:</label>
                            <input id="rating" className="form-control" type="number" min={1} max={5} value={rating} onChange={(e) => setRating(e.target.value)}></input>
                            <label htmlFor="review">Review</label>
                            <textarea id="review" placeholder="Write your review here!" className="form-control"
                                value={review} onChange={(e) => setReview(e.target.value)}
                            ></textarea>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRatingClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={saveReview}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>



                <Modal
                    size="lg"
                    show={scheduleShow}
                    onHide={() => setScheduleShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
                            Schedule a Session with {props.selectedTutor.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Pick a date: </label>
                        <DatePicker className="m-3" onChange={setPickedDate} value={pickedDate} minDate={yesterday} format="y-MM-dd" />
                        <p className="text-primary">Note: Time slots are strictly 1 hour only, 60 mins from the time you pick below, subject to availability</p>
                        <label>
                            Time slots:
                            <select className="m-1 p-1" value={pickedTime} onChange={handleChangeTime}>
                                {timeSlots.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                            </select>
                        </label>
                        <button className="btn btn-primary m-1" onClick={checkAvailableSchedule}><i className="bi bi-clock-history m-1"></i>Check Schedule</button>
                        <p className={slotUnavailable ? "text-danger" : "text-success"}>{message ? message : ""}</p>
                        <button className={enableBookSchedule ? "btn btn-success" : "hidden-elem"} onClick={bookAnAppointment}><i className="bi bi-clock-history m-1"></i>Book Appointment</button>

                    </Modal.Body>
                </Modal>
                <button className="btn btn-success m-lg-1" onClick={handleRatingShow}>Rate</button>
                <button className="btn btn-primary m-lg-1" onClick={() => setScheduleShow(true)}>Schedule</button>
                <button to={"/"} className="btn btn-warning m-lg-1" onClick={closeEdit}>Close</button>
            </>
        );
    } else {
        return <button to={"/"} className="btn btn-warning m-lg-1" onClick={closeEdit}>Close</button>
    }
}

export default UserOperations;