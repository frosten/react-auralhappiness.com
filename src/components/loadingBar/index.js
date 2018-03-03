import React, { Component } from 'react';


class LoadingBar extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0 }; 
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        return (
            <div>
                <div className="loadbar"></div>
                <div className="loadbar-cover"  style={{ width: this.state.width + '%' }}></div>
            </div>
        )
    }
}

export default LoadingBar;