import React, { Component, Fragment } from "react";
import { Nav, List, Item } from "components/nav/Nav";
import PropTypes from "prop-types";

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
    console.log(e.target.value);

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
    const { cols, rows, disable, item } = this.props;
    const value = this.isControlled() ? this.props.value : this.state.text;
    return (
      <Fragment>
        <Nav>
          <List>
            {item.map((i, index) => {
              return (
                <Item
                  onClick={() => (!disable ? this.onAdd(i.add, i.focus) : {})}
                  key={index}
                >
                  {i.icon}
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
  item: PropTypes.array,
  value: PropTypes.string,
  cols: PropTypes.string,
  rows: PropTypes.string,
  disable: PropTypes.bool,
  onChange: PropTypes.func
};

export default Editor;
