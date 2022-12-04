import { useState, useEffect } from 'react';
import './App.css';
import Editor from './Editor';
import EditorSnow from './EditorSnow';

import 'react-quill/dist/quill.snow.css';

function App() {
  const [editorContentValue, setEditorContentValue] = useState('');
  const [htmlValue, setHtmlValue] = useState('');
  const [isEditor, setisEditor] = useState(false);
  const [isReadOnlyEditorStyle, setisReadOnlyEditorStyle] = useState(false);

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
    </div>
  );
}

export default App;
