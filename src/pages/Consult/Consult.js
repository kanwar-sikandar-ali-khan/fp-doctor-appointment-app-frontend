import "./Consult.css";
import icon from "../../Images/online.png";
import { useNavigate } from 'react-router'
const Consult = () => {
	const Navigate=useNavigate();
	return (
		<div className="main py-5">
			<div className="containers">
				<div className="left">
					<img src={icon} alt="icon" />
					<div className="circle"></div>
				</div>
				<div className="right">
					<h3 style={{ color: "#006" }} className="d">
						Doctors online now
					</h3>
					
					<p className="mt-2 mb-0" style={{ color: "orange" }}>
						Instant Video Consultation with Top Doctors
					</p>
					<button className="but" onClick={()=>Navigate('/doctors')}>
					Start Consulting
					</button>
				</div>
			</div>
		</div>
	);
};

export default Consult;
