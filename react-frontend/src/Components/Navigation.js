import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import 'Styles/css/navigation.css'
import User from './User';

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav">
                <Link className="logo" to="/">Leitura</Link>

                <User/>
            </div>
        )
    }
}


