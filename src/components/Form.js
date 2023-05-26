import { useRef, useState } from "react";
import styles from "./Form.module.css";
import Loader from "./Loader";
import Card from "../global/Card";
const API_KEY = "";
// const API_KEY = "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";
const Form = () => {
  const text = useRef();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHander = (event) => {
    event.preventDefault();

    if (!text.current.value) {
      setError({ message: "Please enter a text" });
      window.scrollTo(0, 0);
      return;
    }
    setIsLoading(true);
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
        if (!response.ok) {
          throw new Error("Something went wrong, Please try again later!");
        }
        return response.json();
      })
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        // console.log(response.choices[0].message.content);
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        setIsLoading(false);
        setError(error);
      });
  };

  return (
    <form onSubmit={submitHander} className={styles.form}>
      <textarea
        className={styles.textarea}
        ref={text}
        placeholder="Enter text to check for AI and ChatGPT Plagiarism"
      ></textarea>
      {error && (
        <div className={styles.alert}>
          <span>
            <strong>Error!</strong> {error.message}
          </span>
          <span className={styles.closebtn} onClick={() => setError("")}>
            &times;
          </span>
        </div>
      )}
      <button className={styles.button} disabled={isLoading}>
        Detect Text
      </button>
      <Card>{isLoading && <Loader />}</Card>
    </form>
  );
};
export default Form;
