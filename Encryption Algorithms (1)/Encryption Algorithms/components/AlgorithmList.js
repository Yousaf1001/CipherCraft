import { Link } from "react-router-dom";
import classes from "./AlgorithmList.module.css";
import { StatusContext } from "../store/status-context";
import { useContext } from "react";
function AlgorithmList() {
  const context = useContext(StatusContext);
  const setSDES = () => {
    context.setSDES(true);
  };
  const setRC4 = () => {
    context.setSDES(false);
  };
  return (
    <div className={classes.list}>
      <h1 className={classes["list-heading"]}>Select Algorithm</h1>
      <div className={classes["list-items"]}>
        <Link onClick={setSDES} className={classes.item} to={"/methods"}>
          S-DES
        </Link>
        <Link onClick={setRC4} className={classes.item} to={"/methods"}>
          RC-4
        </Link>
      </div>
    </div>
  );
}
export default AlgorithmList;
