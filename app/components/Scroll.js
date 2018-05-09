//import IScroll from '../utils/Scroll';
import React from 'react';
//import IScroll from 'iscroll';
import PropTypes from 'prop-types';

var MixinScroll = {
    stopEvent:function(e){
       e.preventDefault();
    },
    getEvents:function(events){
        if(!events) events = this.stopEvent;
        return {
            onTouchStart:events,
            onTouchMove:events,
            onTouchCancel:events,
            onTouchEnd:events,
        }
    },
};
var ScrollPull = React.createClass({

    PropTypes:{
        //状态值-1:不显示，0:未加载，1：将要加载，2：加载中，3：加载完成
        state:PropTypes.number.isRequired,
        //存放描述四种状态描述
        txt:PropTypes.array.isRequired,
    },



    getHeight:function(){
        return this.refs.pull?this.refs.pull.offsetHeight:0;
    },

    getState:function(){
        return this.props.state;
    },

    render:function(){
        //如果状态值为-1，则为不显示
        if(this.props.state == -1) return <div></div>;
        return (<div {...this.props} className="scroll-pull" ref="pull" >
            <div className="txt">{this.props.txt[this.props.state]}</div>
        </div>);
    },
});



/**
 * 滚动组件
 */
var Scroll = React.createClass({

    mixins:[MixinScroll],

    /**
     *
     * @returns {{}}
     */
    getInitialState:function(){
        return {
            //下拉
            mPullDown:-1,
            //上拉
            mPullUp:this.props.up==true?1:-1,
        }
    },

    PropTypes:{
        pullUp:PropTypes.func,
        bounce:PropTypes.bool,
        scrollX:PropTypes.bool,
    },

    getDefaultProps:function(){
        return {
            bounce:true,
            //下拉组件
            mPullDown:ScrollPull,
            mPullDownTxt:["下拉刷新","松开刷新","刷新中...","暂无刷新"],
            //上拉组件
            mPullUp:ScrollPull,
            mPullUpTxt:["加载更多","松开加载","正努力加载...","已全部加载"],
        }
    },

    componentDidMount:function(){
        //console.log('this.refs.Scroll----',this.refs.Scroll.children[0])
        var $scroll = $(this.refs.Scroll),
            $wrapper = $(this.refs.wrap),
            wrapperWidth = $wrapper.width();
        var csses = {minHeight:$scroll.height()+'px'};
        $wrapper.css({minHeight:$scroll.height()+'px'});
        this.mScrollHeight = $wrapper.height();
        this.pullDownOffset = this.refs.pullDown.getHeight();
        this.pullUpOffset = this.refs.pullUp.getHeight();
        this.mScroll = new IScroll(this.refs.Scroll,{bounce:this.props.bounce,scrollX:this.props.scrollX != false?true:false});
        this.mScroll.on("scrollMove", this.scrollMove);
        this.mScroll.on("scrollEnd", this.scrollEnd);
        this.mScroll.on('beforeScrollEnd', this.beforeScrollEnd);

        //console.log('this.mScroll::',this.mScroll)
    },

    getScroll:function(){
        return this.mScroll;
    },

    componentDidUpdate:function(){
        var height =  $(this.refs.wrap).height();
        if( height != 0){//this.mScrollHeight != height &&
            this.mScrollHeight =  height;
            this.mScroll.refresh();
        }
    },

    scrollMove:function(x, y){

        var mScroll = this.mScroll,
            pullDown = this.refs.pullDown,
            pullUp = this.refs.pullUp,
            value = 30;
        if (y > value && pullDown&&pullDown.getState() == 0) {
            this.setState({mPullDown:1});
            mScroll.minScrollY = 0;
        } else if (y < value && pullDown&& pullDown.getState() == 1) {
            this.setState({mPullDown:0});
            mScroll.minScrollY = -this.pullDownOffset;
        } else if (y < (mScroll.maxScrollY - value) && pullUp&&pullUp.getState() == 0) {
            this.setState({mPullUp:1});
        } else if (y > (mScroll.maxScrollY - value) && pullUp&&pullUp.getState() == 1) {
            this.setState({mPullUp:0});
        }
    },

    beforeScrollEnd:function(){
        var pullDown = this.refs.pullDown,
            pullUp = this.refs.pullUp;
        if (pullUp&&pullUp.getState() == 1) {
            this.mScroll.setBottomOffset(0, false);
        }
    },

    scrollEnd:function(){
        var pullDown = this.refs.pullDown,
            pullUp = this.refs.pullUp;
        if (pullDown&&pullDown.getState() == 1) {
            this.setState({mPullDown:2});
        }
        if (pullUp&&pullUp.getState() == 1) {
            this.triggerPull(2)
        }
    },

    triggerPull:function(type){
        if(type === 2){
            if(this.props.pullDown) this.props.pullDown();
            this.setState({mPullUp:2});
        }
    },

    refresh:function(){
        this.mScroll.refresh();
    },

    setPullDownState:function(state){
        //this.mScroll.maxScrollY += this.pullUpOffset;
        //this.mScroll.setBottomOffset(state==-1?this.pullUpOffset:0);
        this.setState({mPullUp:state});
    },

    render:function(){
        var {mPullDownTxt, mPullUpTxt} = this.props;
        var PullDown = this.props.mPullDown,
            PullUp = this.props.mPullUp;
        return <div {...this.getEvents(this.stopEvent)}>
            <div className="react-scroll" id="react-scroll" ref="Scroll">
                <div className="wrap" ref="wrap">
                    <PullDown txt={mPullDownTxt} state={this.state.mPullDown} ref="pullDown"/>
                    {this.props.children}
                    <PullUp txt={mPullUpTxt} state={this.state.mPullUp} onClick={this.triggerPull.bind(this,2)} ref="pullUp"/>
                </div>
            </div>
        </div>
    },

});


export default Scroll;