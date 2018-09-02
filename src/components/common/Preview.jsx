import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaHtml5, FaBook, FaDownload, FaCopy } from "react-icons/fa";
import { Nav, List, Item } from "components/nav/Nav";
import marked from "marked";

function downloadContent(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export class Preview extends Component {
  state = { raw: false, html: "" };

  render() {
    const { value = "" } = this.props;
    const { raw } = this.state;

    const content = [
      <div
        ref={(this.div = React.createRef())}
        key="1"
        style={{
          margin: "3rem",
          visibility: raw ? "hidden" : "",
          position: "absolute",
          top: "0",
          left: "0"
        }}
        dangerouslySetInnerHTML={{
          __html: marked(value)
        }}
      />,
      <div
        key="2"
        style={{
          whiteSpace: "pre",
          margin: "3rem",
          visibility: !raw ? "hidden" : "",
          position: "absolute",
          top: "0",
          left: "0"
        }}
      >
        {marked(value)}
      </div>
    ];

    return (
      <div style={{ display: "flex", height: "100%" }}>
        <Nav>
          <List style={{ flexDirection: "column", backgroundColor: "white" }}>
            <Item
              onClick={() => {
                this.setState({ raw: true });
              }}
            >
              <FaHtml5 />
            </Item>
            <Item onClick={() => this.setState({ raw: false })}>
              <FaBook />
            </Item>
            <Item>
              <FaCopy
                onClick={() => {
                  raw ? copyToClipboard(marked(value)) : copyToClipboard(value);
                }}
              />
            </Item>
            <Item>
              <FaDownload
                onClick={() => {
                  raw
                    ? downloadContent("html", marked(value))
                    : downloadContent("markdown", value);
                }}
              />
            </Item>
          </List>
        </Nav>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {content}
        </div>
      </div>
    );
  }
}

Preview.propTypes = {
  value: PropTypes.string
};

export default Preview;
