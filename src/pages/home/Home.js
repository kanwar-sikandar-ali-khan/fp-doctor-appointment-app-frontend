import "./Home.css";
// hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
// components
import Consult from "../Consult/Consult";
import Cards from "../Card/Cards";
import Doctor from "../Doctor/Doctor";
import Reviews from "../Reviews/Reviews";
import Headline from "../HeadLine/Headline";
import Footer from "../Footer/Footer";
import Foot from "../Foot/Foot";
import Button from '@mui/material/Button';


const Home = ({patient}) => {
	const { doctors, doctor_error } = useAuthContext();
	const [search, setSearch] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
	};

	return (
		<>

		<div className="d-flex my-3 urgencyParent justify-content-center align-items-center">


			<p className="mx-3 my-0 ">Get Urgent consultation</p>

		<Button onClick={()=>window.location = 'https://medicofyp.netlify.app/'} variant="contained">Go</Button>

		</div>
			<section className="home">
				<div className="container">
					<div className="centered">
						<h1 style={{ color: "white" }}>
							Find and book the{" "}
							<span style={{ color: "#ff9e15" }}>best doctors </span>near you
						</h1>
						<br></br>
						<form onSubmit={handleSearch}>
							<input
								type="text"
								placeholder="Search.."
								className="inp"
								onChange={(e) => setSearch(e.target.value)}
								name="search"
							/>
							<button className="a">Search</button>
						</form>
					</div>

					
				</div>
			</section>
			{doctors && doctors.length !== 0 && (
				<section>
					{doctor_error && <p>{doctor_error}</p>}
					{doctors && <Cards doctors={doctors} search={search} patient={patient} />}
				</section>
			)}
			<section>
				<Consult />
			</section>
			<section>
				<Doctor />
			</section>
			<section>
				<Reviews />
			</section>
			<section>
				<Headline />
			</section>
			<section>
				<Footer />
			</section>
			<section>
				<Foot />
			</section>
		</>
	);
};

export default Home;
