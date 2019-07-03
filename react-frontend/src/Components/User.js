import React, {Component} from 'react'
import { withRouter } from  'react-router-dom'
import {Icon} from 'react-icons-kit'
import {connect} from 'react-redux'
import {user} from 'react-icons-kit/icomoon/user'
import {ic_arrow_drop_down} from 'react-icons-kit/md/ic_arrow_drop_down'
import { setUSer } from 'Actions';

 class User extends Component {
  state={
    options: false
  }

  toggleUsers = () => {
    this.setState({
      options: !this.state.options
    })
  }
  
  changeUser = (user) => {
    this.props.dispatch(setUSer(user))
    this.toggleUsers()
    this.props.history.push("/")
  }

  render() {
    return (
      <React.Fragment>
        <div className="user-side" onClick={() => this.toggleUsers()}>
          <span>{this.props.user}</span>
          <div className="user">
            <Icon icon={user} size={32}/>
          </div>
          <Icon icon={ic_arrow_drop_down}/>
        </div>
        {this.state.options && 
          <div className="users">
            <div onClick={() => this.changeUser('thingone')}> thingone</div>
            <div onClick={() => this.changeUser('thingtwo')}> thingtwo</div>
            <div onClick={() => this.changeUser('thingthree')}> thingthree</div>
          </div>
        }
        
      </React.Fragment>
      
    )
  }
}
const mapStateToProps = ({user}) => {
  return{
    user: user
  }
}
export default withRouter(connect(mapStateToProps)(User))