import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import * as Emoji from 'quill-emoji';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'quill-emoji/dist/quill-emoji.css';

const BubbleTheme = Quill.import('themes/bubble');
class ExtendBubbleTheme extends BubbleTheme {
  constructor(quill, options) {
    super(quill, options);

    quill.on('selection-change', (range) => {
      if (range) {
        quill.theme.tooltip.show();
        quill.theme.tooltip.position(quill.getBounds(range));
      }
    });
  }
}

Quill.register('themes/bubble', ExtendBubbleTheme);
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

const Editor = (props) => {
  const html = props.isReadOnly ? (
    <div className="text-editor" onClick={() => props.handleToggleView()}>
      <ReactQuill
        readOnly={props.isReadOnly}
        theme="bubble"
        placeholder="Compose an epic..."
        modules={{ toolbar: TOOLBAR_OPTIONS }}
        value={props.value || ''}
      />
    </div>
  ) : null;
  return <React.Fragment>{html}</React.Fragment>;
};

export default Editor;
