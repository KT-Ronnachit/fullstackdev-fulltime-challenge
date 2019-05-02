import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
import LockerNumber from '../Component/LockerNumber'
import Login from '../Component/Login'

class RouterChild extends Component {
    render() {
        return (
            <div>

                <Route exact path="/" component={Login} />
                <Route path="/lockernumber" component={LockerNumber} />


            </div>
        )
    }
} export default RouterChild