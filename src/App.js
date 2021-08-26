import './style.css';
import React, {Component, useState, useRef, useEffect} from 'react';
// import ReactScrollableList from './components/scrollable';
import './Data';
import {listVals} from './Data';
import {listKeys} from './Data';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicTable from './components/BasicTable';
import FilteringTable from './components/FilteringTable';
import SortingTable from './components/SortingTable';
import MOCK_DATA from "./components/MOCK.DATA.json";
import AlertDialog from './components/Dialog'
import SimulateDialog from './components/SimulateDialog'
import { FormLabel } from '@material-ui/core';


class App extends Component {
  constructor(){
    super();

    this.state = {
      jerseyColor: "#000000",
      currPlayer: "",
      currPlayerPos: "",
      currPlayerPrice: 0,
      budget: 85,
      playersSelected: 0,
      simulate: false
    };
  }

  handleCallback = (childData) => {
    this.setState({jerseyColor: childData})
  }

  handleCallbackPlayersSelected = (childData) => {
    this.setState({playersSelected: childData});
  }

  handleCallbackPlayer = (playerName, playerPos, playerPrice) => {
    this.setState({currPlayer: playerName, 
    currPlayerPos: playerPos,
    currPlayerPrice: playerPrice});
  }

  handleCallbackBudget = (childData) => {
    this.setState({budget: childData});
  }

  simulateMatch = () => {
    this.setState({simulate: true})
  }

  render() {
    const tentativeBudget = this.state.budget - this.state.currPlayerPrice;

    return (
      <div className="container" id="container">
        <NavBar></NavBar>
        <span className="title">Legends XI</span>
        <TeamInfo playersSelected = {this.state.playersSelected} parentCallback = {this.handleCallbackBudget} parentBudget={this.state.budget}
        simulationCallback={this.simulateMatch}></TeamInfo>
        <Field parentPlayerName = {this.state.currPlayer} parentPlayerPos = {this.state.currPlayerPos} parentPlayerPrice={this.state.currPlayerPrice}
        budgetCallback = {this.handleCallbackBudget} tentativeBudget = {this.state.budget - this.state.currPlayerPrice} parentData = {this.state.jerseyColor}
        playersSelected={this.state.playersSelected} playersSelectedCallback={this.handleCallbackPlayersSelected}
        parentBudget={this.state.budget} parentSimulate={this.state.simulate} simulationCallback={this.simulateMatch}></Field>
        <PlayerData parentCallback={this.handleCallbackPlayer} parentData={this.state.budget}></PlayerData>
      </div>
    );
  }
}

class TeamInfo extends Component{
  constructor(props) {
    super(props);

    this.state = {
      jerseyColor: "",
    };
  }

  //TODO: when this is called, pass the jerseyColor to the parent so we can
  // apply it the circles
  handleCallback = (childData) => {
    this.setState({jerseyColor: childData})
    this.props.parentCallback(childData);
  }

  render() {
    return(
      <div className="team-info-container">
          <TeamInput parentClass="team-info"></TeamInput>
          <SimulationBTN simulationCallback={this.props.simulationCallback}></SimulationBTN>
          <PlayersSelected parentClass="team-info" playersSelected={this.props.playersSelected}></PlayersSelected>
          <Budget parentClass="team-info" parentCallback = {this.handleCallback} parentBudget={this.props.parentBudget}></Budget>
          {/* <JerseyColor parentCallback = {this.handleCallback}></JerseyColor> */}
      </div>
    )
  }
}

class TeamData extends Component{
  constructor() {
    super();

    this.state = {

    };
  }

  handleCallback = (childData) => {
    this.props.parentCallback(childData);
  }

  render() {
    return(
      <div 
        style={{ backgroundColor: 'salmon' }}
        className="team-data-container">
          <PlayersSelected playersSelected={this.props.playersSelected}></PlayersSelected>
          <Budget parentCallback = {this.handleCallback} parentBudget={this.props.parentBudget}></Budget>
      </div>
    )
  }
}

class PlayerData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budget: 100,
    };
  }

  handleCallback = (playerName, playerPos, playerPrice) => {
    this.props.parentCallback(playerName, playerPos, playerPrice);
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.parentData !== prevProps.parentData){
      this.setState({budget: this.props.parentData});
    }
  }

  render() {
    return(
      <div className="player-data-container">
        {/* <FreezePane parentCallback = {this.handleCallback}></FreezePane> */}
        <ScrollList parentCallback={this.handleCallback} parentData={this.state.budget}></ScrollList>
      </div>
    );
  }
}

class FreezePane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  handleCallback = (childData) => {
    this.props.parentCallback(childData)
  }

  render() {
    return(
      <div className="freeze-pane">
        <div className="freeze-pane-item">Name</div>
        <div className="freeze-pane-item">
          <PosFilter parentCallback = {this.handleCallback} className="freeze-pane-item"></PosFilter>
        </div>
        <div className="freeze-pane-item">Price</div>
      </div>
    );
  }
}

class ScrollList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currPlayer: "",
      currPlayerPrice: 0,
      currPlayerPos: "",
      budget: 100,
    }
  }

  handleCallback = (childDataName, childDataPrice, childDataPos) => {
    this.setState({currPlayer: childDataName,
    currPlayerPrice: childDataPrice,
    currPlayerPos: childDataPos}); 
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.parentData !== prevProps.parentData){
      this.setState({budget: this.props.parentData});
    }
  }

  addPlayer = (playerName, playerPos, playerPrice) => {
    this.props.parentCallback(playerName, playerPos, playerPrice);
  }

  render() {
    let count = 0;
    return(
      <div className="table-container">
      <AlertDialog addPlayerCallback = {this.addPlayer} playerName = {this.state.currPlayer} playerPos = {this.state.currPlayerPos}
        playerPrice = {this.state.currPlayerPrice} budget={this.state.budget} className="dialog"></AlertDialog>
      <div className="scroller">
        <SortingTable parentCallback = {this.handleCallback} id="table"></SortingTable>
      </div>
    </div>
    );
  }
}

class PosFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterByPos: "",
    };
  }

  handleClick = (e) => {
    this.setState({filterByPos: e.target.outerText});
    this.props.parentCallback(e.target.outerText);
    
  }

  render() {
    return(
        <DropdownButton id="dropdown-basic-button" title="Pos">
          <Dropdown.Item href="#/action-1" onClick={this.handleClick}>F</Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={this.handleClick}>MID</Dropdown.Item>
          <Dropdown.Item href="#/action-3">DEF</Dropdown.Item>
          <Dropdown.Item href="#/action-3">GK</Dropdown.Item>
        </DropdownButton>
    );
  }
}

class TeamInput extends Component {
  constructor(props){
    super(props);

    this.state = {
      text: "",
    };
  }

  handleChange = (e) => {
    this.setState({text:e.target.value})
  }

  render() {
    return(
      <div>
        <label className={this.props.parentClass} for="teamInput">Team name:</label>
        <input type="text" id="teamInput" onChange= {this.handleChange}></input>
      </div>
    );
  }
}

// ex value: red = '#ff0000'
class JerseyColor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jerseyColor: "",
    };
  }

  //TODO: only handleChange when the user has left...
  //not when they are dragging the color wheel around
  // a transition effect for the 'jerseys' (circle) with a delay
  // should resolve this
  handleChange = (e) => {
    this.setState({jerseyColor: e.target.value});
    this.props.parentCallback(this.state.jerseyColor);
  }

  render() {
    return(
      <div>
        <label for="jerseyColor">Jersey Color:</label>
        <input type="color" id="jerseyColor"
        onChange= {this.handleChange}></input>
      </div>
    );
  }
}

