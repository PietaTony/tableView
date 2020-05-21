import React from "react";
import ShowTable from "../component/ShowTable";
import { API } from "../Default";

export default class Show extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      FindTable: {
        tableName: "Find",
        show: ["LUID", "UUID_LIST", "UUID_stu" /* "STU" */],
        func: [
          // "select", "new", "update", "delete"
        ],
        datas: [],
      },
      DevFindTable: {
        tableName: "DevFind",
        show: ["UUID", "UUID_stu" /* "STU" */],
        func: [
          // "select", "new", "update", "delete"
        ],
        datas: [],
      },
    };
  }

  componentDidMount() {
    //this.UpdateInterval = setInterval(() => this.initFindTableAsync(), 3000);
    this.initFindTableAsync();
    // await this.initFindTableAsync();
    // await this.initDevFindTableAsync();
    // await this.initFindTableStuAsync();
  }

  async initFindTableAsync() {
    var FindTable = this.state.FindTable;
    var _URL = new URL(
      API.Protocol +
        API.IP +
        API.Port +
        "/" +
        API.APIName.POS +
        "/" +
        API.CMD.JOB
    );
    _URL.search = new URLSearchParams(API.Params).toString();
    fetch(_URL, {
      method: API.Method,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          result.forEach((data) => {
            data.key = data[FindTable.show[0]];
          });
          this.state.FindTable.datas = result;
          // this.setState((prevState) => ({
          //   FindTable: {
          //     ...prevState.FindTable,
          //     datas: result,
          //   },
          // }));
          /////
          this.initDevFindTableAsync();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async initDevFindTableAsync() {
    var DevFindTable = this.state.DevFindTable;
    var _URL = new URL(
      API.Protocol +
        API.IP +
        API.Port +
        "/" +
        API.APIName.DEV +
        "/" +
        API.CMD.DEV
    );
    _URL.search = new URLSearchParams(API.Params).toString();
    fetch(_URL, {
      method: API.Method,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          result.forEach((data) => {
            data.key = data[DevFindTable.show[0]];
          });
          this.setState((prevState) => ({
            DevFindTable: {
              ...prevState.DevFindTable,
              datas: result,
            },
          }));
          /////
          this.initFindTableStuAsync();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async initFindTableStuAsync() {
    this.state.FindTable.datas.forEach((data) => {
      var found = this.state.DevFindTable.datas.find(
        (el) => el.UUID === data.UUID_LIST
      );
      if (found !== undefined) {
        data.UUID_stu = found.UUID_stu;
      } else {
        data.UUID_stu = "NOT FOUND";
      }
    });
    this.setState((prevState) => ({
      FindTable: {
        ...prevState.FindTable,
      },
    }));
  }

  render() {
    return (
      <div>
        <ShowTable
          tableName={this.state.FindTable.tableName}
          datas={this.state.FindTable.datas}
          show={this.state.FindTable.show}
          func={this.state.FindTable.func}
        />
        <ShowTable
          tableName={this.state.DevFindTable.tableName}
          datas={this.state.DevFindTable.datas}
          show={this.state.DevFindTable.show}
          func={this.state.DevFindTable.func}
        />
      </div>
    );
  }
}
