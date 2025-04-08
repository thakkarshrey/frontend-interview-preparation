import React, { useState } from "react";
import { useReducer } from "react";
import "./Quiz.css";

function Quiz() {
  const [error, setError] = useState(null);
  function validate() {
    if (!this.user_answer) {
      setError("Please Select atleast one option.");
      return true;
    } else {
      setError("");
      return false;
    }
  }
  const initialState = {
    correct_answer_count: 0,
    is_quiz_started: false,
    is_quiz_ended: false,
    questions: [
      {
        id: 1,
        question: "What is the largest lake in the world?",
        options: ["Caspian Sea", "Baikal", "Lake Superior", "Ontario"],
        correct_answer: "Baikal",
        is_active: true,
        user_answer: "",
        is_answer_correct: false,
        validate,
      },
      {
        id: 2,
        question:
          "Which planet in the solar system is known as the Red Planet?",
        options: ["Venus", "Earth", "Mars", "Jupiter"],
        correct_answer: "Mars",
        is_active: false,
        user_answer: "",
        is_answer_correct: false,
        validate,
      },
      {
        id: 3,
        question: "Who wrote the novel “War and Peace”?",
        options: [
          "Anton Chekhov",
          "Fyodor Dostoevsky",
          "Leo Tolstoy",
          "Ivan Turgenev",
        ],
        correct_answer: "Leo Tolstoy",
        is_active: false,
        user_answer: "",
        is_answer_correct: false,
        validate,
      },
      {
        id: 4,
        question: "What is the capital of Japan?",
        options: ["Beijing", "Tokyo", "Seoul", "Bangkok"],
        correct_answer: "Tokyo",
        is_active: false,
        user_answer: "",
        is_answer_correct: false,
        validate,
      },
      {
        id: 5,
        question: "Which river is the longest in the world?",
        options: ["Amazon", "Mississippi", "Nile", "Yangtze"],
        correct_answer: "Nile",
        is_active: false,
        user_answer: "",
        is_answer_correct: false,
        validate,
      },
    ],
  };

  const [state, dispatch] = useReducer(function (state, action) {
    const current_active_question = state.questions?.find(
      (elem) => elem.is_active
    );

    switch (action.type) {
      case "SUBMIT": {
        const count = state?.questions?.reduce((accumulator, element) => {
          if (element.user_answer === element.correct_answer) accumulator += 1;
          return accumulator;
        }, 0);

        return {
          ...state,
          is_quiz_ended: true,
          is_quiz_started: false,
          correct_answer_count: count,
        };
      }
      case "SET_OPTION": {
        const temp_state = { ...state };
        const current_qustion_based_on_id = temp_state.questions?.find(
          (elem) => elem.id === action?.payload?.id
        );
        current_qustion_based_on_id.user_answer = action.payload.value;
        return temp_state;
      }
      case "START_QUIZ":
        return {
          ...initialState,
          is_quiz_started: true,
        };
      case "NEXT_BUTTON": {
        if (!current_active_question.user_answer) return state;

        const incremented_active_id = current_active_question?.id + 1;
        return {
          ...state,
          questions:
            state?.questions?.length + 1 === incremented_active_id
              ? state?.questions
              : state.questions?.map((element) => ({
                  ...element,
                  is_active: element.id === incremented_active_id,
                  is_answer_correct:
                    element.user_answer === element.correct_answer,
                })),
        };
      }

      case "PREVIOUS_BUTTON": {
        const decremented_active_id = current_active_question?.id - 1;
        return {
          ...state,
          questions:
            decremented_active_id === 0
              ? state?.questions
              : state?.questions?.map((element) => ({
                  ...element,
                  is_active: element.id === decremented_active_id,
                })),
        };
      }

      default:
        break;
    }
  }, initialState);

  console.log(state, "state");

  return (
    <div className="quiz-container">
      {!state.is_quiz_started && (
        <button
          onClick={() => {
            dispatch({ type: "START_QUIZ" });
            setError("");
          }}
        >
          Start Quiz
        </button>
      )}
      {state.is_quiz_started && (
        <section className="quiz-section">
          {state?.questions?.map((element) => {
            return (
              <div
                className={`quiz ${!element.is_active ? "quiz-none" : ""}`}
                key={element.id}
              >
                <header>{`Question ${element.id} out of ${state?.questions.length}`}</header>
                <main>
                  <h4>{element.question}</h4>
                  <ul style={{ listStyle: "none" }}>
                    {element?.options?.map((_element) => {
                      return (
                        <li key={_element}>
                          <input
                            type="radio"
                            name={`radio-${element.id}`}
                            value={_element}
                            checked={_element === element?.user_answer}
                            onChange={(e) => {
                              dispatch({
                                type: "SET_OPTION",
                                payload: {
                                  id: element.id,
                                  value: e.target.value,
                                },
                              });
                            }}
                          />
                          {_element}
                        </li>
                      );
                    })}
                  </ul>
                  <div style={{ color: "red" }}>{error && error}</div>
                </main>
              </div>
            );
          })}
          <footer>
            <button
              onClick={() => {
                dispatch({ type: "PREVIOUS_BUTTON" });
                setError("");
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                const current_active_question = state.questions?.find(
                  (elem) => elem.is_active
                );
                current_active_question.validate();
                dispatch({ type: "NEXT_BUTTON" });
              }}
            >
              Next
            </button>
            {state?.questions?.findIndex((elem) => elem.is_active) ===
              state?.questions?.length - 1 && (
              <button
                onClick={() => {
                  const current_active_question = state.questions?.find(
                    (elem) => elem.is_active
                  );
                  console.log(
                    current_active_question,
                    "current_active_question"
                  );
                  const isError = current_active_question.validate();
                  console.log(isError, "isError");
                  if (!isError) {
                    dispatch({ type: "SUBMIT" });
                  }
                }}
              >
                Submit
              </button>
            )}
          </footer>
        </section>
      )}
      {state.is_quiz_ended &&
        state?.questions?.map((element) => {
          return (
            <div className={`quiz`} key={element.id}>
              <main>
                <h4>
                  {`Q${element.id}.`} {element.question}
                </h4>
                <div>Correct answer : {element.correct_answer}</div>
                <div
                  style={{
                    color:
                      element.correct_answer === element.user_answer
                        ? "green"
                        : "red",
                  }}
                >
                  Your answer : {element.user_answer}{" "}
                  {element.correct_answer === element.user_answer ? (
                    <span style={{ color: "green" }}>✔</span>
                  ) : (
                    <span style={{ color: "red" }}>✖</span>
                  )}
                </div>
              </main>
            </div>
          );
        })}
      {state.is_quiz_ended && (
        <h2>{`You got ${state.correct_answer_count} correct out of ${state?.questions?.length}`}</h2>
      )}
    </div>
  );
}

export default Quiz;
