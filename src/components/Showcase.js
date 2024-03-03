import React, { useRef } from "react";
import download from "../download";

export default function Showcase() {
  const captureRef = useRef();

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImgUrl: "https://i.imgflip.com/af002.jpg",
  });

  const [allMeme, setAllMeme] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const responseData = await response.json();
      const memeData = responseData.data.memes;
      setAllMeme(memeData);
    } catch (error) {
      console.log(`Error occured while fetching the meme data ${error}`);
    }
  };

  function handleChange(event) {
    let { name, value } = event.target;
    setMeme((prevState) => ({ ...prevState, [name]: value }));
  }

  function getRandomImg() {
    let randomNum = Math.floor(Math.random() * 100);
    let randomUrl = allMeme[randomNum].url;
    setMeme((prevState) => ({ ...prevState, randomImgUrl: randomUrl }));
  }

  return (
    <section className="showcase">
      <div className="user-interactions">
        <div>
          <div className="input-field">
            <input
              type="text"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
              placeholder="Top Text"
            />
            <input
              type="text"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
              placeholder="Bottom Text"
            />
          </div>

          <button onClick={getRandomImg} className="generate-img-btn">
            Give me a New Image !
          </button>

          <button
            onClick={() => download(captureRef.current)}
            className="download-btn"
          >
            Download Meme
          </button>
        </div>
      </div>

      <div className="meme-items" id="capture" ref={captureRef}>
        <p className="top-text">{meme.topText}</p>
        <p className="bottom-text">{meme.bottomText}</p>
        <img
          className="meme-img"
          src={meme.randomImgUrl}
          alt="Broken Meme Image"
        />
      </div>
    </section>
  );
}
