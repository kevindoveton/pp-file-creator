// convertToRaw(this.state.editorState.getCurrentContent());

import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
require('../../styles/Partials/DraftJSEditor.sass')
require('../../styles/Slide.sass')

class SlideEditor extends React.Component {
  constructor(props) {
    super(props);
    this.slide = this.props.slide;
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
      this.setState({editorState})
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = () => this.refs.editor.focus();

  }
  
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  
  _onBoldClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    return;
  }
  
  _onItalicClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    return;
  }
  
  _onUnderlineClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    return;
  }
  
  render() {
    return (
      <div className="DraftEditor-div">
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
        <button onMouseDown={this._onBoldClick.bind(this)}>Bold</button>
        <button onMouseDown={this._onItalicClick.bind(this)}>Italics</button>
        <button onMouseDown={this._onUnderlineClick.bind(this)}>Underline</button>
      </div>
    );
  }
}

export default SlideEditor;
