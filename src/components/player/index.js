import React, { Component } from 'react';


import NextPreviousControl from '../nextPreviousControl'

const animationEndEvent = 'animationend'

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props};
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState(nextProps);
    }

    componentDidMount() {
        this.refs.actionButton.addEventListener(animationEndEvent, this.unloadAnimation);
    }

    componentWillUnmount() {
        this.refs.actionButton.removeEventListener(animationEndEvent, this.unloadAnimation);
    }

    toggleClass = (add) => {
        this.refs.actionButton.classList[add ? "add" : "remove"](...["animated", "flipInY"]);
    }

    unloadAnimation = () => {
        this.toggleClass(false);
    }

    playOrPause = () => {
        if (typeof this.props.handlePlayPause === 'function') {
            this.toggleClass(true);
            this.props.handlePlayPause();
        }
    }

    render() {
        return (<div>
            <div className="song-title-container">
                <div className="div-block">
                    <div className="div-block-3">
                        <h1 className="footer-song-artist">{this.state.name}</h1></div>
                </div>
                <div className="footer-song-title-container">
                    <div>
                        <h2 className="footer-song-title">{this.state.title}</h2></div>
                    <div>
                        <h2 className="footer-song-duration">{this.state.duration}</h2></div>
                </div>
            </div>
            <div className="player-container">
                <div className="footer-logo"><img src="/img/5a9409c48a834600011a8036_footer-logo.png" alt="aural happiness" className="footer-logo-image" /></div>
                <div className="player-items">
                    <NextPreviousControl type="previous" className="previous-button-image" image="/img/5a9409c4a44ab70001ea66ce_prev.png" click={this.state.handleChangeSong} />
                    <div><img ref="actionButton" onClick={this.playOrPause} src={this.state.playing ? "/img/5a9409c428c28c00011edfa6_pause.png" : "/img/5a9409c428c28c00011edfa6_play.png"} alt="play" className="play-button-image" /></div>
                    <NextPreviousControl type="next" className="next-button-image" image="/img/5a9409c4a44ab70001ea66cf_next.png" click={this.state.handleChangeSong} />
                </div>
            </div>
        </div>)
    }
}

export default Player


