import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ModifiedAnchors from "../components/ModifiedAnchors";

// Create a root element to render the React component
const rootElement = document.createElement('div');
rootElement.id = 'extension-root';
document.body.appendChild(rootElement);

// Render the React component within the root element
ReactDOM.render(<ModifiedAnchors />, document.getElementById('extension-root'));
