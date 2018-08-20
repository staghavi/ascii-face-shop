import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, fromJS } from 'immutable';

import Item from '../components/Item';
import Ad from '../components/Ad';
import SortSelect from '../components/SortSelect';
import Loader from '../components/Loader';

import {
	preloadItems,
	loadItems,
	setSort,
} from '../actions/global';

import { throttle } from '../utility/utility';
import { constants } from '../i18n/constants';
import { colors } from '../styles/colors';


class App extends Component {

	constructor(props) {
		super(props);
		this.faceGrid = React.createRef();
		this.state = {}
	}

	render () {
		const { props, state } = this;
		const items = props.items.map((item, i) => {
				if (item.get('id') === 'ad') {
					return <Ad  src={ item.get('src') }
											alt={ `ad#${i}` }
											key={ `${item.get('src')}` } />
				}
				// check if item is an end of list flag
				if (item.get('id') === 'end') {
					return <div key='end'> { constants.END } </div>;
				}
				return <Item size={ item.get('size', 12) }
										 key={ item.get('id', i) }
										 face={ item.get('face', '--') } 
										 price={ item.get('price', 0) } />
		});

		const handleOnScroll = throttle(() => {
				// get size of viewport
				const viewPortHeight = window.innerHeight;
				// get full length of grid scroll
				const gridHeight = this.faceGrid.current.scrollHeight;
				// get distance from top
				const topOffset = this.faceGrid.current.scrollTop;
				// get distance from the bottom
				const bottomOffset = gridHeight - (viewPortHeight + topOffset);
				// at 90% of the way down load items
				if ((bottomOffset / gridHeight) <= .01 || bottomOffset < 20) {
						props.loadItems();
						return;
				}
				// at 60% of the way down preload new items
				if (!props.stopFetching && (bottomOffset / gridHeight) <= .40) {
						props.preloadItems();
				}
		}, 100);

		return (
			<div style={ styles.main }>
				<div style={ styles.grid }
						 ref={ this.faceGrid }
						 onScroll={ handleOnScroll }
						 key={ `${props.sort}@grid` }>
						{ items }
				</div>
				<SortSelect key={ props.sort }
										sorts={ fromJS(Object.values(constants.SORTS)) }
										callback={ props.setSort }
										selected={ props.sort }/>
				<Loader show={ props.isFetchingProd || props.isFetchingAd }
								key="loader" />
			</div>
		);
	}
}

const styles = {
		main: {
			width: '100vw',
			height: '100vh',
			position: 'relative',
			padding: '20px',

			backgroundColor: colors.lightPink,
		},
		grid: {
				position: 'relative',
				width: '100%',
				height: '100%',
				overflow: 'auto',

				backgroundColor: 'none',

				display: 'grid',
				gridGap: '20px',
				gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
				gridTemplateRows: 'repeat(auto-fill, minmax(200px, 1fr))',
		}
}

function mapStateToProps(state) {
  	return {
  			items: state.global.get('items', List([])),
  			sort: state.global.get('sort', constants.SORTS.PRICE),
  			stopFetching: state.global.get('stopFetching', false),
  			isFetchingProd: state.global.get('isFetchingProd', false),
  			isFetchingAd: state.global.get('isFetchingAd', false),
  	};
}

function mapDispatchToProps(dispatch) {
	  return bindActionCreators({
	  		preloadItems,
	  		loadItems,
	  		setSort,
	  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);