import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import './App.css';
import Editor from './Editor';
import EditorSnow from './EditorSnow';

import 'react-quill/dist/quill.snow.css';

function App() {
  const [editorContentValue, setEditorContentValue] = useState('');
  const [htmlValue, setHtmlValue] = useState('');
  const [isEditor, setisEditor] = useState(false);
  const [isReadOnlyEditorStyle, setisReadOnlyEditorStyle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (isEditor) {
      setisReadOnlyEditorStyle(false);
    } else {
      setisReadOnlyEditorStyle(true);
    }
  }, [isEditor]);

  useEffect(() => {
    const myContent = localStorage.getItem('myContent');
    if (myContent) {
      setEditorContentValue(JSON.parse(myContent));
    }
  }, []);

  const onEditorContentChanged = (html, content) => {
    setHtmlValue(html);
    setEditorContentValue(content);
  };

  const handleToggleView = () => {
    setisEditor((isEditor) => !isEditor);
  };

  const handleSave = () => {
    console.log('Do Save Action!!!');
    localStorage.setItem('myContent', JSON.stringify(editorContentValue));
    handleToggleView();
  };

  const handleCancel = () => {
    handleToggleView();
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleMouseOver = (event) => {
    console.log('handleMouseOver');
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleMouseOut = (event) => {
    console.log('handleMouseOut');
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div className="App">
      <h1>ReactQuill editor with markdown import/export </h1>

      <p>The is the ReactQuill based editor.</p>

      <Editor
        handleToggleView={handleToggleView}
        isReadOnly={isReadOnlyEditorStyle}
        value={editorContentValue}
      />

      <EditorSnow
        isReadOnly={isReadOnlyEditorStyle}
        value={editorContentValue}
        onChange={onEditorContentChanged}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <p>When content changes in returns `html` content.</p>
      <div>
        <textarea defaultValue={htmlValue} rows={5} />
      </div>

      <button
        style={{ marginLeft: '200px', marginTop: '20px' }}
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Toggle Popper
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Paper style={{ padding: '10px' }}>
          The content of the Popper.
          <Editor
            handleToggleView={handleToggleView}
            isReadOnly={true}
            value={editorContentValue}
          />
        </Paper>
      </Popper>
    </div>
  );
}

export default App;
