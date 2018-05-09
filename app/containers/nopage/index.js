/**
 * Created by yubh on 2017/12/11.
 */
//import React from 'react';
//import {Link } from 'react-router';
import {View,connect,React} from '../../utils/boot';
import Scroll from '../../components/Scroll'
import './nopage.scss';
import Loading from 'react-loading';
import {Link } from 'react-router';
import no_resource from '../../assets/img/no_res.png';


class NoPage extends View{
    componentWillMount(){}
    loadData(){}
    render(){
        return(
            <div className="nopage">
                <Scroll pullDown={this.loadData.bind(this,true)} up={this.loadData.bind(this,true)}>
                    <h1>
                        
                    </h1>
                    <Loading type="blank" height='100px' width='100px' color="red" />
                    <Loading type="balls" height='100px' width='100px' color="red" />
                                 <Loading type="bars" height='100px' width='100px' color="red" />
                    <Loading type="bubbles" height='100px' width='100px' color="red" />
                    <Loading type="cubes" height='100px' width='100px' color="red" />
                    <Loading type="cylon" height='100px' width='100px' color="red" />
                    <Loading type="spin" height='100px' width='100px' color="red" />
                    <Loading type="spinningBubbles" height='100px' width='100px' color="red" />
                    <Loading type="spokes" height='100px' width='100px' color="red" />
                </Scroll>
            </div>
        )
    }
}

console.log(new NoPage());
const mapStateToProps = (state, ownProps) => {
    return{}
};


export default connect(mapStateToProps)(NoPage)

