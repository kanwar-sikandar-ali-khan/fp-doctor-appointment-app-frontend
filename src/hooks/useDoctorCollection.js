// hooks
import { useEffect, useRef, useState } from "react";
// config file
import { projectFirestore } from "../firebase/config";

export const useDoctorCollection = (collection, _orderBy) => {
	const [doctorDocuments, setDoctorDocuments] = useState(null);
    const [error, setError] = useState(null);

	// to prevent infinite loop
	const orderBy = useRef(_orderBy).current;

	useEffect(() => {
		let response = projectFirestore.collection(collection);

		if (orderBy) response = response.orderBy(...orderBy);

		const unsubscribe = response.onSnapshot(
			(snapshot) => {
				let results = [];
				snapshot.docs.forEach((doc) => {
					results.push({ ...doc.data(), docID:doc.id});
				});

				// update states
				setDoctorDocuments(results);
				setError(null);
			},
			(error) => {
				console.log(error);
				setError("Could not fetch the data");
			}
		);

		// unsubscribe on unmount
		return () => unsubscribe();
		// unsubscribe()
	}, [collection, orderBy]);

	return { error, doctorDocuments };
};