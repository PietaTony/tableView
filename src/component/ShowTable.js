import React from "react";
import { Form, Button, Navbar, FormControl, Table } from "react-bootstrap";

export const DEFAULT = {
  FUNC: {
    SELECT: "select",
    NEW: "new",
    DELETE: "delete",
    UPDATE: "update",
  },
};

export default class ShowTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  New() {
    if (this.props.func.find((el) => el === DEFAULT.FUNC.NEW)) {
      return (
        <Button variant="outline-success" className="mr-sm-2">
          New
        </Button>
      );
    }
  }

  Select() {
    var Chooses = [];
    Chooses.push(<option key="Choose">Choose...</option>);
    this.props.show.forEach((title) => {
      Chooses.push(<option key={title}>{title}</option>);
    });
    if (this.props.func.find((el) => el === DEFAULT.FUNC.SELECT)) {
      return (
        <Form inline>
          <Form.Control as="select" placeholder="Choose..." className="mr-sm-2">
            {Chooses}
          </Form.Control>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary" className="mr-sm-2">
            Search
          </Button>
        </Form>
      );
    }
  }

  Delete() {
    if (this.props.func.find((el) => el === DEFAULT.FUNC.DELETE)) {
      return (
        <Button variant="outline-danger" className="mr-sm-2">
          Delete
        </Button>
      );
    }
  }

  Update() {
    if (this.props.func.find((el) => el === DEFAULT.FUNC.NEW)) {
      return (
        <Button variant="outline-info" className="mr-sm-2">
          Update
        </Button>
      );
    }
  }

  TableBar() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>{this.props.tableName}</Navbar.Brand>
        {this.New()}
        {this.Select()}
      </Navbar>
    );
  }

  TableHead() {
    let head = [];
    this.props.show.forEach((titleName) => {
      head.push(<th key={titleName}>{titleName}</th>);
    });

    if (
      this.props.func.find(
        (el) => el === DEFAULT.FUNC.UPDATE || el === DEFAULT.FUNC.DELETE
      )
    ) {
      head.push(<th key="#">#</th>);
    }
    return head;
  }

  Row(data) {
    let TableBodyCols = [];
    this.props.show.forEach((colName) => {
      TableBodyCols.push(<td key={colName}>{data[colName]}</td>);
    });

    if (
      this.props.func.find(
        (el) => el === DEFAULT.FUNC.UPDATE || el === DEFAULT.FUNC.DELETE
      )
    ) {
      TableBodyCols.push(
        <td key="#">
          {this.Update()}
          {this.Delete()}
        </td>
      );
    }

    return <tr key={data.key}>{TableBodyCols}</tr>;
  }

  render() {
    let Rows = [];
    this.props.datas.forEach((data) => {
      Rows.push(this.Row(data));
    });
    return (
      <div>
        {this.TableBar()}
        <Table striped bordered hover>
          <thead>
            <tr>{this.TableHead()}</tr>
          </thead>
          <tbody>{Rows}</tbody>
        </Table>
      </div>
    );
  }
}
