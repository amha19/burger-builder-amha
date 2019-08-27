import * as actionTypes from '../actions/actionTypes';

const initialState = {
    order: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
                return {
                    ...state,
                    loading: true
                }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                order: state.order.concat({
                    ...action.orderData,
                    id: action.orderId
                }),
                loading: false
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {}
    }
};

export default reducer;