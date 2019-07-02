import React, { Component } from 'react';
import Navigation from 'Components/Navigation';
import CommentList from 'Components/CommentList';
import 'Styles/css/post.css';
import FullPost from 'Components/FullPost';
import CommentForm from 'Components/CommentForm';

export default class Post extends Component {
  
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <FullPost filter={this.props.filter}/>
        <CommentForm filter={this.props.filter}/>
        <CommentList filter={this.props.filter}/>
      </React.Fragment>
    );
  }
}