const Field = (props) => {
  const [jerseyColor, setJerseyColor] = useState(props.parentData);
  const [currPlayer, setCurrPlayer] = useState(props.parentPlayerName);
  const [currPlayerPos, setCurrPlayerPos] = useState(props.parentPlayerPos);
  const [childStates, setChildStates] = useState({child1: '', child2: '', child3: '', child4: '', child5: '', child6: '', child7: '', child8: '', 
    child9: '', child10: '', child11: ''});
  const [childPrices, setChildPrices] = useState({child1: 0, child2: 0, child3: 0, child4: 0, child5: 0, child6: 0, child7: 0, child8: 0, 
    child9: 0, child10: 0, child11: 0});
  const [playersSelected, setPlayersSelected] = useState(0);
  const [playerClicked, setPlayerClicked] = useState('');

  useEffect(() => {
    setJerseyColor(props.parentData);
  }, [props.parentData]);

  useEffect(() => {
    setCurrPlayer(props.parentPlayerName);
    setCurrPlayerPos(props.parentPlayerPos);
    addPlayer(props.parentPlayerName, props.parentPlayerPos, props.parentPlayerPrice);
  }, [props.parentPlayerName]);

  useEffect(() => {
    simulateMatch();
  }, [props.parentSimulate]);

  //TODO: see if there's a way to make this NOT call upon initial render. See line 301, using callback functions
  function addPlayer(name, pos, price) { 
    if(pos == 'GK') addKeeper(name, price);
    if(pos == 'D') addDefender(name, price);
    if(pos == 'M') addMidfielder(name, price);
    if(pos == 'F') addForward(name, price);
  }

function addKeeper(name, price){
  if(childStates.child1 === ''){
    setChildStates(() => ({child1: name, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));

    setChildPrices(() => ({child1: price, child2: childPrices.child2, child3: childPrices.child3, child4: childPrices.child4, 
      child5: childPrices.child5, child6: childPrices.child6, child7: childPrices.child7, 
      child8: childPrices.child8, child9: childPrices.child9, child10: childPrices.child10, child11: childPrices.child11}));

    props.budgetCallback(props.tentativeBudget);
    props.playersSelectedCallback(props.playersSelected + 1);
  }
  else{
    setCurrPlayer('');
    setCurrPlayerPos('');
  }
}

function addDefender(name, price){
  if(childStates.child2 == name || childStates.child3 == name || childStates.child4 == name) return;

  if(childStates.child2 === ''){
    setChildStates(() => ({child1: childStates.child1, child2: name, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));

    setChildPrices(() => ({child1: childPrices.child1, child2: price, child3: childPrices.child3, child4: childPrices.child4, 
      child5: childPrices.child5, child6: childPrices.child6, child7: childPrices.child7, 
      child8: childPrices.child8, child9: childPrices.child9, child10: childPrices.child10, child11: childPrices.child11}));

    props.budgetCallback(props.tentativeBudget);
    props.playersSelectedCallback(props.playersSelected + 1);
  }

  else if(childStates.child3 === ''){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: name, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));

    setChildPrices(() => ({child1: childPrices.child1, child2: childPrices.child2, child3: price, child4: childPrices.child4, 
      child5: childPrices.child5, child6: childPrices.child6, child7: childPrices.child7, 
      child8: childPrices.child8, child9: childPrices.child9, child10: childPrices.child10, child11: childPrices.child11}));

    props.budgetCallback(props.tentativeBudget);
    props.playersSelectedCallback(props.playersSelected + 1);
  }

  else if(childStates.child4 === ''){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: name, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));

    setChildPrices(() => ({child1: childPrices.child1, child2: childPrices.child2, child3: childPrices.child3, child4: price, 
      child5: childPrices.child5, child6: childPrices.child6, child7: childPrices.child7, 
      child8: childPrices.child8, child9: childPrices.child9, child10: childPrices.child10, child11: childPrices.child11}));

    props.budgetCallback(props.tentativeBudget);
    props.playersSelectedCallback(props.playersSelected + 1);
  }

  else{ //no open slots for defenders
    setCurrPlayer('');
    setCurrPlayerPos('');
  }
}

