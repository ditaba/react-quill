import ReactMarkdown from 'react-markdown';
import ReactHtmlParser from 'react-html-parser';

const ViewerMarkdown = (props) => {
  return (
    <div dataText="Enter text here" onClick={() => props.handleToggleView()}>
      <ReactMarkdown>{props.value}</ReactMarkdown>
    </div>
  );
};

const ViewerHtml = (props) => {
  return (
    <div dataText="Enter text here" onClick={() => props.handleToggleView()}>
      {ReactHtmlParser(props.value)}
    </div>
  );
};

export { ViewerMarkdown, ViewerHtml };
