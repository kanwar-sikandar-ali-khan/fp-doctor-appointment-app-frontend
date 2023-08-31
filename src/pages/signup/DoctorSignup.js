// styles
// import "./DoctorSignup.css";
// hooks
import { useEffect, useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { storageRef } from "../../firebase/config";
import { Link } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [displayName, setdisplayName] = useState("");
	const [experience, setExperience] = useState("");
	const [city, setCity] = useState("");
	const [category, setCategory] = useState("dentist");
	const [photo, setPhoto] = useState("");
	const [password, setPassword] = useState("");
	const [photoPending, setPhotoPending] = useState(false);
	const [url, setUrl] = useState("");
	const { error, isPending, signup } = useSignup();
	const { addDocument } = useFirestore("doctors");
	const role = "doctor";

	useEffect(() => {
		if (url) {
			signup(
				addDocument,
				email,
				password,
				displayName,
				url,
				role,
				city,
				category,
				experience
			);
		}
	}, [url]);

	const handleSubmit = (e) => {
		e.preventDefault();

		var uploadTask = storageRef.child(`images/${photo.name}`).put(photo);

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setPhotoPending(progress);
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					setUrl(downloadURL);
				});
			}
		);
		// setUrl("https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg");
	};

	return (
		<div className="bg" >
			<div className="containe">
				<form onSubmit={handleSubmit} className="signup-form">
					<h3 className="h1">
						SIGN UP<span style={{ color: "orange" }}> FORM</span>
					</h3>

					<div className="col-25">
						<label>Email</label>
					</div>
					<div>
						<input
							type="email"
							id="email"
							required
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</div>

					<div className="col-25">
						<label>Password</label>
					</div>
					<div>
						<input
							type="password"
							placeholder="Password"
							id="password"
							required
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>

					<div className="col-25">
						<label>DisplayName</label>
					</div>
					<div>
						<input
							type="text"
							id="fname"
							required
							placeholder=" name.."
							onChange={(e) => setdisplayName(e.target.value)}
							value={displayName}
						/>
					</div>

					<div className="col-25">
						<label>Category</label>
					</div>
					<div>
						<select
							onChange={(e) => setCategory(e.target.value)}
							value={category}
							id="category"
						>
							<option value="dentist">Dentist</option>
							<option value="homeophethic">HomeoPhethic</option>
							<option value="dermatology">Dermatology</option>
							<option value="anesthesiology">Anesthesiology</option>
							<option value="ophthalmology">Ophthalmology</option>
							<option value="pediatrics">Pediatrics</option>
							<option value="psychiatry">Psychiatry</option>
							<option value="clinical pathology">Clinical Pathology</option>
							<option value="nephrology">Nephrology</option>
							<option value="clinical immunology">Clinical Immunology</option>
						</select>
					</div>

					<div className="col-25">
						<label>Experience</label>
					</div>
					<div>
						<input
							type="text"
							id="experience"
							required
							placeholder=" experience"
							onChange={(e) => setExperience(e.target.value)}
							value={experience}
						/>
					</div>

					<div className="col-25">
						<label>City</label>
					</div>
					<div>
						<input
							onChange={(e) => setCity(e.target.value)}
							value={city}
							type="text"
							id="city"
							name="firstname"
							placeholder="City"
						/>
					</div>
					<div className="col-25">
						<label>Photo</label>
					</div>
					<div className="w-100">
						<input
							type="file"
							name="firstname"
							placeholder="Picture"
							onChange={(e) => setPhoto(e.target.files[0])}
							className="btn btn-dark w-100"
						/>
						{/* {photoPending && (
							<p className="percentage"
							style={{color:'red',marginLeft:'230px',marginTop:'-22px'}}
							>
								{parseInt(photoPending) + "%"}
							</p>
						)} */}
					</div>

					<div className="col">
						{!isPending && (
							<button type="submit" className="bt">
								Submit
							</button>
						)}
						{isPending && (
							<button type="submit" className="bt" disabled>
								Loading
							</button>
						)}
						{error && <p style={{ color: "red", width: "240px" }}>{error}</p>}
					</div>
					<div>
						<span style={{ color: "#006" }}>
							Already registered?
							<Link
								to="/login"
								style={{ textDecoration: "none", color: "orange" }}
							>
								Login
							</Link>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
}
