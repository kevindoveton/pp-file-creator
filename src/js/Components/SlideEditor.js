import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

// styles
require('../../styles/Partials/DraftJSEditor.sass')

class SlideEditor extends React.Component {
  constructor(props) {
    super(props);
    this.slide = this.props.slide;
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
      console.log(this.props);
      this.setState({editorState});
      
      // TODO: not sure if this is expensive
      var rawState = convertToRaw(this.state.editorState.getCurrentContent());
      this.props.EditSlideText(this.slide.id, rawState);
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
