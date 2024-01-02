import "./VideoPlayer.css";
import { SocketContext } from "../SocketContext";
import { useContext } from "react";
import { Scale } from "@mui/icons-material";

const VideoPlayer = ({doctor,patient}) => {
	const {
		docName,
		callAccepted,
		myVideo,
		userVideo,
		callEnded,
		stream,
		call,
	} = useContext(SocketContext);
	console.log("userVideo",userVideo?.current)

	return (
		<div className="grid-containe">
			{stream && (
				<div className="paper">
					<h2 className="name">{docName || "Name"}</h2>
					<video
						style={{ transform: 'scaleX(-1)' }} playsInline className="video" muted autoPlay ref={myVideo} />
				</div>
			)}
			{callAccepted && !callEnded && (
				<div className="paper">
					<h2 className="name">{call.name || "Name"}</h2>
					<video
						style={{ transform: 'scaleX(-1)' }} playsInline ref={userVideo} autoPlay className="video" />
				</div>
			)}
			{doctor?.callID == "" && userVideo.current == undefined && "wait....."}
			{/* call.isReceivingCall && !callAccepted */}
			{patient && !call.isReceivingCall && userVideo.current == undefined && "wait....."}
		</div>
	);
};

export default VideoPlayer;
