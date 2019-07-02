import React, { Component } from 'react';
import Navigation from 'Components/Navigation';
import Tabs from 'Components/Tabs';
import PostList from 'Components/PostList';
import 'Styles/css/home.css'

class Home extends Component {
  componentDidMount(){
    
  }
  
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Tabs/>
        <PostList filter={this.props.filter}/>
      </React.Fragment>
    );
  }
}



export default (Home)