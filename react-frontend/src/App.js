import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Styles/css/App.css';
import Home from './Views/Home';
import Post from './Views/Post';
import Error from './Views/Error';
import New from './Views/New';
import {connect} from 'react-redux';
import { loadCategory } from 'Actions'
import { fetchCategories } from 'Utils/api'

class App extends React.Component {
  
   componentDidMount() {
        const { loadCategories } = this.props
        fetchCategories().then(dados => {
          loadCategories(dados.categories)
        })
  }

  render() {
      let { location } = this.props;
      return (
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:category" render={({ match }) => ( <Home filter={ match }/> )}/>
              <Route path="/:category/:postId" render={({match}) => ( <Post filter={match}/> )} />
              <Route path="/new" component={New} />
              <Route render={() => <Error location={location} />} />
          </Switch>
      )
  }
}

function mapStateToProps ({ category }) {
    return { category };
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      loadCategories: (data) => dispatch(loadCategory(data)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App)