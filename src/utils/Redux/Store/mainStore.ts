import {configureStore} from "@reduxjs/toolkit";

import { 
    schoolYearReducer,
    batchReducer,
    centerReducer,
    schoolSubReducer,
    addressReducer,
    schoolCourseReducer,
    school_MDA_Reducer,
    teacherReducer
} from "../index";


export const store=configureStore({
    reducer: {
        center:centerReducer,
        batch:batchReducer,
        schoolYear:schoolYearReducer,
        schoolSubject:schoolSubReducer,
        address:addressReducer,
        courses:schoolCourseReducer,
        schoolMDA:school_MDA_Reducer,
        teacher:teacherReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});



/* ---------- Types ---------- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;