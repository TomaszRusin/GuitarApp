'use strict';



class NoteDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render() {
    if (this.state.clicked) {     
      const notes = ['A', 'A#', 'B','C', 'C#', 'D', 'D#','E', 'F', 'F#','G', 'G#', 'A', 'A#', 'B','C', 'C#', 'D', 'D#','E', 'F', 'F#','G'];
      // tu musi wchodzić input z #base-note-choice
      let pos = notes.indexOf('C');
      const newNotes = notes.splice(pos, 12);
      // tu musi wchodzić input z #scale-choice
      const scaleType = 'minor';
      const scaleNotes = [];
      
      switch (scaleType) {
        case 'major':
          let scaleNumbers = [0,2,4,5,7,9,11]
          scaleNotes.splice(0,12);
          scaleNumbers.forEach(element => {
            scaleNotes.push(newNotes[element])
          });
          break;
        case 'minor':
          scaleNumbers = [0,2,3,5,7,8,10];
          scaleNotes.splice(0,12);
          scaleNumbers.forEach(element => {
            scaleNotes.push(newNotes[element])
          });
          break;
        default: 
      }
        return (
          <ul>
            {scaleNotes.map(note => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        );
    }

    return (
      <button onClick={() => this.setState({ clicked: true }) }>
        Kliknij żeby sprawdzić czy działa
      </button>
    );
  }
}

let domContainer = document.querySelector('#note-display');
ReactDOM.render(<NoteDisplay />, domContainer);