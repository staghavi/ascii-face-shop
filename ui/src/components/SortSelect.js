import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { colors } from '../styles/colors';
import { constants } from '../i18n/constants';


/*
  This component renders a panel on the left side of the screen
  providing sort options.
*/
export default class SortSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render () {
        const { props } = this;
        const STRINGS = constants.COMPONENTS.SORT_SELECT;
        const sortPanel = props.sorts.map(el => {
            const styling = props.selected.includes(el)
              ? Object.assign({}, styles.sortType, styles.selected)
              : styles.sortType;
            return (
              <div style={ styling }
                   key={el}
                   onClick={() => props.callback(el) }>
                { el }
              </div>
            );
        });
        return (
            <div style={ styles.main }>
                <div style={ styles.heading }> { STRINGS.HEADING } </div>
                { sortPanel }
            </div>
        );
    }
}

const styles = {
    main: {
      height: '100px',
      width: '100px',

      position: 'fixed',
      zIndex: 10,
      left: 0,
      top: 'calc(50% - 50px)',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',

      borderRadius: '0px 6px 6px 0px',
      boxShadow: '0px 0px 10px 2px rgba(0,0,0,.2)',
    },
    heading: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: '2px',
        width: '100%',
        borderBottom: `3px ${colors.darkPink} solid`,
        marginBottom: '3px',
        paddingLeft: '5px',
    },
    sortType: {
        fontSize: '.9em',
        transition: 'all 300ms ease',
        cursor: 'pointer',
        width: '100%',
        textTransform: 'capitalize',
        borderLeft: `0px ${colors.darkPink} solid`,
        letterSpacing: '1px',
        paddingLeft: '5px',
    },
    selected: {
        borderLeft: `5px ${colors.darkPink} solid`,
    }
}

SortSelect.propTypes = {
    sorts: PropTypes.instanceOf(List).isRequired,  // array of strings w/ sort names
    selected: PropTypes.string.isRequired,  // currently selected sort 
    callback: PropTypes.func.isRequired,  // callback for when a sort type is clicked (returning sort clicked)
}