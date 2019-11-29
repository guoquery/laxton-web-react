import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import "../dist/index";
// import { Rt } from "../lib/index";
// // import "../src/assets/table.less";
// // import { Rt } from "../src/index";
import { api } from "./api.service";
import { TableDemo } from "./TableDemo";
const App = TableDemo;

ReactDOM.render(<App />, document.getElementById("root")); //app即为挂载点，在模板html中
