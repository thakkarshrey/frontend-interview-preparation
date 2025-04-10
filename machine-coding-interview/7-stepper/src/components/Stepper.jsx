import React, { useEffect, useRef, useState } from "react";
import "./Stepper.css";

function Stepper({ data }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [margin, setMargin] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);
  const DataComponent = data[currentIndex - 1].Component;
  console.log(stepRef, "stepRef");

  useEffect(() => {
    setMargin({
      marginLeft: stepRef.current[0].offsetWidth / 2 + 40, // additional 40 is for the width of the circle
      marginRight: stepRef.current[data?.length - 1].offsetWidth / 2 + 40,
    });
  }, [stepRef.current]);

  return (
    <>
      <div className="stepper-container">
        {data?.map((element, index) => {
          return (
            <div
              className="stepper"
              key={element.id}
              ref={(element) => (stepRef.current[index] = element)}
            >
              <div
                className={`stepper__number ${
                  currentIndex === element.id ? "stepper__number--active" : ""
                }
                ${element.id < currentIndex ? "stepper__number--completed" : ""}
                `}
                onClick={() => setCurrentIndex(element.id)}
              >
                {element.id < currentIndex ? "✔" : element.id}
              </div>
              <div className="stepper__name">{element.name}</div>
            </div>
          );
        })}
      </div>
      <div
        className="stepper__progress"
        style={{
          width: `calc(100% - ${margin.marginLeft + margin.marginRight}px)`,
          marginLeft: margin.marginLeft,
          marginRight: margin.marginRight,
        }}
      >
        <div
          className="stepper__progress--bar"
          style={{
            width: `${((currentIndex - 1) / (data.length - 1)) * 100}%`,
          }}
        ></div>
      </div>
      <div className="stepper__component">
        <DataComponent />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          className="stepper__next-btn"
          onClick={() => {
            setCurrentIndex((prevIndex) => {
              if (prevIndex === 1) return 1;
              return prevIndex - 1;
            });
          }}
        >
          Previous
        </button>
        <button
          className="stepper__next-btn"
          onClick={() => {
            setCurrentIndex((prevIndex) => {
              if (prevIndex === data.length) return data.length;
              return prevIndex + 1;
            });
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Stepper;
