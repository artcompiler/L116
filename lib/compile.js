"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compiler = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* Copyright (c) 2015, Art Compiler LLC */

var _assert = require("./assert.js");

(0, _assert.reserveCodeRange)(1000, 1999, "compile");
_assert.messages[1001] = "Node ID %1 not found in pool.";
_assert.messages[1002] = "Invalid tag in node with Node ID %1.";
_assert.messages[1003] = "No aync callback provided.";
_assert.messages[1004] = "No visitor method defined for '%1'.";

var translate = function () {
  var nodePool = void 0;
  function translate(pool, resume) {
    nodePool = pool;
    return visit(pool.root, {}, resume);
  }
  function error(str, nid) {
    return {
      str: str,
      nid: nid
    };
  }
  function visit(nid, options, resume) {
    (0, _assert.assert)(typeof resume === "function", (0, _assert.message)(1003));
    // Get the node from the pool of nodes.
    var node = void 0;
    if ((typeof nid === "undefined" ? "undefined" : _typeof(nid)) === "object") {
      node = nid;
    } else {
      node = nodePool[nid];
    }
    (0, _assert.assert)(node, (0, _assert.message)(1001, [nid]));
    (0, _assert.assert)(node.tag, (0, _assert.message)(1001, [nid]));
    (0, _assert.assert)(typeof fns[node.tag] === "function", (0, _assert.message)(1004, [JSON.stringify(node.tag)]));
    return fns[node.tag](node, options, resume);
  }
  // BEGIN VISITOR METHODS
  var edgesNode = void 0;
  function str(node, options, resume) {
    var val = node.elts[0];
    resume([], {
      type: "str",
      value: val
    });
  }
  function num(node, options, resume) {
    var val = node.elts[0];
    resume([], {
      type: "num",
      value: val
    });
  }
  function ident(node, options, resume) {
    var val = node.elts[0];
    resume([], [val]);
  }
  function bool(node, options, resume) {
    var val = node.elts[0];
    resume([], [val]);
  }
  function add(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      val1 = +val1.value;
      if (isNaN(val1)) {
        err1 = err1.concat(error("Argument must be a number.", node.elts[0]));
      }
      visit(node.elts[1], options, function (err2, val2) {
        val2 = +val2.value;
        if (isNaN(val2)) {
          err2 = err2.concat(error("Argument must be a number.", node.elts[1]));
        }
        resume([].concat(err1).concat(err2), val1 + val2);
      });
    });
  };
  function style(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      visit(node.elts[1], options, function (err2, val2) {
        var style = {};
        if (val2 instanceof Array) {
          val2.forEach(function (p) {
            style[p.key.value] = p.val.value;
          });
        }
        val1.style = style;
        resume([].concat(err1).concat(err2), val1);
      });
    });
  };
  function href(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      visit(node.elts[1], options, function (err2, val2) {
        if (val1.type !== "button" && val1.type !== "a") {
          val1 = {
            type: "a",
            attrs: {},
            args: val1
          };
        } else if (!val1.attrs) {
          val1.attrs = {};
        }
        val1.attrs.href = val2.value;
        resume([].concat(err1).concat(err2), val1);
      });
    });
  };
  function id(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      visit(node.elts[1], options, function (err2, val2) {
        if (!val1.attrs) {
          val1.attrs = {};
        }
        val1.attrs.id = val2.value;
        resume([].concat(err1).concat(err2), val1);
      });
    });
  };
  function grid(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "grid",
        args: val1
      });
    });
  };
  function row(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "row",
        args: val1
      });
    });
  };
  function oneColumn(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "oneColumn",
        args: val1
      });
    });
  };
  function twoColumns(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "twoColumns",
        args: val1
      });
    });
  };
  function threeColumns(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "threeColumns",
        args: val1
      });
    });
  };
  function fourColumns(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "fourColumns",
        args: val1
      });
    });
  };
  function fiveColumns(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "fiveColumns",
        args: val1
      });
    });
  };
  function sixColumns(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "sixColumns",
        args: val1
      });
    });
  };
  function sevenColumns(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "sevenColumns",
        args: val1
      });
    });
  };
  function eightColumns(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "eightColumns",
        args: val1
      });
    });
  };
  function nineColumns(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "nineColumns",
        args: val1
      });
    });
  };
  function tenColumns(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "tenColumns",
        args: val1
      });
    });
  };
  function elevenColumns(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "elevenColumns",
        args: val1
      });
    });
  };
  function twelveColumns(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "twelveColumns",
        args: val1
      });
    });
  };
  function oneThirdColumn(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "oneThirdColumn",
        args: val1
      });
    });
  };
  function twoThirdsColumn(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "twoThirdsColumn",
        args: val1
      });
    });
  };
  function oneHalfColumn(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "oneHalfColumn",
        args: val1
      });
    });
  };
  function h1(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "h1",
        args: val1
      });
    });
  };
  function h2(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "h2",
        args: val1
      });
    });
  };
  function h3(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "h3",
        args: val1
      });
    });
  };
  function h4(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "h4",
        args: val1
      });
    });
  };
  function h5(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "h5",
        args: val1
      });
    });
  };
  function h6(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "h6",
        args: val1
      });
    });
  };
  function br(node, options, resume) {
    resume([], {
      type: "br",
      args: []
    });
  };
  function code(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "code",
        args: val1
      });
    });
  };
  function cspan(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "cspan",
        args: val1,
        style: {
          fontSize: "90%"
        }
      });
    });
  };
  function textarea(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "textarea",
        attrs: {
          placeholder: val1.value
        }
      });
    });
  };
  function button(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "button",
        args: val1
      });
    });
  };
  function table(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "table",
        args: val1
      });
    });
  };
  function thead(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "thead",
        args: val1
      });
    });
  };
  function tbody(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "tbody",
        args: val1
      });
    });
  };
  function tr(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "tr",
        args: val1
      });
    });
  };
  function th(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "th",
        args: val1
      });
    });
  };
  function td(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "td",
        args: val1
      });
    });
  };
  function ul(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "ul",
        args: val1
      });
    });
  };
  function ol(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "ol",
        args: val1
      });
    });
  };
  function li(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "li",
        args: val1
      });
    });
  };
  function img(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "img",
        attrs: {
          src: val1.value
        }
      });
    });
  };
  function graffito(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      console.log("val1=" + JSON.stringify(val1));
      var id = parseInt(val1.value);
      var src;
      if (!isNaN(id)) {
        // It's and ID.
        src = "/form?id=" + id;
      } else {
        // It's a url, so request it and extract the ID.
        src = val1.value;
      }
      resume([].concat(err1), {
        type: "graffito",
        attrs: {
          width: "100%",
          marginHeight: "0",
          marginWidth: "0",
          frameBorder: "1",
          scrolling: "no",
          src: src
        }
      });
    });
  };
  function title(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "title",
        value: val1.value
      });
    });
  };
  function primaryButton(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "primaryButton",
        args: val1
      });
    });
  };
  function list(node, options, resume) {
    var result = [];
    if (node.elts && node.elts.length > 1) {
      visit(node.elts[0], options, function (err1, val1) {
        node = {
          tag: "LIST",
          elts: node.elts.slice(1)
        };
        list(node, options, function (err2, val2) {
          resume([].concat(err1).concat(err2), [].concat(val1).concat(val2));
        });
      });
    } else if (node.elts && node.elts.length > 0) {
      visit(node.elts[0], options, function (err1, val1) {
        resume([].concat(err1), [].concat(val1));
      });
    } else {
      resume([], []);
    }
  };
  function binding(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      visit(node.elts[1], options, function (err2, val2) {
        resume([].concat(err1).concat(err2), { key: val1, val: val2 });
      });
    });
  };
  function record(node, options, resume) {
    if (node.elts && node.elts.length > 1) {
      visit(node.elts[0], options, function (err1, val1) {
        node = {
          tag: "RECORD",
          elts: node.elts.slice(1)
        };
        record(node, options, function (err2, val2) {
          resume([].concat(err1).concat(err2), [].concat(val1).concat(val2));
        });
      });
    } else if (node.elts && node.elts.length > 0) {
      visit(node.elts[0], options, function (err1, val1) {
        resume([].concat(err1), [].concat(val1));
      });
    } else {
      resume([], []);
    }
  };
  function exprs(node, options, resume) {
    var result = [];
    if (node.elts && node.elts.length > 1) {
      visit(node.elts[0], options, function (err1, val1) {
        node = {
          tag: "EXPRS",
          elts: node.elts.slice(1)
        };
        list(node, options, function (err2, val2) {
          resume([].concat(err1).concat(err2), [].concat(val1).concat(val2));
        });
      });
    } else if (node.elts && node.elts.length > 0) {
      visit(node.elts[0], options, function (err1, val1) {
        resume([].concat(err1), [].concat(val1));
      });
    } else {
      resume([], []);
    }
  };
  function program(node, options, resume) {
    if (!options) {
      options = {};
    }
    visit(node.elts[0], options, function (err, val) {
      resume(err, val);
    });
  }
  var fns = {
    "PROG": program,
    "EXPRS": exprs,
    "STR": str,
    "NUM": num,
    "IDENT": ident,
    "BOOL": bool,
    "LIST": list,
    "RECORD": record,
    "BINDING": binding,
    "ADD": add,
    "STYLE": style,
    "GRID": grid,
    "ROW": row,
    "ONE-COLUMN": oneColumn,
    "TWO-COLUMNS": twoColumns,
    "THREE-COLUMNS": threeColumns,
    "FOUR-COLUMNS": fourColumns,
    "FIVE-COLUMNS": fiveColumns,
    "SIX-COLUMNS": sixColumns,
    "SEVEN-COLUMNS": sevenColumns,
    "EIGHT-COLUMNS": eightColumns,
    "NINE-COLUMNS": nineColumns,
    "TEN-COLUMNS": tenColumns,
    "ELEVEN-COLUMNS": elevenColumns,
    "TWELVE-COLUMNS": twelveColumns,
    "ONE-THIRD-COLUMN": oneThirdColumn,
    "TWO-THIRDS-COLUMN": twoThirdsColumn,
    "ONE-HALF-COLUMN": oneHalfColumn,
    "H1": h1,
    "H2": h2,
    "H3": h3,
    "H4": h4,
    "H5": h5,
    "H6": h6,
    "BR": br,
    "CODE": code,
    "CSPAN": cspan,
    "TEXTAREA": textarea,
    "BUTTON": button,
    "PRIMARY-BUTTON": primaryButton,
    "HREF": href,
    "ID": id,
    "TABLE": table,
    "THEAD": thead,
    "TBODY": tbody,
    "TR": tr,
    "TH": th,
    "TD": td,
    "UL": ul,
    "OL": ol,
    "LI": li,
    "IMG": img,
    "GRAFFITO": graffito,
    "TITLE": title
  };
  return translate;
}();
var render = function () {
  function escapeXML(str) {
    return String(str).replace(/&(?!\w+;)/g, "&amp;").replace(/\n/g, " ").replace(/\\/g, "\\\\").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function render(val, resume) {
    // Do some rendering here.
    resume([], val);
  }
  return render;
}();
var compiler = exports.compiler = function () {
  exports.compile = function compile(pool, resume) {
    // Compiler takes an AST in the form of a node pool and translates it into
    // an object to be rendered on the client by the viewer for this language.
    try {
      translate(pool, function (err, val) {
        if (err.length) {
          resume(err, val);
        } else {
          render(val, function (err, val) {
            resume(err, val);
          });
        }
      });
    } catch (x) {
      console.log("ERROR with code");
      console.log(x.stack);
      resume("Compiler error", {
        score: 0
      });
    }
  };
}();
