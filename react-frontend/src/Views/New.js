import React, { Component } from 'react';
import Navigation from 'Components/Navigation';
import 'Styles/css/new.css'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { hashCode, capitalize } from 'Utils/helpers';
import { addPost, editPost } from 'Utils/api';
import { loadPost, loadPosts } from 'Actions'

 class New extends Component {
  state = {
    title: '',
    category: '0',
    text: '',
    warning: '',
  }
  submitPost = (e) => {
    e.preventDefault()
    const {title, category, text} = this.state
    const {match} = this.props
    
    if(Object.entries(match.params).length === 0){
      
      if(title === '' || category === '0' || text === ''){
        
        this.setState({
          warning: "All the fields must be filled"
        })
      }else{
        
        let id = hashCode()
        addPost(id, Date.now(), title, text, this.props.user, category)
        loadPosts()
        this.props.history.push("/")
      }
    }else{
      
      if(title === '' || category === '0' || text === ''){
        
        this.setState({
          warning: "All the fields must be filled"
        })
      }else{
    
        editPost(match.params.postId, Date.now(), title, text, this.props.user, category) 
        loadPosts()
        this.props.history.push("/")
      }
    }
   
  }

  componentDidMount = () => {
    const {match} = this.props;
    if(Object.entries(match.params).length !== 0){
      loadPost(match.params.postId)
        this.setState({
          title: this.props.post.title,
          category: this.props.post.category,
          text: this.props.post.body
        })
      
      
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
}

  render() {
    const {categories, post} = this.props
    const {title, category, text, warning} = this.state
    return (
      <React.Fragment>
        <Navigation />
        <div className="container">
          {warning !== '' && <div className="warn">{warning}</div>}
          <form onSubmit={(e) => this.submitPost(e)}>
            <input type="text" placeholder="Título do Post" name="title" className="title" value={title} onChange={(e) => this.handleInputChange(e)}/>
            <select name="category" className="category"  value={category} onChange={(e) => this.handleInputChange(e)}>
              <option value="0">Escolha uma Categoria</option>
              {categories.map(category => <option value={category.name}>{capitalize(category.name)}</option>)}
              
            </select>
            <textarea placeholder="Escreva sobre algo..." rows="5" className="text" name="text" value={text}  onChange={(e) => this.handleInputChange(e)}/>
            <input type="submit" className="send"/>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({user,post, category}) => {
  return {
    user: user,
    post: post,
    categories: category
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPost: (data) => dispatch(loadPost(data)),
    loadPosts: (data) => dispatch(loadPosts(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(New))