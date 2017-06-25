import { Component } from 'react';
import CodeMirror from 'react-codemirror';

export default class Snippet extends Component {
  componentDidMount() {
    let codeMirror = this.codemirror.codeMirror;
    let highlightLines = this.props.highlightLines;

    highlightLines.map(line => {
      codeMirror.markText(
        {
          line: line[0] - 1,
          ch: 0,
        },
        {
          line: line[1] - 1,
        },
        { className: 'styled-background' }
      );
    });
  }

  render() {
    return (
      <CodeMirror
        ref={codemirror => this.codemirror = codemirror}
        value={window[this.props.snippetName]}
        options={{
          lineNumbers: true,
          mode: 'javascript',
          readOnly: true,
          theme: 'mdn-like',
        }}
      />
    );
  }
}
