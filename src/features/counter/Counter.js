import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterState, getUserAsync } from "./counterSlice";
// import styles from "./Counter.module.css";
import "./Counter.css";

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export function Counter() {
  const dispatch = useDispatch();

  const { messages } = useSelector(counterState);

  let totalMessage = messages.length;

  const labels = [...new Set(messages.map((message) => message.source))];
  const data = [];

  for (let label = 0; label < labels.length; label++) {
    const source = labels[label];
    data.push(messages.filter((message) => message.source === source).length);
  }

  var coloR = [];
  var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  for (let index = 0; index < labels.length; index++) {
    coloR.push(dynamicColors());
  }

  let dummyMessage = {
    labels: labels,

    datasets: [
      {
        label: "# of Votes",
        data: data,
        backgroundColor: coloR,
        borderColor: "rgb(0,0,0,0.5)",
      },
    ],
  };
  let options = {
    legend: {
      display: false,
    },
  };

  useEffect(() => {
    dispatch(getUserAsync({}));
  }, [dispatch]);

  return (
    <div className="container">
      <h2 className="headLine_tag"> Message Count By Source</h2>
      <hr />
      <div className="donught_container">
        <Doughnut data={dummyMessage} options={options} />
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "50%",
            left: 0,
            textAlign: "center",
            marginTop: "-10%",
            lineHeight: "20px",
          }}
        >
          <h4>{totalMessage.toLocaleString("en-US")}</h4>
          <span>Total Messages</span>
        </div>
      </div>
      <div className="labels_container">
        {labels.map((label, index) => {
          return (
            <div className="label" key={index}>
              <div className="dot" style={{ background: coloR[index] }}></div>
              {label}{" "}
              <b className="bold_pr">
                {Math.round((data[index] / totalMessage) * 100)}
              </b>
              &#37;
            </div>
          );
        })}
      </div>
    </div>
  );
}
