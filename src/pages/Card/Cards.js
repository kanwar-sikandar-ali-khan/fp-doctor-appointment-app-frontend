import "./Cards.css";
import Card from "./Card";

const Cards = ({ doctors, search }) => {

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
							return <Card key={index} doctor={card} />;
						})}
						{doctors && !search &&
							doctors.map((doctor, index) => (
								<Card doctor={doctor} key={index } />
					))}
		</div>
	);
};

export default Cards;
