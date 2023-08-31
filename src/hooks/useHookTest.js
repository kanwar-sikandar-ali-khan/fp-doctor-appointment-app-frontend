// hooks
import { useEffect, useRef, useState } from "react";

export const useHookTest = (namee) => {
    const [name, setName] = useState("kanwarr");

	useEffect(() => {
		const unsubscribe = ()=>{
        }
        return () => unsubscribe();
        //  setName(namee)
	}, []);

	return { name };
};