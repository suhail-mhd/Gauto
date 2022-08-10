import {createStore , combineReducers} from 'redux'


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
    lng:Longitude
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


const store = createStore(appreducer)


export default store