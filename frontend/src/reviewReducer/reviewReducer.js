import {
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET
  } from '../reviewConstant/reviewConstant'

  export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_REVIEW_REQUEST:
        return { loading: true }
      case PRODUCT_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case PRODUCT_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case PRODUCT_CREATE_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }