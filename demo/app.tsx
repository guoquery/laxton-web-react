import React from "react";
import ReactDOM from "react-dom";
import { TableDemo } from "./TableDemo";
import { SearchDemo } from './SearchDemo';
import { api } from "./api.service";



const key = [
  {
    userName: `nextvote`,
    password: `NextVote@777`,
  },
  {
    userName: `Zambianextvote`,
    password: `NextVote@777`,
  },
  {
    userName: `Zambianextvote`,
    password: `NextVote@777`,
  },
]
const index = 1;
const userName = key[index].userName;
const password = key[index].password;;
api.GetToken(`grant_type=password&username=${userName}&password=${password}`).then(() => {
  const App = TableDemo;
  ReactDOM.render(<App />, document.getElementById("root")); //app即为挂载点，在模板html中
})
