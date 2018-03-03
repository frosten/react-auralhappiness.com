import React, { Component } from 'react';


const animationEndEvent = 'animationend'


class NextPreviousControl extends Component {
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

    changeSong = (type) => {
        this.toggleClass(true);
        if (typeof this.props.click === 'function')
            this.props.click(type);
    }

    render() {
        return (<div>
            <img ref="actionButton" src={this.props.image} alt="change song" className={this.props.className} onClick={() => this.changeSong(this.props.type)} />
        </div>)
    }

}


export default NextPreviousControl;