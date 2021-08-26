//       <div className="scroller">
//         {listVals.map((player) => {
//           let id = listKeys[count];
//           count += 1;
//           return(
//             // <div key={id} className="player-container" data-key={player[1]}>
//             //   <div id={id} className="item name">{player[0]}</div>
//             //   <div className="item pos">{player[1]}</div>
//             //   <div className="item ovr">{player[2]}</div>
//             // </div>
//             // <BasicTable></BasicTable>

//           );
//         })}
//       </div>

//       class Circle extends Component {
//   constructor(props){
//     super(props);

//     this.state = {
//       jerseyColor: this.props.parentData,
//       filled: false,
//       playerName: ""
//     };
//   }

//   addPlayer = (name, pos) => {
//     if(!this.state.filled){
//       this.setState({filled: true,
//       playerName: name});
//     }
//   }

//   //also check for playerName and playerPos change (just check for filled)
//   componentDidUpdate(prevProps){
//     if(this.props.parentData !== prevProps.parentData) {
//       this.setState({jerseyColor: this.props.parentData});
//     }

//     if(this.props.parentDataFilled != prevProps.parentDataFilled){
//       this.setState({filled: false});
//       //set the state of the playername and playerPos as well
//     }
//   }

//   render() {
//     const thisRef = useRef();

//     return(
//       <div>
//         <div
//         ref = {thisRef} 
//         className={this.props.classNames}
//         style={{ backgroundColor: this.state.jerseyColor }}
//         onClick={() => console.log("hello this is the circle I'm clicking..")}
//         ></div>
//         <span className="circleText">{this.state.playerName}</span>
//       </div>
//     );
//   }
// }


// class Field extends Component {
//   constructor(props){
//     super(props);

//     this.state = {
//       jerseyColor: this.props.parentData,
//       currPlayer: this.props.parentPlayerName,
//       currPlayerPos: this.props.parentPlayerPos
//     };
//   }

//   componentDidUpdate(prevProps) {
//     if(this.props.parentData !== prevProps.parentData){
//       this.setState({jerseyColor: this.props.parentData})
//     }

//     if(this.props.parentPlayerName !== prevProps.parentPlayerName){
//       this.setState({currPlayer: this.props.parentPlayerName,
//       currPlayerPos: this.props.parentPlayerPos});
//       addPlayer(this.props.parentPlayerName, this.props.parentPlayerPos);
//     }
//   }

//   //check for: player already in the lineup, available positions
//   //once checks are completed, how to communicate with the right circles? how to loop thru the circles?
//   addPlayer(name, pos) {
//     let newPos = "";
//     if(pos == 'GK') newPos = "goalkeeper";
//     if(pos == 'D') newPos = 'defender';
//     if(pos == 'M') newPos = 'midfielder';
//     if(pos == 'F') newPos = 'forward';


//   }

//   // 1. check if player already, if so, don't do anything
//   // 2. if not current player (else), and if positions are available, then add him to the 1st available circle 
//   // 3. must return adjusted budget if player is successfully added
//   // MUST DO: figure out where to place add function. I need to access the filled property to determine if a circle can be occupied or if I must check the next
//   // MUST DO: use position to check whether we should be calling into gk, def, mid, or forward
//   render() {
//     const gkRef = useRef();
//     const dRef = useRef();
//     const mRef = useRef();
//     const fRef = useRef();

//     return(
//         <div className="field">
          
//           <div className="gk-flex flex-box">
//             <Circle ref={gkRef} onClick={console.log("hello bitch")} classNames="circle goalkeeper" 
//             parentData = {this.state.jerseyColor}
//             ></Circle>
//           </div>

//           <div className="defense flex-box">
//             <Circle classNames="circle defender"
//             parentData = {this.state.jerseyColor}
//             ></Circle>
//             <Circle classNames="circle defender"
//             parentData = {this.state.jerseyColor}
//             ></Circle>
//             <Circle classNames="circle defender"
//             parentData = {this.state.jerseyColor}
//             ></Circle>
//           </div>

//           <div className="midfield flex-box">
//             <Circle classNames="circle midfielder"
//             parentData = {this.state.jerseyColor}
//             ></Circle>
//             <Circle classNames="circle midfielder"
//             parentData = {this.state.jerseyColor}
//             ></Circle>
//             <Circle classNames="circle midfielder"
//             parentData = {this.state.jerseyColor}
//             ></Circle>
//             <Circle classNames="circle midfielder"
//             parentData = {this.state.jerseyColor}
//             ></Circle>
//           </div>

//           <div className="offense flex-box">
//             <Circle classNames="circle forward"
//             parentData = {this.state.jerseyColor}
//             ></Circle>
//             <Circle classNames="circle forward"
//             parentData = {this.state.jerseyColor}
//             ></Circle>
//             <Circle classNames="circle forward"
//             parentData = {this.state.jerseyColor}
//             ></Circle>
//           </div>

//         </div>
//     );
//   }
// }


    //CURRENT TASK: see code here
    // let elements = document.querySelectorAll(`.${newPos}`);
    // elements = Array.from(elements);
    // console.log(elements);
    // elements.every(e => {
    //   console.log(e);
    //   if(e.classList.value.includes("filled")){
    //     //do nothing, the current pos is already occupied
    //     return true;
    //   }
    //   else {
    //     e.classList.add("filled");
    //     // add to current circle the playerName
    //     return false;
    //   }
    // });