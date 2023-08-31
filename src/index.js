import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./video/SocketContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
		<AuthContextProvider>
			<SocketContextProvider>
				<App />
			</SocketContextProvider>
		</AuthContextProvider>
	// </React.StrictMode> 
);
