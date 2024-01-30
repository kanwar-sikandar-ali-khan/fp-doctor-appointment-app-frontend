import "./DoctorDetails.css";
import { useLocation, useNavigate } from "react-router";

const DoctorDetails = ({user, doctors, patients}) => {
	const location = useLocation();
	const Navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault()
		if (user) {
			if (doctors) {	
				doctors.forEach((doctor) => {
					if (doctor.id === user.uid) {
						alert(`${doctor.name}, please login as a patient!`);
					}
				});
			}
			if (patients) {
				patients.forEach((patient) => {
					if (patient.id === user.uid) {
						Navigate('/select-time', {state: {patientData:patient, doctorData:location.state.data}})
					}
				});
			}
		} else {
			alert("You are not logged in! Please login...");
		}
	}

	return (
		<div className="DoctorDetails" >
			<div className="row mx-0 px-3">
				<div className="leftParent col-12 my-3">
					<div className="lefSide d-flex flex-column align-items-center">
						<img src={location.state.data.url} alt="profile" className="image" />
					</div>
					<div className="rig py-3 d-flex flex-column align-items-center">
						<h5  className="text-uppercase">{location.state.data.name}</h5>
						<p className="text-uppercase ">{location.state.data.email}</p>
						<p className="text-uppercase">{location.state.data.category}</p>
						<p className="text-uppercase">{location.state.data.experience} years experience</p>
						<p className="text-uppercase">{location.state.data.city}</p>
					</div>
				</div>
				<div className="rightParent col-12 my-3">
					{/* <h5 className="text-uppercase py-4 text-center">
						online video consultation
					</h5>
					<div
						style={{
							display: "flex",
							justifyContent: "space-Between",
							padding: "15px",
							fontWeight: "bold",
							fontSize: "16px",
						}}
					>
						<p>Fee</p>
						<p>Rs:500</p>
					</div> */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-Between",
							padding: "15px",
							fontSize: "16px",
							fontWeight: "bold",
						}}
					>
						<p>Address:</p>
						<p>Use phone/laptop for video call</p>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "space-Between",
							padding: "10px",
							fontSize: "16px",
							fontWeight: "bold",
						}}
					>
						<p style={{ marginTop: "10px" }}>Available Slot:</p>
						<select className="sel">
							<option>Monday 4:30pm-8pm</option>
							<option>Wednesday 4:30pm-8pm</option>
							<option>Friday 4:30pm-8pm</option>
						</select>
					</div>
					<div style={{ textAlign: "center" ,paddingBottom:'10px'}}>
						<button className="b" onClick={handleSubmit}>
							Book video consultation
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorDetails;
