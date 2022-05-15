import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "./Header"

const MyAppointments = (props) => {

    const [appointments, setappointments] = useState([]);
    useEffect(() => {
        console.log("call");
        let _id = props.user._id;
        let uri = "http://localhost:3001/appointment/"
        if (props.user.itemType === "Student") {
            uri += "student/";
        } else {
            uri += "tutor/";
        }

        console.log(uri);
        axios.get(uri + _id).then((appointments) => {
            console.log(appointments.data);
            setappointments(appointments.data);
        }).catch((err) => {
            console.log(err);
        })
    });


    return (
        <div >
            <Header user={props.user} />

            <div className="container">
                <hr></hr>
                <div className="row">
                    <h4 className="text-primary text-lg-start m-2">My Appointments</h4>
                    {appointments.map((tutor, id) => (
                        <div class="card" >
                            <div class="card-body">
                                <h5 class="card-title">Appointment</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyAppointments;