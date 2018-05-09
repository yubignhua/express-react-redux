/**
 * Created by yubh on 2017/12/11.
 */
import {View,connect,React} from '../../utils/boot';
import { withLazyReducer } from 'lazy-reducer'
import { Tabs, Badge,Button } from 'antd-mobile';

var initState = {//定义初始状态
    name:'yubinghua',
        list:['足球','篮球','乒乓球']
};
//定义本组件的 reducer
const reducerMap = {
    'AntiTest': (state=initState,action) =>{
        switch (action.type){
            case "ADD":
                return [...state.list,["棒球"]];break;
            default:
                return state;
        }
    }
};

@withLazyReducer(reducerMap)
class AntiTest extends View{
    componentWillMount(){}
    render(){
        const tabs2 = [
            { title: 'First Tab', sub: '1' },
            { title: 'Second Tab', sub: '2' },
            { title: 'Third Tab', sub: '3' }
        ];
        return(
            <div className="AntiTest">
                <Button>Start</Button>
                <div>
                    <Tabs tabs={tabs2} initialPage={1} tabBarPosition="bottom" renderTab={tab => <span>{tab.title}</span>}>
                        <div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            内容页一
                        </div>
                        <div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            内容页二
                        </div>
                        <div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            内容页三
                        </div>
                    </Tabs>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return{}
};


export default connect(mapStateToProps)(AntiTest);

