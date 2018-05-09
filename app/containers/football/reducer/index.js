/**
 * Created by yubh on 2017/11/16.
 */
//import immutable from 'immutable';

var initState = imt.fromJS({
    ball: ['football','basketball','tabletenis','hahah'],
    total: 0,
    page: 1
});

var cat = imt.fromJS({
    ball: ['football','basketball','hello_kitty'],
});
const reducer = (state = initState, action) => {
    //console.log(action.index);
    switch (action.type) {
        case "change":
            return state.update(['ball',action.index],function (item) {
                return action.value;
            });
        case 'SETDATA_START':
            return state.set('total',1);
        case 'SETDATA_END':
            return state.set('total',0);
        default:
            return state;
    }
};

export default reducer;

