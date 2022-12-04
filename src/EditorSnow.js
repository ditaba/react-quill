import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import * as Emoji from 'quill-emoji';

import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';

Quill.register('modules/emoji', Emoji);

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
  [{ color: [] }, { background: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['emoji'],
  ['clean'],
];

const EditorSnow = (props) => {
  const onChange = (content, delta, source, editor) => {
    props.onChange(editor.getHTML(), editor.getContents());
  };

  const html = !props.isReadOnly ? (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        placeholder="Start writing..."
        modules={{
          toolbar: {
            container: TOOLBAR_OPTIONS,
          },
          'emoji-toolbar': true,
          'emoji-textarea': false,
          'emoji-shortname': true,
        }}
        value={props.value}
        onChange={onChange}
      />
      <button onClick={() => props.onSave()}>Save</button>
      <button onClick={() => props.onCancel()}>Cancel</button>
    </div>
  ) : null;
  return <React.Fragment>{html}</React.Fragment>;
};

export default EditorSnow;
