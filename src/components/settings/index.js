import React, { Component } from 'react';


import './style/Modal.css'


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {volume: 5}
    }

    componentWillReceiveProps(nextProps) {
        //this.setState(nextProps);
    }

    render() {
        return (
            <div>
                <input className="modal-state" id="modal-1" type="checkbox" />
                <div className="modal">
                    <label className="modal__bg" htmlFor="modal-1"></label>
                    <div className="modal__inner">
                        <label className="modal__close" htmlFor="modal-1"></label>
                        <h2>Caaaats FTW!</h2>
                        <p>Aliquam in sagittis nulla. Curabitur euismod diam eget risus venenatis, sed dictum lectus bibendum.
                             Nunc nunc nisi, hendrerit eget nisi id, rhoncus rutrum velit. Nunc vel mauris dolor.
                              className aptent taciti sociosqu ad litora torquent per conubia nostra,
                              per inceptos himenaeos. Aliquam fringilla quis nisi eget imperdiet.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings;