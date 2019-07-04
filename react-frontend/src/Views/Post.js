import React, { Component } from 'react';
import Navigation from 'Components/Navigation';
import CommentList from 'Components/CommentList';
import 'Styles/css/post.css';
import FullPost from 'Components/FullPost';
import CommentForm from 'Components/CommentForm';
import FAB from 'Components/FAB';
import {connect} from 'react-redux'

class Post extends Component {
  state = {
    empty: false,
    count: 0,
  }
  setEmpty = () => {
      console.log(true)
      this.setState({
        empty: true
      })
  }

  addComment = () =>{
   this.setState({
     count: this.state.count+1
   })
  }
  render() {
    const {empty} = this.state
    let component
   
    if(empty){
      component = (<React.Fragment>
        <h1>Content not available!</h1>
        <h3>The post you are searching for is not available</h3>
      </React.Fragment>)
    }else{
      component = (
            <React.Fragment>
              <Navigation />
              <FullPost filter={this.props.filter} setEmpty={() => this.setEmpty()} count={this.state.count}/>
              <CommentForm filter={this.props.filter} addCount={() => this.addComment()}/>
              <CommentList filter={this.props.filter}/>
              <FAB />
            </React.Fragment>
          );
     }

    return component
    
  }
}

const mapStateToProps = ({post}) => {
  return {
    post: post
  }
}
export default connect(mapStateToProps)(Post)
