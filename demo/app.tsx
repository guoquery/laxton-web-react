import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {

  render() {
    return (
      <div>
        demo
      <table></table>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app')); //app即为挂载点，在模板html中
