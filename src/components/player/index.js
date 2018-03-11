import React, { Component } from 'react';


import NextPreviousControl from '../nextPreviousControl'

const animationEndEvent = 'animationend'
let animateElement = [];

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState(nextProps);
    }

    componentDidMount() {
        animateElement = [this.refs.actionButton, this.refs.shuffleButton];
        animateElement.forEach((item) => {
            item.addEventListener(animationEndEvent, this.unloadAnimation);
        })

    }

    componentWillUnmount() {
        animateElement.forEach((item) => {
            item.removeEventListener(animationEndEvent, this.unloadAnimation);
        })
    }

    toggleClass = (add, item) => {
        item.classList[add ? "add" : "remove"](...["animated", "flipInY"]);
    }

    unloadAnimation = () => {
        animateElement.forEach((item) => {
            this.toggleClass(false, item);
        });
    }

    playOrPause = () => {
        if (typeof this.props.handlePlayPause === 'function') {
            this.toggleClass(true, this.refs.actionButton);
            this.props.handlePlayPause();
        }
    }

    shuffle = () => {
        if (typeof this.props.handleShuffle === 'function') {
            this.toggleClass(true, this.refs.shuffleButton);
            this.props.handleShuffle();
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
                <div className="footer-logo">
                    <div><img src="/img/5a9409c48a834600011a8036_footer-logo.png" alt="aural happiness" className="footer-logo-image" /></div>
                    <div><label className="player-settings " htmlFor="modal-1" ></label></div>
                </div>
                <div className="player-items">
                    <NextPreviousControl type="previous" className="previous-button-image" image="https://png.icons8.com/ios/50/ffffff/skip-to-start.png" click={this.state.handleChangeSong} />
                    <div><img ref="actionButton" onClick={this.playOrPause} src={this.state.playing ? "https://png.icons8.com/ios/50/ec008c/circled-pause.png" : "https://png.icons8.com/ios/50/ffffff/circled-play.png"} alt="play" className="play-button-image" /></div>
                    <NextPreviousControl type="next" className="next-button-image" image="https://png.icons8.com/ios/50/ffffff/end.png" click={this.state.handleChangeSong} />
                    <div><img ref="shuffleButton" alt="shuffle" className="shuffle-button-image" src={this.state.shuffle ? "https://png.icons8.com/ios/50/ec008c/shuffle-filled.png" : "https://png.icons8.com/ios/50/ffffff/shuffle.png"} onClick={this.shuffle} /></div>
                </div>
            </div>
        </div >)
    }
}

export default Player


