import React, { useEffect, useRef, useState } from "react";
import "./Homepage.css";
import Timer from "../../Components/Timer";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import CopyClipBoard from "../../Components/CopyClipBoard/CopyClipBoard";
import Modal from "../../Components/Modal/Modal";

const Homepage = ({timer,murinePrice, murineHead, storageUsed, storageTotal}) => {
  const aboutBoxRef = useRef(null);
  const [converter, setConverter] = useState(0);
  const [error, setError] = useState('');
  const targetDate = "2024-07-01T00:00:00";
  const usedStorage = storageUsed;
  const totalStorage = storageTotal;
  const barColor = "aqua";
  console.log(murinePrice)
  let convertedValue = (isNaN(converter) ? 0 : converter / murinePrice).toFixed(2);
  console.log(convertedValue)

  const handleChange = (e) => {
    const value = e.target.value;
    // Use a regular expression to check if the value is a valid number
    if (/^-?\d*\.?\d*$/.test(value)) {
      const valueAsNumber = parseFloat(value);
      setConverter(isNaN(valueAsNumber) ? 0 : valueAsNumber );
      setError('');
    } else {
      setError('Please enter a valid number');
      setConverter(0);
    }
  };

  useEffect(() => {
    const aboutBox = aboutBoxRef.current;
    if (!aboutBox) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            aboutBox.classList.add("slide-in");
            aboutBox.classList.remove("slide-out");
          } else {
            aboutBox.classList.remove("slide-in");
            aboutBox.classList.add("slide-out");
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(aboutBox);

    return () => {
      observer.unobserve(aboutBox);
    };
  }, []);

  return (
    <div className="body">
      <div className="container">
        <div className="header" id="home">
          <h1>MURINE</h1>
          <p>
            JOIN THE REVOLUTION WITH MURINE, WHERE LAUGHTER MEETS FINANCIAL
            FREEDOM!! MURINE: YOUR TICKET TO THE MOST ENTERTAINING & LUCRATIVE
            CRYPTO COMMUNITY AROUND.
          </p>
          <div className="box">
            <div className="box-content">
              <p>{murineHead} ENDS IN</p>
              <Timer timer={timer} />
              <p>1 $MURINE = {murinePrice} USDT</p>
              <p>Your $MURINE = 0</p>
              <div className="converter_box">
                
                <input
                  type="tel"
                  value={converter}
                  onChange={handleChange}
                />
                <label htmlFor="">$USDT</label>
              
                <p>= {isNaN(convertedValue)?0:convertedValue} $MURINE</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
              <div className="progressBar_container">
                <ProgressBar
                  usedStorage={usedStorage}
                  totalStorage={totalStorage}
                  barColor={barColor}
                  murineHead={murineHead}
                />
              </div>
              <div className="flex justify-center">
                <CopyClipBoard />
              </div>
              <div className="flex justify-center mt-5 modal_container">
                <Modal />
              </div>
            </div>
          </div>
        </div>
        <div className="mouse-image">
          <img src="/Images/mouse.png" alt="Mouse" />
        </div>
      </div>
      <div className="about-box" ref={aboutBoxRef}>
        <img src="/Images/mouse-coin.png" alt="Mouse Coin" />
        <div className="about-text" id="about">
          <h1>ABOUT MURINE</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            maiores ipsam, ipsa ratione possimus vel ducimus a doloribus
            minima dolore voluptatibus nostrum nobis! Error adipisci dolorem
            officiis, voluptatibus molestias neque.
          </p>
        </div>
      </div>
      <div className="tokenomics">
        <img src="/Images/TOKENOMICS.png" alt="" />
      </div>
      <div className="roadmap"> 

      </div>
      <div className="how-to-buy-container" id="buy">
        <div className="how-to-buy">
          <h1>HOW TO BUY</h1>
          <h3>1. Login </h3>
          <p>Connect with Murine by using your e-mail and wallet id.</p>
          <h3>2. Buy</h3>
          <p>
            Copy the given address and buy $MURINE COIN as much as you needed.
          </p>
          <h3>3. Upload the screenshot</h3>
          <p>Upload the screenshot of your transaction once it is done.</p>
          <h3>4. Receive Coin</h3>
          <p>
            After uploading the screenshot it will be verified and your
            $MURINE COIN will be transferred to your registered account within
            24 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

