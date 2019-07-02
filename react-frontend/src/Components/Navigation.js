import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import 'Styles/css/navigation.css'

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav">
                <Link className="logo" to="/">Leitura</Link>
                <div className="search-bar">
                    <form>
                        <input type="text" placeholder="search..."/>
                    </form>
                </div>
            </div>
        )
    }
}