function addMidfielder(name, price){
  if(childStates.child5 == name || childStates.child6 == name || childStates.child7 == name || childStates.child8 == name) return;

  if(childStates.child5 === ''){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: name, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));

    setChildPrices(() => ({child1: childPrices.child1, child2: childPrices.child2, child3: childPrices.child3, child4: childPrices.child4, 
      child5: price, child6: childPrices.child6, child7: childPrices.child7, 
      child8: childPrices.child8, child9: childPrices.child9, child10: childPrices.child10, child11: childPrices.child11}));

    props.budgetCallback(props.tentativeBudget);
    props.playersSelectedCallback(props.playersSelected + 1);
  }

  else if(childStates.child6 === ''){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: name, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));

    setChildPrices(() => ({child1: childPrices.child1, child2: childPrices.child2, child3: childPrices.child3, child4: childPrices.child4, 
      child5: childPrices.child5, child6: price, child7: childPrices.child7, 
      child8: childPrices.child8, child9: childPrices.child9, child10: childPrices.child10, child11: childPrices.child11}));
    props.budgetCallback(props.tentativeBudget);
    props.playersSelectedCallback(props.playersSelected + 1);
  }

  else if(childStates.child7 === ''){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: name, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));

    setChildPrices(() => ({child1: childPrices.child1, child2: childPrices.child2, child3: childPrices.child3, child4: childPrices.child4, 
      child5: childPrices.child5, child6: childPrices.child6, child7: price, 
      child8: childPrices.child8, child9: childPrices.child9, child10: childPrices.child10, child11: childPrices.child11}));

    props.budgetCallback(props.tentativeBudget);
    props.playersSelectedCallback(props.playersSelected + 1);
  }

  else if(childStates.child8 === ''){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: name, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));

    setChildPrices(() => ({child1: childPrices.child1, child2: childPrices.child2, child3: childPrices.child3, child4: childPrices.child4, 
      child5: childPrices.child5, child6: childPrices.child6, child7: childPrices.child7, 
      child8: price, child9: childPrices.child9, child10: childPrices.child10, child11: childPrices.child11}));

    props.budgetCallback(props.tentativeBudget);
    props.playersSelectedCallback(props.playersSelected + 1);
  }

  else{ //no open slots
    setCurrPlayer('');
    setCurrPlayerPos('');
  }
}

function addForward(name, price){
  if(childStates.child9 == name || childStates.child10 == name || childStates.child11 == name) return;

  if(childStates.child9 === ''){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: name, child10: childStates.child10, child11: childStates.child11}));

    setChildPrices(() => ({child1: childPrices.child1, child2: childPrices.child2, child3: childPrices.child3, child4: childPrices.child4, 
      child5: childPrices.child5, child6: childPrices.child6, child7: childPrices.child7, 
      child8: childPrices.child8, child9: price, child10: childPrices.child10, child11: childPrices.child11}));
    props.budgetCallback(props.tentativeBudget);
    props.playersSelectedCallback(props.playersSelected + 1);
  }

  else if(childStates.child10 === ''){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: name, child11: childStates.child11}));

    setChildPrices(() => ({child1: childPrices.child1, child2: childPrices.child2, child3: childPrices.child3, child4: childPrices.child4, 
      child5: childPrices.child5, child6: childPrices.child6, child7: childPrices.child7, 
      child8: childPrices.child8, child9: childPrices.child9, child10: price, child11: childPrices.child11}));

    props.budgetCallback(props.tentativeBudget);
    props.playersSelectedCallback(props.playersSelected + 1);
  }

  else if(childStates.child11 === ''){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: name}));

    setChildPrices(() => ({child1: childPrices.child1, child2: childPrices.child2, child3: childPrices.child3, child4: childPrices.child4, 
      child5: childPrices.child5, child6: childPrices.child6, child7: childPrices.child7, 
      child8: childPrices.child8, child9: childPrices.child9, child10: childPrices.child10, child11: price}));

    props.budgetCallback(props.tentativeBudget);
    props.playersSelectedCallback(props.playersSelected + 1);
  }

  else{ //no open slots
    setCurrPlayer('');
    setCurrPlayerPos('');
  }
}

function handleCallbackPlayerClick(childData){
  setPlayerClicked(childData);
}

