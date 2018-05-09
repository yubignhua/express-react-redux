/**
 * Created by yubh on 2018/3/2.
 */

import {View,connect,React} from '../../utils/boot';
import { withLazyReducer } from 'lazy-reducer';
import { List,TextareaItem, InputItem, WhiteSpace,NavBar,Icon,Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import {Link,browserHistory } from 'react-router';

import '../../assets/style/common.css';
import './creat_task.scss';
import {subData} from '../../utils/ajax';
import URL from '../../url_config';

var initState = {//定义初始状态
    name:'register',
    list:[]
};
//定义本组件的 reducer
const reducerMap = {
    'Register': (state=initState,action) =>{
        switch (action.type){
            case "ADD":
                return [...state.list,["棒球"]];break;
            default:
                return state;
        }
    }
};

/**
 * 注册页面组件
 */
@withLazyReducer(reducerMap)
class CreatTasks extends View{
    componentWillMount(){
        console.log('CreatTasks :: location-----',this.props.location);

    }
    submitData(data){
        this.props.dispatch(subData(URL.createTasks,function (res) {
            Toast.success(res.msg+'!!!');
            browserHistory.push({
                pathname:'/',
                query:{selectedTab:'greenTab'}
            })
        },data,function (err) {
            console.log(err)
        },'POST'));
    }
    render(){
        return(
            <div className="register">
                <BasicInputExample subdata={this.submitData.bind(this)}/>
            </div>
        )
    }

}

/**
 * 表单组件
 */
@createForm()
class BasicInputExample extends React.Component {
    componentDidMount() {
        // this.autoFocusInst.focus();
    }

    
    /**
     * 表单提交方法
     */
    submit(){
        let that = this;
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            value.id = 20;
            value.user_id = 20;
            that.props.subdata(value);
        });
    }

    /**
     * 返回按钮点击事件
     */
    onBack(){
        browserHistory.push({
            pathname:'/',
        })
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <NavBar icon={<Icon type="left" />} onLeftClick={this.onBack}>添加任务</NavBar>
                <InputItem {...getFieldProps('title')} clear placeholder="请填写标题">标题</InputItem>
                <TextareaItem
                    {...getFieldProps('done')}
                    rows={15}
                    placeholder="请填写任务内容"
                />
                <div className="btn_wraper">
                    <Button onClick={this.submit.bind(this)} type="primary">提交</Button>
                </div>
            </div>
        );
    }
}




const mapStateToProps = (state, ownProps) => {
    console.log('state => in mapStateToProps',state);
    return{}
};


export default connect(mapStateToProps)(CreatTasks);

