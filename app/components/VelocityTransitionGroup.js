import Velocity from '../utils/velocity';
import React from 'react';
import PropTypes from 'prop-types';

// Shim requestAnimationFrame for browsers that don't support it, in particular IE 9.
var shimRequestAnimationFrame =
    (typeof window !== 'undefined') && (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 0) }
    );

// Fix 'Invalid calling object' error in IE
shimRequestAnimationFrame = (typeof window !== 'undefined') &&  shimRequestAnimationFrame.bind(window);

// Internal wrapper for the transitioned elements. Delegates all child lifecycle events to the
// parent VelocityTransitionGroup so that it can co-ordinate animating all of the elements at once.
var VelocityTransitionGroupChild = React.createClass({
    displayName: 'VelocityTransitionGroupChild',

    PropTypes: {
        children: React.PropTypes.element.isRequired,
        willAppearFunc: React.PropTypes.func.isRequired,
        willEnterFunc: React.PropTypes.func.isRequired,
        willLeaveFunc: React.PropTypes.func.isRequired,
    },

    componentWillMount:function(){
    },

    componentWillAppear: function (doneFn) {
        this.props.willAppearFunc(ReactDOM.findDOMNode(this), doneFn);
    },

    componentWillEnter: function (doneFn) {
        this.props.willEnterFunc(ReactDOM.findDOMNode(this), doneFn);
    },

    componentWillLeave: function (doneFn) {
        this.props.willLeaveFunc(ReactDOM.findDOMNode(this), doneFn);
    },

    render: function () {
        return React.Children.only(this.props.children);
    },
});
/**
 *Velocity Group 动画组件
 */
