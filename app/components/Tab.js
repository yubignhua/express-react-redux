import Group from '../components/Group';
import React from 'react';
import PropTypes from 'prop-types';
import VelocityComponent from '../components/VelocityComponent';
var fromJS = imt.fromJS;
var Tab = React.createClass({

    getInitialState:function(){
        return {
            //索引值
            index:this.props.index?this.props.index:0,
        }
    },

    render:function(){
        return (<div className={classNames("react-tab",this.props.className)}>
            <Group data={fromJS(this.props.tabs)} renderChild={this.renderTitle} index = {this.state.index}/>
            {this.renderBar()}
            {this.renderSlide()}
        </div>);
    },

    renderTitle:function(item, i){
        var cls = classNames({"tabs":true, "tabs-choice":i==this.state.index});
        return <div className={cls} onClick={this.onTitleClick.bind(this, i)}>{item}</div>;
    },

    onTitleClick:function(i){
        this.refs.slide.goToPage(i);
    },
    renderBar:function(){
        var width = 100/this.props.tabs.length,
            left = width*this.state.index,
            animation = {duration:300,animation:{left:left+"%"},easing: "easeOutCirc"};

        return <VelocityComponent {...animation}>
            <div ref className="tab-bar-item" style={{width:width+"%"}}><div className="tab-bar-item-in"></div></div>
        </VelocityComponent>;
    },

    snapChange:function(i){
        if(i === this.state.index) return;
        this.setState({index:i, time:new Date().valueOf()});
        if(this.props.scrollcallback!=undefined){
            this.props.scrollcallback(i);
        }
    },


    /**
     * 切换子类
     * @returns {XML}
     */
    renderSlide:function(){
        return <Slide className="slide-item" move={this.props.move} ref='slide' index={this.state.index} snapChange={this.snapChange}>{this.props.children}</Slide>
    },
});


var MixinScroll = {

    stopEvent:function(e){
        e.preventDefault();



    },

    getEvents:function(events){
        if(!events) events = this.stopEvent;

        //if(jjVersion.isIos()) return {};

        return {
            onTouchStart:events,
            onTouchMove:events,
            onTouchCancel:events,
            onTouchEnd:events,
        }
    },
};

var Slide = React.createClass({

    mixins:[MixinScroll],

    PropTypes:{
        //监听切换
        snapChange:PropTypes.func,
        //
        index:PropTypes.number,

        bounce:PropTypes.bool,
        //是否可以左右滑动
        move:PropTypes.bool,
    },

    getDefaultProps:function(){
        return {
            index:0,
        }
    },

    swiper:function ($ele,swiperLeft,swiperRight) {
        var startPosition, endPosition, deltaX, deltaY, moveLength;
        $ele.bind('touchstart', function(e){
            var touch = e.touches[0];
            startPosition = {
                x: touch.pageX,
                y: touch.pageY
            }
        }) .bind('touchmove', function(e){
            var touch = e.touches[0];
            endPosition = {
                x: touch.pageX,
                y: touch.pageY
            };
            deltaX = endPosition.x - startPosition.x;
            deltaY = endPosition.y - startPosition.y;
            moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
        }).bind('touchend', function(e){
            if(deltaX < -10) { // 向左划动
                swiperLeft();
                deltaX = 0;
            } else if (deltaX > 10) { // 向右划动
                swiperRight();
                deltaX = 0;
            }
        });
    },

    componentDidMount:function(){
        var $tab = $(this.refs.tab),
            width = $tab.width(),
            $wrapper = $(this.refs.wrapper),
            $children = $wrapper.children();

       var bounceEasing = {
            //style: 'cubic-bezier(0,0,1,1)',
            fn: function (k) {  }
        }

        for(var i=0; i<$children.length; i++){
            $children.eq(i).css({width:width+"px",left:width*i+"px"});
        }
        $wrapper.css({width:width*$children.length+"px"});
        this.mScroll = new IScroll(this.refs.tab, {snap:true,scrollY:false,scrollX:false,click:false,bounce:this.props.bounce,pageX:this.props.index});
        console.log(this.mScroll)
        //绑定snapChange事件
        this.props.snapChange && this.mScroll.on("snapChange", this.props.snapChange);
        //this.props.index>0&&this.mScroll.goToPage(this.props.index,0,1);
        if(this.props.move != false){
            this.swiper($tab,function () {
                this.mScroll.next(1,bounceEasing);
            }.bind(this),function () {
                this.mScroll.prev(1,bounceEasing);
            }.bind(this));
        }
    },

    render:function(){
        return (<div className={classNames("react-slide",this.props.className)} ref='tab'>
            <div className='wrapper' ref='wrapper'>
                {this.renderChild(this.props.children)}
            </div>
        </div>);
    },
    renderChild:function(children){
        if(!(children.length > 0)) children = [children];
        return children.map(function(child,i){
            return <div key={i} className='item' >{child}</div>
        });
    },

    goToPage:function(i){
        this.mScroll.goToPage(i, 0);
    },
});

export default Tab;