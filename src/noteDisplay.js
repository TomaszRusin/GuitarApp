'use strict';




class NoteDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNote: 'A',
      selectedScale: 'Durowa',
      BPM: 60,
      noteOrder: 'Ascending',
      start: false,
      currentNoteSet: ["A", "B", "C#", "D", "E", "F#", "G#"],
      currentNote: 'A'
    };
  }

  onNoteChange = e => {
    const valueSelectedByUser = e.target.value;
    this.setState({selectedNote: valueSelectedByUser});
    this.setCurrentNoteSet(e.target.value, this.state.selectedScale);
  }
  onScaleChange = e => {
    const valueSelectedByUser = e.target.value;
    this.setState({selectedScale: valueSelectedByUser});
    this.setCurrentNoteSet(this.state.selectedNote, e.target.value);
  }
  onBPMChange = e => {
    if(e.target.value > 120 || e.target.value < 10){
      alert('Wpisz liczbę od 10-120');
    }else{
      const valueSelectedByUser = e.target.value;
      this.setState({BPM: valueSelectedByUser});
    }   
  }
  onNoteOrderChange = e => {
    const valueSelectedByUser = e.target.value;
    this.setState({noteOrder: valueSelectedByUser});
  }
  setCurrentNoteSet(note, scale) {
    const notes = ['A', 'A#', 'B','C', 'C#', 'D', 'D#','E', 'F', 'F#','G', 'G#', 'A', 'A#', 'B','C', 'C#', 'D', 'D#','E', 'F', 'F#','G'];
    let pos = notes.indexOf(note);
    const newNotes = notes.splice(pos, 12);
    const scaleNotes = [];
    
    switch (scale) {
      case 'Durowa':
        let scaleNumbers = [0,2,4,5,7,9,11]
        scaleNotes.splice(0,12);
        scaleNumbers.forEach(element => {
          scaleNotes.push(newNotes[element])
        });
        break;
      case 'Molowa(naturalna)':
        scaleNumbers = [0,2,3,5,7,8,10];
        scaleNotes.splice(0,12);
        scaleNumbers.forEach(element => {
          scaleNotes.push(newNotes[element])
        });
        break;
      default: 
    }
    this.setState({currentNoteSet: scaleNotes})    
  }

  getCurrentNote(){

  }//tę funkcję trzeba będzie wywoływać w interwale i jeżeli wszystko działa to react powinien odświerzać komponent co (interwał)
  // current note powinna się zawsze zmieniać gdy zmieniana jest selectedNote albo selectedScale bo inaczej jak nie ma currentNote w currentNoteSet to sie wywala

  handleButtonClick = e => {
    const noteSet = this.state.currentNoteSet;
    let newCurrentNote = ''
    switch (this.state.noteOrder) {
      case "Ascending":     
        if((noteSet.indexOf(this.state.currentNote) + 1 ) == noteSet.length){
          newCurrentNote = noteSet[0];
        } else{
          newCurrentNote = noteSet[noteSet.indexOf(this.state.currentNote) + 1]; 
        }
        break;
      case "Descending":
        if((noteSet.indexOf(this.state.currentNote)) == 0){
          newCurrentNote = noteSet[noteSet.length - 1];
        } else{
          newCurrentNote = noteSet[noteSet.indexOf(this.state.currentNote) - 1]; 
        }
        break;
      case "Random":
        newCurrentNote = noteSet[Math.floor(Math.random()*noteSet.length)];
        break;
      default:
    }
    
    console.log(newCurrentNote)
    this.setState({currentNote: newCurrentNote});
//button XD
    if(this.state.start){    
      e.target.innerHTML = 'Start'
      this.setState({start: false});
    }else{
      e.target.innerHTML = 'Stop'
      this.setState({start: true});
    }
  }
//to powinno tylko działać kiedy start: true
  // componentWillMount() {
  //   setInterval(() => this.updateNote(), 1000)
  // }

  render() {
    
      
      let noteVisibilityStyles = {
        visibility: this.state.start ? 'visible' : 'hidden'
      }
        return (
          <div>
            <label>Choose base note</label>
            <select onChange={this.onNoteChange}>
              <option value="A">A</option>
              <option value="A#">A#</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="C#">C#</option>
              <option value="D">D</option>
              <option value="D#">D#</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="F#">F#</option>
              <option value="G">G</option>
              <option value="G#">G#</option>
            </select>
            <label>Choose a scale</label>
            <select onChange={this.onScaleChange}>
              <option value="Durowa">Durowa</option>
              <option value="Molowa(naturalna)">Molowa(naturalna)</option>
            </select>
            <label>Choose BPM(10-120)</label>
            <input onBlur={this.onBPMChange} type="number" max="120" min="10" defaultValue="60"></input>
            <label>Choose note order</label>
            <select onChange={this.onNoteOrderChange}>
              <option value="Ascending">Ascending</option>
              <option value="Descending">Descending</option>
              <option value="Random">Random</option>
            </select>
            <button onClick={this.handleButtonClick}  id="startButtton">Start</button>
            <div style={noteVisibilityStyles}>{this.state.currentNote}</div>
            <ul>
              {this.state.currentNoteSet.map(note => (
              <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        );
  }
}



let domContainer = document.querySelector('#root');
ReactDOM.render(<NoteDisplay />, domContainer);