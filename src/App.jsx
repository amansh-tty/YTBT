import { useRef, useState } from "react";
import axios from "axios";
import { youtube_parser } from "./utils";
function App() {
  const inputURLRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const youtubeID = youtube_parser(inputURLRef.current.value);
    console.log(youtubeID)

    const options = {
      method: "get",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id: youtubeID },
      headers: {
        "X-RapidAPI-Key": "800b216515msh7f55a6128c3575ap1e37aejsne9e7086b8210",
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com"
      }
    };
    axios(options)
      .then((res) => {
        console.log(res.data)
        setUrlResult(res.data.link)
      })
      .catch((err) => console.log(err));
// https://www.youtube.com/watch?v=dBlTs-3yc84&list=PLNHvGH_fE1C5FTJmVMMCBWQzOpOM1fKRm&index=13
    inputURLRef.current.value = "";
  };
  console.log(urlResult);
  return (
    <div className="app">
      <span className="logo">YTBT</span>
      <section className="content">
        <h1 className="content_title">youtube to mp3 converter</h1>
        <p className="content_description">
          Youtube se MP3 file convert karo bhailog
        </p>
        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputURLRef}
            className="form_input"
            placeholder="Paste a yt video URL"
            type="text"
          />
          <button type="submit" className="form_button">
            Search
          </button>
        </form>
        {urlResult ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={urlResult}
            className="download_btn"
          >
            Download
          </a>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default App;
