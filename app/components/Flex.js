/**
 * Created by wugz on 2016/10/26.
 */
var Flex=React.createClass({
    propTypes:{
        //是否设置为垂直方向
        column:PropTypes.bool,
        //对应flex：justify-content 支持'start','end','between','center'
        content:PropTypes.string,
        //支持'start','end','stretch','center','baseline
        align:PropTypes.string,
        border:PropTypes.bool
    },
    getDefaultProps(){
        return {
            //默认水平方向
            column:false,
            //是否需要边框线
            border:false

        }
    },
    getClass(){
        var {className, column, content, align} = this.props;
        var arr = ["react-flex", className];
        column && arr.push('column');
        content && arr.push('c-'+content);
        align && arr.push('a-'+align);
        return arr.join(' ');
    },

    render(){
        var {children, style, onClick} = this.props;
        return <div style={style} className={this.getClass()} onClick={onClick}>{children}</div>
    }

});

/**
 * 固定高度或宽度不变的子元素
 */
var Center=React.createClass({
    render(){
        var {children, className, style} = this.props;
        return <Flex style={style} align='center' content='center' className={className}>{children}</Flex>
    }
});

/**
 * 固定高度或宽度不变的子元素
 */
var FlexFix=React.createClass({
    render(){
        var {className, children} = this.props;
        return <div className={classNames('react-flex-fix', className)}>{children}</div>
    }
});
var FlexGrid=React.createClass({
    propTypes:{
        //数据
        data:IPropTypes.list.isRequired,
        //生成child
        renderChild:PropTypes.func,
        //分割数据
        split:PropTypes.number,
        //对应flex：justify-content 支持'start','end','between','center'
        content:PropTypes.string,
        //支持'start','end','stretch','center','baseline
        align:PropTypes.string,
        //分割比例
        ratios:IPropTypes.list,
        //选中
        select:PropTypes.any,
        //选中样式
        selectClass:PropTypes.string,
        //选中样式
        itemClass:PropTypes.string,
        //是否是二维数组。
        is2DArray:PropTypes.bool,
        //是否显示边框
        border:PropTypes.bool,
        //高度
        height:PropTypes.string,
    },
    getDefaultProps(){
        return {
            align:'center',
            content:'center',
            is2DArray:false,

        }
    },
    renderOne(data,index,splice){
        var {renderChild,ratios,select,selectClass,onItemClick, itemClass}=this.props;
        let children = data.get(index)&&renderChild?renderChild(data.get(index), index):<div key={index}>{data.get(index)}</div>,
            props = {key:index};
        //比例适配
        if(ratios){
            let ratio=1;
            if(splice){
                ratio = ratios.get(index%splice) || 1;
            }else{
                ratio = ratios.get(index) || 1;
            }
            /*let ratio = ratios.get(index%splice) || 1;*/
            props.style={width:'1px'};
            //添加自适配样式
            props.style.boxFlex = ratio;
            props.style.WebkitBoxFlex = ratio;
            props.style.flexGrow = ratio;
            props.style.WebkitFlexGrow = ratio;
        }
        //是否有点击事件
        if(onItemClick){
            props.onClick = onItemClick.bind(this, index);
        }
        //是否为选中状态
        if(select!=undefined && selectClass &&(select === index || select.get&&select.get(index)!=undefined) ){
        }else{
            selectClass = undefined;
        }
        props.className = classNames("flex-item",children.props.className,itemClass, selectClass);
        // return <div {...props}>{children}</div>;
        return React.cloneElement(children,props);
    },

    renderChildren(){
        var {data, split,content}=this.props;
        var array = [],
            splice = split || data.size,
            len = split?(Math.round(Math.ceil(data.size/split)*split)):data.size;
        for(var i=0; i<len; i+=splice){
            var arr = [];
            for(var j=i; j<len && j<i+splice; j++){
                arr.push(this.renderOne(data,j,splice));
            }
            //拼接一行
            array.push(<Flex key={i} align={"stretch"} content={content}>{arr}</Flex>);
        }
        return array;
    },
    /**
     * 二维数组。
     */
    render2DArrayChildren(){
        var {data}=this.props;
        var array = [];
        for(var i=0; i<data.size; i++){
            //分割每行
            var mdata=data.get(i);
            var arr = [];
             for(var j=0; j<mdata.size; j++){
                    arr.push(this.renderOne(mdata,j));
            }
            array.push(<Flex key={i} align={"stretch"}>{arr}</Flex>);

        }
        return array;
    },
    render(){

        /*var {className, align, content, split,is2DArray,border,data} = this.props;
        return <Flex  className={className}  style={this.props.style} column={is2DArray?true:(split && data.size>split)?true:false} align={align} border={border} content={content}>{is2DArray?this.render2DArrayChildren():this.renderChildren()}</Flex>;*/

        var {className, height, align, content, is2DArray,border} = this.props;
        var children = !is2DArray?this.renderChildren():this.render2DArrayChildren();
        if(children.length == 1){
            return React.cloneElement(children[0],{style:this.props.style,className:classNames(className,border?"flex_border":undefined)});
        }else if(height){
            return <Flex column={true} className={className} style={{height:height}} content={content} align={align}>{children}</Flex>
        }else{
            return <div className={classNames(className,border?"flex_border":undefined)} style={this.props.style}>{children}</div>
        }
    }
});