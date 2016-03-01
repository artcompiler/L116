/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil; tab-width: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
/* Copyright (c) 2015, Art Compiler LLC */
/*
   TODO
   -- Update code based on user intput.
*/
import {assert, message, messages, reserveCodeRange} from "./assert";
import * as React from "react";
//import * as ReactDOM from "react-dom";

window.exports.viewer = (function () {
  function capture(el) {
    var mySVG = $(el).html();
    return mySVG;
  }
  var Timer = React.createClass({
    tick: function() {
      let secondsElapsed = this.props.secondsElapsed;
      let state = {
        secondsElapsed: (secondsElapsed ? secondsElapsed : 0) + 5
      };
      // To save state, dispatch it as a property named 'data'. This will save
      // the state to the server, update the URL and the props used to render
      // the view.
      window.dispatcher.dispatch({
        data: state,
      });
    },
    componentDidMount: function() {
      this.interval = setInterval(this.tick, 5000);
    },
    componentWillUnmount: function() {
      clearInterval(this.interval);
    },
    render: function() {
      return (
          <div>{this.props.secondsElapsed?this.props.secondsElapsed:0}</div>
      );
    }
  });

  function render(nodes, props) {
    let elts = [];
    if (!(nodes instanceof Array)) {
      // HACK not all arguments are arrays. Not sure they should be.
      nodes = [nodes];
    }
    nodes.forEach(function (n, i) {
      let args = [];
      if (n.args) {
        args = render(n.args, props);
      }
      switch (n.type) {
      case "grid":
        elts.push(
          <div className="container" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "table":
        elts.push(
          <table key={i} style={n.style} {...n.attrs}>
            {args}
          </table>
        );
        break;
      case "thead":
        elts.push(
          <thead key={i} style={n.style} {...n.attrs}>
            {args}
          </thead>
        );
        break;
      case "tbody":
        elts.push(
          <tbody className="container" key={i} style={n.style} {...n.attrs}>
            {args}
          </tbody>
        );
        break;
      case "tr":
        elts.push(
          <tr key={i} style={n.style} {...n.attrs}>
            {args}
          </tr>
        );
        break;
      case "th":
        elts.push(
          <th key={i} style={n.style} {...n.attrs}>
            {args}
          </th>
        );
        break;
      case "td":
        elts.push(
          <td key={i} style={n.style} {...n.attrs}>
            {args}
          </td>
        );
        break;
      case "row":
        elts.push(
          <div className="row" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "oneColumn":
        elts.push(
          <div className="one column" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "twoColumns":
        elts.push(
          <div className="two columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "threeColumns":
        elts.push(
          <div className="three columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "fourColumns":
        elts.push(
          <div className="four columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "fiveColumns":
        elts.push(
          <div className="five columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "sixColumns":
        elts.push(
          <div className="six columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "sevenColumns":
        elts.push(
          <div className="seven columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "eightColumns":
        elts.push(
          <div className="eight columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "nineColumns":
        elts.push(
          <div className="nine columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "tenColumns":
        elts.push(
          <div className="ten columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "elevenColumns":
        elts.push(
          <div className="eleven columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "twelveColumns":
        elts.push(
          <div className="twelve columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "oneThirdColumn":
        elts.push(
          <div className="one-third column" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "twoThirdsColumn":
        elts.push(
          <div className="two-thirds column" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "oneHalfColumn":
        elts.push(
          <div className="one-half column" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "h1":
        elts.push(
          <h1 key={i} style={n.style} {...n.attrs}>
            {args}
          </h1>
        );
        break;
      case "h2":
        elts.push(
          <h2 key={i} style={n.style} {...n.attrs}>
            {args}
          </h2>
        );
        break;
      case "h3":
        elts.push(
          <h3 key={i} style={n.style} {...n.attrs}>
            {args}
          </h3>
        );
        break;
      case "h4":
        elts.push(
          <h4 key={i} style={n.style} {...n.attrs}>
            {args}
          </h4>
        );
        break;
      case "h5":
        elts.push(
          <h5 key={i} style={n.style} {...n.attrs}>
            {args}
          </h5>
        );
        break;
      case "h6":
        elts.push(
          <h6 key={i} style={n.style} {...n.attrs}>
            {args}
          </h6>
        );
        break;
      case "code":
        elts.push(
          <pre key={i} style={n.style} {...n.attrs}><code>
            {args}
          </code></pre>
        );
        break;
      case "cspan":
        elts.push(
          <code key={i} style={n.style} {...n.attrs}>
            {args}
          </code>
        );
        break;
      case "button":
        elts.push(
          <a className="button" key={i} style={n.style} {...n.attrs}>
            {args}
          </a>
        );
        break;
      case "ul":
        elts.push(
          <ul key={i} style={n.style} {...n.attrs}>
            {args}
          </ul>
        );
        break;
      case "ol":
        elts.push(
          <ol key={i} style={n.style} {...n.attrs}>
            {args}
          </ol>
        );
        break;
      case "li":
        elts.push(
          <li key={i} style={n.style} {...n.attrs}>
            {args}
          </li>
        );
        break;
      case "img":
        elts.push(
          <img key={i} style={n.style} {...n.attrs}/>
        );
        break;
      case "graffito":
        elts.push(
          <iframe key={i} style={n.style} {...n.attrs}/>
        );
        break;
      case "str":
        elts.push(<span key={i} style={n.style}>{""+n.value}</span>);
        break;
      default:
        if (n.value === "$$timer$$") {
          elts.push(<span key={i} style={style}><Timer {...props}/></span>);
        } else if (n.value === "$$prose$$") {
          return <Prose id="editor" style={style}/>;
        } else {
        }
        break;
      }
    });
    return elts;
  }

  // Graffiticode looks for this React class named Viewer. The compiled code is
  // passed via props in the renderer.
  var Viewer = React.createClass({
    componentDidMount: function() {
    },
    render: function () {
      // If you have nested components, make sure you send the props down to the
      // owned components.
      var props = this.props;
      var data = props.data ? props.data : [];
      var elts = render(data, props);
      return (
        <div className="section">
          {elts}
        </div>
      );
    },
  });
  return {
    capture: capture,
    Viewer: Viewer
  };
})();

