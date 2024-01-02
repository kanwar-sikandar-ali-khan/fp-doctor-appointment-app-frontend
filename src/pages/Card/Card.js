import { useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { useLocation } from "react-router";
import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firebase/config";

const Card = ({ doctor,patient }) => {
    
    const Navigate = useNavigate();
	const location = useLocation();
	const { user, doctors } = useAuthContext();
	const [date, setdate] = useState("");
	const [time, setTime] = useState("");
	const [fieldError, setFieldError] = useState(null);
	const { addNotification } = useFirestore("doctors");
	  
	const toTimestamp = strDate => {
		var datum = Date.parse(strDate);
		return datum / 1000;
	};
	const createdAt = timestamp.fromDate(new Date());
	
	const notification = {
		doctorID: doctor?.id,
		doctorDocID: doctor?.docID,
		doctorName: doctor?.name,
		doctorEmail:doctor?.email,
		patientID: patient?.id,
		patientDocID: patient?.docID,
		patientName: patient?.name,
		patientEmail: patient?.email,
		appointmentDate: toTimestamp(`${date} ${time}`),
		createdAt
	};
	const isCorrectDate = (date, time) => {
		const now = Date.now();
		const appTime = toTimestamp(`${date} ${time}`) * 1000;
		return appTime - now < 0 ? false : true
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (user && doctors) {
			doctors.forEach((doctor) => {
				if (doctor.id === user.uid) {
					setTime("");
					setdate("");
					alert(`${doctor.name}, please login as a patient!`);
				}
			});
		}
		if (user && patient && doctor) {
			// console.log("user && doctors",user , doctors,patient)
			addNotification(doctor.docID, notification)
				.then(res => {
					alert(`${user.displayName} your request has been submitted, Please wait for Dr ${doctor.name}'s approval`);
				})
				.catch(error => {
					// alert(`${user.displayName} there is an error, Please try again`);
					console.log(error);
				});
		
		};
	}

	return (
		<div key={doctor.id} className="card py-3">
			<img src={doctor.url} alt="DocImage" className="DocImage"></img>
			<p className="doctor-details mt-5">{doctor.name}</p>
			<p className="doctor-details">{doctor.category}</p>
			<p className="doctor-details">{doctor.experience} years experience</p>
			{patient != null && <>
				<div className="doctor-details view">
				<button
					className="view-more"
					onClick={() =>
						Navigate("/doctor-details", { state: { data: doctor } })
					}
				>
					view more
				</button>
			</div>
			<div className="doctor-details view">
				<button
					className="view-more"
					onClick={(e) =>handleSubmit(e)}
				>
					Send Request
				</button>
			</div>
			</>}
		
		</div>
	);
};

export default Card;
