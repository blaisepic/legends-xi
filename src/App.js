import './style.css';
import React, {Component} from 'react';
// import ReactScrollableList from './components/scrollable';
import './Data';
import {listVals} from './Data';
import {listKeys} from './Data';

//for access, make the div's #id the key in the listItems dict.
// use that key to access the item somehow..


class App extends Component {
  constructor(){
    super();

    this.state = {
      jerseyColor: "#000000",
    };
  }

  handleCallback = (childData) => {
    this.setState({jerseyColor: childData})
    console.log("in Container: ");
    console.log(childData);
  }

  render() {
    return (
      <div className="container">
        <TeamInfo parentCallback = {this.handleCallback}></TeamInfo>
        <TeamData></TeamData>
        <Field parentData = {this.state.jerseyColor}></Field>
        <PlayerData></PlayerData>

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

    console.log("in TeamInfo: ");
    console.log(childData);
  }

  render() {
    return(
      <div className="team-info-container">
          <TeamInput></TeamInput>
          <JerseyColor parentCallback = {this.handleCallback}></JerseyColor>
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

  render() {
    return(
      <div 
        style={{ backgroundColor: 'salmon' }}
        className="team-data-container">
          <PlayersSelected></PlayersSelected>
          <Budget></Budget>
      </div>
    )
  }
}

class PlayerData extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return(
      <div className="player-data-container">
        <FreezePane></FreezePane>
        <ScrollList></ScrollList>
      </div>
    );
  }
}

class FreezePane extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className="freeze-pane">
        <div className="freeze-pane-item">Name</div>
        <div className="freeze-pane-item">Pos</div>
        <div className="freeze-pane-item">Price</div>
      </div>
    );
  }
}
// TODO: 
  // 1. freeze top pane -- use grid-container implementation
  // 2. columns, actual columns (..or, whole objects with illusion of cols)
  // 3. styling
  // 4. size (can I make it 100%?)
  // 5. replace 'id' with 'key'
  // test: If I click Pele's name, can I access all of his data?
    // this would allow me to separate the player data into three columns
class ScrollList extends Component {
  constructor() {
    super();
  }
 //TODO: I need to make the second row start on the second row!
  render() {
    let count = 0;
    return(
      <div className="scroller">
        {listVals.map((player) => {
          let id = listKeys[count];
          count += 1;
          return(
            <div key={id} className="test">
              <div id={id} className="item name">{player[0]}</div>
              <div className="item pos">{player[1]}</div>
              <div className="item ovr">{player[2]}</div>
            </div>

          );
        })}
      </div>
    );
  }
}

class TeamInput extends Component {
  constructor(){
    super();

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
        <label for="teamInput">Team name:</label>
        <input type="text" id="teamInput" onChange= {this.handleChange}></input>
      </div>
    );
  }
}

// The value of an <input> element of type color is always a DOMString which
//  contains a 7-character string specifying an RGB color in hexadecimal 
//  format. While you can input the color in either upper- or lower-case, 
//  it will be stored in lower-case form. 
// ex: red = '#ff0000'
// TODO: pass color to parent
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
    console.log("in JerseyColor: ");
    console.log(this.state.jerseyColor)
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

class Field extends Component {
  constructor(props){
    super(props);

    this.state = {
      jerseyColor: this.props.parentData,
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.parentData !== prevProps.parentData){
      this.setState({jerseyColor: this.props.parentData})
    }
  }

  render() {
    return(
        <div className="field">
          <Circle classNames="circle goalkeeper" 
          parentData = {this.state.jerseyColor}
          ></Circle>

          <div className="defense flex-box">
            <Circle classNames="circle defender"
            parentData = {this.state.jerseyColor}
            ></Circle>
            <Circle classNames="circle defender"
            parentData = {this.state.jerseyColor}
            ></Circle>
            <Circle classNames="circle defender"
            parentData = {this.state.jerseyColor}
            ></Circle>
          </div>

          <div className="midfield flex-box">
            <Circle classNames="circle midfielder"
            parentData = {this.state.jerseyColor}
            ></Circle>
            <Circle classNames="circle midfielder"
            parentData = {this.state.jerseyColor}
            ></Circle>
            <Circle classNames="circle midfielder"
            parentData = {this.state.jerseyColor}
            ></Circle>
            <Circle classNames="circle midfielder"
            parentData = {this.state.jerseyColor}
            ></Circle>
          </div>

          <div className="offense flex-box">
            <Circle classNames="circle forward"
            parentData = {this.state.jerseyColor}
            ></Circle>
            <Circle classNames="circle forward"
            parentData = {this.state.jerseyColor}
            ></Circle>
            <Circle classNames="circle forward"
            parentData = {this.state.jerseyColor}
            ></Circle>
          </div>

        </div>
    );
  }
}

class Circle extends Component {
  constructor(props){
    super(props);

    this.state = {
      jerseyColor: this.props.parentData,
    };
  }

  componentDidUpdate(prevProps){
    if(this.props.parentData !== prevProps.parentData) {
      this.setState({jerseyColor: this.props.parentData})
    }
  }

  render() {
    return(
      <div 
        className={this.props.classNames}
        style={{ backgroundColor: this.state.jerseyColor }}
        ></div>
    );
  }
}

//TODO: where should the increment() go?
class PlayersSelected extends Component {
  constructor(){
    super();

    this.state = {
      playersOnTeam: 0,
    }
  }

  render() {
    return(
      <div className="players-selected">
        Players selected: {this.state.playersOnTeam}/11
        </div>
    );
  }
}

class Budget extends Component {
  constructor(){
    super();

    this.state = {
      budget: 100,
    }

  }

  render() {
    return(
      <div className="budget">
        Budget: {this.state.budget}m
      </div>
    );
  }
}

export default App;