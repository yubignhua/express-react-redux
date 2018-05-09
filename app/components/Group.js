import React from 'react';
import PropTypes from 'prop-types';


var Div = React.createClass({
    render:function(){
        return <div {...this.props} ref='node'>{this.props.children}</div>;
    } ,
});

var Table = React.createClass({
    render:function(){
        return <table {...this.props} ref='node'>{this.props.children}</table>;
    } ,
});
var Tr = React.createClass({
    render:function(){
        return <tr {...this.props} ref='node'>{this.props.children}</tr>;
    } ,
});
var Td = React.createClass({
    render:function(){
        return <td {...this.props} ref='node'>{this.props.children}</td>;
    } ,
});
var Group = React.createClass({

    propTypes:{
        // //数据
        // data:PropTypes.list,
        // //生成item项回调函数
        // renderChild:PropTypes.func,
        // //比例
        // ratio:PropTypes.list,
        // //item的样式
        // itemClass:PropTypes.string,
        // //是否合并最后一行
        // mergeLast:PropTypes.bool,
        // //长宽比
        // whRatio:PropTypes.number,
        // //是否采用table
        // useTable:PropTypes.bool,
    },

    getInitialState:function(){
        return {
            height:0,
        }
    },

    componentDidMount:function(){
        if(this.props.whRatio){
            this.setState({height:$(this.refs.item0.refs.node).width()*this.props.whRatio})
        }
    },

    //componentWillReceiveProps: function(nextProps) {
    //    if(!is(nextProps.whRatio,this.props.whRatio)
    //        ||nextProps.children&&this.props.children&& nextProps.children.length != this.props.children.length
    //    ||nextProps.data&&this.props.data&&nextProps.data.size != this.props.data.size){
    //        this._calcRatio();
    //    }
    //},

    _calcRatio(){
        this.ratios = [];
        var {ratio, data, children}= this.props;
        var last = 100;
        //如果没有定义item,则为自动平分
        if(!ratio  || ratio && (children && ratio.size != children.length-1 && data && ratio.size != data.size-1)){
            var len = data&&data.size>0?data.size:$.isArray(children)?children.length:1;
            for(var i=0; i<len-1;i++){
                var item = (100/len).toFixed(2);
                last -= item;
                this.ratios.push((100/len).toFixed(2));
            }
            this.ratios.push(last);
            return;
        }else{
            for(var i=1; i<ratio.size-1; i++){
                var item = (ratio.get(i)*100/ratio.get(0)).toFixed(2);
                last -= item;
                this.ratios.push(item);
            }
        }
        this.ratios.push(last);
    },

    componentWillMount:function(){
        //计算比例
        this._calcRatio();
    },

    render:function(){
        var Component = this.getComponent('table'),
            CTr = this.getComponent('tr');
        return <Component cellSpacing='0' cellPadding='0' ref="group" className={classNames("react-group", this.props.className)} onClick={this.props.onClick}>
            <CTr className='group-wrap' >
                {this.renderChildren()}
            </CTr>
        </Component>
    },

    /**
     * 自动分割
     * @param child
     * @param i
     * @returns {*}
     */
    renderRatio:function(child, i){
        var ratio = this.ratios[i];
        var {itemClass,titleClass} = this.props;
        var style = {width:ratio+"%"};
        if(this.state.height != 0) style.height = this.state.height+"px";
        var Component = this.getComponent('td');
        if(this.props.useTable != true) style.float = 'left';
        return <Component key={i} ref={'item'+i} className={classNames("group-item",itemClass, titleClass,(this.props.useTable==true?'':'noTable'))} style={style}>{child}</Component>;
    },

    getComponent:function(type){
        if(this.props.useTable!=true) return Div;
        switch (type){
            case 'table':
                return Table;
            case 'tr':
                return Tr;
            case 'td':
                return Td;
        }
    },


    /**
     * render所有child
     */
    renderChildren:function(){
        var {renderChild,data,children} = this.props;

        var children = this.getChildren(data,children);
        var items = children.map(function(child, i){
            //如果定义了回调方法
            child = renderChild?renderChild(child, i):child;
            return this.renderRatio(child,i);
        }.bind(this));
        return items.asImmutable?items.toJS():items;
    },

    /**
     * 获取
     */
    getChildren:function(data, children){
        children=children?children.length>=0?children:[children]:[];
        //如果没有传递数据,则直接使用child
        data = data?data:children;
        return data;
    },
});

export default Group;