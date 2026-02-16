import {combineReducers, configureStore} from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { 
    schoolYearReducer,
    batchReducer,
    centerReducer,
    schoolSubReducer,
    addressReducer,
    schoolCourseReducer,
    school_MDA_Reducer,
    teacherReducer,
    currentUserSlice
} from "../index";

const rootReducer = combineReducers({
        center:centerReducer,
        batch:batchReducer,
        schoolYear:schoolYearReducer,
        schoolSubject:schoolSubReducer,
        address:addressReducer,
        courses:schoolCourseReducer,
        schoolMDA:school_MDA_Reducer,
        teacher:teacherReducer,
        currentUser:currentUserSlice
    });

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(
    persistConfig,rootReducer
);

export const store=configureStore({
    reducer:persistedReducer ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);


/* ---------- Types ---------- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;