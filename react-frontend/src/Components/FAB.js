import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Icon} from 'react-icons-kit'
import {ic_note_add} from 'react-icons-kit/md/ic_note_add'

export default class FAB extends Component {
    render() {
        return (
            <Link className="fab" to="/new">
                <Icon icon={ic_note_add} size={36}/>
            </Link>
        )
    }
}
