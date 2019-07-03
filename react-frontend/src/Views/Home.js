import React, { Component } from 'react';
import Navigation from 'Components/Navigation';
import Tabs from 'Components/Tabs';
import PostList from 'Components/PostList';
import 'Styles/css/home.css'
import FAB from 'Components/FAB';

class Home extends Component {
  componentDidMount(){
    
  }
  
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Tabs/>
        <PostList filter={this.props.filter}/>
        <FAB />
      </React.Fragment>
    );
  }
}



export default (Home)