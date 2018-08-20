import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { colors } from '../styles/colors';


/*
	This component renders an Item displaying the ASCII face (or string) and price.
*/
export default class Item extends Component {

		constructor(props) {
				super(props);
				this.state = {
				}
		}

		formatPrice(price) {
				return '$' + price.toFixed(2)
										 		  .toString()
		}

		render () {
				const {
						props,
						formatPrice
				} = this;
				const faceStyling = Object.assign(
						{},
						styles.face,
						{ fontSize: `${ props.size }px` }
				);
				return (
						<div style={ styles.main }>
								<div style={ styles.faceWrap }>
										<p style={ faceStyling } > { props.face } </p>
								</div>
								<div style={ styles.price }> { formatPrice(props.price) } </div>
						</div>
				);
		}
}

const styles = {
		main: {
			position: 'relative',
			minWidth: '320px',
			minHeight: '200px',

			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-end',
			alignItems: 'center',

			borderBottom: `3px ${colors.darkPink} solid`,
			backgroundColor: 'white',
			borderRadius: '12px 12px 0 0',
		},
		faceWrap: {
				height: 'calc(100% - 20px)',
				width: '100%',

				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
		},
		face: {
				whiteSpace: 'nowrap',
		},
		price: {
				fontWeight: 'bold',
				letterSpacing: '1px',
				color: colors.blueGrey,
				height: '20px',
		},
}

Item.propTypes = {
		face: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		size: PropTypes.string.isRequired, // font size to use for face
}