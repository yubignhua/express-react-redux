
//import React from 'react';
import {View,connect,React} from '../utils/boot';
import '../assets/style/common.css'
import Loading from 'react-loading';

class LoadingPage extends View{
    componentWillMount(){}
    loadData(){}
    render(){
        return(
            <div className="loading_page">
                <div className="wrap">
                    <Loading className="loading" delay={0} type="spinningBubbles" height='60px' width='60px' color="rgb(169, 163, 163)" />
                    <div className="loading_tip">努力加载中...</div>
                </div>
               
            </div>
        )
    }
}



export default LoadingPage

