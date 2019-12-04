import React from "react";
import ReactDOM from "react-dom";
import { TableDemo } from "./TableDemo";
import { SearchDemo } from './SearchDemo';
const App = TableDemo;

ReactDOM.render(<App />, document.getElementById("root")); //app即为挂载点，在模板html中
