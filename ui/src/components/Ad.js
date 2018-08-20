import React, { Component } from 'react';
import PropTypes from 'prop-types';


/*
  This component renders an Ad item given a source image.
*/
export default class Ad extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render () {
        const { props } = this;
        return (
            <div style={ styles.main }>
                <img src={ props.src } alt={ props.alt } />
            </div>
        );
    }
}

const styles = {
    main: {
      minWidth: '320px',
      minHeight: '200px',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      overflow: 'hidden',
    },
}

Ad.propTypes = {
    src: PropTypes.string.isRequired, // link to an image
    alt: PropTypes.string.isRequired, // alternative text if link fails.
}