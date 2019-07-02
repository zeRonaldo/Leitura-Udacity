import React, { Component } from 'react';
import Navigation from 'Components/Navigation';
import 'Styles/css/new.css'

export default class New extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <div className="container">
          <form>
            <input type="text" placeholder="Título do Post" name="title" className="title"/>
            <select name="category" className="category">
              <option>Escolha uma Categoria</option>
              <option>Categoria 1</option>
              <option>Categoria 2</option>
              <option>Categoria 3</option>
              <option>Categoria 4</option>
            </select>
            <textarea placeholder="Escreva sobre algo..." rows="5" className="text"/>
            <input type="submit" className="send"/>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
