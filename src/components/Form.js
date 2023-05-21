import { useRef } from "react";
import styles from "./Form.module.css";
const Form = () => {
  const text = useRef();
  const submitHander = (event) => {
    event.preventDefault();
    console.log(text.current.value);
  };

  return (
    <form onSubmit={submitHander} className={styles.form}>
      <textarea
        className={styles.textarea}
        spellCheck={false}
        ref={text}
      ></textarea>
      {/* <button>Check</button> */}
    </form>
  );
};
export default Form;