function removePlayer(playerClicked){
  //loop thru all childStates until we find playerClicked
  if(childStates.child1 === playerClicked){
    setChildStates(() => ({child1: '', child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));
      props.budgetCallback(props.parentBudget + childPrices.child1);
      props.playersSelectedCallback(props.playersSelected - 1);
  }
  else if(childStates.child2 === playerClicked){
    setChildStates(() => ({child1: childStates.child1, child2: '', child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));
      props.budgetCallback(props.parentBudget + childPrices.child2);
      props.playersSelectedCallback(props.playersSelected - 1);
  }
  else if(childStates.child3 === playerClicked){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: '', child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));
      props.budgetCallback(props.parentBudget + childPrices.child3);
      props.playersSelectedCallback(props.playersSelected - 1);
  }
  else if(childStates.child4 === playerClicked){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: '', 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));
      props.budgetCallback(props.parentBudget + childPrices.child4);
      props.playersSelectedCallback(props.playersSelected - 1);
  }
  else if(childStates.child5 === playerClicked){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: '', child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));
      props.budgetCallback(props.parentBudget + childPrices.child5);
      props.playersSelectedCallback(props.playersSelected - 1);
  }
  else if(childStates.child6 === playerClicked){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: '', child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));
      props.budgetCallback(props.parentBudget + childPrices.child6);
      props.playersSelectedCallback(props.playersSelected - 1);
  }
  else if(childStates.child7 === playerClicked){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: '', 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));
      props.budgetCallback(props.parentBudget + childPrices.child7);
      props.playersSelectedCallback(props.playersSelected - 1);
  }
  else if(childStates.child8 === playerClicked){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: '', child9: childStates.child9, child10: childStates.child10, child11: childStates.child11}));
      props.budgetCallback(props.parentBudget + childPrices.child8);
      props.playersSelectedCallback(props.playersSelected - 1);
  }
  else if(childStates.child9 === playerClicked){
    console.log("PELE IS HERE...");
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: '', child10: childStates.child10, child11: childStates.child11}));
      props.budgetCallback(props.parentBudget + childPrices.child9);
      props.playersSelectedCallback(props.playersSelected - 1);
  }
  else if(childStates.child10 === playerClicked){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: '', child11: childStates.child11}));
      props.budgetCallback(props.parentBudget + childPrices.child10);
      props.playersSelectedCallback(props.playersSelected - 1);
  }
  else if(childStates.child11 === playerClicked){
    setChildStates(() => ({child1: childStates.child1, child2: childStates.child2, child3: childStates.child3, child4: childStates.child4, 
      child5: childStates.child5, child6: childStates.child6, child7: childStates.child7, 
      child8: childStates.child8, child9: childStates.child9, child10: childStates.child10, child11: ''}));
      props.budgetCallback(props.parentBudget + childPrices.child11);
      props.playersSelectedCallback(props.playersSelected - 1);
  }
}

function simulateMatch(){ //how to ensure we don't run on initial render!?!?!
  alert("You stinker! You lost lol....");
  let conceded = 0;
  let scored = 0;
  let scorers = [];

  for(let i = 0; i < 90; i += 10){
    let chanceOfConcede = Math.floor(Math.random() * 10);
    if(chanceOfConcede < 3) conceded++;

    //35% chance of scoring each 10 minutes
    // split between 20 F/10 M/5 D
    // each F gets 20/3 chance, each M gets 10/4 chance, each D gets 5/3

    let def1 = Math.random();
    let def2 = Math.random();
    let def3 = Math.random();

    let mid1 = Math.random();
    let mid2 = Math.random();
    let mid3 = Math.random();
    let mid4 = Math.random();

    let for1 = Math.random();
    let for2 = Math.random();
    let for3 = Math.random();

    if(def1 < .02){
      scored++;
    }
    if(def2 < .02){
      scored++;
    }
    if(def3 < .02){
      scored++;
    }
    if(mid1 < .03){
      scored++;
    }
    if(mid2 < .03){
      scored++;
    }
    if(mid3 < .03){
      scored++;
    }
    if(mid4 < .03){
      scored++;
    }
    if(for1 < .07){
      scored++;
    }
    if(for2 < .07){
      scored++;
    }
    if(for3 < .07){
      scored++;
    }

  }
}

  return(
      <div className="field">
        {/* <RemoveBTN  clickedPlayer={playerClicked}></RemoveBTN> */}
        <div className="gk-flex flex-box">
          <Circle classNames="circle goalkeeper" 
          parentData = {jerseyColor}
          playerName = {childStates.child1}
          handleCallback = {handleCallbackPlayerClick}
          removePlayerCallback={removePlayer}
          ></Circle>
        </div>

        <div className="defense flex-box">
          <Circle classNames="circle defender"
          parentData = {jerseyColor}
          playerName = {childStates.child2}
          handleCallback = {handleCallbackPlayerClick}
          removePlayerCallback={removePlayer}
          ></Circle>
          <Circle classNames="circle defender"
          parentData = {jerseyColor}
          playerName = {childStates.child3}
          handleCallback = {handleCallbackPlayerClick}
          removePlayerCallback={removePlayer}
          ></Circle>
          <Circle classNames="circle defender"
          parentData = {jerseyColor}
          playerName = {childStates.child4}
          handleCallback = {handleCallbackPlayerClick}
          removePlayerCallback={removePlayer}
          ></Circle>
        </div>

        <div className="midfield flex-box">
          <Circle classNames="circle midfielder"
          parentData = {jerseyColor}
          playerName = {childStates.child5}
          handleCallback = {handleCallbackPlayerClick}
          removePlayerCallback={removePlayer}
          ></Circle>
          <Circle classNames="circle midfielder"
          parentData = {jerseyColor}
          playerName = {childStates.child6}
          handleCallback = {handleCallbackPlayerClick}
          removePlayerCallback={removePlayer}
          ></Circle>
          <Circle classNames="circle midfielder"
          parentData = {jerseyColor}
          playerName = {childStates.child7}
          handleCallback = {handleCallbackPlayerClick}
          removePlayerCallback={removePlayer}
          ></Circle>
          <Circle classNames="circle midfielder"
          parentData = {jerseyColor}
          playerName = {childStates.child8}
          handleCallback = {handleCallbackPlayerClick}
          removePlayerCallback={removePlayer}
          ></Circle>
        </div>

        <div className="offense flex-box">
          <Circle classNames="circle forward"
          parentData = {jerseyColor}
          playerName = {childStates.child9}
          handleCallback = {handleCallbackPlayerClick}
          removePlayerCallback={removePlayer}
          ></Circle>
          <Circle classNames="circle forward"
          parentData = {jerseyColor}
          playerName = {childStates.child10}
          handleCallback = {handleCallbackPlayerClick}
          removePlayerCallback={removePlayer}
          ></Circle>
          <Circle classNames="circle forward"
          parentData = {jerseyColor}
          playerName = {childStates.child11}
          handleCallback = {handleCallbackPlayerClick}
          removePlayerCallback={removePlayer}
          ></Circle>
        </div>

      </div>
  );
}


