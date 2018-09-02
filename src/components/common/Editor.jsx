import React, { Component, Fragment } from "react";
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
import { Nav, List, Item } from "components/nav/Nav";
import PropTypes from "prop-types";

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

export class Editor extends Component {
  state = {
    text: ""
  };
  componentDidMount() {
    this.setState({
      text: localStorage.getItem("markdown") || ""
    });
  }
  isControlled = () => {
    return this.props.value === undefined || this.props.value === null
      ? false
      : true;
  };

  onAdd = (tag, focus) => {
    const { text } = this.state;
    const { selectionStart, selectionEnd } = this.textarea.current;
    const updatedText = `${text.slice(0, selectionStart)}${tag}${text.slice(
      selectionEnd
    )}`;
    this.textarea.current.focus();
    const value = { target: { value: updatedText } };
    this.onChange(value, () => {
      this.textarea.current.setSelectionRange(
        selectionStart + focus[0],
        selectionStart + focus[0] + focus[1]
      );
    });
  };

  onChange = (e, fns) => {
    const { onChange } = this.props;
    if (!this.isControlled()) {
      this.setState(
        {
          text: e.target.value
        },
        () => {
          onChange && onChange(this.state.text);
          fns && fns();
          localStorage.setItem("markdown", this.state.text);
        }
      );
    } else {
      onChange && onChange(e.target.value);
      fns && fns();
      localStorage.setItem("markdown", e.target.value);
    }
  };

  render() {
    const { cols, rows, disable } = this.props;
    const value = this.isControlled() ? this.props.value : this.state.text;
    return (
      <Fragment>
        <Nav>
          <List>
            {navItem.map((item, index) => {
              return (
                <Item
                  onClick={() =>
                    !disable ? this.onAdd(item.add, item.focus) : {}
                  }
                  key={index}
                >
                  {item.icon}
                </Item>
              );
            })}
          </List>
        </Nav>
        <textarea
          ref={(this.textarea = React.createRef())}
          onChange={this.onChange}
          className="textarea"
          name="text"
          value={value}
          disabled={disable}
          cols={cols ? cols : "40"}
          rows={rows ? rows : "35"}
        />
      </Fragment>
    );
  }
}

Editor.propTypes = {
  value: PropTypes.string,
  cols: PropTypes.string,
  rows: PropTypes.string,
  disable: PropTypes.bool,
  onChange: PropTypes.func
};

export default Editor;
