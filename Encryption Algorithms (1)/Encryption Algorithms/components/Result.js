import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StatusContext } from "../store/status-context";
import classes from "./Result.module.css";
function Result() {
  const context = useContext(StatusContext);
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className={classes.result}>
        <p>{context.isEncryption ? "Cipher" : "PlainText"} is :</p>
        <h3>{context.cipher}</h3>
      </div>
      <div className={classes["btn-container"]}>
        <button onClick={goToHome} className={classes.btn}>
          Go To Home
        </button>
      </div>
    </>
  );
}
export default Result;
