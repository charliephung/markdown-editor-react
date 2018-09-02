import React, { Component } from "react";
import Editor from "components/common/Editor";
import Preview from "components/common/Preview";
import "styles/styles.css";

export class App extends Component {
  state = { text: localStorage.getItem("markdown") || "" };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        <div style={{ flex: "50%", minWidth: "550px" }}>
          <Editor onChange={text => this.setState({ text })} />
        </div>
        <div
          style={{
            flex: "50%",
            fontSize: "2rem",
            minWidth: "550px"
          }}
        >
          <Preview value={this.state.text} />
        </div>
      </div>
    );
  }
}

export default App;
