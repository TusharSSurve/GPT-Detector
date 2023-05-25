import { useRef, useState } from "react";
import styles from "./Form.module.css";
const API_KEY = "";
// const API_KEY = "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";
const Form = () => {
  const text = useRef();
  const [error, setError] = useState("");

  const submitHander = (event) => {
    event.preventDefault();
    if (!text.current.value) {
      setError({ message: "Please enter a text" });
      window.scrollTo(0, 0);
      return;
    }
    let apiMessage = {
      role: "user",
      content: `${text.current.value}.Is above paragraph written by chatgpt or gpt-3 or human?Give one word answer`,
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [apiMessage],
    };
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        console.log(response.choices[0].message.content);
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        setError(error);
      });
  };

  const closePop = () => {
    setError("");
  };

  return (
    <form onSubmit={submitHander} className={styles.form}>
      <textarea className={styles.textarea} ref={text}></textarea>
      {error && (
        <div className={styles.alert}>
          <span>
            <strong>Error!</strong> {error.message}
          </span>
          <span className={styles.closebtn} onClick={closePop}>
            &times;
          </span>
        </div>
      )}
      <button className={styles.button}>CHECK</button>
    </form>
  );
};
export default Form;
