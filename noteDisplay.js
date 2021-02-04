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
    };

    _this.onScaleChange = function (e) {
      var valueSelectedByUser = e.target.value;
      _this.setState({ selectedScale: valueSelectedByUser });
    };

    _this.state = { selectedNote: 'A', selectedScale: 'Durowa' };
    return _this;
  }

  _createClass(NoteDisplay, [{
    key: 'render',
    value: function render() {

      var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'];
      var pos = notes.indexOf(this.state.selectedNote);
      var newNotes = notes.splice(pos, 12);
      var scaleNotes = [];

      switch (this.state.selectedScale) {
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
          'ul',
          null,
          scaleNotes.map(function (note) {
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