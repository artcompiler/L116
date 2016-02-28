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
    nodes.forEach(function (n, i) {
      let args = [];
      if (n.args) {
        args = render(n.args, props);
      }
      switch (n.type) {
      case "grid":
        elts.push(
          <div className="container" key={i} style={n.style}>
            {args}
          </div>
        );
        break;
      case "row":
        elts.push(
          <div className="row" key={i} style={n.style}>
            {args}
          </div>
        );
        break;
      case "oneColumn":
        elts.push(
          <div className="one column" key={i} style={n.style}>
            {args}
          </div>
        );
        break;
      case "elevenColumns":
        elts.push(
          <div className="eleven columns" key={i} style={n.style}>
            {args}
          </div>
        );
        break;
      case "oneHalfColumn":
        elts.push(
          <div className="one-half column" key={i} style={n.style}>
            {args}
          </div>
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

