import "./Cards.css";
import Card from "./Card";
import React,{ useEffect,useState } from "react";


const Cards = ({ doctors, search,patient }) => {	

	return (
		<div className="cards">
			{doctors && search &&
				doctors
					.filter((data) => {
						return (
							data.name.toLowerCase().match(search.toLowerCase()) ||
							data.category.toLowerCase().match(search.toLowerCase())
							);
						})
						.map((card, index) => {
							return <Card key={index} doctor={card} patient={patient} />;
						})}
						{doctors && !search &&
							doctors.map((doctor, index) => (
								<Card doctor={doctor} key={index } patient={patient} />
					))}
		</div>
	);
};

export default Cards;

