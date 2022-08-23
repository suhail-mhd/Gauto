import {createStore , combineReducers, applyMiddleware } from 'redux'
import { productReviewCreateReducer } from '../reviewReducer/reviewReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


const appreducer = combineReducers({
    date:datePick,
    endDate:endDatePicker,
    car:CarData,
    Total:TotalAmount,
    DisSort:DistrictSort,
    Discount:DiscountAmount,
    DisAll:DiscountAllData,
    msg:CouponMsg,
    lat:Lattitude,
    lng:Longitude,
    productReviewCreate: productReviewCreateReducer,
    productDetails: productDetailsReducer,
    userLogin: userLoginReducer
})



function datePick(prevState = ''  , action){
    switch(action.type){
        case 'date':
            return action.payload
    default: return prevState
    }
}

function endDatePicker(prevState = ''  , action){
    switch(action.type){
        case 'endDate':
            return action.payload
    default: return prevState
    }
}

function CarData(prevState = {} , action){
    switch(action.type){
        case 'CarDetails':
            return action.payload
    default: return prevState
    }
}

function TotalAmount(prevState = '' , action){
    switch(action.type){
        case 'Total':
            return action.payload
    default: return prevState
    }
}


function DistrictSort(prevState = [] , action){
    switch(action.type){
        case 'districtsort':
                return action.payload
        default: return prevState
    }
}


function DiscountAmount(prevState = '' , action){
    switch(action.type){
        case 'discount':
                return action.payload
        default: return prevState
    }
}

function DiscountAllData(prevState = {} , action){
    switch(action.type){
        case 'DisAllData':
                return action.payload
        default: return  prevState
    }
}

function CouponMsg(prevState = '' , action){
    switch(action.type){
        case 'CouponMsg':
                return action.payload
        default: return prevState
    }
}

function Lattitude(prevState = '' , action){
    switch(action.type){
        case'lattitude':
            return action.payload
        default: return prevState
    }
}

function Longitude(prevState = '', action ){
    switch(action.type){
        case'longitude':
        return action.payload
    default:return prevState
    }
}

function productDetailsReducer  (
    state = { product: { reviews: [] } },
    action
  )  {
    switch (action.type) {
      case 'PRODUCT_DETAILS_REQUEST':
        return { loading: true, ...state }
      case 'PRODUCT_DETAILS_SUCCESS':
        return { loading: false, product: action.payload }
      case 'PRODUCT_DETAILS_FAIL':
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  function userLoginReducer  (state = {}, action)  {
    switch (action.type) {
      case 'USER_LOGIN_REQUEST':
        return { loading: true }
      case 'USER_LOGIN_SUCCESS':
        return { loading: false, userInfo: action.payload }
      case 'USER_LOGIN_FAIL':
        return { loading: false, error: action.payload }
      case 'USER_LOGOUT':
        return {}
      default:
        return state
    }
  }

  const userInfoFromStorage = localStorage.getItem('userInfo')
  const userId = JSON.parse(userInfoFromStorage)
  

const initialState = {
 userLogin: { userInfo: userId },
}

const middleware = [thunk]


const store = createStore(appreducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store