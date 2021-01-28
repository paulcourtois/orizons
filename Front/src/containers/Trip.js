import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import Trip from 'src/components/Trip';
import { getTrip } from '../actions/trip';
// import des actions
// import {
  
// } from '../actions/';

const mapStateToProps = (state, ownProps) => ({
  trip: state.trip.tripItem,
  tripIdFromUrl: ownProps.match.params.slug
});

const mapDispatchToProps = (dispatch)=>({
  loadTrip: (id)=>{
    dispatch(getTrip(id))
  }
})
// grace au hoc connect, j'enrichis mon composant avec des props liées au state
const container = connect(mapStateToProps, mapDispatchToProps)(Trip);

// grace au hoc withRouter, j'enrichis mon composant avec des props liées au router
const containerWithRouter = withRouter(container);

// HoC = couches d'oignons
// une couche withRouter... une couche connect... une couche présentation

// on exporte le tout
export default containerWithRouter;
