import "./Notification.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { SocketContext } from "../../video/SocketContext";
import { useNavigate } from "react-router";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faXmark as faXmarkLarges } from "@fortawesome/free-solid-svg-icons";
// library.add(faXmarkLarges);

const Notification = () => {
	const { user, doctors, patients } = useAuthContext();
	const { deleteNotification } = useFirestore("doctors");
	const [notifications, setNotifications] = useState(null);
	const [doctorDocID, setDoctorDocID] = useState(null);
	const [showDoctor, setShowDoctor] = useState(null);
	const { addNotification, sendJoin } = useFirestore("patients");
	const navigate = useNavigate();

	const toDate = (seconds) => {
		const timestamp = {
			seconds: seconds,
		};
		var dateFormat = new Date(timestamp.seconds * 1000);

		return (
			dateFormat.getDate() +
			" / " +
			(dateFormat.getMonth() + 1) +
			" / " +
			dateFormat.getFullYear() +
			" " +
			dateFormat.getHours() +
			":" +
			dateFormat.getMinutes() +
			":" +
			dateFormat.getSeconds()
		);
	};

	// useEffect(() => {
	// 	var x = setInterval(function () {
	// 		// Get today's date and time
	// 		// var now = new Date().getTime();
	// 		// console.log(now)
	// 		// If the count down is finished, write some text
	// 		// if ((distance - now) < 0) {
	// 			// 	console.log("expired " + "for " + not.patientName)
	// 			// 	clearInterval(x);
	// 			// }
	// 			console.log("a");
	// 		}, 1000);
	// 	}, [])

	useEffect(() => {
		if (user) {
			if (doctors) {
				doctors.forEach((doctor) => {
					if (doctor.id === user.uid) {
						setNotifications(doctor.notification);
						setShowDoctor(true);
						setDoctorDocID(doctor.docID);
					}
				});
			} else {
				setShowDoctor(false);
			}
			if (patients) {
				patients.forEach((patient) => {
					if (patient.id === user.uid) {
						setNotifications(patient.notification);
						setDoctorDocID(patient.docID);
					}
				});
			}
		}
	}, [user, doctors]);

	const removeNotification = (e) => {
		deleteNotification(doctorDocID, e);
	};

	const approveNotification = (docID, e) => {
		addNotification(docID, e)
			.then((res) => {
				alert("Appointment has been approved");
			})
			.catch((error) => {
				alert("Error occurred!");
			});
	};

	const handleCall = (patientDocID, doctorDocID) => {
		sendJoin(patientDocID, doctorDocID)
			.then(() => {
				navigate("/video-call");
				window.location.reload();
			})
			.catch((error) => {
				alert("Something is wrong");
				console.log(error);
			});
	};

	return (
		<div className="notification px-3">
			{notifications && notifications.length > 0  ?
				notifications.map((notification) => (
					<div className="notification-div" key={Math.random()}>
						<div className="details">
							<p>Patient Name: {notification.patientName}</p>
							<p>Patient Email: {notification.patientEmail}</p>
							<p>Doctor Name: {notification.doctorName}</p>
							<p>Doctor Email: {notification.doctorEmail}</p>
							<p>Appointment Date: {toDate(notification.appointmentDate)}</p>
							<p>Created At: {toDate(notification.createdAt.seconds)}</p>
						</div>
						<div className="d-flex justify-content-center">
							{showDoctor && (
								<div className="delete">
									<button className="Reject" onClick={() => removeNotification(notification)}>
										Reject
									</button>
								</div>
							)}
							<div className="dele mx-2">
								{showDoctor && (
									<button
									className="approve"
										onClick={() =>
											approveNotification(
												notification.patientDocID,
												notification
											)
										}
									>
										Approve
									</button>
								)}
							</div>
							<div className="createcall">
								{showDoctor && (
									<button
										className="create"
										onClick={() =>
											handleCall(
												notification.patientDocID,
												notification.doctorDocID
											)
										}
									>
										Send invitation
									</button>
								)}
							</div>
						</div>
					</div>
				)):<p className="h3 text-center">EMPTY BOX! </p>}

			
		</div>
	);
};

export default Notification;
