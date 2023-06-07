import "./Video.css";
import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

function Video() {

	const location = useLocation();
	const [doctorDocID, setDoctorDocID] = useState(null)
	console.log("doctorDocID",location.state?.callID.doctorDocID)

	useEffect(() => {
		if (location.state && location.state?.callID.doctorDocID) {
			setDoctorDocID(location.state?.callID.doctorDocID)
		}
	}, [location.state])

	return (
		<div className="wrapper">
			<div className="app-bar">
				<h1>Video  <span style={{color:'orange'}}>Call</span> </h1>
			</div>
			<VideoPlayer/>
			<Options doctorDocID={doctorDocID} >
				<Notifications />
			</Options>
		</div>
	);
}

export default Video;
