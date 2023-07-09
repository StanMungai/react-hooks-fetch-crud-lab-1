import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleUpdateQuestion(event) {
    // console.log('Updating ', id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: event.target.value
      })
    })
      .then( (res) => res.json() )
      .then( (updatedQuestion) => onUpdateQuestion(updatedQuestion))
  }

  function handleDelete() {
    console.log("Clicked question:", id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => onDeleteQuestion(question))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5> 
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdateQuestion}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
