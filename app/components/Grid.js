/**
 * Created by wugz on 2016/7/22.
 */
/***
 * 网格布局
 */
var Grid = React.createClass({
    propTypes:{
        //数据
        data:IPropTypes.list,
        //分割数据
        division:PropTypes.number,
        //生成item项回调函数
        renderChild:PropTypes.func,
        //是否显示Group边框
        border:PropTypes.bool,
        //titles
        titles:IPropTypes.list,
        //title样式，即第一行样式
        titleClass:PropTypes.string,
        //比例
        ratio:IPropTypes.list,
        //item的样式
        itemClass:PropTypes.string,
        //是否合并最后一行
        mergeLast:PropTypes.bool,
        //是否采用table
        useTable:PropTypes.bool,
    },

    render:function(){
        return <div className={classNames("react-grid",this.props.className,this.props.border==false?"grid-no-border":undefined)}>
            {this.renderLine(this.props.titles,-1,this.props.titleClass)}
            {this.renderChildren()}
        </div>
    },

    /**
     *
     * @returns {*}
     */
    renderChildren:function(){
        var {data, division}=this.props;
        division = Number(division);
        if(data){
            //如果定义了数组分割
            if(division>0){
                var child=[];
                for(var z=0; z<data.size; z+=division){
                    child.push(this.renderLine(data.slice(z,z+division),z));
                }
                return child;
            }else{
                var i=0;
                return data.map(function(ldata, li){
                    i+= ldata.size;
                    return this.renderLine(ldata, i-ldata.size);
                }.bind(this))
            }
        }else{
            //如果没有定义data,则使用Children
            return this.props.children;
        }
    },

    /**
     * 刷新一行数据
     * @param data
     * @param i
     * @param renderChild
     * @returns {XML}
     */
    renderLine:function(data, i,titleClass){
        if(!data||data.size == 0) return null;
        var {ratio, renderChild, itemClass,mergeLast,change, useTable} = this.props;
        return <Group key={i} data={data} ratio={ratio} mergeLast={mergeLast} useTable={useTable} change={change} itemClass={classNames(itemClass, titleClass)} renderChild={function(idata,ii){
            return renderChild?renderChild(idata,ii,data,i):idata;
        }}/>
    },
});