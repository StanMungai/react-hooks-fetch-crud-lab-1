import React, {useEffect, useState} from "react";
import QuestionItem from './QuestionItem'

function QuestionList({questions, onSetQuestions}) {

  function handleDeleteQuestion(deletedItem) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedItem.id)
    onSetQuestions(updatedQuestions)
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question 
      }
    })
    onSetQuestions(updatedQuestions)
  }

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((res) => res.json())
      .then((questions) => onSetQuestions(questions))
  }, []) 

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questions.map((question) => {
          return (
            <QuestionItem
             question={question}
             key={question.id}
             onDeleteQuestion={handleDeleteQuestion}
             onUpdateQuestion={handleUpdateQuestion}
            />
          )
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
