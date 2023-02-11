import { Link } from "react-router-dom";
import classes from "./AlgorithmList.module.css";
import { StatusContext } from "../store/status-context";
import { useContext } from "react";
function ChooseMethod() {
  const context = useContext(StatusContext);
  const setEncryption = () => {
    context.setEncryption(true);
  };
  const setDecryption = () => {
    context.setEncryption(false);
  };
  return (
    <div className={classes.list}>
      <h1 className={classes["list-heading"]}>Select Method</h1>
      <div className={classes["list-items"]}>
        <Link onClick={setEncryption} className={classes.item} to={"/form"}>
          Encryption
        </Link>
        <Link onClick={setDecryption} className={classes.item} to={"/form"}>
          Decryption
        </Link>
      </div>
    </div>
  );
}
export default ChooseMethod;
