import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ usedStorage, totalStorage, barColor ,murineHead}) => {
  const percentageUsed = (usedStorage / totalStorage) * 100;

  return (
    <>
      <div className="bodyBackground"></div>
      <div className="progress_container">
        <div className="section2">
          <span className="section2__text">{murineHead}</span>
          <div className="section2__progressBarContainer">
            <div className="section2__progressBar">
              <div
                className="section2__progressBarRect"
                style={{
                  width: `${percentageUsed}%`,
                  backgroundColor: barColor,
                }}
              >
                <span className="section2__progressBarCircle"></span>
              </div>
            </div>
            <span className="section2__progressBarPoint section2__progressBarPoint--start">
              {usedStorage} $MURINE 
            </span>
            <span className="section2__progressBarPoint section2__progressBarPoint--start">/</span>
            <span className="section2__progressBarPoint section2__progressBarPoint--end">
              {totalStorage} $MURINE
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
