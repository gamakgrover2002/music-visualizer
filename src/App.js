import React, { Component } from "react";
import Header from "./components/Header";
import mp3 from "./audio/audio.mp3";
import { AudioContext } from "standardized-audio-context";
import './App.css'
import Details from "./components/Details";
class App extends Component {
  constructor(props) {
    super(props);

    this.createVisualization = this.createVisualization.bind(this);
  }

  componentDidMount() {
    this.createVisualization();
  }
  state = { contextstate: "" };

  createVisualization() {
    var context = new AudioContext();
    console.log(context);
    this.setState({ contextstate: context.state }, () =>
      console.log("state changed to: ", this.state)
    );
    const btnResume = document.getElementById("resume");
    btnResume.addEventListener("click", () => {
      context.resume().then(() => {
        this.setState({ contextstate: context.state }, () =>
          console.log("state changed to: ", this.state)
        );
      });
    });
    const btnSuspend = document.getElementById("suspend");
    btnSuspend.addEventListener("click", () => {
      context.suspend().then(() => {
        this.setState({ contextstate: context.state }, () =>
          console.log("state changed to: ", this.state)
        );
      });
    });

    let analyser = context.createAnalyser();
    let canvas = this.refs.analyzerCanvas;
    let ctx = canvas.getContext("2d");
    let audio = this.refs.audio;
    audio.crossOrigin = "anonymous";
    let audioSrc = context.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    audioSrc.connect(context.destination);
    analyser.connect(context.destination);

    function renderFrame() {
      let freqData = new Uint8Array(analyser.frequencyBinCount);
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(freqData);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#9933ff";
      let bars = 100;
      for (var i = 0; i < bars; i++) {
        let bar_x = i * 3;
        let bar_width = 2;
        let bar_height = -(freqData[i] / 2);
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    }
    renderFrame();
  }
  doResume() {
    this.context.resume().then(console.log("resume started"));
  }
  render() {
    return (
      <>
<Header />
<div id="container">
<Details />
        <div id="mp3_player">
          <div id="audio_box">
            <audio
              ref="audio"
              autoPlay={false}
              controls={true}
              src={mp3}
            /><br />
            <button id="resume" className="button">start</button>
            <button id="suspend" className="button">stop</button>
          </div>
          <canvas ref="analyzerCanvas" id="analyzer" />
        </div>
        </div>
        </>
    );
  }
}

export default App;