const Circle = (props) => {
  const [jerseyColor, setJerseyColor] = useState(props.parentData);
  const [filled, setFilled] = useState(false);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    setJerseyColor(props.parentData);
  }, [props.parentData]);

  useEffect(() => {
    setPlayerName(props.playerName);
  }, [props.playerName]);

  const thisRef = useRef();
  return(
    <div className="circle-container">
      <RemoveBTN removePlayerCallback={props.removePlayerCallback} playerName={playerName}></RemoveBTN>
      <div
      ref = {thisRef} 
      className={props.classNames}
      style={{ backgroundColor: jerseyColor }}
      onClick={() => props.handleCallback(playerName)}
      ></div>
      <span className="circleText">{playerName}</span>
    </div>
  );
}

class PlayersSelected extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="players-selected team-info">
        Players selected: {this.props.playersSelected}/11
        </div>
    );
  }
}

class Budget extends Component {
  constructor(){
    super();

  }

  //   componentDidUpdate(prevProps) {
//     if(this.props.parentData !== prevProps.parentData){
//       this.setState({jerseyColor: this.props.parentData})
//     }

  // TODO: componentDidUpdate()
  componentDidUpdate(prevProps) {
    if(this.props.parentBudget !== prevProps.parentBudget){
      this.setState({budget: this.props.parentBudget});
    }
  }

  componentDidMount() {
    document.title = "Amazing Page";
}

  render() {
    return(
      <div className="budget team-info" onChange={() => this.props.parentCallback(this.state.budget)}>
        Budget: {this.props.parentBudget}m
      </div>
    );
  }
}

const RemoveBTN = (props) => {
  
  return (
    <button onClick={() => {props.removePlayerCallback(props.playerName)}} className="remove-btn">X</button>
  );
}

const NavBar = (props) => {

  return (
    <ul className="navbar">
      <li>Home</li>
      <li>About</li>
      <li>The Data</li>
      <li>Manifest</li>
    </ul>
  );
}

const SimulationBTN = (props) => {

  return (
    // <button onClick={props.simulationCallback} className="simulation-btn">Simulate Match</button>
    <SimulateDialog simulationCallback={props.simulationCallback}></SimulateDialog>
  );
}

export default App;