import React, { Component } from "react";
import Editor from "components/common/Editor";
import Preview from "components/common/Preview";
import {
  FaBold,
  FaItalic,
  FaHeading,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaCheckSquare,
  FaQuoteLeft,
  FaQuoteRight,
  FaCode,
  FaLink,
  FaImage
} from "react-icons/fa";
import "styles/styles.css";

const navItem = [
  {
    icon: <FaBold />,
    add: "**strong text**",
    focus: [2, 11]
  },
  {
    icon: <FaItalic />,
    add: "*emphasized text*",
    focus: [1, 15]
  },
  {
    icon: <FaHeading />,
    add: "## Heading",
    focus: [3, 13]
  },
  {
    icon: <FaStrikethrough />,
    add: "~~strikethrough text~~",
    focus: [2, 18]
  },
  {
    icon: <FaListUl />,
    add: "- List item",
    focus: [2, 13]
  },
  {
    icon: <FaListOl />,
    add: "1. List item",
    focus: [3, 13]
  },
  {
    icon: <FaCheckSquare />,
    add: "- [ ] List item",
    focus: [2, 13]
  },
  {
    icon: [<FaQuoteLeft key={0} />, <FaQuoteRight key={1} />],
    add: "> Blockquote",
    focus: [2, 13]
  },
  {
    icon: <FaCode />,
    add: "```javascript\n    \n```",
    focus: [15, 4]
  },

  {
    icon: <FaLink />,
    add: "[enter link description here](url)",
    focus: [1, 27]
  },
  {
    icon: <FaImage />,
    add: "![enter image description here](url)",
    focus: [2, 28]
  }
];

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
          <Editor
            item={navItem}
            onChange={text => {
              this.setState({ text });
            }}
          />
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
