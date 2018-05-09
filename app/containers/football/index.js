/**
 * Created by yubh on 2017/12/11.
 */

import {Link} from 'react-router';
import {View,connect,React} from '../../utils/boot';
import VelocityComponent from '../../components/VelocityComponent';
import '../../utils/velocity.ui';
import Tab from '../../components/Tab';
import { Button } from 'antd-mobile';
import {subData} from '../../utils/ajax';


import '../../assets/style/common.css';
import './football.scss';

Velocity.RegisterEffect('jiangbo.roundnum', {
    defaultDuration: 1000,
    calls: [
        [{opacity: [1, 0], scaleX: [1, 0.5], scaleY: [1, 0.5]}]
    ],
    //reset: {opacity:0 }
});

Velocity.RegisterEffect('jiangbo.bounceIn', {
    defaultDuration: 800,
    calls: [
        [ { opacity: [ 1, 0 ], scaleX: [ 1.05, 0.3 ], scaleY: [ 1.05, 0.3 ]}, 0.40 ],
        [ { scaleX: 0.9, scaleY: 0.9, translateZ: 0,}, 0.20 ],
        [ { scaleX: 1, scaleY: 1,}, 0.50 ]
    ],
    reset:{opacity:0}
});



class Football extends View{

    state = {
      data:''
    };

    componentWillMount(){
        if (process.env.NODE_ENV === 'production') {
            console.log('Welcome to production');
        }
        console.log("12342421")

        this.props.dispatch(subData('/cyhospital/weihospital/yanda/weiWangZhanIndex/?is_json=1',function (res) {
            console.log('res::::::',res)
        }));

    }
    giveName(index){
        //console.log('index;:::',index)
        this.props.dispatch({type:"change",index:index,value:'hello_kitty'});
    };
    tabScrollChange(){
        //alert('234234')
    }
    handleChange(date) {
        message.info('您选择的日期是: ' + date.toString());
        this.setState({ date });
    }


    render(){
        let that = this;
        let {ballList,index} = this.props;
        return(
            <div className="models">
                <Tab tabs={["神单共赏","广而告之"]} scrollcallback={this.tabScrollChange} index={0}>
                    <div className="model_content">
                        <VelocityComponent animation={"jiangbo.bounceIn"}  easing="liner" runOnMount={true}>
                            <div className="roundNum"></div>
                        </VelocityComponent>;
                        <div className="haha"></div>
                        {
                            ballList.map(function (item,index) {
                                return (
                                    <div onClick={that.giveName.bind(that,index)} key={index}>{index} : {item}</div>
                                )
                            })}
                        {index?<Link to="/reactpage2"><div>23432</div></Link>:<div></div>}
                    </div>
                    <div>
                        <Button>Start</Button>
                        哈哈哈 终于可以滑动了
                       
                    </div>


                </Tab>

                


            </div>
        )
    }

}



const mapStateToProps = (state, ownProps) => {
    console.log('mapStateToProps---state::::::',state);
    return {
        ballList: state.football.get('ball'),
    }
};


export default connect(mapStateToProps)(Football)


