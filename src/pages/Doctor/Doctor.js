import "./Doctor.css";
import { useNavigate } from "react-router";

const Doctor = () => {
  const Navigate = useNavigate();
  return (
    <div className="section-four">
      <div className="flex-contain">
        <div className="item-left">
          <p className="h4">
            Are you a five star doctor<span>?</span>
          </p>
          <p className="h4" >
            signUp to reach millions of patient
          </p>

          <div

          >
            <p className="h4">Get more appointments through online booking</p>
            <p className="h4">Create and view patient records from anywhere</p>
            <p className="h4">Manage your schedule efficiently</p>
          </div>
          <div className="dBut">
            <button className="butt btn btn-dark" onClick={() => Navigate("/doctor-signup")}>
              Join Now
            </button>
          </div>
        </div>
        <div className="item-right"></div>
      </div>
    </div>
  );
};

export default Doctor;
