/**
 * Created by wugz on 2016/4/18.
 */
/**
 * Created by wugz on 16/4/16.
 */

var JButton = React.createClass({

    // get
    getDefaultProps(){
        return {
            disabled:false,

            isAudio:false,
            audioSource:"",

        }
    },

    mixins:[MixinSetInterval],

    parserCls(cls, pre){
        var clss = cls.split(' '), ncls = cls;
        for (var i = 0; i < clss.length; i++) {
            ncls += ' ' + clss[i] + pre;
        }
        return [cls, ncls];
    },

    onItemClick(e){
        var time = new Date().valueOf();
        if(time - this.timer < 300) return;
        this.timer = time;
        if(this.props.disabled == true) return;
        var $button = $(this.refs.button);
        var cls = this.props.className;
        if (cls) {
            this.cls = this.parserCls(cls, '-clicked');
            //重置cls
            $button.attr('class', this.cls[0]);
            this.setTimeout(()=>{
                $button.attr('class', this.props.className);
            }, 10);
            this.clearTimeout(this.timeout);
            this.timeout = this.setTimeout(()=>$button.attr('class', this.props.className), 200);
        }
        this.props.onClick && this.props.onClick(e);

        this.props.isAudio && this.playMusic();


    },

    playMusic:function(){
        if(!this.refs.audio) return;
        try{
            this.music = $(this.refs.audio)[0];
            this.music.currentTime=0;
            this.music.play();
        }catch(e){
            console.log(e);
        }
    },

    renderAudio() {
        var {audioSource} = this.props;
        return <div onClick={this.playMusic}>
            <audio ref="audio" preload="auto">
                <source src={"react/audio/"+audioSource+".mp3"} type="audio/mpeg"/>
                <source src={"react/audio/"+audioSource+".wav"} type="audio/wav"/>
                <source src={"react/audio/"+audioSource+".ogg"} type="audio/ogg"/>
            </audio>
        </div>

    },


    render(){
        return <div ref='button' {...this.props} onClick={this.onItemClick}>
            {this.props.children}
            {this.props.isAudio?this.renderAudio():""}
            </div>
    },
});

/**
 * 按钮组件
 */
var Button = React.createClass({

    mixins:[MixinSetInterval],

    propTypes:{
        //按钮点击状态
        disabled:PropTypes.bool,
    },

    render:function(){
        return <button ref='button' {...this.props} className={classNames("react-button",this.props.className)}>{this.props.children}</button>
    },
});

/**
 * 图片组件
 */
var Img = React.createClass({
    render:function(){
        return <img src={this.props.src}/>
    },
});












