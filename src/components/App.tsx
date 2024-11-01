import React, { Component } from 'react';
import '../styles/main.css';
import CodeEditor from './CodeEditor';
import CodeQuality from './CodeQuality';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='code-editor'>
            <CodeEditor />
        </div>
        <div className='instrument-helpers'>
            <div className='code-quality'>
              <CodeQuality />
            </div>
            <div className='code-from-ai'>
                {/* Код від ШІ  */}
            </div>
        </div>
      </div>
    );
  }
}

export default App;
