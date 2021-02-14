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
    this.setState({selectedNote: valueSelectedByUser, currentNote: valueSelectedByUser});
    this.setCurrentNoteSet(e.target.value, this.state.selectedScale);
  }

  onScaleChange = e => {
    const valueSelectedByUser = e.target.value;
    this.setState({selectedScale: valueSelectedByUser, currentNote: this.state.selectedNote});
    this.setCurrentNoteSet(this.state.selectedNote, e.target.value);
  }

  onBPMChange = e => {
      const valueSelectedByUser = e.target.value;
      this.setState({BPM: valueSelectedByUser});
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
      case 'Pentatonika durowa':
        scaleNumbers = [0,2,4,7,9];
        scaleNotes.splice(0,12);
        scaleNumbers.forEach(element => {
          scaleNotes.push(newNotes[element])
        });
        break;
      case 'Pentatonika molowa':
        scaleNumbers = [0,3,5,7,10];
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
    this.setState({currentNote: newCurrentNote});
  }

  startNoteChange = () => {
    const boundFunc = this.getCurrentNote.bind(this);
    const tempo = 60000/this.state.BPM;
    this.intervalID = setInterval(boundFunc, tempo)//na github pages scope jakoś nie jest przekazywany do funkcji
  }

  stopNoteChange = () => {
    clearInterval(this.intervalID)
  }

  handleButtonClick = e => {
    
    if(this.state.start){    
      e.target.innerHTML = 'Start'
      this.setState({start: false});
      this.stopNoteChange();
    }else{
      e.target.innerHTML = 'Stop'
      this.setState({start: true});
      this.startNoteChange();
    }
  }

  render() {
    
      
      let noteDisplayStyles = {
        visibility: this.state.start ? 'visible' : 'hidden'
      }
        return (
          <div className='noteApp'>
            <div className="settings">
              <div className="select-field">
                <label>Dźwięk podstawowy: </label>
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
              </div>
              <div className="select-field">
              <label>Skala: </label>
                <select onChange={this.onScaleChange}>
                  <option value="Durowa">Durowa</option>
                  <option value="Molowa(naturalna)">Molowa(naturalna)</option>
                  <option value="Pentatonika durowa">Pentatonika durowa</option>
                  <option value="Pentatonika molowa">Pentatonika molowa</option>
                </select>
              </div>
              <div className="select-field">
                <label>BPM: </label>
                <input onBlur={this.onBPMChange} type="number" defaultValue="60"></input>
              </div>
              <div className="select-field">
                <label>Kolejność dźwięków: </label>
                <select onChange={this.onNoteOrderChange}>
                  <option value="Ascending">Rosnąca</option>
                  <option value="Descending">Malejąca</option>
                  <option value="Random">Losowa</option>
                </select>
              </div>
              <button onClick={this.handleButtonClick}  id="startButtton">Start</button>
            </div>
            <div className="note" style={noteDisplayStyles}>{this.state.currentNote}</div>
          </div>
        );
  }
}



let domContainer = document.querySelector('#root');
ReactDOM.render(<NoteDisplay />, domContainer);