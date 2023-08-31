import "./Options.css";
import { SocketContext } from "../SocketContext";
import { useContext, useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";

const Options = ({ children }) => {
	const { me, callAccepted, callEnded, leavePatientCall, leaveDoctorCall, callUser,call } =
		useContext(SocketContext);
	const { user, patients, doctors } = useAuthContext();
	const [patient, setPatient] = useState(null)
	const [doctor, setDoctor] = useState(null)
	const { sendCallID } = useFirestore("doctors");

	useEffect(() => {
		if (user && patients) {
			patients.forEach((patient) => {
				if (patient.id === user.uid) {
					setPatient(patient)
				}
			});
		}
		if (user && doctors) {
			doctors.forEach((doctor) => {
				if (doctor.id === user.uid) {
					setDoctor(doctor)
				}
			});
		}
	}, [user, patients, doctors])

	const joinHandle = (e, doctorDocID, idToCall) => {
		e.preventDefault()
	
		sendCallID(doctorDocID, idToCall)
			.then(() => {
				alert("Please Wait...")
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="container">
			<div className="paper row">
				<div className="root col-12 d-flex justify-content-center">
				<div className="padding">
							{ patient && patient.callID && patient.callID.doctorDocID &&
								<button
									className="btnn"
									onClick={(e) => joinHandle(e, patient.callID.doctorDocID, me)}
								>
									Accept invitation
								</button>}
						</div>
						<div className="padding">
							{doctor && doctor.callID && <p>Patient has Accept invitation,  call him </p>}
							{callAccepted && !callEnded ? (
								(patient && patient.docID && <button onClick={(e) => leavePatientCall(e, patient.docID)} className="btnn">
									Hang Up doctor call
								</button>) ||
								(doctor && doctor.docID && <button onClick={(e) => leaveDoctorCall(e, doctor.docID)} className="btnn">
									End Meeting
								</button>)
							) : (
								(doctor && doctor.callID &&
									<button
										className="btnn"
										onClick={(e) => callUser(e, doctor.callID, doctor.name)}
									>
										create Call
									</button>
								)
							)}
						</div>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Options;