var VelocityTransitionGroup = React.createClass({

    statics: {
        disabledForTest: false, // global, mutable, for disabling animations during test
    },

    PropTypes: {
        runOnMount: React.PropTypes.bool,
        enter: React.PropTypes.any,
        leave: React.PropTypes.any,
        children: React.PropTypes.any,
        enterHideStyle: React.PropTypes.object,
        enterShowStyle: React.PropTypes.object,
    },

    getDefaultProps: function() {
        return {
            runOnMount: false,
            enter: null,
            leave: null,
            enterHideStyle: {
                display: 'none',
            },
            enterShowStyle: {
                display: '',
            },
        };
    },

    componentWillMount: function () {
        this._scheduled = false;
        this._entering = {nodes:[],doneFns:[]};
        this._leaving = {nodes:[],doneFns:[]};
    },

    componentWillUnmount: function () {
        this._entering = {nodes:[],doneFns:[]};
        this._leaving = {nodes:[],doneFns:[]};
    },

    render: function () {
        // Pass any props that are not our own on into the TransitionGroup delegate.
        //var transitionGroupProps = _.omit(this.props, _.keys(this.constructor.propTypes))
        var props = $.extend({}, this.props);
        delete props["children"];
        var transitionGroupProps = ObjectUtil.omit(props, Object.keys(this.constructor.propTypes));

        transitionGroupProps.className = classNames('react-v-group', transitionGroupProps.className);
        // Without our custom childFactory, we just get a default TransitionGroup that doesn't do
        // anything special at all.
        //if (!this.constructor.disabledForTest && !Velocity.velocityReactServerShim) {
        transitionGroupProps.childFactory = this._wrapChild;
        transitionGroupProps.component = "div";
        //}
        return React.createElement(TransitionGroup, transitionGroupProps, this.props.children);
    },

    childWillAppear: function (node, doneFn) {
        if (this.props.runOnMount) {
            this.childWillEnter(node, doneFn);
        } else {
            this._finishAnimation(node, this.props.enter);

            // Important to tick over so that any callbacks due to finishing the animation complete first.
            // isMounted check necessary to avoid exception in tests, which can mount and unmount a
            // component before this runs over, as the "doneFn" callback does a ref lookup rather than
            // closing over the component.
            //
            // Using setTimeout so that doneFn gets called even when the tab is hidden.
            var self = this;
            window.setTimeout(function () {
                if (self.isMounted()) {
                    doneFn();
                }
            }, 0);
        }
    },

    childWillEnter: function (node, doneFn) {
        if (this._shortCircuitAnimation(this.props.enter, doneFn)) return;

        // By finishing a "leave" on the element, we put it in the right state to be animated in. Useful
        // if "leave" includes a rotation or something that we'd like to have as our starting point, for
        // symmetry.
        // We use overrideOpts to prevent any "begin" or "complete" callback from triggering in this case, since
        // it doesn't make a ton of sense.
        this._finishAnimation(node, this.props.leave, {begin: undefined, complete: undefined});

        // We're not going to start the animation for a tick, so set the node's display to none (or any
        // custom "hide" style provided) so that it doesn't flash in.
        $.each(this.props.enterHideStyle, function (key,val) {
            Velocity.CSS.setPropertyValue(node, key, val);
        });

        this._entering.nodes.push(node);
        this._entering.doneFns.push(doneFn);
        //  this._entering.push({
        //  node: node,
        //  doneFn: doneFn,
        //});

        this._schedule();
    },

    childWillLeave: function (node, doneFn) {
        if (this._shortCircuitAnimation(this.props.leave, doneFn)) return;

        //this._leaving.push({
        //  node: node,
        //  doneFn: doneFn,
        //});

        this._leaving.nodes.push(node);
        this._leaving.doneFns.push(doneFn);


        this._schedule();
    },

    // document.hidden check is there because animation completion callbacks won't fire (due to
    // chaining off of rAF), which would prevent entering / leaving DOM nodes from being cleaned up
    // while the tab is hidden.
    //
    // Returns true if this did short circuit, false if lifecycle methods should continue with
    // their animations.
    _shortCircuitAnimation: function (animationProp, doneFn) {
        if (document.hidden || (this._parseAnimationProp(animationProp).animation == null)) {
            if (this.isMounted()) {
                doneFn();
            }

            return true;
        } else {
            return false;
        }
    },

    _schedule: function () {
        if (this._scheduled) {
            return;
        }

        this._scheduled = true;

        // Need rAF to make sure we're in the same event queue as Velocity from here out. Important
        // for avoiding getting wrong interleaving with Velocity callbacks.
        shimRequestAnimationFrame(this._runAnimations);
    },

    _runAnimations: function () {
        this._scheduled = false;

        this.props.enter && this._runAnimation(true, this._entering, this.props.enter);
        this.props.leave && this._runAnimation(false, this._leaving, this.props.leave);

        this._entering = {nodes:[],doneFns:[]};
        this._leaving = {nodes:[],doneFns:[]};
    },

    // Used to parse out the 'enter' and 'leave' properties. Handles cases where they are omitted
    // as well as when they are just strings and not hashes of animation and options.
    _parseAnimationProp: function (animationProp) {
        var animation, opts, style;

        if (typeof animationProp === 'string') {
            animation = animationProp;
            style = null;
            opts = {};
        } else {
            animation = (animationProp != null) ? animationProp.animation : null;
            style = (animationProp != null) ? animationProp.style : null;
            opts = ObjectUtil.omit(animationProp, ['animation', 'style']);
        }

        return {
            animation: animation,
            style: style,
            opts: opts,
        };
    },

    _runAnimation: function (entering, queue, animationProp) {
        if (!this.isMounted() || queue.length === 0) {
            return;
        }

        var nodes = queue.nodes;
        var doneFns = queue.doneFns;

        var parsedAnimation = this._parseAnimationProp(animationProp);
        var animation = parsedAnimation.animation;
        var style = parsedAnimation.style;
        var opts = parsedAnimation.opts;

        // Clearing display reverses the behavior from childWillAppear where all elements are added with
        // display: none to prevent them from flashing in before the animation starts. We don't do this
        // for the fade/slide animations or any animation that ends in "In," since Velocity will handle
        // it for us.
        //
        // If a custom "enterShowStyle" prop is passed, (i.e. not one that just reverses display: none)
        // we always run it, regardless of the animation, since it's probably doing something around
        // opacity or positioning that Velocity will not necessarily reset.
        if (entering) {
            //if (!_.isEqual(this.props.enterShowStyle, {display: ''})
            if(!(Object.keys(this.props.enterShowStyle).length ==1 && this.props.enterShowStyle.display == '')
                || !(/^(fade|slide)/.test(animation) || /In$/.test(animation))) {
                var styles = $.extend({}, this.props.enterShowStyle);
                style = $.extend(styles, style);
            }
        }

        // Because Safari can synchronously repaint when CSS "display" is reset, we set styles for all
        // browsers before the rAF tick below that starts the animation. This way you know in all
        // cases that you need to support your static styles being visible on the element before
        // the animation begins.
        if (style != null) {
            $.each(style, function (key,value) {
                Velocity.hook(nodes, key, value);
            });
        }

        var self = this;
        var doneFn = function () {
            if (!self.isMounted()) {
                return;
            }

            doneFns.map(function (doneFn) { doneFn(); });
        };

        // For nodes that are entering, we tell the TransitionGroup that we're done with them
        // immediately. That way, they can be removed later before their entering animations complete.
        // If we're leaving, we stop current animations (which may be partially-completed enter
        // animations) so that we can then animate out. Velocity typically makes these transitions
        // very smooth, correctly animating from whatever state the element is currently in.
        if (entering) {
            doneFn();
            doneFn = null;
        } else {
            Velocity(nodes, 'stop');
        }

        var combinedCompleteFn;
        if (doneFn && opts.complete) {
            var optsCompleteFn = opts.complete;
            combinedCompleteFn = function () {
                doneFn();
                optsCompleteFn();
            };
        } else {
            // One or the other or neither.
            combinedCompleteFn = doneFn || opts.complete;
        }

        // Bit of a hack. Without this rAF, sometimes an enter animation doesn't start running, or is
        // stopped before getting anywhere. This should get us on the other side of both completeFn and
        // any _finishAnimation that's happening.
        shimRequestAnimationFrame(function () {
            Velocity(nodes, animation, $.extend(opts, {
                complete: combinedCompleteFn,
            }));
        });
    },

    _finishAnimation: function (node, animationProp, overrideOpts) {
        var parsedAnimation = this._parseAnimationProp(animationProp);
        var animation = parsedAnimation.animation;
        var style = parsedAnimation.style;
        var opts = $.extend(parsedAnimation.opts, overrideOpts);

        if (style != null) {
            $.each(style, function (key, value) {
                Velocity.hook(node, key, value);
            });
        }

        if (animation != null) {
            // Opts are relevant even though we're immediately finishing, since things like "display"
            // can affect the animation outcome.
            Velocity(node, animation, opts);
            Velocity(node, 'finish', true);
        }
    },

    _wrapChild: function (child) {
        return React.createElement(VelocityTransitionGroupChild, {
            willAppearFunc: this.childWillAppear,
            willEnterFunc: this.childWillEnter,
            willLeaveFunc: this.childWillLeave,
        }, child);
    },
});