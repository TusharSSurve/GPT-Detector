import React, { useEffect } from "react";
// import styles from "./GPTContainer.module.css";

// const API_KEY = "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";
const GPTContainer = (props) => {
  useEffect(() => {
    let apiMessage = {
      role: "user",
      content:
        "Thank you! As an AI language model, I don't have a physical job or an employer. However, I'm always here and ready to assist you with any questions or tasks you have! Is there anything specific you need help with today?.Is above paragraph written by chatgpt? Give one word answer",
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
      });
  }, []);

  return (
    <>
      <h1>Hello</h1>
    </>
  );
};
export default GPTContainer;
