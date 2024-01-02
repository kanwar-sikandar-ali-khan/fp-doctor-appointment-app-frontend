import "./Video.css";
import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";



function Video({patient}) {

	const location = useLocation();
	const [doctorDocID, setDoctorDocID] = useState(null)
	const { user, patients, doctors } = useAuthContext();
	const [doctor, setDoctor] = useState(null)

	useEffect(() => {
		if (location.state && location.state?.callID.doctorDocID) {
			setDoctorDocID(location.state?.callID.doctorDocID)
		}
	}, [location.state])

	useEffect(() => {
		if (user && doctors) {
			doctors.forEach((doctor) => {
				if (doctor.id === user.uid) {
					setDoctor(doctor)
				}
			});
		}
	}, [user, patients, doctors])

	return (
		<div className="wrapper">
			<div className="app-bar">
				<h1>Video  <span style={{color:'orange'}}>Call</span> </h1>
			</div>
			<VideoPlayer patient={patient} doctor={doctor}/>
			{/* option is for doctor call */}
			<Options doctorDocID={doctorDocID}  >  

			{/* notifications for patient accept call */}
			{patient && <Notifications patient={patient}/>}
			
			</Options>
		</div>
	);
}

export default Video;
