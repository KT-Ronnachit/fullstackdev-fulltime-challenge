import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RouterChild from './RouterChild'
import App from '../App'

class Route extends Component {
    render() {
        return (
            <div>
                <Router>
                    <App>
                        <RouterChild />
                    </App>
                </Router>


            </div>
        )
    }
} export default Route