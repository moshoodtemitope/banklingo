import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "../redux/reducers";



const loggerMiddleware = createLogger();



// const saveState = (state) => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('state', serializedState);
//     } catch (e) {
//     }
// };



export const store = createStore(
    // peristedState,
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

// store.subscribe(throttle(() => {
//     saveState(store.getState());
// }, 1000));

