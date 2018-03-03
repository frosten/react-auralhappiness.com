import { Component } from 'react';

class BrowserHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            container: props.container
        }
        this.initListener()
    }

    static push(state, title, url) {
        window.history.pushState(state, title, url);
    }

    static replace(state, title, url) {
        window.history.replaceState(state, title, url);
    }

    initListener() {
        var _this = this;
        window.onpopstate = function (event) {
            if (typeof _this.props.onPopState === 'function') {
                _this.props.onPopState(event)
            }
        };
    }
    componentWillUnmount() { }

    render() {
        return null;
    }
}

export default BrowserHistory;
