import { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

export default class Snippet extends Component {
  componentDidMount() {
    let codeMirrorEditor = this.codemirror.editor;
    let highlightLines = this.props.highlightLines;

    highlightLines.map(line => {
      codeMirrorEditor.markText(
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
        ref={codemirror => (this.codemirror = codemirror)}
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
