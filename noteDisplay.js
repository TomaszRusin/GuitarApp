'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoteDisplay = function (_React$Component) {
  _inherits(NoteDisplay, _React$Component);

  function NoteDisplay(props) {
    _classCallCheck(this, NoteDisplay);

    var _this = _possibleConstructorReturn(this, (NoteDisplay.__proto__ || Object.getPrototypeOf(NoteDisplay)).call(this, props));

    _this.onNoteChange = function (e) {
      var valueSelectedByUser = e.target.value;
      _this.setState({ selectedNote: valueSelectedByUser });
      _this.setCurrentNoteSet(e.target.value, _this.state.selectedScale);
    };

    _this.onScaleChange = function (e) {
      var valueSelectedByUser = e.target.value;
      _this.setState({ selectedScale: valueSelectedByUser });
      _this.setCurrentNoteSet(_this.state.selectedNote, e.target.value);
    };

    _this.onBPMChange = function (e) {
      if (e.target.value > 120 || e.target.value < 10) {
        alert('Wpisz liczbę od 10-120');
      } else {
        var valueSelectedByUser = e.target.value;
        _this.setState({ BPM: valueSelectedByUser });
      }
    };

    _this.onNoteOrderChange = function (e) {
      var valueSelectedByUser = e.target.value;
      _this.setState({ noteOrder: valueSelectedByUser });
    };

    _this.startNoteChange = function () {
      console.log(_this);
      _this.intervalID = setInterval(function () {
        this.$r.getCurrentNote(this.$r);
      }, 1000);
    };

    _this.stopNoteChange = function () {
      clearInterval(_this.intervalID);
    };

    _this.handleButtonClick = function (e) {

      if (_this.state.start) {
        e.target.innerHTML = 'Start';
        _this.setState({ start: false });
        _this.stopNoteChange();
      } else {
        e.target.innerHTML = 'Stop';
        _this.setState({ start: true });
        _this.startNoteChange();
      }
    };

    _this.state = {
      selectedNote: 'A',
      selectedScale: 'Durowa',
      BPM: 60,
      noteOrder: 'Ascending',
      start: false,
      currentNoteSet: ["A", "B", "C#", "D", "E", "F#", "G#"],
      currentNote: 'A'
    };
    return _this;
  }

  _createClass(NoteDisplay, [{
    key: 'setCurrentNoteSet',
    value: function setCurrentNoteSet(note, scale) {
      var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'];
      var pos = notes.indexOf(note);
      var newNotes = notes.splice(pos, 12);
      var scaleNotes = [];

      switch (scale) {
        case 'Durowa':
          var scaleNumbers = [0, 2, 4, 5, 7, 9, 11];
          scaleNotes.splice(0, 12);
          scaleNumbers.forEach(function (element) {
            scaleNotes.push(newNotes[element]);
          });
          break;
        case 'Molowa(naturalna)':
          scaleNumbers = [0, 2, 3, 5, 7, 8, 10];
          scaleNotes.splice(0, 12);
          scaleNumbers.forEach(function (element) {
            scaleNotes.push(newNotes[element]);
          });
          break;
        default:
      }
      this.setState({ currentNoteSet: scaleNotes });
    }
  }, {
    key: 'getCurrentNote',
    value: function getCurrentNote(scope) {
      console.log(scope);
      var noteSet = scope.state.currentNoteSet;
      var newCurrentNote = '';
      switch (scope.state.noteOrder) {
        case "Ascending":
          if (noteSet.indexOf(scope.state.currentNote) + 1 == noteSet.length) {
            newCurrentNote = noteSet[0];
          } else {
            newCurrentNote = noteSet[noteSet.indexOf(scope.state.currentNote) + 1];
          }
          break;
        case "Descending":
          if (noteSet.indexOf(scope.state.currentNote) == 0) {
            newCurrentNote = noteSet[noteSet.length - 1];
          } else {
            newCurrentNote = noteSet[noteSet.indexOf(scope.state.currentNote) - 1];
          }
          break;
        case "Random":
          newCurrentNote = noteSet[Math.floor(Math.random() * noteSet.length)];
          break;
        default:
      }
      this.setState({ currentNote: newCurrentNote });
    } //tę funkcję trzeba będzie wywoływać w interwale i jeżeli wszystko działa to react powinien odświerzać komponent co (interwał)
    // current note powinna się zawsze zmieniać gdy zmieniana jest selectedNote albo selectedScale bo inaczej jak nie ma currentNote w currentNoteSet to sie wywala

    // długość interwału powinna być zależna od bpm

  }, {
    key: 'render',
    value: function render() {

      var noteVisibilityStyles = {
        visibility: this.state.start ? 'visible' : 'hidden'
      };
      return React.createElement(
        'div',
        null,
        React.createElement(
          'label',
          null,
          'Choose base note'
        ),
        React.createElement(
          'select',
          { onChange: this.onNoteChange },
          React.createElement(
            'option',
            { value: 'A' },
            'A'
          ),
          React.createElement(
            'option',
            { value: 'A#' },
            'A#'
          ),
          React.createElement(
            'option',
            { value: 'B' },
            'B'
          ),
          React.createElement(
            'option',
            { value: 'C' },
            'C'
          ),
          React.createElement(
            'option',
            { value: 'C#' },
            'C#'
          ),
          React.createElement(
            'option',
            { value: 'D' },
            'D'
          ),
          React.createElement(
            'option',
            { value: 'D#' },
            'D#'
          ),
          React.createElement(
            'option',
            { value: 'E' },
            'E'
          ),
          React.createElement(
            'option',
            { value: 'F' },
            'F'
          ),
          React.createElement(
            'option',
            { value: 'F#' },
            'F#'
          ),
          React.createElement(
            'option',
            { value: 'G' },
            'G'
          ),
          React.createElement(
            'option',
            { value: 'G#' },
            'G#'
          )
        ),
        React.createElement(
          'label',
          null,
          'Choose a scale'
        ),
        React.createElement(
          'select',
          { onChange: this.onScaleChange },
          React.createElement(
            'option',
            { value: 'Durowa' },
            'Durowa'
          ),
          React.createElement(
            'option',
            { value: 'Molowa(naturalna)' },
            'Molowa(naturalna)'
          )
        ),
        React.createElement(
          'label',
          null,
          'Choose BPM(10-120)'
        ),
        React.createElement('input', { onBlur: this.onBPMChange, type: 'number', max: '120', min: '10', defaultValue: '60' }),
        React.createElement(
          'label',
          null,
          'Choose note order'
        ),
        React.createElement(
          'select',
          { onChange: this.onNoteOrderChange },
          React.createElement(
            'option',
            { value: 'Ascending' },
            'Ascending'
          ),
          React.createElement(
            'option',
            { value: 'Descending' },
            'Descending'
          ),
          React.createElement(
            'option',
            { value: 'Random' },
            'Random'
          )
        ),
        React.createElement(
          'button',
          { onClick: this.handleButtonClick, id: 'startButtton' },
          'Start'
        ),
        React.createElement(
          'div',
          { style: noteVisibilityStyles },
          this.state.currentNote
        ),
        React.createElement(
          'ul',
          null,
          this.state.currentNoteSet.map(function (note) {
            return React.createElement(
              'li',
              { key: note },
              note
            );
          })
        )
      );
    }
  }]);

  return NoteDisplay;
}(React.Component);

var domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(NoteDisplay, null), domContainer);