/**
 * Created by yubh on 2018/2/23.
 */
//
// var initState = {//定义初始状态
//     name:'Login',
//     token:'',
//     loginInfo:[]
// };

var initState = imt.fromJS({
    ball: ['football','basketball','tabletenis','hahah'],
    total: 0,
    page: 1
});
var n = 0;

const loginReducer = (state = initState,action)=>{
    console.log(state)
    switch (action.type){
        case 'SAVETOKEN':
            console.log('SAVETOKEN');
            return Object.assign(state,{token:action.value});break;
        case 'SHOWDATA':
            console.log('SHOWDATA');
            return state.set('total',n++);break;

        default:
            return state;
    }
};
export default loginReducer

export const increase = dispatch => () => {
    console.log('---increase-----')
    dispatch({type: 'SHOWDATA'})
}