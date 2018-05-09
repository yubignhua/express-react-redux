/**
 * Created by wugz on 2016/7/22.
 */
var Menu = React.createClass({

    propTypes:{
        lines:PropTypes.array.isRequired,
        renderLine:PropTypes.func.isRequired,
    },

    render(){
        return <div className={classNames('react-menu',this.props.className)}>
            <div className='rtop'>
                <img src="img/ks_xsj.png" />
            </div>
            <div className='rbottom'>{
                this.props.lines.map(this.props.renderLine)
            }</div>
        </div>;
    },
});