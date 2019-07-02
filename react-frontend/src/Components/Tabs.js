import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Tabs extends Component {
    componentDidMount(){
        
    }

    render() {
        const {categories, match} = this.props
        let items = []
       
        items.push(
            <Link to="/" key="-1" className={'option ' + (Object.entries(match.params).length === 0 && match.params.constructor === Object ? 'selected' : '')}>
                <li >Todos</li>
            </Link>
        )
        items.push(Object.values(categories).map((category,index) => 
                <Link 
                        to={`/${category.path}`} 
                        key={index} 
                        className={'option ' + (Object.entries(match.params).length !== 0  && match.params.category === category.path ? 'selected': '')}
                        >
                        <li >{category.name}</li>
                </Link>
            ))
    
        return (
            <div className="tabs">
                <ul>
                    {items}
                </ul>
            </div>
        )
    }
}


function mapStateToProps ({ category }) {
    return { 
        categories: category
     };
  }

export default withRouter(connect(mapStateToProps)(Tabs))