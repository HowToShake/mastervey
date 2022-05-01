"use strict";
exports.id = 196;
exports.ids = [196];
exports.modules = {

/***/ 196:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "styled-jsx/style"
var style_ = __webpack_require__(816);
var style_default = /*#__PURE__*/__webpack_require__.n(style_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./components/Navbar/index.tsx



const Navbar = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "jsx-cc1448311b6a2e68",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                className: "jsx-cc1448311b6a2e68",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "jsx-cc1448311b6a2e68",
                        /*#__PURE__*/ children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                className: "jsx-cc1448311b6a2e68",
                                children: "Home"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "jsx-cc1448311b6a2e68",
                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/about",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                className: "jsx-cc1448311b6a2e68",
                                children: "About"
                            })
                        })
                    })
                ]
            }),
            jsx_runtime_.jsx((style_default()), {
                id: "cc1448311b6a2e68",
                children: "ul.jsx-cc1448311b6a2e68{background:#333;color:#fff;list-style:none;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}ul.jsx-cc1448311b6a2e68 li.jsx-cc1448311b6a2e68{font-size:22px;margin-right:50px}ul.jsx-cc1448311b6a2e68 li.jsx-cc1448311b6a2e68 a.jsx-cc1448311b6a2e68{color:#fff;text-decoration:none}"
            })
        ]
    });
};
/* harmony default export */ const components_Navbar = (Navbar);

;// CONCATENATED MODULE: ./layout/index.tsx



const Layout = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Hello Next.js"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "stylesheet",
                        href: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_Navbar, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "container",
                children: props.children
            })
        ]
    });
};
/* harmony default export */ const layout = (Layout);


/***/ })

};
;