import React from 'react';
import PropTypes from 'prop-types';


const Error = (props) => (
    <div>
        <h2>Essa Página não existe</h2>
        <h4>Infelizmente a página que você tentou acessar não existe mais</h4>
    </div>
)

Error.defaultProps = {
    location: {}
};

Error.propTypes = {
    location: PropTypes.object.isRequired
};

export default Error