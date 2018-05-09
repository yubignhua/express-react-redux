/**
 * Created by wugz on 2016/7/22.
 */
/***
 * 弹出框
 */
var Model = React.createClass({

    getInitialState:function(){
        return {
            show:false,
        }
    },

    /**
     * 打开弹出框
     */
    show:function(props){
        //添加
        MixinAStore.addModel(this);
        this.setState({show:true, props:props});
    },

    hide:function(){
        jjBridge.back();
    },
    isShow(){
      return this.state.show;
    },
    /**
     * 关闭弹出框
     */
    close:function(){
        var flag = this.props.closeListener?this.props.closeListener():true;
        if(flag){
            this.setState({show:false});
        }
        return flag;
    },

    componentDidUpdate(){
        if($(this.refs.modelScroll).height()>$(this.refs.dialog).height()){
            $(this.refs.model).addClass('react-model-item');
        }else{
            $(this.refs.model).removeClass('react-model-item');
            this.refs.scroll&&this.refs.scroll.refresh();
        }
    },

    render:function(){
        if(!this.state.show) return null;

        return (<div className='react-model-wrap' ref='modelScroll'>
            <Scroll bounce={false} ref='scroll'>
                <div className={classNames("react-model",this.props.className)} ref='model' onClick={this.props.maskClick!=false?jjBridge.back:undefined}>
                    <div className="dialog" ref='dialog'  onClick={function(event){event.stopPropagation();}}>
                        {React.cloneElement(this.props.children, this.state.props)}
                    </div>
                </div>
            </Scroll>
        </div>);
    },
});