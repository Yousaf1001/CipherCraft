import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";
function Navigation() {
  return (
    <div className={classes["nav-container"]}>
      <h1 className={classes["nav-heading"]}>Encryption Algorithms</h1>
      <Link className={classes.home} to={"/"}>
        Home
      </Link>
    </div>
  );
}

export default Navigation;
