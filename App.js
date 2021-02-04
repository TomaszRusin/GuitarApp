

function App() {
  return React.createElement(
    'div',
    null,
    React.createElement(NoteDisplay, null)
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));