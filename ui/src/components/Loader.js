import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { constants } from '../i18n/constants';

/*
  This component renders a rainbow loading message at the top of the screen.
*/
export default class Loader extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render () {
        const { props } = this;
        const STRINGS = constants.COMPONENTS.LOADER;

        const styling = props.show
          ? Object.assign({}, styles.main, styles.show)
          : styles.main;
        return (
            <div style={ styling }>
                { STRINGS.LOADING }
            </div>
        );
    }
}

const styles = {
    main: {
      height: '75px',
      width: '150px',
      fontWeight: 'bold',
      letterSpacing: '2px',

      position: 'fixed',
      zIndex: 10,
      top: '-75px',
      left: 'calc(50% - 75px)',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: 'white',
      borderRadius: '0px 0px 6px 6px',
      transform: 'translateY(0px)',
      transition: 'transform 200ms ease',

      animation: '1000ms ease rainbowBg',
      animationIterationCount: 'infinite',
    },
    show: {
        transform: 'translateY(75px)'
    }
}

Loader.propTypes = {
    show: PropTypes.bool.isRequired, // if loader should be visible
}