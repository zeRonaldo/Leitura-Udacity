import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Styles/css/App.css';

class App extends React.Component {
  render() {
      let { location } = this.props;
      return (
          <Switch>
              <Route exact path="/" component={RootView} />
              <Route exact path="/:category" component={RootView} />
              <Route path="/:category/:postId" component={PostDetailView} />
              <Route render={() => <Error404View location={location} />} />
          </Switch>
      )
  }
}

export default App;
