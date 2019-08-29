import React, { Component } from "react";
import "./Admin.scss";
import { subscribeAndlistenToUpdate } from "../../utils/Socket/Socket";
import axios from "axios";
import Table from "rc-table";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

const columns = [
  {
    title: "Member's Name",
    dataIndex: "name",
    key: "name",
    width: 100
  },
  {
    title: "Member's OWA",
    dataIndex: "owa",
    key: "owa",
    width: 100
  },
  {
    title: "Member Birthday",
    dataIndex: "birthday",
    key: "birthday",
    width: 200
  }
];

class Admin extends Component {
  componentWillMount = () => {
    const { password } = queryString.parse(this.props.location.search);
    if (!password | (password !== "yesunmc3ksth")) {
      return this.props.history.push("/");
    }
  };

  state = {
    users: []
  };
  render = () => {
    return (
      <div className="Admin">
        <Table columns={columns} data={this.state.users} />
      </div>
    );
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:8080/admin", {
        headers: {
          yesunmc: "yesunmc3ksth"
        }
      })
      .then(users => {
        const userArray = users.data.map(user => {
          return {
            owa: user.email,
            name: user.name,
            birthday: user.birthday
          };
        });
        this.setState({
          users: [...userArray]
        });
      });
    subscribeAndlistenToUpdate(data => {
      const userArray = data.map(user => {
        return {
          owa: user.email,
          name: user.name,
          birthday: user.birthday
        };
      });
      this.setState({
        users: [...userArray]
      });
    });
  };
}

export default withRouter(Admin);
