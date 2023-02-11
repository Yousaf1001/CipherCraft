import classes from "./Form.module.css";
import { StatusContext, StatusProvider } from "../store/status-context";
import { useContext, useRef, useState } from "react";
import { sdesForDecryption, sdesForEncryption } from "../utils/SDES";
import { encryptOrDecryptUsingRC4 } from "../utils/RC4";
import { useNavigate } from "react-router-dom";

function Form() {
  const keyRef = useRef();
  const plainTextRef = useRef();
  const context = useContext(StatusContext);
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const key = keyRef.current.value;
    const plainText = plainTextRef.current.value;
    if (context.isSDES) {
      const ci = context.isEncryption
        ? sdesForEncryption(key, plainText)
        : sdesForDecryption(key, plainText);
      context.generateCipher(ci);
    } else {
      const ci = encryptOrDecryptUsingRC4(key, plainText);
      context.generateCipher(ci);
    }
    keyRef.current.value = "";
    plainTextRef.current.value = "";
    navigate("/result");
  };

  return (
    <>
      <form onSubmit={submitHandler} className={classes.form}>
        <h1 className={classes.heading}>{context.isSDES ? "SDES" : "RC-4"}</h1>
        <div className={classes["input-field"]}>
          <label htmlFor={"key"}>Enter Key</label>
          <input ref={keyRef} id={"key"} type={"text"} />
        </div>
        <div className={classes["input-field"]}>
          <label htmlFor={"PlainText"}>
            Enter {context.isEncryption ? "PlainText" : "Cipher"}
          </label>
          <input ref={plainTextRef} id={"PlainText"} type={"text"} />
        </div>
        <button className={classes.btn}> Submit</button>
      </form>
    </>
  );
}

export default Form;
