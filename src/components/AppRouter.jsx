import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router/routes";
import {AuthContext} from "../context";
import MyLoader from "./UI/loader/MyLoader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <MyLoader/>
    }

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                    />
                ))}
                <Route path='/*' element={<Navigate to='/posts'/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                    />
                ))}
                <Route path='/*' element={<Navigate to='/login'/>}/>
            </Routes>
    );
};

export default AppRouter;
