import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import LoadingBar from './components/loadingBar';
import NextPreviousControl from './components/nextPreviousControl';
import Player from './components/player';
import History from './components/browserHistory'
import Settings from './components/settings'


import './css/Animate.css';
import './css/App.v2.css';

const base = 'https://api.auralhappiness.com';

const RANDOM = 'RANDOM';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      songId: 'EN9YdpY4Zs9',
      playing: false,
      shuffle: false,
      volume: 0.6,
      playCount: 0,
      duration: 0,
      path: 'app/view/content/images/load.gif'
    }
  }

  componentWillMount = () => {
    let songId = document.location.pathname.replace(/\/song\//gi, '').replace(/\/index.html/gi, '');
    var st = setTimeout(function () { this.getSong(songId !== '/' ? songId : this.state.songId); clearTimeout(st); }.bind(this), 1000)
  }

  getSong = (songId) => {
    let url = base + '/song/' + songId + '?type=json';

    this.setState({ loading: true, path: 'app/view/content/images/load.gif' });

    var _this = this;

    fetch(url)
      .then(response => response.json())
      .then(response => {
        _this.setState({
          songId: response.id,
          name: response.name,
          title: response.title,
          path: response.backgroundImage,
          nextSongId: response.next,
          prevSongId: response.prev,
          playCount: this.state.playCount + 1,
          playing: true,
          songLength: "-:--"
        });

        History[_this.state.playCount > 1 ? "push" : "replace"](_this.state, _this.state.title, '/song/' + _this.state.songId)
      })
  }


  handleChangeSong = (next) => {
    const songId = !this.state.shuffle ? next === "next" ? this.state.nextSongId : this.state.prevSongId : RANDOM;
    this.getSong(songId);
  }

  handlePopState = (event) => {
    this.setState(event.state)
  }

  handleFinishSong = () => {
    this.getSong(this.state.nextSongId)
  }

  handleDuration = (duration) => {
    this.setState({ duration: duration });
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleShuffle = () => {
    this.setState({ shuffle: !this.state.shuffle });
  }

  /**
   * 
   * loaded:0.2313957726767497
   * loadedSeconds:51.421
   * played:0.22096173178952483
   * playedSeconds:49.102337
   */
  handleSeekChange = (state) => {
    let barWidth = (state.playedSeconds / this.state.duration) * 100;
    let songLength = "-:--";

    if (isNaN(barWidth)) { barWidth = 0 }

    if (this.state.duration !== 0) {
      const time = this.state.duration - state.playedSeconds;
      let songLengthMin = Math.floor(time / 60).toFixed();
      let songLengthSec = (time - songLengthMin * 60).toFixed();
      if (songLengthSec < 10) { songLengthSec = "0" + songLengthSec; }
      if (!isNaN(songLengthMin))
        songLength = songLengthMin + ":" + songLengthSec;
    }

    state.barWidth = barWidth;
    state.songLength = songLength;

    this.setState(state);
  }

  handleError = (err) => {
    if (err.type === 'error') {
      this.setState({
        name: `${this.state.name} ${this.state.title}`,
        title: `${err.type}`,
        songLength: ` ${err.target.error.message}`
      });
    }
  }

  getPlayer = () => {
    if (this.state.songId !== RANDOM)
      return (
        <ReactPlayer onEnded={this.handleFinishSong} style={{ display: 'none' }}
          url={"https://api.auralhappiness.com/app/view/content/mp3/" + this.state.songId + ".webm"}
          onDuration={this.handleDuration}
          onProgress={this.handleSeekChange}
          volume={this.state.volume}
          onError={this.handleError}
          playing={this.state.playing} />);
  }

  render = () => {
    return (
      <div className="App" >
        <Settings />
        <LoadingBar width={this.state.barWidth} />
        <div className="main-background" style={{ backgroundImage: 'url(' + base + '/' + this.state.path + ')' }} ref="background">
          <div className="main-overlay">
            <div className="block-container">
              <div className="previous-button-container">
                <NextPreviousControl type="previous" className="right-button-image" image="/img/5a9409c57545740001fd3f9e_prev-btn.png" click={this.handleChangeSong} />
              </div>
              <div className="item-container a-container">
                <div className="header">
                  <div className="logo-container">
                    <img src="/img/5a9409c48a834600011a8036_footer-logo.png" alt="aural happiness" className="main-small-logo" />
                    <img src="/img/5a9409c428c28c00011edfa7_header-logo.png" alt="aural happiness" className="main-logo" data-ix="new-interaction" />
                  </div>

                  <div className="header-song-title">
                    <div>
                      <h3 className="header-song-artist">{this.state.name}</h3>
                    </div>
                    <div>
                      <h4 className="header-song-name">{this.state.title}</h4>
                    </div>
                    <div>
                      <div className="header-song-duration">{this.state.songLength}</div>
                    </div>
                  </div>
                </div>

                <div className="content">
                  <div className="page-center">
                    <div></div>
                  </div>
                </div>

                <div className="footer">
                  <Player playing={this.state.playing} shuffle={this.state.shuffle} handlePlayPause={this.handlePlayPause} handleShuffle={this.handleShuffle} handleChangeSong={this.handleChangeSong} name={this.state.name} title={this.state.title} duration={this.state.songLength} />
                </div>
              </div>
              <div className="next-button-container">
                <NextPreviousControl type="next" className="left-button-image" image="/img/5a9409c428c28c00011edfa5_next-btn.png" click={this.handleChangeSong} />
              </div>
            </div>
          </div>
        </div>
        {this.getPlayer()}
        <History onPopState={this.handlePopState} />
      </div>);
  }
}

export default App;
