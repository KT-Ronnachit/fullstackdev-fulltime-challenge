import React, { Component } from 'react'
import './pricelocker.css'
class PriceSizeLocker extends Component {
    render() {


        return (
            <div >
                <div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th >Size</th>
                                <th > first 60 minutes </th>
                                <th >next minutes</th>
                            </tr>
                        </thead>
                        <tr>
                            <td>S</td>
                            <td>50 THB</td>
                            <td>25 THB</td>
                        </tr>
                        <tr>
                            <td>M</td>
                            <td>100 THB</td>
                            <td>50 THB</td>
                        </tr>
                        <tr>
                            <td>m</td>
                            <td>200 THB</td>
                            <td>100 THB</td>
                        </tr>
                    </table>
                </div>

            </div>
        )
    }
} export default PriceSizeLocker