import React from 'react'

export default function Showcase() {

    const [meme, setMeme] = React.useState({
        topText: '',
        bottomText : '',
        randomImgUrl : 'http://i.imgflip.com/1bij.jpg'
    })

    const [allMeme, setAllMeme] = React.useState([]);

    React.useEffect(() => {
      fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(bigData => {setAllMeme(bigData.data.memes)});
    }, [])
    

    function handleChange(event) {
      let {name, value} = event.target;
      setMeme(prevState => ({...prevState, [name]: value}))
    }

    function getRandomImg() {
      let randomNum = Math.floor(Math.random() * 100);
      let randomUrl = allMeme[randomNum].url;
      setMeme(prevState => ({...prevState, randomImgUrl: randomUrl}));
    }

  return (
    <section className="showcase">

      <div className="user-interactions">
        <div className="input-field">
          <input type="text" name = "topText" value = {meme.topText} onChange={handleChange} placeholder="Top Text" />
          <input type="text" name = "bottomText" value = {meme.bottomText} onChange={handleChange} placeholder="Bottom Text" />
        </div>

        <button onClick={getRandomImg} className="generate-img-btn">Give me a New Image !</button>
      </div>

      
      <div className="meme-items">
          <p className="top-text">{meme.topText}</p>
          <p className="bottom-text">{meme.bottomText}</p>
        <img
          className="meme-img"
          src= {meme.randomImgUrl}
          alt="Broken Meme Image"
        />
      </div>

    </section>
  );
}

// 
