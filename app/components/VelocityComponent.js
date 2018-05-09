import Velocity from '../utils/velocity';
import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

var VelocityComponent = React.createClass({
    PropTypes: {
        animation: React.PropTypes.any,
        children: React.PropTypes.element.isRequired,
        runOnMount: React.PropTypes.bool,
        targetQuerySelector: React.PropTypes.string,
        // Any additional properties will be sent as options to Velocity
    },

    getDefaultProps: function () {
        return {
            animation: null,
            runOnMount: false,
            targetQuerySelector: null,
        }
    },

    componentDidMount: function () {
        this.runAnimation();

        // Jump to the end so that the component has the visual appearance of the animation having
        // been run to completion.
        if (this.props.runOnMount !== true) {
            this._finishAnimation();
        }
    },

    componentWillUpdate: function (newProps, newState) {
        if (newProps.animation!= this.props.animation) {
            this._stopAnimation();
            this._scheduleAnimation();
        }
    },

    componentWillUnmount: function () {
        this._stopAnimation();
    },

    // It's ok to call this externally! By default the animation will be queued up. Pass stop: true in
    // to stop the current animation before running. Pass finish: true to finish the current animation
    // before running.
    runAnimation: function (config) {
        config = config || {};

        this._shouldRunAnimation = false;

        if (!this.isMounted() || this.props.animation == null) {
            return;
        }

        if (config.stop) {
            this._stopAnimation();
        } else if (config.finish) {
            this._finishAnimation();
        }

        // Delegate all props except for the ones that we have specified as our own via propTypes.
        var opts = $.extend({}, this.props);
        delete opts["animation"];
        delete opts["children"];
        delete opts["runOnMount"];
        delete opts["targetQuerySelector"];
        Velocity(this._getDOMTarget(), this.props.animation, opts);
    },

    // We trigger animations on a new tick because of a Velocity bug where adding a
    // multi-step animation from within a complete callback causes the first 2 animations to run
    // simultaneously.
    _scheduleAnimation: function () {
        if (this._shouldRunAnimation) {
            return;
        }

        this._shouldRunAnimation = true;
        setTimeout(this.runAnimation, 0);
    },

    // Returns one or more DOM nodes to apply the animation to. This is checked every time we start
    // or stop an animation, which means that if an animation is proceeding but the element is removed
    // from the page, it will run its course rather than ever being stopped. (We go this route
    // because of difficulty in tracking what animations are currently being animated, due to both
    // chained animations and the need to be able to "stop" an animation before it begins.)
    _getDOMTarget: function () {
        var node = ReactDOM.findDOMNode(this);
        if (this.props.targetQuerySelector === 'children') {
            return node.children;
        } else if (this.props.targetQuerySelector != null) {
            return node.querySelectorAll(this.props.targetQuerySelector);
        } else {
            return node;
        }
    },

    _finishAnimation: function () {
        Velocity(this._getDOMTarget(), 'finish', true);
    },

    _stopAnimation: function () {
        Velocity(this._getDOMTarget(), 'stop', true);
    },

    render:function(){
        return this.props.children;
    },
});

export default VelocityComponent