'use strict';




class NoteDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedNote: 'A', selectedScale: 'Durowa'};
  }

  onNoteChange = e => {
    const valueSelectedByUser = e.target.value;
    this.setState({selectedNote: valueSelectedByUser});
  }
  onScaleChange = e => {
    const valueSelectedByUser = e.target.value;
    this.setState({selectedScale: valueSelectedByUser});
  }

  render() {
    
      const notes = ['A', 'A#', 'B','C', 'C#', 'D', 'D#','E', 'F', 'F#','G', 'G#', 'A', 'A#', 'B','C', 'C#', 'D', 'D#','E', 'F', 'F#','G'];
      let pos = notes.indexOf(this.state.selectedNote);
      const newNotes = notes.splice(pos, 12);
      const scaleNotes = [];
      
      switch (this.state.selectedScale) {
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
            <ul>
              {scaleNotes.map(note => (
              <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        );
  }
}



let domContainer = document.querySelector('#root');
ReactDOM.render(<NoteDisplay />, domContainer);