(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),i=n(4),s=n.n(i),r=(n(10),n(2)),o=(n(11),{API_BASE_URL:"https://rain-app-api.herokuapp.com"}),j=n(5),l=n.n(j),d=n(0),b=new Audio("./rain.mp3");var h=function(){var e=Object(c.useState)(""),t=Object(r.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)(),s=Object(r.a)(i,2),j=s[0],h=s[1],u=Object(c.useState)(!1),p=Object(r.a)(u,2),O=p[0],x=p[1];return Object(c.useEffect)((function(){j&&(j.isRainingToday?b.play():b.pause())}),[j]),Object(c.useEffect)((function(){n&&5===n.length&&(x(!0),fetch("".concat(o.API_BASE_URL,"/rainData?zip=").concat(n)).then((function(e){return e.json()})).then((function(e){x(!1),h(e)})).catch((function(e){x(!1),console.log("error: ",e)})))}),[n]),Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)("main",{children:[Object(d.jsx)("div",{className:"search-box",children:Object(d.jsx)("input",{type:"text",className:"search-bar",placeholder:"Enter zip code",onChange:function(e){return a(e.target.value)},value:n})}),Object(d.jsx)("div",{className:"spinner",children:Object(d.jsx)(l.a,{type:"spin",hidden:!O})}),!O&&j&&Object(d.jsx)("div",{children:j.error?Object(d.jsx)("div",{className:"error-message",children:j.error.message}):Object(d.jsxs)("div",{children:[Object(d.jsxs)("div",{className:"location-box",children:[Object(d.jsxs)("div",{className:"location",children:[j.city,", ",j.state]}),Object(d.jsx)("div",{className:"date",children:(new Date).toDateString()})]}),Object(d.jsx)("div",{className:"rains-container",children:Object(d.jsx)("div",{className:"rains",children:!0===j.isRainingToday?Object(d.jsx)("div",{className:"rains-text",children:"Yes, it will rain today!"}):Object(d.jsx)("div",{className:"rains-text",children:"No, it will not rain today :("})})})]})})]})})},u=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,14)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),i(e),s(e)}))};s.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(h,{})}),document.getElementById("root")),u()}},[[13,1,2]]]);
//# sourceMappingURL=main.759370e4.chunk.js.map