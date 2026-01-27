var Rt = "top",
    Ft = "bottom",
    zt = "right",
    Ht = "left",
    ur = "auto",
    Gn = [Rt, Ft, zt, Ht],
    pn = "start",
    jn = "end",
    Ga = "clippingParents",
    Ps = "viewport",
    In = "popper",
    Za = "reference",
    _s = Gn.reduce(function(e, t) {
        return e.concat([t + "-" + pn, t + "-" + jn])
    }, []),
    Rs = [].concat(Gn, [ur]).reduce(function(e, t) {
        return e.concat([t, t + "-" + pn, t + "-" + jn])
    }, []),
    Qa = "beforeRead",
    Ja = "read",
    tc = "afterRead",
    ec = "beforeMain",
    nc = "main",
    ic = "afterMain",
    rc = "beforeWrite",
    sc = "write",
    oc = "afterWrite",
    ac = [Qa, Ja, tc, ec, nc, ic, rc, sc, oc];

function we(e) {
    return e ? (e.nodeName || "").toLowerCase() : null
}

function Yt(e) {
    if (e == null) return window;
    if (e.toString() !== "[object Window]") {
        var t = e.ownerDocument;
        return t && t.defaultView || window
    }
    return e
}

function gn(e) {
    var t = Yt(e).Element;
    return e instanceof t || e instanceof Element
}

function Qt(e) {
    var t = Yt(e).HTMLElement;
    return e instanceof t || e instanceof HTMLElement
}

function Hs(e) {
    if (typeof ShadowRoot > "u") return !1;
    var t = Yt(e).ShadowRoot;
    return e instanceof t || e instanceof ShadowRoot
}

function Au(e) {
    var t = e.state;
    Object.keys(t.elements).forEach(function(n) {
        var r = t.styles[n] || {},
            o = t.attributes[n] || {},
            c = t.elements[n];
        !Qt(c) || !we(c) || (Object.assign(c.style, r), Object.keys(o).forEach(function(f) {
            var d = o[f];
            d === !1 ? c.removeAttribute(f) : c.setAttribute(f, d === !0 ? "" : d)
        }))
    })
}

function Cu(e) {
    var t = e.state,
        n = {
            popper: {
                position: t.options.strategy,
                left: "0",
                top: "0",
                margin: "0"
            },
            arrow: {
                position: "absolute"
            },
            reference: {}
        };
    return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function() {
            Object.keys(t.elements).forEach(function(r) {
                var o = t.elements[r],
                    c = t.attributes[r] || {},
                    f = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]),
                    d = f.reduce(function(g, b) {
                        return g[b] = "", g
                    }, {});
                !Qt(o) || !we(o) || (Object.assign(o.style, d), Object.keys(c).forEach(function(g) {
                    o.removeAttribute(g)
                }))
            })
        }
}
const js = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: Au,
    effect: Cu,
    requires: ["computeStyles"]
};

function be(e) {
    return e.split("-")[0]
}
var dn = Math.max,
    ir = Math.min,
    Bn = Math.round;

function ws() {
    var e = navigator.userAgentData;
    return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
        return t.brand + "/" + t.version
    }).join(" ") : navigator.userAgent
}

function cc() {
    return !/^((?!chrome|android).)*safari/i.test(ws())
}

function Vn(e, t, n) {
    t === void 0 && (t = !1), n === void 0 && (n = !1);
    var r = e.getBoundingClientRect(),
        o = 1,
        c = 1;
    t && Qt(e) && (o = e.offsetWidth > 0 && Bn(r.width) / e.offsetWidth || 1, c = e.offsetHeight > 0 && Bn(r.height) / e.offsetHeight || 1);
    var f = gn(e) ? Yt(e) : window,
        d = f.visualViewport,
        g = !cc() && n,
        b = (r.left + (g && d ? d.offsetLeft : 0)) / o,
        v = (r.top + (g && d ? d.offsetTop : 0)) / c,
        E = r.width / o,
        A = r.height / c;
    return {
        width: E,
        height: A,
        top: v,
        right: b + E,
        bottom: v + A,
        left: b,
        x: b,
        y: v
    }
}

function Bs(e) {
    var t = Vn(e),
        n = e.offsetWidth,
        r = e.offsetHeight;
    return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
        x: e.offsetLeft,
        y: e.offsetTop,
        width: n,
        height: r
    }
}

function lc(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && Hs(n)) {
        var r = t;
        do {
            if (r && e.isSameNode(r)) return !0;
            r = r.parentNode || r.host
        } while (r)
    }
    return !1
}

function Pe(e) {
    return Yt(e).getComputedStyle(e)
}

function $u(e) {
    return ["table", "td", "th"].indexOf(we(e)) >= 0
}

function Xe(e) {
    return ((gn(e) ? e.ownerDocument : e.document) || window.document).documentElement
}

function fr(e) {
    return we(e) === "html" ? e : e.assignedSlot || e.parentNode || (Hs(e) ? e.host : null) || Xe(e)
}

function Yo(e) {
    return !Qt(e) || Pe(e).position === "fixed" ? null : e.offsetParent
}

function xu(e) {
    var t = /firefox/i.test(ws()),
        n = /Trident/i.test(ws());
    if (n && Qt(e)) {
        var r = Pe(e);
        if (r.position === "fixed") return null
    }
    var o = fr(e);
    for (Hs(o) && (o = o.host); Qt(o) && ["html", "body"].indexOf(we(o)) < 0;) {
        var c = Pe(o);
        if (c.transform !== "none" || c.perspective !== "none" || c.contain === "paint" || ["transform", "perspective"].indexOf(c.willChange) !== -1 || t && c.willChange === "filter" || t && c.filter && c.filter !== "none") return o;
        o = o.parentNode
    }
    return null
}

function _i(e) {
    for (var t = Yt(e), n = Yo(e); n && $u(n) && Pe(n).position === "static";) n = Yo(n);
    return n && (we(n) === "html" || we(n) === "body" && Pe(n).position === "static") ? t : n || xu(e) || t
}

function Vs(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
}

function mi(e, t, n) {
    return dn(e, ir(t, n))
}

function Su(e, t, n) {
    var r = mi(e, t, n);
    return r > n ? n : r
}

function uc() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}

function fc(e) {
    return Object.assign({}, uc(), e)
}

function dc(e, t) {
    return t.reduce(function(n, r) {
        return n[r] = e, n
    }, {})
}
var Ou = function(t, n) {
    return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
        placement: n.placement
    })) : t, fc(typeof t != "number" ? t : dc(t, Gn))
};

function ku(e) {
    var t, n = e.state,
        r = e.name,
        o = e.options,
        c = n.elements.arrow,
        f = n.modifiersData.popperOffsets,
        d = be(n.placement),
        g = Vs(d),
        b = [Ht, zt].indexOf(d) >= 0,
        v = b ? "height" : "width";
    if (!(!c || !f)) {
        var E = Ou(o.padding, n),
            A = Bs(c),
            D = g === "y" ? Rt : Ht,
            x = g === "y" ? Ft : zt,
            L = n.rects.reference[v] + n.rects.reference[g] - f[g] - n.rects.popper[v],
            R = f[g] - n.rects.reference[g],
            M = _i(c),
            Q = M ? g === "y" ? M.clientHeight || 0 : M.clientWidth || 0 : 0,
            tt = L / 2 - R / 2,
            K = E[D],
            it = Q - A[v] - E[x],
            Y = Q / 2 - A[v] / 2 + tt,
            l = mi(K, Y, it),
            W = g;
        n.modifiersData[r] = (t = {}, t[W] = l, t.centerOffset = l - Y, t)
    }
}

function Lu(e) {
    var t = e.state,
        n = e.options,
        r = n.element,
        o = r === void 0 ? "[data-popper-arrow]" : r;
    o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || lc(t.elements.popper, o) && (t.elements.arrow = o))
}
const hc = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: ku,
    effect: Lu,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
};

function qn(e) {
    return e.split("-")[1]
}
var Nu = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};

function Du(e, t) {
    var n = e.x,
        r = e.y,
        o = t.devicePixelRatio || 1;
    return {
        x: Bn(n * o) / o || 0,
        y: Bn(r * o) / o || 0
    }
}

function Ko(e) {
    var t, n = e.popper,
        r = e.popperRect,
        o = e.placement,
        c = e.variation,
        f = e.offsets,
        d = e.position,
        g = e.gpuAcceleration,
        b = e.adaptive,
        v = e.roundOffsets,
        E = e.isFixed,
        A = f.x,
        D = A === void 0 ? 0 : A,
        x = f.y,
        L = x === void 0 ? 0 : x,
        R = typeof v == "function" ? v({
            x: D,
            y: L
        }) : {
            x: D,
            y: L
        };
    D = R.x, L = R.y;
    var M = f.hasOwnProperty("x"),
        Q = f.hasOwnProperty("y"),
        tt = Ht,
        K = Rt,
        it = window;
    if (b) {
        var Y = _i(n),
            l = "clientHeight",
            W = "clientWidth";
        if (Y === Yt(n) && (Y = Xe(n), Pe(Y).position !== "static" && d === "absolute" && (l = "scrollHeight", W = "scrollWidth")), Y = Y, o === Rt || (o === Ht || o === zt) && c === jn) {
            K = Ft;
            var V = E && Y === it && it.visualViewport ? it.visualViewport.height : Y[l];
            L -= V - r.height, L *= g ? 1 : -1
        }
        if (o === Ht || (o === Rt || o === Ft) && c === jn) {
            tt = zt;
            var U = E && Y === it && it.visualViewport ? it.visualViewport.width : Y[W];
            D -= U - r.width, D *= g ? 1 : -1
        }
    }
    var et = Object.assign({
            position: d
        }, b && Nu),
        rt = v === !0 ? Du({
            x: D,
            y: L
        }, Yt(n)) : {
            x: D,
            y: L
        };
    if (D = rt.x, L = rt.y, g) {
        var X;
        return Object.assign({}, et, (X = {}, X[K] = Q ? "0" : "", X[tt] = M ? "0" : "", X.transform = (it.devicePixelRatio || 1) <= 1 ? "translate(" + D + "px, " + L + "px)" : "translate3d(" + D + "px, " + L + "px, 0)", X))
    }
    return Object.assign({}, et, (t = {}, t[K] = Q ? L + "px" : "", t[tt] = M ? D + "px" : "", t.transform = "", t))
}

function Mu(e) {
    var t = e.state,
        n = e.options,
        r = n.gpuAcceleration,
        o = r === void 0 ? !0 : r,
        c = n.adaptive,
        f = c === void 0 ? !0 : c,
        d = n.roundOffsets,
        g = d === void 0 ? !0 : d,
        b = {
            placement: be(t.placement),
            variation: qn(t.placement),
            popper: t.elements.popper,
            popperRect: t.rects.popper,
            gpuAcceleration: o,
            isFixed: t.options.strategy === "fixed"
        };
    t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ko(Object.assign({}, b, {
        offsets: t.modifiersData.popperOffsets,
        position: t.options.strategy,
        adaptive: f,
        roundOffsets: g
    })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ko(Object.assign({}, b, {
        offsets: t.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: g
    })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-placement": t.placement
    })
}
const qs = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: Mu,
    data: {}
};
var Ri = {
    passive: !0
};

function Iu(e) {
    var t = e.state,
        n = e.instance,
        r = e.options,
        o = r.scroll,
        c = o === void 0 ? !0 : o,
        f = r.resize,
        d = f === void 0 ? !0 : f,
        g = Yt(t.elements.popper),
        b = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return c && b.forEach(function(v) {
            v.addEventListener("scroll", n.update, Ri)
        }), d && g.addEventListener("resize", n.update, Ri),
        function() {
            c && b.forEach(function(v) {
                v.removeEventListener("scroll", n.update, Ri)
            }), d && g.removeEventListener("resize", n.update, Ri)
        }
}
const Ws = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {},
    effect: Iu,
    data: {}
};
var Pu = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
};

function Qi(e) {
    return e.replace(/left|right|bottom|top/g, function(t) {
        return Pu[t]
    })
}
var Ru = {
    start: "end",
    end: "start"
};

function Uo(e) {
    return e.replace(/start|end/g, function(t) {
        return Ru[t]
    })
}

function Fs(e) {
    var t = Yt(e),
        n = t.pageXOffset,
        r = t.pageYOffset;
    return {
        scrollLeft: n,
        scrollTop: r
    }
}

function zs(e) {
    return Vn(Xe(e)).left + Fs(e).scrollLeft
}

function Hu(e, t) {
    var n = Yt(e),
        r = Xe(e),
        o = n.visualViewport,
        c = r.clientWidth,
        f = r.clientHeight,
        d = 0,
        g = 0;
    if (o) {
        c = o.width, f = o.height;
        var b = cc();
        (b || !b && t === "fixed") && (d = o.offsetLeft, g = o.offsetTop)
    }
    return {
        width: c,
        height: f,
        x: d + zs(e),
        y: g
    }
}

function ju(e) {
    var t, n = Xe(e),
        r = Fs(e),
        o = (t = e.ownerDocument) == null ? void 0 : t.body,
        c = dn(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
        f = dn(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0),
        d = -r.scrollLeft + zs(e),
        g = -r.scrollTop;
    return Pe(o || n).direction === "rtl" && (d += dn(n.clientWidth, o ? o.clientWidth : 0) - c), {
        width: c,
        height: f,
        x: d,
        y: g
    }
}

function Ys(e) {
    var t = Pe(e),
        n = t.overflow,
        r = t.overflowX,
        o = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + o + r)
}

function pc(e) {
    return ["html", "body", "#document"].indexOf(we(e)) >= 0 ? e.ownerDocument.body : Qt(e) && Ys(e) ? e : pc(fr(e))
}

function vi(e, t) {
    var n;
    t === void 0 && (t = []);
    var r = pc(e),
        o = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
        c = Yt(r),
        f = o ? [c].concat(c.visualViewport || [], Ys(r) ? r : []) : r,
        d = t.concat(f);
    return o ? d : d.concat(vi(fr(f)))
}

function Es(e) {
    return Object.assign({}, e, {
        left: e.x,
        top: e.y,
        right: e.x + e.width,
        bottom: e.y + e.height
    })
}

function Bu(e, t) {
    var n = Vn(e, !1, t === "fixed");
    return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n
}

function Xo(e, t, n) {
    return t === Ps ? Es(Hu(e, n)) : gn(t) ? Bu(t, n) : Es(ju(Xe(e)))
}

function Vu(e) {
    var t = vi(fr(e)),
        n = ["absolute", "fixed"].indexOf(Pe(e).position) >= 0,
        r = n && Qt(e) ? _i(e) : e;
    return gn(r) ? t.filter(function(o) {
        return gn(o) && lc(o, r) && we(o) !== "body"
    }) : []
}

function qu(e, t, n, r) {
    var o = t === "clippingParents" ? Vu(e) : [].concat(t),
        c = [].concat(o, [n]),
        f = c[0],
        d = c.reduce(function(g, b) {
            var v = Xo(e, b, r);
            return g.top = dn(v.top, g.top), g.right = ir(v.right, g.right), g.bottom = ir(v.bottom, g.bottom), g.left = dn(v.left, g.left), g
        }, Xo(e, f, r));
    return d.width = d.right - d.left, d.height = d.bottom - d.top, d.x = d.left, d.y = d.top, d
}

function gc(e) {
    var t = e.reference,
        n = e.element,
        r = e.placement,
        o = r ? be(r) : null,
        c = r ? qn(r) : null,
        f = t.x + t.width / 2 - n.width / 2,
        d = t.y + t.height / 2 - n.height / 2,
        g;
    switch (o) {
        case Rt:
            g = {
                x: f,
                y: t.y - n.height
            };
            break;
        case Ft:
            g = {
                x: f,
                y: t.y + t.height
            };
            break;
        case zt:
            g = {
                x: t.x + t.width,
                y: d
            };
            break;
        case Ht:
            g = {
                x: t.x - n.width,
                y: d
            };
            break;
        default:
            g = {
                x: t.x,
                y: t.y
            }
    }
    var b = o ? Vs(o) : null;
    if (b != null) {
        var v = b === "y" ? "height" : "width";
        switch (c) {
            case pn:
                g[b] = g[b] - (t[v] / 2 - n[v] / 2);
                break;
            case jn:
                g[b] = g[b] + (t[v] / 2 - n[v] / 2);
                break
        }
    }
    return g
}

function Wn(e, t) {
    t === void 0 && (t = {});
    var n = t,
        r = n.placement,
        o = r === void 0 ? e.placement : r,
        c = n.strategy,
        f = c === void 0 ? e.strategy : c,
        d = n.boundary,
        g = d === void 0 ? Ga : d,
        b = n.rootBoundary,
        v = b === void 0 ? Ps : b,
        E = n.elementContext,
        A = E === void 0 ? In : E,
        D = n.altBoundary,
        x = D === void 0 ? !1 : D,
        L = n.padding,
        R = L === void 0 ? 0 : L,
        M = fc(typeof R != "number" ? R : dc(R, Gn)),
        Q = A === In ? Za : In,
        tt = e.rects.popper,
        K = e.elements[x ? Q : A],
        it = qu(gn(K) ? K : K.contextElement || Xe(e.elements.popper), g, v, f),
        Y = Vn(e.elements.reference),
        l = gc({
            reference: Y,
            element: tt,
            placement: o
        }),
        W = Es(Object.assign({}, tt, l)),
        V = A === In ? W : Y,
        U = {
            top: it.top - V.top + M.top,
            bottom: V.bottom - it.bottom + M.bottom,
            left: it.left - V.left + M.left,
            right: V.right - it.right + M.right
        },
        et = e.modifiersData.offset;
    if (A === In && et) {
        var rt = et[o];
        Object.keys(U).forEach(function(X) {
            var Tt = [zt, Ft].indexOf(X) >= 0 ? 1 : -1,
                Mt = [Rt, Ft].indexOf(X) >= 0 ? "y" : "x";
            U[X] += rt[Mt] * Tt
        })
    }
    return U
}

function Wu(e, t) {
    t === void 0 && (t = {});
    var n = t,
        r = n.placement,
        o = n.boundary,
        c = n.rootBoundary,
        f = n.padding,
        d = n.flipVariations,
        g = n.allowedAutoPlacements,
        b = g === void 0 ? Rs : g,
        v = qn(r),
        E = v ? d ? _s : _s.filter(function(x) {
            return qn(x) === v
        }) : Gn,
        A = E.filter(function(x) {
            return b.indexOf(x) >= 0
        });
    A.length === 0 && (A = E);
    var D = A.reduce(function(x, L) {
        return x[L] = Wn(e, {
            placement: L,
            boundary: o,
            rootBoundary: c,
            padding: f
        })[be(L)], x
    }, {});
    return Object.keys(D).sort(function(x, L) {
        return D[x] - D[L]
    })
}

function Fu(e) {
    if (be(e) === ur) return [];
    var t = Qi(e);
    return [Uo(e), t, Uo(t)]
}

function zu(e) {
    var t = e.state,
        n = e.options,
        r = e.name;
    if (!t.modifiersData[r]._skip) {
        for (var o = n.mainAxis, c = o === void 0 ? !0 : o, f = n.altAxis, d = f === void 0 ? !0 : f, g = n.fallbackPlacements, b = n.padding, v = n.boundary, E = n.rootBoundary, A = n.altBoundary, D = n.flipVariations, x = D === void 0 ? !0 : D, L = n.allowedAutoPlacements, R = t.options.placement, M = be(R), Q = M === R, tt = g || (Q || !x ? [Qi(R)] : Fu(R)), K = [R].concat(tt).reduce(function(Ee, de) {
                return Ee.concat(be(de) === ur ? Wu(t, {
                    placement: de,
                    boundary: v,
                    rootBoundary: E,
                    padding: b,
                    flipVariations: x,
                    allowedAutoPlacements: L
                }) : de)
            }, []), it = t.rects.reference, Y = t.rects.popper, l = new Map, W = !0, V = K[0], U = 0; U < K.length; U++) {
            var et = K[U],
                rt = be(et),
                X = qn(et) === pn,
                Tt = [Rt, Ft].indexOf(rt) >= 0,
                Mt = Tt ? "width" : "height",
                At = Wn(t, {
                    placement: et,
                    boundary: v,
                    rootBoundary: E,
                    altBoundary: A,
                    padding: b
                }),
                yt = Tt ? X ? zt : Ht : X ? Ft : Rt;
            it[Mt] > Y[Mt] && (yt = Qi(yt));
            var re = Qi(yt),
                Lt = [];
            if (c && Lt.push(At[rt] <= 0), d && Lt.push(At[yt] <= 0, At[re] <= 0), Lt.every(function(Ee) {
                    return Ee
                })) {
                V = et, W = !1;
                break
            }
            l.set(et, Lt)
        }
        if (W)
            for (var He = x ? 3 : 1, je = function(de) {
                    var en = K.find(function(bn) {
                        var Te = l.get(bn);
                        if (Te) return Te.slice(0, de).every(function(yn) {
                            return yn
                        })
                    });
                    if (en) return V = en, "break"
                }, fe = He; fe > 0; fe--) {
                var Kt = je(fe);
                if (Kt === "break") break
            }
        t.placement !== V && (t.modifiersData[r]._skip = !0, t.placement = V, t.reset = !0)
    }
}
const mc = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: zu,
    requiresIfExists: ["offset"],
    data: {
        _skip: !1
    }
};

function Go(e, t, n) {
    return n === void 0 && (n = {
        x: 0,
        y: 0
    }), {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x
    }
}

function Zo(e) {
    return [Rt, zt, Ft, Ht].some(function(t) {
        return e[t] >= 0
    })
}

function Yu(e) {
    var t = e.state,
        n = e.name,
        r = t.rects.reference,
        o = t.rects.popper,
        c = t.modifiersData.preventOverflow,
        f = Wn(t, {
            elementContext: "reference"
        }),
        d = Wn(t, {
            altBoundary: !0
        }),
        g = Go(f, r),
        b = Go(d, o, c),
        v = Zo(g),
        E = Zo(b);
    t.modifiersData[n] = {
        referenceClippingOffsets: g,
        popperEscapeOffsets: b,
        isReferenceHidden: v,
        hasPopperEscaped: E
    }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-reference-hidden": v,
        "data-popper-escaped": E
    })
}
const vc = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: Yu
};

function Ku(e, t, n) {
    var r = be(e),
        o = [Ht, Rt].indexOf(r) >= 0 ? -1 : 1,
        c = typeof n == "function" ? n(Object.assign({}, t, {
            placement: e
        })) : n,
        f = c[0],
        d = c[1];
    return f = f || 0, d = (d || 0) * o, [Ht, zt].indexOf(r) >= 0 ? {
        x: d,
        y: f
    } : {
        x: f,
        y: d
    }
}

function Uu(e) {
    var t = e.state,
        n = e.options,
        r = e.name,
        o = n.offset,
        c = o === void 0 ? [0, 0] : o,
        f = Rs.reduce(function(v, E) {
            return v[E] = Ku(E, t.rects, c), v
        }, {}),
        d = f[t.placement],
        g = d.x,
        b = d.y;
    t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += g, t.modifiersData.popperOffsets.y += b), t.modifiersData[r] = f
}
const bc = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: Uu
};

function Xu(e) {
    var t = e.state,
        n = e.name;
    t.modifiersData[n] = gc({
        reference: t.rects.reference,
        element: t.rects.popper,
        placement: t.placement
    })
}
const Ks = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: Xu,
    data: {}
};

function Gu(e) {
    return e === "x" ? "y" : "x"
}

function Zu(e) {
    var t = e.state,
        n = e.options,
        r = e.name,
        o = n.mainAxis,
        c = o === void 0 ? !0 : o,
        f = n.altAxis,
        d = f === void 0 ? !1 : f,
        g = n.boundary,
        b = n.rootBoundary,
        v = n.altBoundary,
        E = n.padding,
        A = n.tether,
        D = A === void 0 ? !0 : A,
        x = n.tetherOffset,
        L = x === void 0 ? 0 : x,
        R = Wn(t, {
            boundary: g,
            rootBoundary: b,
            padding: E,
            altBoundary: v
        }),
        M = be(t.placement),
        Q = qn(t.placement),
        tt = !Q,
        K = Vs(M),
        it = Gu(K),
        Y = t.modifiersData.popperOffsets,
        l = t.rects.reference,
        W = t.rects.popper,
        V = typeof L == "function" ? L(Object.assign({}, t.rects, {
            placement: t.placement
        })) : L,
        U = typeof V == "number" ? {
            mainAxis: V,
            altAxis: V
        } : Object.assign({
            mainAxis: 0,
            altAxis: 0
        }, V),
        et = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        rt = {
            x: 0,
            y: 0
        };
    if (Y) {
        if (c) {
            var X, Tt = K === "y" ? Rt : Ht,
                Mt = K === "y" ? Ft : zt,
                At = K === "y" ? "height" : "width",
                yt = Y[K],
                re = yt + R[Tt],
                Lt = yt - R[Mt],
                He = D ? -W[At] / 2 : 0,
                je = Q === pn ? l[At] : W[At],
                fe = Q === pn ? -W[At] : -l[At],
                Kt = t.elements.arrow,
                Ee = D && Kt ? Bs(Kt) : {
                    width: 0,
                    height: 0
                },
                de = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : uc(),
                en = de[Tt],
                bn = de[Mt],
                Te = mi(0, l[At], Ee[At]),
                yn = tt ? l[At] / 2 - He - Te - en - U.mainAxis : je - Te - en - U.mainAxis,
                Ut = tt ? -l[At] / 2 + He + Te + bn + U.mainAxis : fe + Te + bn + U.mainAxis,
                ri = t.elements.arrow && _i(t.elements.arrow),
                Be = ri ? K === "y" ? ri.clientTop || 0 : ri.clientLeft || 0 : 0,
                nn = (X = et == null ? void 0 : et[K]) != null ? X : 0,
                Ci = yt + yn - nn - Be,
                Tr = yt + Ut - nn,
                _n = mi(D ? ir(re, Ci) : re, yt, D ? dn(Lt, Tr) : Lt);
            Y[K] = _n, rt[K] = _n - yt
        }
        if (d) {
            var rn, se = K === "x" ? Rt : Ht,
                Ar = K === "x" ? Ft : zt,
                Ae = Y[it],
                wn = it === "y" ? "height" : "width",
                Wt = Ae + R[se],
                Ve = Ae - R[Ar],
                Ce = [Rt, Ht].indexOf(M) !== -1,
                G = (rn = et == null ? void 0 : et[it]) != null ? rn : 0,
                St = Ce ? Wt : Ae - l[wn] - W[wn] - G + U.altAxis,
                $i = Ce ? Ae + l[wn] + W[wn] - G - U.altAxis : Ve,
                xi = D && Ce ? Su(St, Ae, $i) : mi(D ? St : Wt, Ae, D ? $i : Ve);
            Y[it] = xi, rt[it] = xi - Ae
        }
        t.modifiersData[r] = rt
    }
}
const yc = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: Zu,
    requiresIfExists: ["offset"]
};

function Qu(e) {
    return {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
    }
}

function Ju(e) {
    return e === Yt(e) || !Qt(e) ? Fs(e) : Qu(e)
}

function tf(e) {
    var t = e.getBoundingClientRect(),
        n = Bn(t.width) / e.offsetWidth || 1,
        r = Bn(t.height) / e.offsetHeight || 1;
    return n !== 1 || r !== 1
}

function ef(e, t, n) {
    n === void 0 && (n = !1);
    var r = Qt(t),
        o = Qt(t) && tf(t),
        c = Xe(t),
        f = Vn(e, o, n),
        d = {
            scrollLeft: 0,
            scrollTop: 0
        },
        g = {
            x: 0,
            y: 0
        };
    return (r || !r && !n) && ((we(t) !== "body" || Ys(c)) && (d = Ju(t)), Qt(t) ? (g = Vn(t, !0), g.x += t.clientLeft, g.y += t.clientTop) : c && (g.x = zs(c))), {
        x: f.left + d.scrollLeft - g.x,
        y: f.top + d.scrollTop - g.y,
        width: f.width,
        height: f.height
    }
}

function nf(e) {
    var t = new Map,
        n = new Set,
        r = [];
    e.forEach(function(c) {
        t.set(c.name, c)
    });

    function o(c) {
        n.add(c.name);
        var f = [].concat(c.requires || [], c.requiresIfExists || []);
        f.forEach(function(d) {
            if (!n.has(d)) {
                var g = t.get(d);
                g && o(g)
            }
        }), r.push(c)
    }
    return e.forEach(function(c) {
        n.has(c.name) || o(c)
    }), r
}

function rf(e) {
    var t = nf(e);
    return ac.reduce(function(n, r) {
        return n.concat(t.filter(function(o) {
            return o.phase === r
        }))
    }, [])
}

function sf(e) {
    var t;
    return function() {
        return t || (t = new Promise(function(n) {
            Promise.resolve().then(function() {
                t = void 0, n(e())
            })
        })), t
    }
}

function of (e) {
    var t = e.reduce(function(n, r) {
        var o = n[r.name];
        return n[r.name] = o ? Object.assign({}, o, r, {
            options: Object.assign({}, o.options, r.options),
            data: Object.assign({}, o.data, r.data)
        }) : r, n
    }, {});
    return Object.keys(t).map(function(n) {
        return t[n]
    })
}
var Qo = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};

function Jo() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return !t.some(function(r) {
        return !(r && typeof r.getBoundingClientRect == "function")
    })
}

function dr(e) {
    e === void 0 && (e = {});
    var t = e,
        n = t.defaultModifiers,
        r = n === void 0 ? [] : n,
        o = t.defaultOptions,
        c = o === void 0 ? Qo : o;
    return function(d, g, b) {
        b === void 0 && (b = c);
        var v = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, Qo, c),
                modifiersData: {},
                elements: {
                    reference: d,
                    popper: g
                },
                attributes: {},
                styles: {}
            },
            E = [],
            A = !1,
            D = {
                state: v,
                setOptions: function(M) {
                    var Q = typeof M == "function" ? M(v.options) : M;
                    L(), v.options = Object.assign({}, c, v.options, Q), v.scrollParents = {
                        reference: gn(d) ? vi(d) : d.contextElement ? vi(d.contextElement) : [],
                        popper: vi(g)
                    };
                    var tt = rf( of ([].concat(r, v.options.modifiers)));
                    return v.orderedModifiers = tt.filter(function(K) {
                        return K.enabled
                    }), x(), D.update()
                },
                forceUpdate: function() {
                    if (!A) {
                        var M = v.elements,
                            Q = M.reference,
                            tt = M.popper;
                        if (Jo(Q, tt)) {
                            v.rects = {
                                reference: ef(Q, _i(tt), v.options.strategy === "fixed"),
                                popper: Bs(tt)
                            }, v.reset = !1, v.placement = v.options.placement, v.orderedModifiers.forEach(function(U) {
                                return v.modifiersData[U.name] = Object.assign({}, U.data)
                            });
                            for (var K = 0; K < v.orderedModifiers.length; K++) {
                                if (v.reset === !0) {
                                    v.reset = !1, K = -1;
                                    continue
                                }
                                var it = v.orderedModifiers[K],
                                    Y = it.fn,
                                    l = it.options,
                                    W = l === void 0 ? {} : l,
                                    V = it.name;
                                typeof Y == "function" && (v = Y({
                                    state: v,
                                    options: W,
                                    name: V,
                                    instance: D
                                }) || v)
                            }
                        }
                    }
                },
                update: sf(function() {
                    return new Promise(function(R) {
                        D.forceUpdate(), R(v)
                    })
                }),
                destroy: function() {
                    L(), A = !0
                }
            };
        if (!Jo(d, g)) return D;
        D.setOptions(b).then(function(R) {
            !A && b.onFirstUpdate && b.onFirstUpdate(R)
        });

        function x() {
            v.orderedModifiers.forEach(function(R) {
                var M = R.name,
                    Q = R.options,
                    tt = Q === void 0 ? {} : Q,
                    K = R.effect;
                if (typeof K == "function") {
                    var it = K({
                            state: v,
                            name: M,
                            instance: D,
                            options: tt
                        }),
                        Y = function() {};
                    E.push(it || Y)
                }
            })
        }

        function L() {
            E.forEach(function(R) {
                return R()
            }), E = []
        }
        return D
    }
}
var af = dr(),
    cf = [Ws, Ks, qs, js],
    lf = dr({
        defaultModifiers: cf
    }),
    uf = [Ws, Ks, qs, js, bc, mc, yc, hc, vc],
    Us = dr({
        defaultModifiers: uf
    });
const _c = Object.freeze(Object.defineProperty({
    __proto__: null,
    afterMain: ic,
    afterRead: tc,
    afterWrite: oc,
    applyStyles: js,
    arrow: hc,
    auto: ur,
    basePlacements: Gn,
    beforeMain: ec,
    beforeRead: Qa,
    beforeWrite: rc,
    bottom: Ft,
    clippingParents: Ga,
    computeStyles: qs,
    createPopper: Us,
    createPopperBase: af,
    createPopperLite: lf,
    detectOverflow: Wn,
    end: jn,
    eventListeners: Ws,
    flip: mc,
    hide: vc,
    left: Ht,
    main: nc,
    modifierPhases: ac,
    offset: bc,
    placements: Rs,
    popper: In,
    popperGenerator: dr,
    popperOffsets: Ks,
    preventOverflow: yc,
    read: Ja,
    reference: Za,
    right: zt,
    start: pn,
    top: Rt,
    variationPlacements: _s,
    viewport: Ps,
    write: sc
}, Symbol.toStringTag, {
    value: "Module"
}));
/*!
 * Bootstrap v5.3.7 (https://getbootstrap.com/)
 * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
const ze = new Map,
    Yr = {
        set(e, t, n) {
            ze.has(e) || ze.set(e, new Map);
            const r = ze.get(e);
            if (!r.has(t) && r.size !== 0) {
                console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
                return
            }
            r.set(t, n)
        },
        get(e, t) {
            return ze.has(e) && ze.get(e).get(t) || null
        },
        remove(e, t) {
            if (!ze.has(e)) return;
            const n = ze.get(e);
            n.delete(t), n.size === 0 && ze.delete(e)
        }
    },
    ff = 1e6,
    df = 1e3,
    Ts = "transitionend",
    wc = e => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)), e),
    hf = e => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(),
    pf = e => {
        do e += Math.floor(Math.random() * ff); while (document.getElementById(e));
        return e
    },
    gf = e => {
        if (!e) return 0;
        let {
            transitionDuration: t,
            transitionDelay: n
        } = window.getComputedStyle(e);
        const r = Number.parseFloat(t),
            o = Number.parseFloat(n);
        return !r && !o ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * df)
    },
    Ec = e => {
        e.dispatchEvent(new Event(Ts))
    },
    Ne = e => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"),
    Ye = e => Ne(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(wc(e)) : null,
    Zn = e => {
        if (!Ne(e) || e.getClientRects().length === 0) return !1;
        const t = getComputedStyle(e).getPropertyValue("visibility") === "visible",
            n = e.closest("details:not([open])");
        if (!n) return t;
        if (n !== e) {
            const r = e.closest("summary");
            if (r && r.parentNode !== n || r === null) return !1
        }
        return t
    },
    Ke = e => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false",
    Tc = e => {
        if (!document.documentElement.attachShadow) return null;
        if (typeof e.getRootNode == "function") {
            const t = e.getRootNode();
            return t instanceof ShadowRoot ? t : null
        }
        return e instanceof ShadowRoot ? e : e.parentNode ? Tc(e.parentNode) : null
    },
    rr = () => {},
    wi = e => {
        e.offsetHeight
    },
    Ac = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
    Kr = [],
    mf = e => {
        document.readyState === "loading" ? (Kr.length || document.addEventListener("DOMContentLoaded", () => {
            for (const t of Kr) t()
        }), Kr.push(e)) : e()
    },
    te = () => document.documentElement.dir === "rtl",
    ie = e => {
        mf(() => {
            const t = Ac();
            if (t) {
                const n = e.NAME,
                    r = t.fn[n];
                t.fn[n] = e.jQueryInterface, t.fn[n].Constructor = e, t.fn[n].noConflict = () => (t.fn[n] = r, e.jQueryInterface)
            }
        })
    },
    qt = (e, t = [], n = e) => typeof e == "function" ? e.call(...t) : n,
    Cc = (e, t, n = !0) => {
        if (!n) {
            qt(e);
            return
        }
        const o = gf(t) + 5;
        let c = !1;
        const f = ({
            target: d
        }) => {
            d === t && (c = !0, t.removeEventListener(Ts, f), qt(e))
        };
        t.addEventListener(Ts, f), setTimeout(() => {
            c || Ec(t)
        }, o)
    },
    Xs = (e, t, n, r) => {
        const o = e.length;
        let c = e.indexOf(t);
        return c === -1 ? !n && r ? e[o - 1] : e[0] : (c += n ? 1 : -1, r && (c = (c + o) % o), e[Math.max(0, Math.min(c, o - 1))])
    },
    vf = /[^.]*(?=\..*)\.|.*/,
    bf = /\..*/,
    yf = /::\d+$/,
    Ur = {};
let ta = 1;
const $c = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    _f = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

function xc(e, t) {
    return t && `${t}::${ta++}` || e.uidEvent || ta++
}

function Sc(e) {
    const t = xc(e);
    return e.uidEvent = t, Ur[t] = Ur[t] || {}, Ur[t]
}

function wf(e, t) {
    return function n(r) {
        return Gs(r, {
            delegateTarget: e
        }), n.oneOff && H.off(e, r.type, t), t.apply(e, [r])
    }
}

function Ef(e, t, n) {
    return function r(o) {
        const c = e.querySelectorAll(t);
        for (let {
                target: f
            } = o; f && f !== this; f = f.parentNode)
            for (const d of c)
                if (d === f) return Gs(o, {
                    delegateTarget: f
                }), r.oneOff && H.off(e, o.type, t, n), n.apply(f, [o])
    }
}

function Oc(e, t, n = null) {
    return Object.values(e).find(r => r.callable === t && r.delegationSelector === n)
}

function kc(e, t, n) {
    const r = typeof t == "string",
        o = r ? n : t || n;
    let c = Lc(e);
    return _f.has(c) || (c = e), [r, o, c]
}

function ea(e, t, n, r, o) {
    if (typeof t != "string" || !e) return;
    let [c, f, d] = kc(t, n, r);
    t in $c && (f = (x => function(L) {
        if (!L.relatedTarget || L.relatedTarget !== L.delegateTarget && !L.delegateTarget.contains(L.relatedTarget)) return x.call(this, L)
    })(f));
    const g = Sc(e),
        b = g[d] || (g[d] = {}),
        v = Oc(b, f, c ? n : null);
    if (v) {
        v.oneOff = v.oneOff && o;
        return
    }
    const E = xc(f, t.replace(vf, "")),
        A = c ? Ef(e, n, f) : wf(e, f);
    A.delegationSelector = c ? n : null, A.callable = f, A.oneOff = o, A.uidEvent = E, b[E] = A, e.addEventListener(d, A, c)
}

function As(e, t, n, r, o) {
    const c = Oc(t[n], r, o);
    c && (e.removeEventListener(n, c, !!o), delete t[n][c.uidEvent])
}

function Tf(e, t, n, r) {
    const o = t[n] || {};
    for (const [c, f] of Object.entries(o)) c.includes(r) && As(e, t, n, f.callable, f.delegationSelector)
}

function Lc(e) {
    return e = e.replace(bf, ""), $c[e] || e
}
const H = {
    on(e, t, n, r) {
        ea(e, t, n, r, !1)
    },
    one(e, t, n, r) {
        ea(e, t, n, r, !0)
    },
    off(e, t, n, r) {
        if (typeof t != "string" || !e) return;
        const [o, c, f] = kc(t, n, r), d = f !== t, g = Sc(e), b = g[f] || {}, v = t.startsWith(".");
        if (typeof c < "u") {
            if (!Object.keys(b).length) return;
            As(e, g, f, c, o ? n : null);
            return
        }
        if (v)
            for (const E of Object.keys(g)) Tf(e, g, E, t.slice(1));
        for (const [E, A] of Object.entries(b)) {
            const D = E.replace(yf, "");
            (!d || t.includes(D)) && As(e, g, f, A.callable, A.delegationSelector)
        }
    },
    trigger(e, t, n) {
        if (typeof t != "string" || !e) return null;
        const r = Ac(),
            o = Lc(t),
            c = t !== o;
        let f = null,
            d = !0,
            g = !0,
            b = !1;
        c && r && (f = r.Event(t, n), r(e).trigger(f), d = !f.isPropagationStopped(), g = !f.isImmediatePropagationStopped(), b = f.isDefaultPrevented());
        const v = Gs(new Event(t, {
            bubbles: d,
            cancelable: !0
        }), n);
        return b && v.preventDefault(), g && e.dispatchEvent(v), v.defaultPrevented && f && f.preventDefault(), v
    }
};

function Gs(e, t = {}) {
    for (const [n, r] of Object.entries(t)) try {
        e[n] = r
    } catch {
        Object.defineProperty(e, n, {
            configurable: !0,
            get() {
                return r
            }
        })
    }
    return e
}

function na(e) {
    if (e === "true") return !0;
    if (e === "false") return !1;
    if (e === Number(e).toString()) return Number(e);
    if (e === "" || e === "null") return null;
    if (typeof e != "string") return e;
    try {
        return JSON.parse(decodeURIComponent(e))
    } catch {
        return e
    }
}

function Xr(e) {
    return e.replace(/[A-Z]/g, t => `-${t.toLowerCase()}`)
}
const De = {
    setDataAttribute(e, t, n) {
        e.setAttribute(`data-bs-${Xr(t)}`, n)
    },
    removeDataAttribute(e, t) {
        e.removeAttribute(`data-bs-${Xr(t)}`)
    },
    getDataAttributes(e) {
        if (!e) return {};
        const t = {},
            n = Object.keys(e.dataset).filter(r => r.startsWith("bs") && !r.startsWith("bsConfig"));
        for (const r of n) {
            let o = r.replace(/^bs/, "");
            o = o.charAt(0).toLowerCase() + o.slice(1), t[o] = na(e.dataset[r])
        }
        return t
    },
    getDataAttribute(e, t) {
        return na(e.getAttribute(`data-bs-${Xr(t)}`))
    }
};
class Ei {
    static get Default() {
        return {}
    }
    static get DefaultType() {
        return {}
    }
    static get NAME() {
        throw new Error('You have to implement the static method "NAME", for each component!')
    }
    _getConfig(t) {
        return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
    }
    _configAfterMerge(t) {
        return t
    }
    _mergeConfigObj(t, n) {
        const r = Ne(n) ? De.getDataAttribute(n, "config") : {};
        return {
            ...this.constructor.Default,
            ...typeof r == "object" ? r : {},
            ...Ne(n) ? De.getDataAttributes(n) : {},
            ...typeof t == "object" ? t : {}
        }
    }
    _typeCheckConfig(t, n = this.constructor.DefaultType) {
        for (const [r, o] of Object.entries(n)) {
            const c = t[r],
                f = Ne(c) ? "element" : hf(c);
            if (!new RegExp(o).test(f)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${f}" but expected type "${o}".`)
        }
    }
}
const Af = "5.3.7";
class ue extends Ei {
    constructor(t, n) {
        super(), t = Ye(t), t && (this._element = t, this._config = this._getConfig(n), Yr.set(this._element, this.constructor.DATA_KEY, this))
    }
    dispose() {
        Yr.remove(this._element, this.constructor.DATA_KEY), H.off(this._element, this.constructor.EVENT_KEY);
        for (const t of Object.getOwnPropertyNames(this)) this[t] = null
    }
    _queueCallback(t, n, r = !0) {
        Cc(t, n, r)
    }
    _getConfig(t) {
        return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
    }
    static getInstance(t) {
        return Yr.get(Ye(t), this.DATA_KEY)
    }
    static getOrCreateInstance(t, n = {}) {
        return this.getInstance(t) || new this(t, typeof n == "object" ? n : null)
    }
    static get VERSION() {
        return Af
    }
    static get DATA_KEY() {
        return `bs.${this.NAME}`
    }
    static get EVENT_KEY() {
        return `.${this.DATA_KEY}`
    }
    static eventName(t) {
        return `${t}${this.EVENT_KEY}`
    }
}
const Gr = e => {
        let t = e.getAttribute("data-bs-target");
        if (!t || t === "#") {
            let n = e.getAttribute("href");
            if (!n || !n.includes("#") && !n.startsWith(".")) return null;
            n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), t = n && n !== "#" ? n.trim() : null
        }
        return t ? t.split(",").map(n => wc(n)).join(",") : null
    },
    J = {
        find(e, t = document.documentElement) {
            return [].concat(...Element.prototype.querySelectorAll.call(t, e))
        },
        findOne(e, t = document.documentElement) {
            return Element.prototype.querySelector.call(t, e)
        },
        children(e, t) {
            return [].concat(...e.children).filter(n => n.matches(t))
        },
        parents(e, t) {
            const n = [];
            let r = e.parentNode.closest(t);
            for (; r;) n.push(r), r = r.parentNode.closest(t);
            return n
        },
        prev(e, t) {
            let n = e.previousElementSibling;
            for (; n;) {
                if (n.matches(t)) return [n];
                n = n.previousElementSibling
            }
            return []
        },
        next(e, t) {
            let n = e.nextElementSibling;
            for (; n;) {
                if (n.matches(t)) return [n];
                n = n.nextElementSibling
            }
            return []
        },
        focusableChildren(e) {
            const t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(n => `${n}:not([tabindex^="-"])`).join(",");
            return this.find(t, e).filter(n => !Ke(n) && Zn(n))
        },
        getSelectorFromElement(e) {
            const t = Gr(e);
            return t && J.findOne(t) ? t : null
        },
        getElementFromSelector(e) {
            const t = Gr(e);
            return t ? J.findOne(t) : null
        },
        getMultipleElementsFromSelector(e) {
            const t = Gr(e);
            return t ? J.find(t) : []
        }
    },
    hr = (e, t = "hide") => {
        const n = `click.dismiss${e.EVENT_KEY}`,
            r = e.NAME;
        H.on(document, n, `[data-bs-dismiss="${r}"]`, function(o) {
            if (["A", "AREA"].includes(this.tagName) && o.preventDefault(), Ke(this)) return;
            const c = J.getElementFromSelector(this) || this.closest(`.${r}`);
            e.getOrCreateInstance(c)[t]()
        })
    },
    Cf = "alert",
    $f = "bs.alert",
    Nc = `.${$f}`,
    xf = `close${Nc}`,
    Sf = `closed${Nc}`,
    Of = "fade",
    kf = "show";
class pr extends ue {
    static get NAME() {
        return Cf
    }
    close() {
        if (H.trigger(this._element, xf).defaultPrevented) return;
        this._element.classList.remove(kf);
        const n = this._element.classList.contains(Of);
        this._queueCallback(() => this._destroyElement(), this._element, n)
    }
    _destroyElement() {
        this._element.remove(), H.trigger(this._element, Sf), this.dispose()
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const n = pr.getOrCreateInstance(this);
            if (typeof t == "string") {
                if (n[t] === void 0 || t.startsWith("_") || t === "constructor") throw new TypeError(`No method named "${t}"`);
                n[t](this)
            }
        })
    }
}
hr(pr, "close");
ie(pr);
const Lf = "button",
    Nf = "bs.button",
    Df = `.${Nf}`,
    Mf = ".data-api",
    If = "active",
    ia = '[data-bs-toggle="button"]',
    Pf = `click${Df}${Mf}`;
class gr extends ue {
    static get NAME() {
        return Lf
    }
    toggle() {
        this._element.setAttribute("aria-pressed", this._element.classList.toggle(If))
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const n = gr.getOrCreateInstance(this);
            t === "toggle" && n[t]()
        })
    }
}
H.on(document, Pf, ia, e => {
    e.preventDefault();
    const t = e.target.closest(ia);
    gr.getOrCreateInstance(t).toggle()
});
ie(gr);
const Rf = "swipe",
    Qn = ".bs.swipe",
    Hf = `touchstart${Qn}`,
    jf = `touchmove${Qn}`,
    Bf = `touchend${Qn}`,
    Vf = `pointerdown${Qn}`,
    qf = `pointerup${Qn}`,
    Wf = "touch",
    Ff = "pen",
    zf = "pointer-event",
    Yf = 40,
    Kf = {
        endCallback: null,
        leftCallback: null,
        rightCallback: null
    },
    Uf = {
        endCallback: "(function|null)",
        leftCallback: "(function|null)",
        rightCallback: "(function|null)"
    };
let ra = class Dc extends Ei {
    constructor(t, n) {
        super(), this._element = t, !(!t || !Dc.isSupported()) && (this._config = this._getConfig(n), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents())
    }
    static get Default() {
        return Kf
    }
    static get DefaultType() {
        return Uf
    }
    static get NAME() {
        return Rf
    }
    dispose() {
        H.off(this._element, Qn)
    }
    _start(t) {
        if (!this._supportPointerEvents) {
            this._deltaX = t.touches[0].clientX;
            return
        }
        this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX)
    }
    _end(t) {
        this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), qt(this._config.endCallback)
    }
    _move(t) {
        this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX
    }
    _handleSwipe() {
        const t = Math.abs(this._deltaX);
        if (t <= Yf) return;
        const n = t / this._deltaX;
        this._deltaX = 0, n && qt(n > 0 ? this._config.rightCallback : this._config.leftCallback)
    }
    _initEvents() {
        this._supportPointerEvents ? (H.on(this._element, Vf, t => this._start(t)), H.on(this._element, qf, t => this._end(t)), this._element.classList.add(zf)) : (H.on(this._element, Hf, t => this._start(t)), H.on(this._element, jf, t => this._move(t)), H.on(this._element, Bf, t => this._end(t)))
    }
    _eventIsPointerPenTouch(t) {
        return this._supportPointerEvents && (t.pointerType === Ff || t.pointerType === Wf)
    }
    static isSupported() {
        return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
    }
};
const Xf = "carousel",
    Gf = "bs.carousel",
    Ge = `.${Gf}`,
    Mc = ".data-api",
    Zf = "ArrowLeft",
    Qf = "ArrowRight",
    Jf = 500,
    pi = "next",
    kn = "prev",
    Pn = "left",
    Ji = "right",
    td = `slide${Ge}`,
    Zr = `slid${Ge}`,
    ed = `keydown${Ge}`,
    nd = `mouseenter${Ge}`,
    id = `mouseleave${Ge}`,
    rd = `dragstart${Ge}`,
    sd = `load${Ge}${Mc}`,
    od = `click${Ge}${Mc}`,
    Ic = "carousel",
    Hi = "active",
    ad = "slide",
    cd = "carousel-item-end",
    ld = "carousel-item-start",
    ud = "carousel-item-next",
    fd = "carousel-item-prev",
    Pc = ".active",
    Rc = ".carousel-item",
    dd = Pc + Rc,
    hd = ".carousel-item img",
    pd = ".carousel-indicators",
    gd = "[data-bs-slide], [data-bs-slide-to]",
    md = '[data-bs-ride="carousel"]',
    vd = {
        [Zf]: Ji,
        [Qf]: Pn
    },
    bd = {
        interval: 5e3,
        keyboard: !0,
        pause: "hover",
        ride: !1,
        touch: !0,
        wrap: !0
    },
    yd = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        pause: "(string|boolean)",
        ride: "(boolean|string)",
        touch: "boolean",
        wrap: "boolean"
    };
class Ti extends ue {
    constructor(t, n) {
        super(t, n), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = J.findOne(pd, this._element), this._addEventListeners(), this._config.ride === Ic && this.cycle()
    }
    static get Default() {
        return bd
    }
    static get DefaultType() {
        return yd
    }
    static get NAME() {
        return Xf
    }
    next() {
        this._slide(pi)
    }
    nextWhenVisible() {
        !document.hidden && Zn(this._element) && this.next()
    }
    prev() {
        this._slide(kn)
    }
    pause() {
        this._isSliding && Ec(this._element), this._clearInterval()
    }
    cycle() {
        this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval)
    }
    _maybeEnableCycle() {
        if (this._config.ride) {
            if (this._isSliding) {
                H.one(this._element, Zr, () => this.cycle());
                return
            }
            this.cycle()
        }
    }
    to(t) {
        const n = this._getItems();
        if (t > n.length - 1 || t < 0) return;
        if (this._isSliding) {
            H.one(this._element, Zr, () => this.to(t));
            return
        }
        const r = this._getItemIndex(this._getActive());
        if (r === t) return;
        const o = t > r ? pi : kn;
        this._slide(o, n[t])
    }
    dispose() {
        this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
    }
    _configAfterMerge(t) {
        return t.defaultInterval = t.interval, t
    }
    _addEventListeners() {
        this._config.keyboard && H.on(this._element, ed, t => this._keydown(t)), this._config.pause === "hover" && (H.on(this._element, nd, () => this.pause()), H.on(this._element, id, () => this._maybeEnableCycle())), this._config.touch && ra.isSupported() && this._addTouchEventListeners()
    }
    _addTouchEventListeners() {
        for (const r of J.find(hd, this._element)) H.on(r, rd, o => o.preventDefault());
        const n = {
            leftCallback: () => this._slide(this._directionToOrder(Pn)),
            rightCallback: () => this._slide(this._directionToOrder(Ji)),
            endCallback: () => {
                this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), Jf + this._config.interval))
            }
        };
        this._swipeHelper = new ra(this._element, n)
    }
    _keydown(t) {
        if (/input|textarea/i.test(t.target.tagName)) return;
        const n = vd[t.key];
        n && (t.preventDefault(), this._slide(this._directionToOrder(n)))
    }
    _getItemIndex(t) {
        return this._getItems().indexOf(t)
    }
    _setActiveIndicatorElement(t) {
        if (!this._indicatorsElement) return;
        const n = J.findOne(Pc, this._indicatorsElement);
        n.classList.remove(Hi), n.removeAttribute("aria-current");
        const r = J.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
        r && (r.classList.add(Hi), r.setAttribute("aria-current", "true"))
    }
    _updateInterval() {
        const t = this._activeElement || this._getActive();
        if (!t) return;
        const n = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
        this._config.interval = n || this._config.defaultInterval
    }
    _slide(t, n = null) {
        if (this._isSliding) return;
        const r = this._getActive(),
            o = t === pi,
            c = n || Xs(this._getItems(), r, o, this._config.wrap);
        if (c === r) return;
        const f = this._getItemIndex(c),
            d = D => H.trigger(this._element, D, {
                relatedTarget: c,
                direction: this._orderToDirection(t),
                from: this._getItemIndex(r),
                to: f
            });
        if (d(td).defaultPrevented || !r || !c) return;
        const b = !!this._interval;
        this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(f), this._activeElement = c;
        const v = o ? ld : cd,
            E = o ? ud : fd;
        c.classList.add(E), wi(c), r.classList.add(v), c.classList.add(v);
        const A = () => {
            c.classList.remove(v, E), c.classList.add(Hi), r.classList.remove(Hi, E, v), this._isSliding = !1, d(Zr)
        };
        this._queueCallback(A, r, this._isAnimated()), b && this.cycle()
    }
    _isAnimated() {
        return this._element.classList.contains(ad)
    }
    _getActive() {
        return J.findOne(dd, this._element)
    }
    _getItems() {
        return J.find(Rc, this._element)
    }
    _clearInterval() {
        this._interval && (clearInterval(this._interval), this._interval = null)
    }
    _directionToOrder(t) {
        return te() ? t === Pn ? kn : pi : t === Pn ? pi : kn
    }
    _orderToDirection(t) {
        return te() ? t === kn ? Pn : Ji : t === kn ? Ji : Pn
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const n = Ti.getOrCreateInstance(this, t);
            if (typeof t == "number") {
                n.to(t);
                return
            }
            if (typeof t == "string") {
                if (n[t] === void 0 || t.startsWith("_") || t === "constructor") throw new TypeError(`No method named "${t}"`);
                n[t]()
            }
        })
    }
}
H.on(document, od, gd, function(e) {
    const t = J.getElementFromSelector(this);
    if (!t || !t.classList.contains(Ic)) return;
    e.preventDefault();
    const n = Ti.getOrCreateInstance(t),
        r = this.getAttribute("data-bs-slide-to");
    if (r) {
        n.to(r), n._maybeEnableCycle();
        return
    }
    if (De.getDataAttribute(this, "slide") === "next") {
        n.next(), n._maybeEnableCycle();
        return
    }
    n.prev(), n._maybeEnableCycle()
});
H.on(window, sd, () => {
    const e = J.find(md);
    for (const t of e) Ti.getOrCreateInstance(t)
});
ie(Ti);
const _d = "collapse",
    wd = "bs.collapse",
    Ai = `.${wd}`,
    Ed = ".data-api",
    Td = `show${Ai}`,
    Ad = `shown${Ai}`,
    Cd = `hide${Ai}`,
    $d = `hidden${Ai}`,
    xd = `click${Ai}${Ed}`,
    Qr = "show",
    Hn = "collapse",
    ji = "collapsing",
    Sd = "collapsed",
    Od = `:scope .${Hn} .${Hn}`,
    kd = "collapse-horizontal",
    Ld = "width",
    Nd = "height",
    Dd = ".collapse.show, .collapse.collapsing",
    Cs = '[data-bs-toggle="collapse"]',
    Md = {
        parent: null,
        toggle: !0
    },
    Id = {
        parent: "(null|element)",
        toggle: "boolean"
    };
class bi extends ue {
    constructor(t, n) {
        super(t, n), this._isTransitioning = !1, this._triggerArray = [];
        const r = J.find(Cs);
        for (const o of r) {
            const c = J.getSelectorFromElement(o),
                f = J.find(c).filter(d => d === this._element);
            c !== null && f.length && this._triggerArray.push(o)
        }
        this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
    }
    static get Default() {
        return Md
    }
    static get DefaultType() {
        return Id
    }
    static get NAME() {
        return _d
    }
    toggle() {
        this._isShown() ? this.hide() : this.show()
    }
    show() {
        if (this._isTransitioning || this._isShown()) return;
        let t = [];
        if (this._config.parent && (t = this._getFirstLevelChildren(Dd).filter(d => d !== this._element).map(d => bi.getOrCreateInstance(d, {
                toggle: !1
            }))), t.length && t[0]._isTransitioning || H.trigger(this._element, Td).defaultPrevented) return;
        for (const d of t) d.hide();
        const r = this._getDimension();
        this._element.classList.remove(Hn), this._element.classList.add(ji), this._element.style[r] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
        const o = () => {
                this._isTransitioning = !1, this._element.classList.remove(ji), this._element.classList.add(Hn, Qr), this._element.style[r] = "", H.trigger(this._element, Ad)
            },
            f = `scroll${r[0].toUpperCase()+r.slice(1)}`;
        this._queueCallback(o, this._element, !0), this._element.style[r] = `${this._element[f]}px`
    }
    hide() {
        if (this._isTransitioning || !this._isShown() || H.trigger(this._element, Cd).defaultPrevented) return;
        const n = this._getDimension();
        this._element.style[n] = `${this._element.getBoundingClientRect()[n]}px`, wi(this._element), this._element.classList.add(ji), this._element.classList.remove(Hn, Qr);
        for (const o of this._triggerArray) {
            const c = J.getElementFromSelector(o);
            c && !this._isShown(c) && this._addAriaAndCollapsedClass([o], !1)
        }
        this._isTransitioning = !0;
        const r = () => {
            this._isTransitioning = !1, this._element.classList.remove(ji), this._element.classList.add(Hn), H.trigger(this._element, $d)
        };
        this._element.style[n] = "", this._queueCallback(r, this._element, !0)
    }
    _isShown(t = this._element) {
        return t.classList.contains(Qr)
    }
    _configAfterMerge(t) {
        return t.toggle = !!t.toggle, t.parent = Ye(t.parent), t
    }
    _getDimension() {
        return this._element.classList.contains(kd) ? Ld : Nd
    }
    _initializeChildren() {
        if (!this._config.parent) return;
        const t = this._getFirstLevelChildren(Cs);
        for (const n of t) {
            const r = J.getElementFromSelector(n);
            r && this._addAriaAndCollapsedClass([n], this._isShown(r))
        }
    }
    _getFirstLevelChildren(t) {
        const n = J.find(Od, this._config.parent);
        return J.find(t, this._config.parent).filter(r => !n.includes(r))
    }
    _addAriaAndCollapsedClass(t, n) {
        if (t.length)
            for (const r of t) r.classList.toggle(Sd, !n), r.setAttribute("aria-expanded", n)
    }
    static jQueryInterface(t) {
        const n = {};
        return typeof t == "string" && /show|hide/.test(t) && (n.toggle = !1), this.each(function() {
            const r = bi.getOrCreateInstance(this, n);
            if (typeof t == "string") {
                if (typeof r[t] > "u") throw new TypeError(`No method named "${t}"`);
                r[t]()
            }
        })
    }
}
H.on(document, xd, Cs, function(e) {
    (e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
    for (const t of J.getMultipleElementsFromSelector(this)) bi.getOrCreateInstance(t, {
        toggle: !1
    }).toggle()
});
ie(bi);
const sa = "dropdown",
    Pd = "bs.dropdown",
    mn = `.${Pd}`,
    Zs = ".data-api",
    Rd = "Escape",
    oa = "Tab",
    Hd = "ArrowUp",
    aa = "ArrowDown",
    jd = 2,
    Bd = `hide${mn}`,
    Vd = `hidden${mn}`,
    qd = `show${mn}`,
    Wd = `shown${mn}`,
    Hc = `click${mn}${Zs}`,
    jc = `keydown${mn}${Zs}`,
    Fd = `keyup${mn}${Zs}`,
    Rn = "show",
    zd = "dropup",
    Yd = "dropend",
    Kd = "dropstart",
    Ud = "dropup-center",
    Xd = "dropdown-center",
    un = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    Gd = `${un}.${Rn}`,
    tr = ".dropdown-menu",
    Zd = ".navbar",
    Qd = ".navbar-nav",
    Jd = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
    th = te() ? "top-end" : "top-start",
    eh = te() ? "top-start" : "top-end",
    nh = te() ? "bottom-end" : "bottom-start",
    ih = te() ? "bottom-start" : "bottom-end",
    rh = te() ? "left-start" : "right-start",
    sh = te() ? "right-start" : "left-start",
    oh = "top",
    ah = "bottom",
    ch = {
        autoClose: !0,
        boundary: "clippingParents",
        display: "dynamic",
        offset: [0, 2],
        popperConfig: null,
        reference: "toggle"
    },
    lh = {
        autoClose: "(boolean|string)",
        boundary: "(string|element)",
        display: "string",
        offset: "(array|string|function)",
        popperConfig: "(null|object|function)",
        reference: "(string|element|object)"
    };
class ye extends ue {
    constructor(t, n) {
        super(t, n), this._popper = null, this._parent = this._element.parentNode, this._menu = J.next(this._element, tr)[0] || J.prev(this._element, tr)[0] || J.findOne(tr, this._parent), this._inNavbar = this._detectNavbar()
    }
    static get Default() {
        return ch
    }
    static get DefaultType() {
        return lh
    }
    static get NAME() {
        return sa
    }
    toggle() {
        return this._isShown() ? this.hide() : this.show()
    }
    show() {
        if (Ke(this._element) || this._isShown()) return;
        const t = {
            relatedTarget: this._element
        };
        if (!H.trigger(this._element, qd, t).defaultPrevented) {
            if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Qd))
                for (const r of [].concat(...document.body.children)) H.on(r, "mouseover", rr);
            this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Rn), this._element.classList.add(Rn), H.trigger(this._element, Wd, t)
        }
    }
    hide() {
        if (Ke(this._element) || !this._isShown()) return;
        const t = {
            relatedTarget: this._element
        };
        this._completeHide(t)
    }
    dispose() {
        this._popper && this._popper.destroy(), super.dispose()
    }
    update() {
        this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
    }
    _completeHide(t) {
        if (!H.trigger(this._element, Bd, t).defaultPrevented) {
            if ("ontouchstart" in document.documentElement)
                for (const r of [].concat(...document.body.children)) H.off(r, "mouseover", rr);
            this._popper && this._popper.destroy(), this._menu.classList.remove(Rn), this._element.classList.remove(Rn), this._element.setAttribute("aria-expanded", "false"), De.removeDataAttribute(this._menu, "popper"), H.trigger(this._element, Vd, t), this._element.focus()
        }
    }
    _getConfig(t) {
        if (t = super._getConfig(t), typeof t.reference == "object" && !Ne(t.reference) && typeof t.reference.getBoundingClientRect != "function") throw new TypeError(`${sa.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
        return t
    }
    _createPopper() {
        if (typeof _c > "u") throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
        let t = this._element;
        this._config.reference === "parent" ? t = this._parent : Ne(this._config.reference) ? t = Ye(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
        const n = this._getPopperConfig();
        this._popper = Us(t, this._menu, n)
    }
    _isShown() {
        return this._menu.classList.contains(Rn)
    }
    _getPlacement() {
        const t = this._parent;
        if (t.classList.contains(Yd)) return rh;
        if (t.classList.contains(Kd)) return sh;
        if (t.classList.contains(Ud)) return oh;
        if (t.classList.contains(Xd)) return ah;
        const n = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
        return t.classList.contains(zd) ? n ? eh : th : n ? ih : nh
    }
    _detectNavbar() {
        return this._element.closest(Zd) !== null
    }
    _getOffset() {
        const {
            offset: t
        } = this._config;
        return typeof t == "string" ? t.split(",").map(n => Number.parseInt(n, 10)) : typeof t == "function" ? n => t(n, this._element) : t
    }
    _getPopperConfig() {
        const t = {
            placement: this._getPlacement(),
            modifiers: [{
                name: "preventOverflow",
                options: {
                    boundary: this._config.boundary
                }
            }, {
                name: "offset",
                options: {
                    offset: this._getOffset()
                }
            }]
        };
        return (this._inNavbar || this._config.display === "static") && (De.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
            name: "applyStyles",
            enabled: !1
        }]), {
            ...t,
            ...qt(this._config.popperConfig, [void 0, t])
        }
    }
    _selectMenuItem({
        key: t,
        target: n
    }) {
        const r = J.find(Jd, this._menu).filter(o => Zn(o));
        r.length && Xs(r, n, t === aa, !r.includes(n)).focus()
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const n = ye.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof n[t] > "u") throw new TypeError(`No method named "${t}"`);
                n[t]()
            }
        })
    }
    static clearMenus(t) {
        if (t.button === jd || t.type === "keyup" && t.key !== oa) return;
        const n = J.find(Gd);
        for (const r of n) {
            const o = ye.getInstance(r);
            if (!o || o._config.autoClose === !1) continue;
            const c = t.composedPath(),
                f = c.includes(o._menu);
            if (c.includes(o._element) || o._config.autoClose === "inside" && !f || o._config.autoClose === "outside" && f || o._menu.contains(t.target) && (t.type === "keyup" && t.key === oa || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
            const d = {
                relatedTarget: o._element
            };
            t.type === "click" && (d.clickEvent = t), o._completeHide(d)
        }
    }
    static dataApiKeydownHandler(t) {
        const n = /input|textarea/i.test(t.target.tagName),
            r = t.key === Rd,
            o = [Hd, aa].includes(t.key);
        if (!o && !r || n && !r) return;
        t.preventDefault();
        const c = this.matches(un) ? this : J.prev(this, un)[0] || J.next(this, un)[0] || J.findOne(un, t.delegateTarget.parentNode),
            f = ye.getOrCreateInstance(c);
        if (o) {
            t.stopPropagation(), f.show(), f._selectMenuItem(t);
            return
        }
        f._isShown() && (t.stopPropagation(), f.hide(), c.focus())
    }
}
H.on(document, jc, un, ye.dataApiKeydownHandler);
H.on(document, jc, tr, ye.dataApiKeydownHandler);
H.on(document, Hc, ye.clearMenus);
H.on(document, Fd, ye.clearMenus);
H.on(document, Hc, un, function(e) {
    e.preventDefault(), ye.getOrCreateInstance(this).toggle()
});
ie(ye);
const Bc = "backdrop",
    uh = "fade",
    ca = "show",
    la = `mousedown.bs.${Bc}`,
    fh = {
        className: "modal-backdrop",
        clickCallback: null,
        isAnimated: !1,
        isVisible: !0,
        rootElement: "body"
    },
    dh = {
        className: "string",
        clickCallback: "(function|null)",
        isAnimated: "boolean",
        isVisible: "boolean",
        rootElement: "(element|string)"
    };
class Vc extends Ei {
    constructor(t) {
        super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null
    }
    static get Default() {
        return fh
    }
    static get DefaultType() {
        return dh
    }
    static get NAME() {
        return Bc
    }
    show(t) {
        if (!this._config.isVisible) {
            qt(t);
            return
        }
        this._append();
        const n = this._getElement();
        this._config.isAnimated && wi(n), n.classList.add(ca), this._emulateAnimation(() => {
            qt(t)
        })
    }
    hide(t) {
        if (!this._config.isVisible) {
            qt(t);
            return
        }
        this._getElement().classList.remove(ca), this._emulateAnimation(() => {
            this.dispose(), qt(t)
        })
    }
    dispose() {
        this._isAppended && (H.off(this._element, la), this._element.remove(), this._isAppended = !1)
    }
    _getElement() {
        if (!this._element) {
            const t = document.createElement("div");
            t.className = this._config.className, this._config.isAnimated && t.classList.add(uh), this._element = t
        }
        return this._element
    }
    _configAfterMerge(t) {
        return t.rootElement = Ye(t.rootElement), t
    }
    _append() {
        if (this._isAppended) return;
        const t = this._getElement();
        this._config.rootElement.append(t), H.on(t, la, () => {
            qt(this._config.clickCallback)
        }), this._isAppended = !0
    }
    _emulateAnimation(t) {
        Cc(t, this._getElement(), this._config.isAnimated)
    }
}
const hh = "focustrap",
    ph = "bs.focustrap",
    sr = `.${ph}`,
    gh = `focusin${sr}`,
    mh = `keydown.tab${sr}`,
    vh = "Tab",
    bh = "forward",
    ua = "backward",
    yh = {
        autofocus: !0,
        trapElement: null
    },
    _h = {
        autofocus: "boolean",
        trapElement: "element"
    };
class qc extends Ei {
    constructor(t) {
        super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null
    }
    static get Default() {
        return yh
    }
    static get DefaultType() {
        return _h
    }
    static get NAME() {
        return hh
    }
    activate() {
        this._isActive || (this._config.autofocus && this._config.trapElement.focus(), H.off(document, sr), H.on(document, gh, t => this._handleFocusin(t)), H.on(document, mh, t => this._handleKeydown(t)), this._isActive = !0)
    }
    deactivate() {
        this._isActive && (this._isActive = !1, H.off(document, sr))
    }
    _handleFocusin(t) {
        const {
            trapElement: n
        } = this._config;
        if (t.target === document || t.target === n || n.contains(t.target)) return;
        const r = J.focusableChildren(n);
        r.length === 0 ? n.focus() : this._lastTabNavDirection === ua ? r[r.length - 1].focus() : r[0].focus()
    }
    _handleKeydown(t) {
        t.key === vh && (this._lastTabNavDirection = t.shiftKey ? ua : bh)
    }
}
const fa = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    da = ".sticky-top",
    Bi = "padding-right",
    ha = "margin-right";
class $s {
    constructor() {
        this._element = document.body
    }
    getWidth() {
        const t = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - t)
    }
    hide() {
        const t = this.getWidth();
        this._disableOverFlow(), this._setElementAttributes(this._element, Bi, n => n + t), this._setElementAttributes(fa, Bi, n => n + t), this._setElementAttributes(da, ha, n => n - t)
    }
    reset() {
        this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Bi), this._resetElementAttributes(fa, Bi), this._resetElementAttributes(da, ha)
    }
    isOverflowing() {
        return this.getWidth() > 0
    }
    _disableOverFlow() {
        this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
    }
    _setElementAttributes(t, n, r) {
        const o = this.getWidth(),
            c = f => {
                if (f !== this._element && window.innerWidth > f.clientWidth + o) return;
                this._saveInitialAttribute(f, n);
                const d = window.getComputedStyle(f).getPropertyValue(n);
                f.style.setProperty(n, `${r(Number.parseFloat(d))}px`)
            };
        this._applyManipulationCallback(t, c)
    }
    _saveInitialAttribute(t, n) {
        const r = t.style.getPropertyValue(n);
        r && De.setDataAttribute(t, n, r)
    }
    _resetElementAttributes(t, n) {
        const r = o => {
            const c = De.getDataAttribute(o, n);
            if (c === null) {
                o.style.removeProperty(n);
                return
            }
            De.removeDataAttribute(o, n), o.style.setProperty(n, c)
        };
        this._applyManipulationCallback(t, r)
    }
    _applyManipulationCallback(t, n) {
        if (Ne(t)) {
            n(t);
            return
        }
        for (const r of J.find(t, this._element)) n(r)
    }
}
const wh = "modal",
    Eh = "bs.modal",
    ee = `.${Eh}`,
    Th = ".data-api",
    Ah = "Escape",
    Ch = `hide${ee}`,
    $h = `hidePrevented${ee}`,
    Wc = `hidden${ee}`,
    Fc = `show${ee}`,
    xh = `shown${ee}`,
    Sh = `resize${ee}`,
    Oh = `click.dismiss${ee}`,
    kh = `mousedown.dismiss${ee}`,
    Lh = `keydown.dismiss${ee}`,
    Nh = `click${ee}${Th}`,
    pa = "modal-open",
    Dh = "fade",
    ga = "show",
    Jr = "modal-static",
    Mh = ".modal.show",
    Ih = ".modal-dialog",
    Ph = ".modal-body",
    Rh = '[data-bs-toggle="modal"]',
    Hh = {
        backdrop: !0,
        focus: !0,
        keyboard: !0
    },
    jh = {
        backdrop: "(boolean|string)",
        focus: "boolean",
        keyboard: "boolean"
    };
class Fn extends ue {
    constructor(t, n) {
        super(t, n), this._dialog = J.findOne(Ih, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new $s, this._addEventListeners()
    }
    static get Default() {
        return Hh
    }
    static get DefaultType() {
        return jh
    }
    static get NAME() {
        return wh
    }
    toggle(t) {
        return this._isShown ? this.hide() : this.show(t)
    }
    show(t) {
        this._isShown || this._isTransitioning || H.trigger(this._element, Fc, {
            relatedTarget: t
        }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(pa), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)))
    }
    hide() {
        !this._isShown || this._isTransitioning || H.trigger(this._element, Ch).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(ga), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()))
    }
    dispose() {
        H.off(window, ee), H.off(this._dialog, ee), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
    }
    handleUpdate() {
        this._adjustDialog()
    }
    _initializeBackDrop() {
        return new Vc({
            isVisible: !!this._config.backdrop,
            isAnimated: this._isAnimated()
        })
    }
    _initializeFocusTrap() {
        return new qc({
            trapElement: this._element
        })
    }
    _showElement(t) {
        document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
        const n = J.findOne(Ph, this._dialog);
        n && (n.scrollTop = 0), wi(this._element), this._element.classList.add(ga);
        const r = () => {
            this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, H.trigger(this._element, xh, {
                relatedTarget: t
            })
        };
        this._queueCallback(r, this._dialog, this._isAnimated())
    }
    _addEventListeners() {
        H.on(this._element, Lh, t => {
            if (t.key === Ah) {
                if (this._config.keyboard) {
                    this.hide();
                    return
                }
                this._triggerBackdropTransition()
            }
        }), H.on(window, Sh, () => {
            this._isShown && !this._isTransitioning && this._adjustDialog()
        }), H.on(this._element, kh, t => {
            H.one(this._element, Oh, n => {
                if (!(this._element !== t.target || this._element !== n.target)) {
                    if (this._config.backdrop === "static") {
                        this._triggerBackdropTransition();
                        return
                    }
                    this._config.backdrop && this.hide()
                }
            })
        })
    }
    _hideModal() {
        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
            document.body.classList.remove(pa), this._resetAdjustments(), this._scrollBar.reset(), H.trigger(this._element, Wc)
        })
    }
    _isAnimated() {
        return this._element.classList.contains(Dh)
    }
    _triggerBackdropTransition() {
        if (H.trigger(this._element, $h).defaultPrevented) return;
        const n = this._element.scrollHeight > document.documentElement.clientHeight,
            r = this._element.style.overflowY;
        r === "hidden" || this._element.classList.contains(Jr) || (n || (this._element.style.overflowY = "hidden"), this._element.classList.add(Jr), this._queueCallback(() => {
            this._element.classList.remove(Jr), this._queueCallback(() => {
                this._element.style.overflowY = r
            }, this._dialog)
        }, this._dialog), this._element.focus())
    }
    _adjustDialog() {
        const t = this._element.scrollHeight > document.documentElement.clientHeight,
            n = this._scrollBar.getWidth(),
            r = n > 0;
        if (r && !t) {
            const o = te() ? "paddingLeft" : "paddingRight";
            this._element.style[o] = `${n}px`
        }
        if (!r && t) {
            const o = te() ? "paddingRight" : "paddingLeft";
            this._element.style[o] = `${n}px`
        }
    }
    _resetAdjustments() {
        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
    }
    static jQueryInterface(t, n) {
        return this.each(function() {
            const r = Fn.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof r[t] > "u") throw new TypeError(`No method named "${t}"`);
                r[t](n)
            }
        })
    }
}
H.on(document, Nh, Rh, function(e) {
    const t = J.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && e.preventDefault(), H.one(t, Fc, o => {
        o.defaultPrevented || H.one(t, Wc, () => {
            Zn(this) && this.focus()
        })
    });
    const n = J.findOne(Mh);
    n && Fn.getInstance(n).hide(), Fn.getOrCreateInstance(t).toggle(this)
});
hr(Fn);
ie(Fn);
const Bh = "offcanvas",
    Vh = "bs.offcanvas",
    Re = `.${Vh}`,
    zc = ".data-api",
    qh = `load${Re}${zc}`,
    Wh = "Escape",
    ma = "show",
    va = "showing",
    ba = "hiding",
    Fh = "offcanvas-backdrop",
    Yc = ".offcanvas.show",
    zh = `show${Re}`,
    Yh = `shown${Re}`,
    Kh = `hide${Re}`,
    ya = `hidePrevented${Re}`,
    Kc = `hidden${Re}`,
    Uh = `resize${Re}`,
    Xh = `click${Re}${zc}`,
    Gh = `keydown.dismiss${Re}`,
    Zh = '[data-bs-toggle="offcanvas"]',
    Qh = {
        backdrop: !0,
        keyboard: !0,
        scroll: !1
    },
    Jh = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        scroll: "boolean"
    };
class Ue extends ue {
    constructor(t, n) {
        super(t, n), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
    }
    static get Default() {
        return Qh
    }
    static get DefaultType() {
        return Jh
    }
    static get NAME() {
        return Bh
    }
    toggle(t) {
        return this._isShown ? this.hide() : this.show(t)
    }
    show(t) {
        if (this._isShown || H.trigger(this._element, zh, {
                relatedTarget: t
            }).defaultPrevented) return;
        this._isShown = !0, this._backdrop.show(), this._config.scroll || new $s().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(va);
        const r = () => {
            (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(ma), this._element.classList.remove(va), H.trigger(this._element, Yh, {
                relatedTarget: t
            })
        };
        this._queueCallback(r, this._element, !0)
    }
    hide() {
        if (!this._isShown || H.trigger(this._element, Kh).defaultPrevented) return;
        this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(ba), this._backdrop.hide();
        const n = () => {
            this._element.classList.remove(ma, ba), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new $s().reset(), H.trigger(this._element, Kc)
        };
        this._queueCallback(n, this._element, !0)
    }
    dispose() {
        this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
    }
    _initializeBackDrop() {
        const t = () => {
                if (this._config.backdrop === "static") {
                    H.trigger(this._element, ya);
                    return
                }
                this.hide()
            },
            n = !!this._config.backdrop;
        return new Vc({
            className: Fh,
            isVisible: n,
            isAnimated: !0,
            rootElement: this._element.parentNode,
            clickCallback: n ? t : null
        })
    }
    _initializeFocusTrap() {
        return new qc({
            trapElement: this._element
        })
    }
    _addEventListeners() {
        H.on(this._element, Gh, t => {
            if (t.key === Wh) {
                if (this._config.keyboard) {
                    this.hide();
                    return
                }
                H.trigger(this._element, ya)
            }
        })
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const n = Ue.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (n[t] === void 0 || t.startsWith("_") || t === "constructor") throw new TypeError(`No method named "${t}"`);
                n[t](this)
            }
        })
    }
}
H.on(document, Xh, Zh, function(e) {
    const t = J.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), Ke(this)) return;
    H.one(t, Kc, () => {
        Zn(this) && this.focus()
    });
    const n = J.findOne(Yc);
    n && n !== t && Ue.getInstance(n).hide(), Ue.getOrCreateInstance(t).toggle(this)
});
H.on(window, qh, () => {
    for (const e of J.find(Yc)) Ue.getOrCreateInstance(e).show()
});
H.on(window, Uh, () => {
    for (const e of J.find("[aria-modal][class*=show][class*=offcanvas-]")) getComputedStyle(e).position !== "fixed" && Ue.getOrCreateInstance(e).hide()
});
hr(Ue);
ie(Ue);
const tp = /^aria-[\w-]*$/i,
    Uc = {
        "*": ["class", "dir", "id", "lang", "role", tp],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        dd: [],
        div: [],
        dl: [],
        dt: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    },
    ep = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
    np = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
    ip = (e, t) => {
        const n = e.nodeName.toLowerCase();
        return t.includes(n) ? ep.has(n) ? !!np.test(e.nodeValue) : !0 : t.filter(r => r instanceof RegExp).some(r => r.test(n))
    };

function rp(e, t, n) {
    if (!e.length) return e;
    if (n && typeof n == "function") return n(e);
    const o = new window.DOMParser().parseFromString(e, "text/html"),
        c = [].concat(...o.body.querySelectorAll("*"));
    for (const f of c) {
        const d = f.nodeName.toLowerCase();
        if (!Object.keys(t).includes(d)) {
            f.remove();
            continue
        }
        const g = [].concat(...f.attributes),
            b = [].concat(t["*"] || [], t[d] || []);
        for (const v of g) ip(v, b) || f.removeAttribute(v.nodeName)
    }
    return o.body.innerHTML
}
const sp = "TemplateFactory",
    op = {
        allowList: Uc,
        content: {},
        extraClass: "",
        html: !1,
        sanitize: !0,
        sanitizeFn: null,
        template: "<div></div>"
    },
    ap = {
        allowList: "object",
        content: "object",
        extraClass: "(string|function)",
        html: "boolean",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        template: "string"
    },
    cp = {
        entry: "(string|element|function|null)",
        selector: "(string|element)"
    };
class lp extends Ei {
    constructor(t) {
        super(), this._config = this._getConfig(t)
    }
    static get Default() {
        return op
    }
    static get DefaultType() {
        return ap
    }
    static get NAME() {
        return sp
    }
    getContent() {
        return Object.values(this._config.content).map(t => this._resolvePossibleFunction(t)).filter(Boolean)
    }
    hasContent() {
        return this.getContent().length > 0
    }
    changeContent(t) {
        return this._checkContent(t), this._config.content = {
            ...this._config.content,
            ...t
        }, this
    }
    toHtml() {
        const t = document.createElement("div");
        t.innerHTML = this._maybeSanitize(this._config.template);
        for (const [o, c] of Object.entries(this._config.content)) this._setContent(t, c, o);
        const n = t.children[0],
            r = this._resolvePossibleFunction(this._config.extraClass);
        return r && n.classList.add(...r.split(" ")), n
    }
    _typeCheckConfig(t) {
        super._typeCheckConfig(t), this._checkContent(t.content)
    }
    _checkContent(t) {
        for (const [n, r] of Object.entries(t)) super._typeCheckConfig({
            selector: n,
            entry: r
        }, cp)
    }
    _setContent(t, n, r) {
        const o = J.findOne(r, t);
        if (o) {
            if (n = this._resolvePossibleFunction(n), !n) {
                o.remove();
                return
            }
            if (Ne(n)) {
                this._putElementInTemplate(Ye(n), o);
                return
            }
            if (this._config.html) {
                o.innerHTML = this._maybeSanitize(n);
                return
            }
            o.textContent = n
        }
    }
    _maybeSanitize(t) {
        return this._config.sanitize ? rp(t, this._config.allowList, this._config.sanitizeFn) : t
    }
    _resolvePossibleFunction(t) {
        return qt(t, [void 0, this])
    }
    _putElementInTemplate(t, n) {
        if (this._config.html) {
            n.innerHTML = "", n.append(t);
            return
        }
        n.textContent = t.textContent
    }
}
const up = "tooltip",
    fp = new Set(["sanitize", "allowList", "sanitizeFn"]),
    ts = "fade",
    dp = "modal",
    Vi = "show",
    hp = ".tooltip-inner",
    _a = `.${dp}`,
    wa = "hide.bs.modal",
    gi = "hover",
    es = "focus",
    ns = "click",
    pp = "manual",
    gp = "hide",
    mp = "hidden",
    vp = "show",
    bp = "shown",
    yp = "inserted",
    _p = "click",
    wp = "focusin",
    Ep = "focusout",
    Tp = "mouseenter",
    Ap = "mouseleave",
    Cp = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: te() ? "left" : "right",
        BOTTOM: "bottom",
        LEFT: te() ? "right" : "left"
    },
    $p = {
        allowList: Uc,
        animation: !0,
        boundary: "clippingParents",
        container: !1,
        customClass: "",
        delay: 0,
        fallbackPlacements: ["top", "right", "bottom", "left"],
        html: !1,
        offset: [0, 6],
        placement: "top",
        popperConfig: null,
        sanitize: !0,
        sanitizeFn: null,
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        title: "",
        trigger: "hover focus"
    },
    xp = {
        allowList: "object",
        animation: "boolean",
        boundary: "(string|element)",
        container: "(string|element|boolean)",
        customClass: "(string|function)",
        delay: "(number|object)",
        fallbackPlacements: "array",
        html: "boolean",
        offset: "(array|string|function)",
        placement: "(string|function)",
        popperConfig: "(null|object|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        selector: "(string|boolean)",
        template: "string",
        title: "(string|element|function)",
        trigger: "string"
    };
class Jn extends ue {
    constructor(t, n) {
        if (typeof _c > "u") throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
        super(t, n), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
    }
    static get Default() {
        return $p
    }
    static get DefaultType() {
        return xp
    }
    static get NAME() {
        return up
    }
    enable() {
        this._isEnabled = !0
    }
    disable() {
        this._isEnabled = !1
    }
    toggleEnabled() {
        this._isEnabled = !this._isEnabled
    }
    toggle() {
        if (this._isEnabled) {
            if (this._isShown()) {
                this._leave();
                return
            }
            this._enter()
        }
    }
    dispose() {
        clearTimeout(this._timeout), H.off(this._element.closest(_a), wa, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose()
    }
    show() {
        if (this._element.style.display === "none") throw new Error("Please use show on visible elements");
        if (!(this._isWithContent() && this._isEnabled)) return;
        const t = H.trigger(this._element, this.constructor.eventName(vp)),
            r = (Tc(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
        if (t.defaultPrevented || !r) return;
        this._disposePopper();
        const o = this._getTipElement();
        this._element.setAttribute("aria-describedby", o.getAttribute("id"));
        const {
            container: c
        } = this._config;
        if (this._element.ownerDocument.documentElement.contains(this.tip) || (c.append(o), H.trigger(this._element, this.constructor.eventName(yp))), this._popper = this._createPopper(o), o.classList.add(Vi), "ontouchstart" in document.documentElement)
            for (const d of [].concat(...document.body.children)) H.on(d, "mouseover", rr);
        const f = () => {
            H.trigger(this._element, this.constructor.eventName(bp)), this._isHovered === !1 && this._leave(), this._isHovered = !1
        };
        this._queueCallback(f, this.tip, this._isAnimated())
    }
    hide() {
        if (!this._isShown() || H.trigger(this._element, this.constructor.eventName(gp)).defaultPrevented) return;
        if (this._getTipElement().classList.remove(Vi), "ontouchstart" in document.documentElement)
            for (const o of [].concat(...document.body.children)) H.off(o, "mouseover", rr);
        this._activeTrigger[ns] = !1, this._activeTrigger[es] = !1, this._activeTrigger[gi] = !1, this._isHovered = null;
        const r = () => {
            this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), H.trigger(this._element, this.constructor.eventName(mp)))
        };
        this._queueCallback(r, this.tip, this._isAnimated())
    }
    update() {
        this._popper && this._popper.update()
    }
    _isWithContent() {
        return !!this._getTitle()
    }
    _getTipElement() {
        return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
    }
    _createTipElement(t) {
        const n = this._getTemplateFactory(t).toHtml();
        if (!n) return null;
        n.classList.remove(ts, Vi), n.classList.add(`bs-${this.constructor.NAME}-auto`);
        const r = pf(this.constructor.NAME).toString();
        return n.setAttribute("id", r), this._isAnimated() && n.classList.add(ts), n
    }
    setContent(t) {
        this._newContent = t, this._isShown() && (this._disposePopper(), this.show())
    }
    _getTemplateFactory(t) {
        return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new lp({
            ...this._config,
            content: t,
            extraClass: this._resolvePossibleFunction(this._config.customClass)
        }), this._templateFactory
    }
    _getContentForTemplate() {
        return {
            [hp]: this._getTitle()
        }
    }
    _getTitle() {
        return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
    }
    _initializeOnDelegatedTarget(t) {
        return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig())
    }
    _isAnimated() {
        return this._config.animation || this.tip && this.tip.classList.contains(ts)
    }
    _isShown() {
        return this.tip && this.tip.classList.contains(Vi)
    }
    _createPopper(t) {
        const n = qt(this._config.placement, [this, t, this._element]),
            r = Cp[n.toUpperCase()];
        return Us(this._element, t, this._getPopperConfig(r))
    }
    _getOffset() {
        const {
            offset: t
        } = this._config;
        return typeof t == "string" ? t.split(",").map(n => Number.parseInt(n, 10)) : typeof t == "function" ? n => t(n, this._element) : t
    }
    _resolvePossibleFunction(t) {
        return qt(t, [this._element, this._element])
    }
    _getPopperConfig(t) {
        const n = {
            placement: t,
            modifiers: [{
                name: "flip",
                options: {
                    fallbackPlacements: this._config.fallbackPlacements
                }
            }, {
                name: "offset",
                options: {
                    offset: this._getOffset()
                }
            }, {
                name: "preventOverflow",
                options: {
                    boundary: this._config.boundary
                }
            }, {
                name: "arrow",
                options: {
                    element: `.${this.constructor.NAME}-arrow`
                }
            }, {
                name: "preSetPlacement",
                enabled: !0,
                phase: "beforeMain",
                fn: r => {
                    this._getTipElement().setAttribute("data-popper-placement", r.state.placement)
                }
            }]
        };
        return {
            ...n,
            ...qt(this._config.popperConfig, [void 0, n])
        }
    }
    _setListeners() {
        const t = this._config.trigger.split(" ");
        for (const n of t)
            if (n === "click") H.on(this._element, this.constructor.eventName(_p), this._config.selector, r => {
                const o = this._initializeOnDelegatedTarget(r);
                o._activeTrigger[ns] = !(o._isShown() && o._activeTrigger[ns]), o.toggle()
            });
            else if (n !== pp) {
            const r = n === gi ? this.constructor.eventName(Tp) : this.constructor.eventName(wp),
                o = n === gi ? this.constructor.eventName(Ap) : this.constructor.eventName(Ep);
            H.on(this._element, r, this._config.selector, c => {
                const f = this._initializeOnDelegatedTarget(c);
                f._activeTrigger[c.type === "focusin" ? es : gi] = !0, f._enter()
            }), H.on(this._element, o, this._config.selector, c => {
                const f = this._initializeOnDelegatedTarget(c);
                f._activeTrigger[c.type === "focusout" ? es : gi] = f._element.contains(c.relatedTarget), f._leave()
            })
        }
        this._hideModalHandler = () => {
            this._element && this.hide()
        }, H.on(this._element.closest(_a), wa, this._hideModalHandler)
    }
    _fixTitle() {
        const t = this._element.getAttribute("title");
        t && (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", t), this._element.setAttribute("data-bs-original-title", t), this._element.removeAttribute("title"))
    }
    _enter() {
        if (this._isShown() || this._isHovered) {
            this._isHovered = !0;
            return
        }
        this._isHovered = !0, this._setTimeout(() => {
            this._isHovered && this.show()
        }, this._config.delay.show)
    }
    _leave() {
        this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
            this._isHovered || this.hide()
        }, this._config.delay.hide))
    }
    _setTimeout(t, n) {
        clearTimeout(this._timeout), this._timeout = setTimeout(t, n)
    }
    _isWithActiveTrigger() {
        return Object.values(this._activeTrigger).includes(!0)
    }
    _getConfig(t) {
        const n = De.getDataAttributes(this._element);
        for (const r of Object.keys(n)) fp.has(r) && delete n[r];
        return t = {
            ...n,
            ...typeof t == "object" && t ? t : {}
        }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
    }
    _configAfterMerge(t) {
        return t.container = t.container === !1 ? document.body : Ye(t.container), typeof t.delay == "number" && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), typeof t.title == "number" && (t.title = t.title.toString()), typeof t.content == "number" && (t.content = t.content.toString()), t
    }
    _getDelegateConfig() {
        const t = {};
        for (const [n, r] of Object.entries(this._config)) this.constructor.Default[n] !== r && (t[n] = r);
        return t.selector = !1, t.trigger = "manual", t
    }
    _disposePopper() {
        this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null)
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const n = Jn.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof n[t] > "u") throw new TypeError(`No method named "${t}"`);
                n[t]()
            }
        })
    }
}
ie(Jn);
const Sp = "popover",
    Op = ".popover-header",
    kp = ".popover-body",
    Lp = {
        ...Jn.Default,
        content: "",
        offset: [0, 8],
        placement: "right",
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        trigger: "click"
    },
    Np = {
        ...Jn.DefaultType,
        content: "(null|string|element|function)"
    };
class Qs extends Jn {
    static get Default() {
        return Lp
    }
    static get DefaultType() {
        return Np
    }
    static get NAME() {
        return Sp
    }
    _isWithContent() {
        return this._getTitle() || this._getContent()
    }
    _getContentForTemplate() {
        return {
            [Op]: this._getTitle(),
            [kp]: this._getContent()
        }
    }
    _getContent() {
        return this._resolvePossibleFunction(this._config.content)
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const n = Qs.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof n[t] > "u") throw new TypeError(`No method named "${t}"`);
                n[t]()
            }
        })
    }
}
ie(Qs);
const Dp = "scrollspy",
    Mp = "bs.scrollspy",
    Js = `.${Mp}`,
    Ip = ".data-api",
    Pp = `activate${Js}`,
    Ea = `click${Js}`,
    Rp = `load${Js}${Ip}`,
    Hp = "dropdown-item",
    Ln = "active",
    jp = '[data-bs-spy="scroll"]',
    is = "[href]",
    Bp = ".nav, .list-group",
    Ta = ".nav-link",
    Vp = ".nav-item",
    qp = ".list-group-item",
    Wp = `${Ta}, ${Vp} > ${Ta}, ${qp}`,
    Fp = ".dropdown",
    zp = ".dropdown-toggle",
    Yp = {
        offset: null,
        rootMargin: "0px 0px -25%",
        smoothScroll: !1,
        target: null,
        threshold: [.1, .5, 1]
    },
    Kp = {
        offset: "(number|null)",
        rootMargin: "string",
        smoothScroll: "boolean",
        target: "element",
        threshold: "array"
    };
class mr extends ue {
    constructor(t, n) {
        super(t, n), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
            visibleEntryTop: 0,
            parentScrollTop: 0
        }, this.refresh()
    }
    static get Default() {
        return Yp
    }
    static get DefaultType() {
        return Kp
    }
    static get NAME() {
        return Dp
    }
    refresh() {
        this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
        for (const t of this._observableSections.values()) this._observer.observe(t)
    }
    dispose() {
        this._observer.disconnect(), super.dispose()
    }
    _configAfterMerge(t) {
        return t.target = Ye(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map(n => Number.parseFloat(n))), t
    }
    _maybeEnableSmoothScroll() {
        this._config.smoothScroll && (H.off(this._config.target, Ea), H.on(this._config.target, Ea, is, t => {
            const n = this._observableSections.get(t.target.hash);
            if (n) {
                t.preventDefault();
                const r = this._rootElement || window,
                    o = n.offsetTop - this._element.offsetTop;
                if (r.scrollTo) {
                    r.scrollTo({
                        top: o,
                        behavior: "smooth"
                    });
                    return
                }
                r.scrollTop = o
            }
        }))
    }
    _getNewObserver() {
        const t = {
            root: this._rootElement,
            threshold: this._config.threshold,
            rootMargin: this._config.rootMargin
        };
        return new IntersectionObserver(n => this._observerCallback(n), t)
    }
    _observerCallback(t) {
        const n = f => this._targetLinks.get(`#${f.target.id}`),
            r = f => {
                this._previousScrollData.visibleEntryTop = f.target.offsetTop, this._process(n(f))
            },
            o = (this._rootElement || document.documentElement).scrollTop,
            c = o >= this._previousScrollData.parentScrollTop;
        this._previousScrollData.parentScrollTop = o;
        for (const f of t) {
            if (!f.isIntersecting) {
                this._activeTarget = null, this._clearActiveClass(n(f));
                continue
            }
            const d = f.target.offsetTop >= this._previousScrollData.visibleEntryTop;
            if (c && d) {
                if (r(f), !o) return;
                continue
            }!c && !d && r(f)
        }
    }
    _initializeTargetsAndObservables() {
        this._targetLinks = new Map, this._observableSections = new Map;
        const t = J.find(is, this._config.target);
        for (const n of t) {
            if (!n.hash || Ke(n)) continue;
            const r = J.findOne(decodeURI(n.hash), this._element);
            Zn(r) && (this._targetLinks.set(decodeURI(n.hash), n), this._observableSections.set(n.hash, r))
        }
    }
    _process(t) {
        this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(Ln), this._activateParents(t), H.trigger(this._element, Pp, {
            relatedTarget: t
        }))
    }
    _activateParents(t) {
        if (t.classList.contains(Hp)) {
            J.findOne(zp, t.closest(Fp)).classList.add(Ln);
            return
        }
        for (const n of J.parents(t, Bp))
            for (const r of J.prev(n, Wp)) r.classList.add(Ln)
    }
    _clearActiveClass(t) {
        t.classList.remove(Ln);
        const n = J.find(`${is}.${Ln}`, t);
        for (const r of n) r.classList.remove(Ln)
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const n = mr.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (n[t] === void 0 || t.startsWith("_") || t === "constructor") throw new TypeError(`No method named "${t}"`);
                n[t]()
            }
        })
    }
}
H.on(window, Rp, () => {
    for (const e of J.find(jp)) mr.getOrCreateInstance(e)
});
ie(mr);
const Up = "tab",
    Xp = "bs.tab",
    vn = `.${Xp}`,
    Gp = `hide${vn}`,
    Zp = `hidden${vn}`,
    Qp = `show${vn}`,
    Jp = `shown${vn}`,
    tg = `click${vn}`,
    eg = `keydown${vn}`,
    ng = `load${vn}`,
    ig = "ArrowLeft",
    Aa = "ArrowRight",
    rg = "ArrowUp",
    Ca = "ArrowDown",
    rs = "Home",
    $a = "End",
    fn = "active",
    xa = "fade",
    ss = "show",
    sg = "dropdown",
    Xc = ".dropdown-toggle",
    og = ".dropdown-menu",
    os = `:not(${Xc})`,
    ag = '.list-group, .nav, [role="tablist"]',
    cg = ".nav-item, .list-group-item",
    lg = `.nav-link${os}, .list-group-item${os}, [role="tab"]${os}`,
    Gc = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    as = `${lg}, ${Gc}`,
    ug = `.${fn}[data-bs-toggle="tab"], .${fn}[data-bs-toggle="pill"], .${fn}[data-bs-toggle="list"]`;
class zn extends ue {
    constructor(t) {
        super(t), this._parent = this._element.closest(ag), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), H.on(this._element, eg, n => this._keydown(n)))
    }
    static get NAME() {
        return Up
    }
    show() {
        const t = this._element;
        if (this._elemIsActive(t)) return;
        const n = this._getActiveElem(),
            r = n ? H.trigger(n, Gp, {
                relatedTarget: t
            }) : null;
        H.trigger(t, Qp, {
            relatedTarget: n
        }).defaultPrevented || r && r.defaultPrevented || (this._deactivate(n, t), this._activate(t, n))
    }
    _activate(t, n) {
        if (!t) return;
        t.classList.add(fn), this._activate(J.getElementFromSelector(t));
        const r = () => {
            if (t.getAttribute("role") !== "tab") {
                t.classList.add(ss);
                return
            }
            t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), H.trigger(t, Jp, {
                relatedTarget: n
            })
        };
        this._queueCallback(r, t, t.classList.contains(xa))
    }
    _deactivate(t, n) {
        if (!t) return;
        t.classList.remove(fn), t.blur(), this._deactivate(J.getElementFromSelector(t));
        const r = () => {
            if (t.getAttribute("role") !== "tab") {
                t.classList.remove(ss);
                return
            }
            t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), H.trigger(t, Zp, {
                relatedTarget: n
            })
        };
        this._queueCallback(r, t, t.classList.contains(xa))
    }
    _keydown(t) {
        if (![ig, Aa, rg, Ca, rs, $a].includes(t.key)) return;
        t.stopPropagation(), t.preventDefault();
        const n = this._getChildren().filter(o => !Ke(o));
        let r;
        if ([rs, $a].includes(t.key)) r = n[t.key === rs ? 0 : n.length - 1];
        else {
            const o = [Aa, Ca].includes(t.key);
            r = Xs(n, t.target, o, !0)
        }
        r && (r.focus({
            preventScroll: !0
        }), zn.getOrCreateInstance(r).show())
    }
    _getChildren() {
        return J.find(as, this._parent)
    }
    _getActiveElem() {
        return this._getChildren().find(t => this._elemIsActive(t)) || null
    }
    _setInitialAttributes(t, n) {
        this._setAttributeIfNotExists(t, "role", "tablist");
        for (const r of n) this._setInitialAttributesOnChild(r)
    }
    _setInitialAttributesOnChild(t) {
        t = this._getInnerElement(t);
        const n = this._elemIsActive(t),
            r = this._getOuterElement(t);
        t.setAttribute("aria-selected", n), r !== t && this._setAttributeIfNotExists(r, "role", "presentation"), n || t.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t, "role", "tab"), this._setInitialAttributesOnTargetPanel(t)
    }
    _setInitialAttributesOnTargetPanel(t) {
        const n = J.getElementFromSelector(t);
        n && (this._setAttributeIfNotExists(n, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(n, "aria-labelledby", `${t.id}`))
    }
    _toggleDropDown(t, n) {
        const r = this._getOuterElement(t);
        if (!r.classList.contains(sg)) return;
        const o = (c, f) => {
            const d = J.findOne(c, r);
            d && d.classList.toggle(f, n)
        };
        o(Xc, fn), o(og, ss), r.setAttribute("aria-expanded", n)
    }
    _setAttributeIfNotExists(t, n, r) {
        t.hasAttribute(n) || t.setAttribute(n, r)
    }
    _elemIsActive(t) {
        return t.classList.contains(fn)
    }
    _getInnerElement(t) {
        return t.matches(as) ? t : J.findOne(as, t)
    }
    _getOuterElement(t) {
        return t.closest(cg) || t
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const n = zn.getOrCreateInstance(this);
            if (typeof t == "string") {
                if (n[t] === void 0 || t.startsWith("_") || t === "constructor") throw new TypeError(`No method named "${t}"`);
                n[t]()
            }
        })
    }
}
H.on(document, tg, Gc, function(e) {
    ["A", "AREA"].includes(this.tagName) && e.preventDefault(), !Ke(this) && zn.getOrCreateInstance(this).show()
});
H.on(window, ng, () => {
    for (const e of J.find(ug)) zn.getOrCreateInstance(e)
});
ie(zn);
const fg = "toast",
    dg = "bs.toast",
    Ze = `.${dg}`,
    hg = `mouseover${Ze}`,
    pg = `mouseout${Ze}`,
    gg = `focusin${Ze}`,
    mg = `focusout${Ze}`,
    vg = `hide${Ze}`,
    bg = `hidden${Ze}`,
    yg = `show${Ze}`,
    _g = `shown${Ze}`,
    wg = "fade",
    Sa = "hide",
    qi = "show",
    Wi = "showing",
    Eg = {
        animation: "boolean",
        autohide: "boolean",
        delay: "number"
    },
    Tg = {
        animation: !0,
        autohide: !0,
        delay: 5e3
    };
class vr extends ue {
    constructor(t, n) {
        super(t, n), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
    }
    static get Default() {
        return Tg
    }
    static get DefaultType() {
        return Eg
    }
    static get NAME() {
        return fg
    }
    show() {
        if (H.trigger(this._element, yg).defaultPrevented) return;
        this._clearTimeout(), this._config.animation && this._element.classList.add(wg);
        const n = () => {
            this._element.classList.remove(Wi), H.trigger(this._element, _g), this._maybeScheduleHide()
        };
        this._element.classList.remove(Sa), wi(this._element), this._element.classList.add(qi, Wi), this._queueCallback(n, this._element, this._config.animation)
    }
    hide() {
        if (!this.isShown() || H.trigger(this._element, vg).defaultPrevented) return;
        const n = () => {
            this._element.classList.add(Sa), this._element.classList.remove(Wi, qi), H.trigger(this._element, bg)
        };
        this._element.classList.add(Wi), this._queueCallback(n, this._element, this._config.animation)
    }
    dispose() {
        this._clearTimeout(), this.isShown() && this._element.classList.remove(qi), super.dispose()
    }
    isShown() {
        return this._element.classList.contains(qi)
    }
    _maybeScheduleHide() {
        this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
            this.hide()
        }, this._config.delay)))
    }
    _onInteraction(t, n) {
        switch (t.type) {
            case "mouseover":
            case "mouseout": {
                this._hasMouseInteraction = n;
                break
            }
            case "focusin":
            case "focusout": {
                this._hasKeyboardInteraction = n;
                break
            }
        }
        if (n) {
            this._clearTimeout();
            return
        }
        const r = t.relatedTarget;
        this._element === r || this._element.contains(r) || this._maybeScheduleHide()
    }
    _setListeners() {
        H.on(this._element, hg, t => this._onInteraction(t, !0)), H.on(this._element, pg, t => this._onInteraction(t, !1)), H.on(this._element, gg, t => this._onInteraction(t, !0)), H.on(this._element, mg, t => this._onInteraction(t, !1))
    }
    _clearTimeout() {
        clearTimeout(this._timeout), this._timeout = null
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const n = vr.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof n[t] > "u") throw new TypeError(`No method named "${t}"`);
                n[t](this)
            }
        })
    }
}
hr(vr);
ie(vr);
var Ag = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {};

function Zc(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var Qc = {
    exports: {}
};
/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
(function(e) {
    (function(t, n) {
        e.exports = t.document ? n(t, !0) : function(r) {
            if (!r.document) throw new Error("jQuery requires a window with a document");
            return n(r)
        }
    })(typeof window < "u" ? window : Ag, function(t, n) {
        var r = [],
            o = Object.getPrototypeOf,
            c = r.slice,
            f = r.flat ? function(i) {
                return r.flat.call(i)
            } : function(i) {
                return r.concat.apply([], i)
            },
            d = r.push,
            g = r.indexOf,
            b = {},
            v = b.toString,
            E = b.hasOwnProperty,
            A = E.toString,
            D = A.call(Object),
            x = {},
            L = function(s) {
                return typeof s == "function" && typeof s.nodeType != "number" && typeof s.item != "function"
            },
            R = function(s) {
                return s != null && s === s.window
            },
            M = t.document,
            Q = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };

        function tt(i, s, a) {
            a = a || M;
            var u, h, p = a.createElement("script");
            if (p.text = i, s)
                for (u in Q) h = s[u] || s.getAttribute && s.getAttribute(u), h && p.setAttribute(u, h);
            a.head.appendChild(p).parentNode.removeChild(p)
        }

        function K(i) {
            return i == null ? i + "" : typeof i == "object" || typeof i == "function" ? b[v.call(i)] || "object" : typeof i
        }
        var it = "3.7.1",
            Y = /HTML$/i,
            l = function(i, s) {
                return new l.fn.init(i, s)
            };
        l.fn = l.prototype = {
            jquery: it,
            constructor: l,
            length: 0,
            toArray: function() {
                return c.call(this)
            },
            get: function(i) {
                return i == null ? c.call(this) : i < 0 ? this[i + this.length] : this[i]
            },
            pushStack: function(i) {
                var s = l.merge(this.constructor(), i);
                return s.prevObject = this, s
            },
            each: function(i) {
                return l.each(this, i)
            },
            map: function(i) {
                return this.pushStack(l.map(this, function(s, a) {
                    return i.call(s, a, s)
                }))
            },
            slice: function() {
                return this.pushStack(c.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            even: function() {
                return this.pushStack(l.grep(this, function(i, s) {
                    return (s + 1) % 2
                }))
            },
            odd: function() {
                return this.pushStack(l.grep(this, function(i, s) {
                    return s % 2
                }))
            },
            eq: function(i) {
                var s = this.length,
                    a = +i + (i < 0 ? s : 0);
                return this.pushStack(a >= 0 && a < s ? [this[a]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: d,
            sort: r.sort,
            splice: r.splice
        }, l.extend = l.fn.extend = function() {
            var i, s, a, u, h, p, m = arguments[0] || {},
                w = 1,
                _ = arguments.length,
                C = !1;
            for (typeof m == "boolean" && (C = m, m = arguments[w] || {}, w++), typeof m != "object" && !L(m) && (m = {}), w === _ && (m = this, w--); w < _; w++)
                if ((i = arguments[w]) != null)
                    for (s in i) u = i[s], !(s === "__proto__" || m === u) && (C && u && (l.isPlainObject(u) || (h = Array.isArray(u))) ? (a = m[s], h && !Array.isArray(a) ? p = [] : !h && !l.isPlainObject(a) ? p = {} : p = a, h = !1, m[s] = l.extend(C, p, u)) : u !== void 0 && (m[s] = u));
            return m
        }, l.extend({
            expando: "jQuery" + (it + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(i) {
                throw new Error(i)
            },
            noop: function() {},
            isPlainObject: function(i) {
                var s, a;
                return !i || v.call(i) !== "[object Object]" ? !1 : (s = o(i), s ? (a = E.call(s, "constructor") && s.constructor, typeof a == "function" && A.call(a) === D) : !0)
            },
            isEmptyObject: function(i) {
                var s;
                for (s in i) return !1;
                return !0
            },
            globalEval: function(i, s, a) {
                tt(i, {
                    nonce: s && s.nonce
                }, a)
            },
            each: function(i, s) {
                var a, u = 0;
                if (W(i))
                    for (a = i.length; u < a && s.call(i[u], u, i[u]) !== !1; u++);
                else
                    for (u in i)
                        if (s.call(i[u], u, i[u]) === !1) break;
                return i
            },
            text: function(i) {
                var s, a = "",
                    u = 0,
                    h = i.nodeType;
                if (!h)
                    for (; s = i[u++];) a += l.text(s);
                return h === 1 || h === 11 ? i.textContent : h === 9 ? i.documentElement.textContent : h === 3 || h === 4 ? i.nodeValue : a
            },
            makeArray: function(i, s) {
                var a = s || [];
                return i != null && (W(Object(i)) ? l.merge(a, typeof i == "string" ? [i] : i) : d.call(a, i)), a
            },
            inArray: function(i, s, a) {
                return s == null ? -1 : g.call(s, i, a)
            },
            isXMLDoc: function(i) {
                var s = i && i.namespaceURI,
                    a = i && (i.ownerDocument || i).documentElement;
                return !Y.test(s || a && a.nodeName || "HTML")
            },
            merge: function(i, s) {
                for (var a = +s.length, u = 0, h = i.length; u < a; u++) i[h++] = s[u];
                return i.length = h, i
            },
            grep: function(i, s, a) {
                for (var u, h = [], p = 0, m = i.length, w = !a; p < m; p++) u = !s(i[p], p), u !== w && h.push(i[p]);
                return h
            },
            map: function(i, s, a) {
                var u, h, p = 0,
                    m = [];
                if (W(i))
                    for (u = i.length; p < u; p++) h = s(i[p], p, a), h != null && m.push(h);
                else
                    for (p in i) h = s(i[p], p, a), h != null && m.push(h);
                return f(m)
            },
            guid: 1,
            support: x
        }), typeof Symbol == "function" && (l.fn[Symbol.iterator] = r[Symbol.iterator]), l.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, s) {
            b["[object " + s + "]"] = s.toLowerCase()
        });

        function W(i) {
            var s = !!i && "length" in i && i.length,
                a = K(i);
            return L(i) || R(i) ? !1 : a === "array" || s === 0 || typeof s == "number" && s > 0 && s - 1 in i
        }

        function V(i, s) {
            return i.nodeName && i.nodeName.toLowerCase() === s.toLowerCase()
        }
        var U = r.pop,
            et = r.sort,
            rt = r.splice,
            X = "[\\x20\\t\\r\\n\\f]",
            Tt = new RegExp("^" + X + "+|((?:^|[^\\\\])(?:\\\\.)*)" + X + "+$", "g");
        l.contains = function(i, s) {
            var a = s && s.parentNode;
            return i === a || !!(a && a.nodeType === 1 && (i.contains ? i.contains(a) : i.compareDocumentPosition && i.compareDocumentPosition(a) & 16))
        };
        var Mt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

        function At(i, s) {
            return s ? i === "\0" ? "�" : i.slice(0, -1) + "\\" + i.charCodeAt(i.length - 1).toString(16) + " " : "\\" + i
        }
        l.escapeSelector = function(i) {
            return (i + "").replace(Mt, At)
        };
        var yt = M,
            re = d;
        (function() {
            var i, s, a, u, h, p = re,
                m, w, _, C, N, P = l.expando,
                O = 0,
                j = 0,
                ot = Di(),
                mt = Di(),
                ft = Di(),
                Ot = Di(),
                xt = function(y, T) {
                    return y === T && (h = !0), 0
                },
                he = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                pe = "(?:\\\\[\\da-fA-F]{1,6}" + X + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                gt = "\\[" + X + "*(" + pe + ")(?:" + X + "*([*^$|!~]?=)" + X + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + pe + "))|)" + X + "*\\]",
                cn = ":(" + pe + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + gt + ")*)|.*)\\)|)",
                vt = new RegExp(X + "+", "g"),
                Et = new RegExp("^" + X + "*," + X + "*"),
                fi = new RegExp("^" + X + "*([>+~]|" + X + ")" + X + "*"),
                jr = new RegExp(X + "|>"),
                ge = new RegExp(cn),
                di = new RegExp("^" + pe + "$"),
                me = {
                    ID: new RegExp("^#(" + pe + ")"),
                    CLASS: new RegExp("^\\.(" + pe + ")"),
                    TAG: new RegExp("^(" + pe + "|[*])"),
                    ATTR: new RegExp("^" + gt),
                    PSEUDO: new RegExp("^" + cn),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + X + "*(even|odd|(([+-]|)(\\d*)n|)" + X + "*(?:([+-]|)" + X + "*(\\d+)|))" + X + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + he + ")$", "i"),
                    needsContext: new RegExp("^" + X + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + X + "*((?:-\\d)?\\d*)" + X + "*\\)|)(?=[^-]|$)", "i")
                },
                qe = /^(?:input|select|textarea|button)$/i,
                We = /^h\d$/i,
                Gt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                Br = /[+~]/,
                xe = new RegExp("\\\\[\\da-fA-F]{1,6}" + X + "?|\\\\([^\\r\\n\\f])", "g"),
                Se = function(y, T) {
                    var S = "0x" + y.slice(1) - 65536;
                    return T || (S < 0 ? String.fromCharCode(S + 65536) : String.fromCharCode(S >> 10 | 55296, S & 1023 | 56320))
                },
                vu = function() {
                    Fe()
                },
                bu = Ii(function(y) {
                    return y.disabled === !0 && V(y, "fieldset")
                }, {
                    dir: "parentNode",
                    next: "legend"
                });

            function yu() {
                try {
                    return m.activeElement
                } catch {}
            }
            try {
                p.apply(r = c.call(yt.childNodes), yt.childNodes), r[yt.childNodes.length].nodeType
            } catch {
                p = {
                    apply: function(T, S) {
                        re.apply(T, c.call(S))
                    },
                    call: function(T) {
                        re.apply(T, c.call(arguments, 1))
                    }
                }
            }

            function bt(y, T, S, k) {
                var I, q, F, Z, z, ht, st, ct = T && T.ownerDocument,
                    pt = T ? T.nodeType : 9;
                if (S = S || [], typeof y != "string" || !y || pt !== 1 && pt !== 9 && pt !== 11) return S;
                if (!k && (Fe(T), T = T || m, _)) {
                    if (pt !== 11 && (z = Gt.exec(y)))
                        if (I = z[1]) {
                            if (pt === 9)
                                if (F = T.getElementById(I)) {
                                    if (F.id === I) return p.call(S, F), S
                                } else return S;
                            else if (ct && (F = ct.getElementById(I)) && bt.contains(T, F) && F.id === I) return p.call(S, F), S
                        } else {
                            if (z[2]) return p.apply(S, T.getElementsByTagName(y)), S;
                            if ((I = z[3]) && T.getElementsByClassName) return p.apply(S, T.getElementsByClassName(I)), S
                        } if (!Ot[y + " "] && (!C || !C.test(y))) {
                        if (st = y, ct = T, pt === 1 && (jr.test(y) || fi.test(y))) {
                            for (ct = Br.test(y) && Vr(T.parentNode) || T, (ct != T || !x.scope) && ((Z = T.getAttribute("id")) ? Z = l.escapeSelector(Z) : T.setAttribute("id", Z = P)), ht = hi(y), q = ht.length; q--;) ht[q] = (Z ? "#" + Z : ":scope") + " " + Mi(ht[q]);
                            st = ht.join(",")
                        }
                        try {
                            return p.apply(S, ct.querySelectorAll(st)), S
                        } catch {
                            Ot(y, !0)
                        } finally {
                            Z === P && T.removeAttribute("id")
                        }
                    }
                }
                return zo(y.replace(Tt, "$1"), T, S, k)
            }

            function Di() {
                var y = [];

                function T(S, k) {
                    return y.push(S + " ") > s.cacheLength && delete T[y.shift()], T[S + " "] = k
                }
                return T
            }

            function ae(y) {
                return y[P] = !0, y
            }

            function Sn(y) {
                var T = m.createElement("fieldset");
                try {
                    return !!y(T)
                } catch {
                    return !1
                } finally {
                    T.parentNode && T.parentNode.removeChild(T), T = null
                }
            }

            function _u(y) {
                return function(T) {
                    return V(T, "input") && T.type === y
                }
            }

            function wu(y) {
                return function(T) {
                    return (V(T, "input") || V(T, "button")) && T.type === y
                }
            }

            function Wo(y) {
                return function(T) {
                    return "form" in T ? T.parentNode && T.disabled === !1 ? "label" in T ? "label" in T.parentNode ? T.parentNode.disabled === y : T.disabled === y : T.isDisabled === y || T.isDisabled !== !y && bu(T) === y : T.disabled === y : "label" in T ? T.disabled === y : !1
                }
            }

            function ln(y) {
                return ae(function(T) {
                    return T = +T, ae(function(S, k) {
                        for (var I, q = y([], S.length, T), F = q.length; F--;) S[I = q[F]] && (S[I] = !(k[I] = S[I]))
                    })
                })
            }

            function Vr(y) {
                return y && typeof y.getElementsByTagName < "u" && y
            }

            function Fe(y) {
                var T, S = y ? y.ownerDocument || y : yt;
                return S == m || S.nodeType !== 9 || !S.documentElement || (m = S, w = m.documentElement, _ = !l.isXMLDoc(m), N = w.matches || w.webkitMatchesSelector || w.msMatchesSelector, w.msMatchesSelector && yt != m && (T = m.defaultView) && T.top !== T && T.addEventListener("unload", vu), x.getById = Sn(function(k) {
                    return w.appendChild(k).id = l.expando, !m.getElementsByName || !m.getElementsByName(l.expando).length
                }), x.disconnectedMatch = Sn(function(k) {
                    return N.call(k, "*")
                }), x.scope = Sn(function() {
                    return m.querySelectorAll(":scope")
                }), x.cssHas = Sn(function() {
                    try {
                        return m.querySelector(":has(*,:jqfake)"), !1
                    } catch {
                        return !0
                    }
                }), x.getById ? (s.filter.ID = function(k) {
                    var I = k.replace(xe, Se);
                    return function(q) {
                        return q.getAttribute("id") === I
                    }
                }, s.find.ID = function(k, I) {
                    if (typeof I.getElementById < "u" && _) {
                        var q = I.getElementById(k);
                        return q ? [q] : []
                    }
                }) : (s.filter.ID = function(k) {
                    var I = k.replace(xe, Se);
                    return function(q) {
                        var F = typeof q.getAttributeNode < "u" && q.getAttributeNode("id");
                        return F && F.value === I
                    }
                }, s.find.ID = function(k, I) {
                    if (typeof I.getElementById < "u" && _) {
                        var q, F, Z, z = I.getElementById(k);
                        if (z) {
                            if (q = z.getAttributeNode("id"), q && q.value === k) return [z];
                            for (Z = I.getElementsByName(k), F = 0; z = Z[F++];)
                                if (q = z.getAttributeNode("id"), q && q.value === k) return [z]
                        }
                        return []
                    }
                }), s.find.TAG = function(k, I) {
                    return typeof I.getElementsByTagName < "u" ? I.getElementsByTagName(k) : I.querySelectorAll(k)
                }, s.find.CLASS = function(k, I) {
                    if (typeof I.getElementsByClassName < "u" && _) return I.getElementsByClassName(k)
                }, C = [], Sn(function(k) {
                    var I;
                    w.appendChild(k).innerHTML = "<a id='" + P + "' href='' disabled='disabled'></a><select id='" + P + "-\r\\' disabled='disabled'><option selected=''></option></select>", k.querySelectorAll("[selected]").length || C.push("\\[" + X + "*(?:value|" + he + ")"), k.querySelectorAll("[id~=" + P + "-]").length || C.push("~="), k.querySelectorAll("a#" + P + "+*").length || C.push(".#.+[+~]"), k.querySelectorAll(":checked").length || C.push(":checked"), I = m.createElement("input"), I.setAttribute("type", "hidden"), k.appendChild(I).setAttribute("name", "D"), w.appendChild(k).disabled = !0, k.querySelectorAll(":disabled").length !== 2 && C.push(":enabled", ":disabled"), I = m.createElement("input"), I.setAttribute("name", ""), k.appendChild(I), k.querySelectorAll("[name='']").length || C.push("\\[" + X + "*name" + X + "*=" + X + `*(?:''|"")`)
                }), x.cssHas || C.push(":has"), C = C.length && new RegExp(C.join("|")), xt = function(k, I) {
                    if (k === I) return h = !0, 0;
                    var q = !k.compareDocumentPosition - !I.compareDocumentPosition;
                    return q || (q = (k.ownerDocument || k) == (I.ownerDocument || I) ? k.compareDocumentPosition(I) : 1, q & 1 || !x.sortDetached && I.compareDocumentPosition(k) === q ? k === m || k.ownerDocument == yt && bt.contains(yt, k) ? -1 : I === m || I.ownerDocument == yt && bt.contains(yt, I) ? 1 : u ? g.call(u, k) - g.call(u, I) : 0 : q & 4 ? -1 : 1)
                }), m
            }
            bt.matches = function(y, T) {
                return bt(y, null, null, T)
            }, bt.matchesSelector = function(y, T) {
                if (Fe(y), _ && !Ot[T + " "] && (!C || !C.test(T))) try {
                    var S = N.call(y, T);
                    if (S || x.disconnectedMatch || y.document && y.document.nodeType !== 11) return S
                } catch {
                    Ot(T, !0)
                }
                return bt(T, m, null, [y]).length > 0
            }, bt.contains = function(y, T) {
                return (y.ownerDocument || y) != m && Fe(y), l.contains(y, T)
            }, bt.attr = function(y, T) {
                (y.ownerDocument || y) != m && Fe(y);
                var S = s.attrHandle[T.toLowerCase()],
                    k = S && E.call(s.attrHandle, T.toLowerCase()) ? S(y, T, !_) : void 0;
                return k !== void 0 ? k : y.getAttribute(T)
            }, bt.error = function(y) {
                throw new Error("Syntax error, unrecognized expression: " + y)
            }, l.uniqueSort = function(y) {
                var T, S = [],
                    k = 0,
                    I = 0;
                if (h = !x.sortStable, u = !x.sortStable && c.call(y, 0), et.call(y, xt), h) {
                    for (; T = y[I++];) T === y[I] && (k = S.push(I));
                    for (; k--;) rt.call(y, S[k], 1)
                }
                return u = null, y
            }, l.fn.uniqueSort = function() {
                return this.pushStack(l.uniqueSort(c.apply(this)))
            }, s = l.expr = {
                cacheLength: 50,
                createPseudo: ae,
                match: me,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(y) {
                        return y[1] = y[1].replace(xe, Se), y[3] = (y[3] || y[4] || y[5] || "").replace(xe, Se), y[2] === "~=" && (y[3] = " " + y[3] + " "), y.slice(0, 4)
                    },
                    CHILD: function(y) {
                        return y[1] = y[1].toLowerCase(), y[1].slice(0, 3) === "nth" ? (y[3] || bt.error(y[0]), y[4] = +(y[4] ? y[5] + (y[6] || 1) : 2 * (y[3] === "even" || y[3] === "odd")), y[5] = +(y[7] + y[8] || y[3] === "odd")) : y[3] && bt.error(y[0]), y
                    },
                    PSEUDO: function(y) {
                        var T, S = !y[6] && y[2];
                        return me.CHILD.test(y[0]) ? null : (y[3] ? y[2] = y[4] || y[5] || "" : S && ge.test(S) && (T = hi(S, !0)) && (T = S.indexOf(")", S.length - T) - S.length) && (y[0] = y[0].slice(0, T), y[2] = S.slice(0, T)), y.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(y) {
                        var T = y.replace(xe, Se).toLowerCase();
                        return y === "*" ? function() {
                            return !0
                        } : function(S) {
                            return V(S, T)
                        }
                    },
                    CLASS: function(y) {
                        var T = ot[y + " "];
                        return T || (T = new RegExp("(^|" + X + ")" + y + "(" + X + "|$)")) && ot(y, function(S) {
                            return T.test(typeof S.className == "string" && S.className || typeof S.getAttribute < "u" && S.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(y, T, S) {
                        return function(k) {
                            var I = bt.attr(k, y);
                            return I == null ? T === "!=" : T ? (I += "", T === "=" ? I === S : T === "!=" ? I !== S : T === "^=" ? S && I.indexOf(S) === 0 : T === "*=" ? S && I.indexOf(S) > -1 : T === "$=" ? S && I.slice(-S.length) === S : T === "~=" ? (" " + I.replace(vt, " ") + " ").indexOf(S) > -1 : T === "|=" ? I === S || I.slice(0, S.length + 1) === S + "-" : !1) : !0
                        }
                    },
                    CHILD: function(y, T, S, k, I) {
                        var q = y.slice(0, 3) !== "nth",
                            F = y.slice(-4) !== "last",
                            Z = T === "of-type";
                        return k === 1 && I === 0 ? function(z) {
                            return !!z.parentNode
                        } : function(z, ht, st) {
                            var ct, pt, nt, _t, Vt, Nt = q !== F ? "nextSibling" : "previousSibling",
                                Zt = z.parentNode,
                                ve = Z && z.nodeName.toLowerCase(),
                                On = !st && !Z,
                                It = !1;
                            if (Zt) {
                                if (q) {
                                    for (; Nt;) {
                                        for (nt = z; nt = nt[Nt];)
                                            if (Z ? V(nt, ve) : nt.nodeType === 1) return !1;
                                        Vt = Nt = y === "only" && !Vt && "nextSibling"
                                    }
                                    return !0
                                }
                                if (Vt = [F ? Zt.firstChild : Zt.lastChild], F && On) {
                                    for (pt = Zt[P] || (Zt[P] = {}), ct = pt[y] || [], _t = ct[0] === O && ct[1], It = _t && ct[2], nt = _t && Zt.childNodes[_t]; nt = ++_t && nt && nt[Nt] || (It = _t = 0) || Vt.pop();)
                                        if (nt.nodeType === 1 && ++It && nt === z) {
                                            pt[y] = [O, _t, It];
                                            break
                                        }
                                } else if (On && (pt = z[P] || (z[P] = {}), ct = pt[y] || [], _t = ct[0] === O && ct[1], It = _t), It === !1)
                                    for (;
                                        (nt = ++_t && nt && nt[Nt] || (It = _t = 0) || Vt.pop()) && !((Z ? V(nt, ve) : nt.nodeType === 1) && ++It && (On && (pt = nt[P] || (nt[P] = {}), pt[y] = [O, It]), nt === z)););
                                return It -= I, It === k || It % k === 0 && It / k >= 0
                            }
                        }
                    },
                    PSEUDO: function(y, T) {
                        var S, k = s.pseudos[y] || s.setFilters[y.toLowerCase()] || bt.error("unsupported pseudo: " + y);
                        return k[P] ? k(T) : k.length > 1 ? (S = [y, y, "", T], s.setFilters.hasOwnProperty(y.toLowerCase()) ? ae(function(I, q) {
                            for (var F, Z = k(I, T), z = Z.length; z--;) F = g.call(I, Z[z]), I[F] = !(q[F] = Z[z])
                        }) : function(I) {
                            return k(I, 0, S)
                        }) : k
                    }
                },
                pseudos: {
                    not: ae(function(y) {
                        var T = [],
                            S = [],
                            k = zr(y.replace(Tt, "$1"));
                        return k[P] ? ae(function(I, q, F, Z) {
                            for (var z, ht = k(I, null, Z, []), st = I.length; st--;)(z = ht[st]) && (I[st] = !(q[st] = z))
                        }) : function(I, q, F) {
                            return T[0] = I, k(T, null, F, S), T[0] = null, !S.pop()
                        }
                    }),
                    has: ae(function(y) {
                        return function(T) {
                            return bt(y, T).length > 0
                        }
                    }),
                    contains: ae(function(y) {
                        return y = y.replace(xe, Se),
                            function(T) {
                                return (T.textContent || l.text(T)).indexOf(y) > -1
                            }
                    }),
                    lang: ae(function(y) {
                        return di.test(y || "") || bt.error("unsupported lang: " + y), y = y.replace(xe, Se).toLowerCase(),
                            function(T) {
                                var S;
                                do
                                    if (S = _ ? T.lang : T.getAttribute("xml:lang") || T.getAttribute("lang")) return S = S.toLowerCase(), S === y || S.indexOf(y + "-") === 0; while ((T = T.parentNode) && T.nodeType === 1);
                                return !1
                            }
                    }),
                    target: function(y) {
                        var T = t.location && t.location.hash;
                        return T && T.slice(1) === y.id
                    },
                    root: function(y) {
                        return y === w
                    },
                    focus: function(y) {
                        return y === yu() && m.hasFocus() && !!(y.type || y.href || ~y.tabIndex)
                    },
                    enabled: Wo(!1),
                    disabled: Wo(!0),
                    checked: function(y) {
                        return V(y, "input") && !!y.checked || V(y, "option") && !!y.selected
                    },
                    selected: function(y) {
                        return y.parentNode && y.parentNode.selectedIndex, y.selected === !0
                    },
                    empty: function(y) {
                        for (y = y.firstChild; y; y = y.nextSibling)
                            if (y.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(y) {
                        return !s.pseudos.empty(y)
                    },
                    header: function(y) {
                        return We.test(y.nodeName)
                    },
                    input: function(y) {
                        return qe.test(y.nodeName)
                    },
                    button: function(y) {
                        return V(y, "input") && y.type === "button" || V(y, "button")
                    },
                    text: function(y) {
                        var T;
                        return V(y, "input") && y.type === "text" && ((T = y.getAttribute("type")) == null || T.toLowerCase() === "text")
                    },
                    first: ln(function() {
                        return [0]
                    }),
                    last: ln(function(y, T) {
                        return [T - 1]
                    }),
                    eq: ln(function(y, T, S) {
                        return [S < 0 ? S + T : S]
                    }),
                    even: ln(function(y, T) {
                        for (var S = 0; S < T; S += 2) y.push(S);
                        return y
                    }),
                    odd: ln(function(y, T) {
                        for (var S = 1; S < T; S += 2) y.push(S);
                        return y
                    }),
                    lt: ln(function(y, T, S) {
                        var k;
                        for (S < 0 ? k = S + T : S > T ? k = T : k = S; --k >= 0;) y.push(k);
                        return y
                    }),
                    gt: ln(function(y, T, S) {
                        for (var k = S < 0 ? S + T : S; ++k < T;) y.push(k);
                        return y
                    })
                }
            }, s.pseudos.nth = s.pseudos.eq;
            for (i in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) s.pseudos[i] = _u(i);
            for (i in {
                    submit: !0,
                    reset: !0
                }) s.pseudos[i] = wu(i);

            function Fo() {}
            Fo.prototype = s.filters = s.pseudos, s.setFilters = new Fo;

            function hi(y, T) {
                var S, k, I, q, F, Z, z, ht = mt[y + " "];
                if (ht) return T ? 0 : ht.slice(0);
                for (F = y, Z = [], z = s.preFilter; F;) {
                    (!S || (k = Et.exec(F))) && (k && (F = F.slice(k[0].length) || F), Z.push(I = [])), S = !1, (k = fi.exec(F)) && (S = k.shift(), I.push({
                        value: S,
                        type: k[0].replace(Tt, " ")
                    }), F = F.slice(S.length));
                    for (q in s.filter)(k = me[q].exec(F)) && (!z[q] || (k = z[q](k))) && (S = k.shift(), I.push({
                        value: S,
                        type: q,
                        matches: k
                    }), F = F.slice(S.length));
                    if (!S) break
                }
                return T ? F.length : F ? bt.error(y) : mt(y, Z).slice(0)
            }

            function Mi(y) {
                for (var T = 0, S = y.length, k = ""; T < S; T++) k += y[T].value;
                return k
            }

            function Ii(y, T, S) {
                var k = T.dir,
                    I = T.next,
                    q = I || k,
                    F = S && q === "parentNode",
                    Z = j++;
                return T.first ? function(z, ht, st) {
                    for (; z = z[k];)
                        if (z.nodeType === 1 || F) return y(z, ht, st);
                    return !1
                } : function(z, ht, st) {
                    var ct, pt, nt = [O, Z];
                    if (st) {
                        for (; z = z[k];)
                            if ((z.nodeType === 1 || F) && y(z, ht, st)) return !0
                    } else
                        for (; z = z[k];)
                            if (z.nodeType === 1 || F)
                                if (pt = z[P] || (z[P] = {}), I && V(z, I)) z = z[k] || z;
                                else {
                                    if ((ct = pt[q]) && ct[0] === O && ct[1] === Z) return nt[2] = ct[2];
                                    if (pt[q] = nt, nt[2] = y(z, ht, st)) return !0
                                } return !1
                }
            }

            function qr(y) {
                return y.length > 1 ? function(T, S, k) {
                    for (var I = y.length; I--;)
                        if (!y[I](T, S, k)) return !1;
                    return !0
                } : y[0]
            }

            function Eu(y, T, S) {
                for (var k = 0, I = T.length; k < I; k++) bt(y, T[k], S);
                return S
            }

            function Pi(y, T, S, k, I) {
                for (var q, F = [], Z = 0, z = y.length, ht = T != null; Z < z; Z++)(q = y[Z]) && (!S || S(q, k, I)) && (F.push(q), ht && T.push(Z));
                return F
            }

            function Wr(y, T, S, k, I, q) {
                return k && !k[P] && (k = Wr(k)), I && !I[P] && (I = Wr(I, q)), ae(function(F, Z, z, ht) {
                    var st, ct, pt, nt, _t = [],
                        Vt = [],
                        Nt = Z.length,
                        Zt = F || Eu(T || "*", z.nodeType ? [z] : z, []),
                        ve = y && (F || !T) ? Pi(Zt, _t, y, z, ht) : Zt;
                    if (S ? (nt = I || (F ? y : Nt || k) ? [] : Z, S(ve, nt, z, ht)) : nt = ve, k)
                        for (st = Pi(nt, Vt), k(st, [], z, ht), ct = st.length; ct--;)(pt = st[ct]) && (nt[Vt[ct]] = !(ve[Vt[ct]] = pt));
                    if (F) {
                        if (I || y) {
                            if (I) {
                                for (st = [], ct = nt.length; ct--;)(pt = nt[ct]) && st.push(ve[ct] = pt);
                                I(null, nt = [], st, ht)
                            }
                            for (ct = nt.length; ct--;)(pt = nt[ct]) && (st = I ? g.call(F, pt) : _t[ct]) > -1 && (F[st] = !(Z[st] = pt))
                        }
                    } else nt = Pi(nt === Z ? nt.splice(Nt, nt.length) : nt), I ? I(null, Z, nt, ht) : p.apply(Z, nt)
                })
            }

            function Fr(y) {
                for (var T, S, k, I = y.length, q = s.relative[y[0].type], F = q || s.relative[" "], Z = q ? 1 : 0, z = Ii(function(ct) {
                        return ct === T
                    }, F, !0), ht = Ii(function(ct) {
                        return g.call(T, ct) > -1
                    }, F, !0), st = [function(ct, pt, nt) {
                        var _t = !q && (nt || pt != a) || ((T = pt).nodeType ? z(ct, pt, nt) : ht(ct, pt, nt));
                        return T = null, _t
                    }]; Z < I; Z++)
                    if (S = s.relative[y[Z].type]) st = [Ii(qr(st), S)];
                    else {
                        if (S = s.filter[y[Z].type].apply(null, y[Z].matches), S[P]) {
                            for (k = ++Z; k < I && !s.relative[y[k].type]; k++);
                            return Wr(Z > 1 && qr(st), Z > 1 && Mi(y.slice(0, Z - 1).concat({
                                value: y[Z - 2].type === " " ? "*" : ""
                            })).replace(Tt, "$1"), S, Z < k && Fr(y.slice(Z, k)), k < I && Fr(y = y.slice(k)), k < I && Mi(y))
                        }
                        st.push(S)
                    } return qr(st)
            }

            function Tu(y, T) {
                var S = T.length > 0,
                    k = y.length > 0,
                    I = function(q, F, Z, z, ht) {
                        var st, ct, pt, nt = 0,
                            _t = "0",
                            Vt = q && [],
                            Nt = [],
                            Zt = a,
                            ve = q || k && s.find.TAG("*", ht),
                            On = O += Zt == null ? 1 : Math.random() || .1,
                            It = ve.length;
                        for (ht && (a = F == m || F || ht); _t !== It && (st = ve[_t]) != null; _t++) {
                            if (k && st) {
                                for (ct = 0, !F && st.ownerDocument != m && (Fe(st), Z = !_); pt = y[ct++];)
                                    if (pt(st, F || m, Z)) {
                                        p.call(z, st);
                                        break
                                    } ht && (O = On)
                            }
                            S && ((st = !pt && st) && nt--, q && Vt.push(st))
                        }
                        if (nt += _t, S && _t !== nt) {
                            for (ct = 0; pt = T[ct++];) pt(Vt, Nt, F, Z);
                            if (q) {
                                if (nt > 0)
                                    for (; _t--;) Vt[_t] || Nt[_t] || (Nt[_t] = U.call(z));
                                Nt = Pi(Nt)
                            }
                            p.apply(z, Nt), ht && !q && Nt.length > 0 && nt + T.length > 1 && l.uniqueSort(z)
                        }
                        return ht && (O = On, a = Zt), Vt
                    };
                return S ? ae(I) : I
            }

            function zr(y, T) {
                var S, k = [],
                    I = [],
                    q = ft[y + " "];
                if (!q) {
                    for (T || (T = hi(y)), S = T.length; S--;) q = Fr(T[S]), q[P] ? k.push(q) : I.push(q);
                    q = ft(y, Tu(I, k)), q.selector = y
                }
                return q
            }

            function zo(y, T, S, k) {
                var I, q, F, Z, z, ht = typeof y == "function" && y,
                    st = !k && hi(y = ht.selector || y);
                if (S = S || [], st.length === 1) {
                    if (q = st[0] = st[0].slice(0), q.length > 2 && (F = q[0]).type === "ID" && T.nodeType === 9 && _ && s.relative[q[1].type]) {
                        if (T = (s.find.ID(F.matches[0].replace(xe, Se), T) || [])[0], T) ht && (T = T.parentNode);
                        else return S;
                        y = y.slice(q.shift().value.length)
                    }
                    for (I = me.needsContext.test(y) ? 0 : q.length; I-- && (F = q[I], !s.relative[Z = F.type]);)
                        if ((z = s.find[Z]) && (k = z(F.matches[0].replace(xe, Se), Br.test(q[0].type) && Vr(T.parentNode) || T))) {
                            if (q.splice(I, 1), y = k.length && Mi(q), !y) return p.apply(S, k), S;
                            break
                        }
                }
                return (ht || zr(y, st))(k, T, !_, S, !T || Br.test(y) && Vr(T.parentNode) || T), S
            }
            x.sortStable = P.split("").sort(xt).join("") === P, Fe(), x.sortDetached = Sn(function(y) {
                return y.compareDocumentPosition(m.createElement("fieldset")) & 1
            }), l.find = bt, l.expr[":"] = l.expr.pseudos, l.unique = l.uniqueSort, bt.compile = zr, bt.select = zo, bt.setDocument = Fe, bt.tokenize = hi, bt.escape = l.escapeSelector, bt.getText = l.text, bt.isXML = l.isXMLDoc, bt.selectors = l.expr, bt.support = l.support, bt.uniqueSort = l.uniqueSort
        })();
        var Lt = function(i, s, a) {
                for (var u = [], h = a !== void 0;
                    (i = i[s]) && i.nodeType !== 9;)
                    if (i.nodeType === 1) {
                        if (h && l(i).is(a)) break;
                        u.push(i)
                    } return u
            },
            He = function(i, s) {
                for (var a = []; i; i = i.nextSibling) i.nodeType === 1 && i !== s && a.push(i);
                return a
            },
            je = l.expr.match.needsContext,
            fe = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

        function Kt(i, s, a) {
            return L(s) ? l.grep(i, function(u, h) {
                return !!s.call(u, h, u) !== a
            }) : s.nodeType ? l.grep(i, function(u) {
                return u === s !== a
            }) : typeof s != "string" ? l.grep(i, function(u) {
                return g.call(s, u) > -1 !== a
            }) : l.filter(s, i, a)
        }
        l.filter = function(i, s, a) {
            var u = s[0];
            return a && (i = ":not(" + i + ")"), s.length === 1 && u.nodeType === 1 ? l.find.matchesSelector(u, i) ? [u] : [] : l.find.matches(i, l.grep(s, function(h) {
                return h.nodeType === 1
            }))
        }, l.fn.extend({
            find: function(i) {
                var s, a, u = this.length,
                    h = this;
                if (typeof i != "string") return this.pushStack(l(i).filter(function() {
                    for (s = 0; s < u; s++)
                        if (l.contains(h[s], this)) return !0
                }));
                for (a = this.pushStack([]), s = 0; s < u; s++) l.find(i, h[s], a);
                return u > 1 ? l.uniqueSort(a) : a
            },
            filter: function(i) {
                return this.pushStack(Kt(this, i || [], !1))
            },
            not: function(i) {
                return this.pushStack(Kt(this, i || [], !0))
            },
            is: function(i) {
                return !!Kt(this, typeof i == "string" && je.test(i) ? l(i) : i || [], !1).length
            }
        });
        var Ee, de = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
            en = l.fn.init = function(i, s, a) {
                var u, h;
                if (!i) return this;
                if (a = a || Ee, typeof i == "string")
                    if (i[0] === "<" && i[i.length - 1] === ">" && i.length >= 3 ? u = [null, i, null] : u = de.exec(i), u && (u[1] || !s))
                        if (u[1]) {
                            if (s = s instanceof l ? s[0] : s, l.merge(this, l.parseHTML(u[1], s && s.nodeType ? s.ownerDocument || s : M, !0)), fe.test(u[1]) && l.isPlainObject(s))
                                for (u in s) L(this[u]) ? this[u](s[u]) : this.attr(u, s[u]);
                            return this
                        } else return h = M.getElementById(u[2]), h && (this[0] = h, this.length = 1), this;
                else return !s || s.jquery ? (s || a).find(i) : this.constructor(s).find(i);
                else {
                    if (i.nodeType) return this[0] = i, this.length = 1, this;
                    if (L(i)) return a.ready !== void 0 ? a.ready(i) : i(l)
                }
                return l.makeArray(i, this)
            };
        en.prototype = l.fn, Ee = l(M);
        var bn = /^(?:parents|prev(?:Until|All))/,
            Te = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        l.fn.extend({
            has: function(i) {
                var s = l(i, this),
                    a = s.length;
                return this.filter(function() {
                    for (var u = 0; u < a; u++)
                        if (l.contains(this, s[u])) return !0
                })
            },
            closest: function(i, s) {
                var a, u = 0,
                    h = this.length,
                    p = [],
                    m = typeof i != "string" && l(i);
                if (!je.test(i)) {
                    for (; u < h; u++)
                        for (a = this[u]; a && a !== s; a = a.parentNode)
                            if (a.nodeType < 11 && (m ? m.index(a) > -1 : a.nodeType === 1 && l.find.matchesSelector(a, i))) {
                                p.push(a);
                                break
                            }
                }
                return this.pushStack(p.length > 1 ? l.uniqueSort(p) : p)
            },
            index: function(i) {
                return i ? typeof i == "string" ? g.call(l(i), this[0]) : g.call(this, i.jquery ? i[0] : i) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(i, s) {
                return this.pushStack(l.uniqueSort(l.merge(this.get(), l(i, s))))
            },
            addBack: function(i) {
                return this.add(i == null ? this.prevObject : this.prevObject.filter(i))
            }
        });

        function yn(i, s) {
            for (;
                (i = i[s]) && i.nodeType !== 1;);
            return i
        }
        l.each({
            parent: function(i) {
                var s = i.parentNode;
                return s && s.nodeType !== 11 ? s : null
            },
            parents: function(i) {
                return Lt(i, "parentNode")
            },
            parentsUntil: function(i, s, a) {
                return Lt(i, "parentNode", a)
            },
            next: function(i) {
                return yn(i, "nextSibling")
            },
            prev: function(i) {
                return yn(i, "previousSibling")
            },
            nextAll: function(i) {
                return Lt(i, "nextSibling")
            },
            prevAll: function(i) {
                return Lt(i, "previousSibling")
            },
            nextUntil: function(i, s, a) {
                return Lt(i, "nextSibling", a)
            },
            prevUntil: function(i, s, a) {
                return Lt(i, "previousSibling", a)
            },
            siblings: function(i) {
                return He((i.parentNode || {}).firstChild, i)
            },
            children: function(i) {
                return He(i.firstChild)
            },
            contents: function(i) {
                return i.contentDocument != null && o(i.contentDocument) ? i.contentDocument : (V(i, "template") && (i = i.content || i), l.merge([], i.childNodes))
            }
        }, function(i, s) {
            l.fn[i] = function(a, u) {
                var h = l.map(this, s, a);
                return i.slice(-5) !== "Until" && (u = a), u && typeof u == "string" && (h = l.filter(u, h)), this.length > 1 && (Te[i] || l.uniqueSort(h), bn.test(i) && h.reverse()), this.pushStack(h)
            }
        });
        var Ut = /[^\x20\t\r\n\f]+/g;

        function ri(i) {
            var s = {};
            return l.each(i.match(Ut) || [], function(a, u) {
                s[u] = !0
            }), s
        }
        l.Callbacks = function(i) {
            i = typeof i == "string" ? ri(i) : l.extend({}, i);
            var s, a, u, h, p = [],
                m = [],
                w = -1,
                _ = function() {
                    for (h = h || i.once, u = s = !0; m.length; w = -1)
                        for (a = m.shift(); ++w < p.length;) p[w].apply(a[0], a[1]) === !1 && i.stopOnFalse && (w = p.length, a = !1);
                    i.memory || (a = !1), s = !1, h && (a ? p = [] : p = "")
                },
                C = {
                    add: function() {
                        return p && (a && !s && (w = p.length - 1, m.push(a)), function N(P) {
                            l.each(P, function(O, j) {
                                L(j) ? (!i.unique || !C.has(j)) && p.push(j) : j && j.length && K(j) !== "string" && N(j)
                            })
                        }(arguments), a && !s && _()), this
                    },
                    remove: function() {
                        return l.each(arguments, function(N, P) {
                            for (var O;
                                (O = l.inArray(P, p, O)) > -1;) p.splice(O, 1), O <= w && w--
                        }), this
                    },
                    has: function(N) {
                        return N ? l.inArray(N, p) > -1 : p.length > 0
                    },
                    empty: function() {
                        return p && (p = []), this
                    },
                    disable: function() {
                        return h = m = [], p = a = "", this
                    },
                    disabled: function() {
                        return !p
                    },
                    lock: function() {
                        return h = m = [], !a && !s && (p = a = ""), this
                    },
                    locked: function() {
                        return !!h
                    },
                    fireWith: function(N, P) {
                        return h || (P = P || [], P = [N, P.slice ? P.slice() : P], m.push(P), s || _()), this
                    },
                    fire: function() {
                        return C.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!u
                    }
                };
            return C
        };

        function Be(i) {
            return i
        }

        function nn(i) {
            throw i
        }

        function Ci(i, s, a, u) {
            var h;
            try {
                i && L(h = i.promise) ? h.call(i).done(s).fail(a) : i && L(h = i.then) ? h.call(i, s, a) : s.apply(void 0, [i].slice(u))
            } catch (p) {
                a.apply(void 0, [p])
            }
        }
        l.extend({
            Deferred: function(i) {
                var s = [
                        ["notify", "progress", l.Callbacks("memory"), l.Callbacks("memory"), 2],
                        ["resolve", "done", l.Callbacks("once memory"), l.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", l.Callbacks("once memory"), l.Callbacks("once memory"), 1, "rejected"]
                    ],
                    a = "pending",
                    u = {
                        state: function() {
                            return a
                        },
                        always: function() {
                            return h.done(arguments).fail(arguments), this
                        },
                        catch: function(p) {
                            return u.then(null, p)
                        },
                        pipe: function() {
                            var p = arguments;
                            return l.Deferred(function(m) {
                                l.each(s, function(w, _) {
                                    var C = L(p[_[4]]) && p[_[4]];
                                    h[_[1]](function() {
                                        var N = C && C.apply(this, arguments);
                                        N && L(N.promise) ? N.promise().progress(m.notify).done(m.resolve).fail(m.reject) : m[_[0] + "With"](this, C ? [N] : arguments)
                                    })
                                }), p = null
                            }).promise()
                        },
                        then: function(p, m, w) {
                            var _ = 0;

                            function C(N, P, O, j) {
                                return function() {
                                    var ot = this,
                                        mt = arguments,
                                        ft = function() {
                                            var xt, he;
                                            if (!(N < _)) {
                                                if (xt = O.apply(ot, mt), xt === P.promise()) throw new TypeError("Thenable self-resolution");
                                                he = xt && (typeof xt == "object" || typeof xt == "function") && xt.then, L(he) ? j ? he.call(xt, C(_, P, Be, j), C(_, P, nn, j)) : (_++, he.call(xt, C(_, P, Be, j), C(_, P, nn, j), C(_, P, Be, P.notifyWith))) : (O !== Be && (ot = void 0, mt = [xt]), (j || P.resolveWith)(ot, mt))
                                            }
                                        },
                                        Ot = j ? ft : function() {
                                            try {
                                                ft()
                                            } catch (xt) {
                                                l.Deferred.exceptionHook && l.Deferred.exceptionHook(xt, Ot.error), N + 1 >= _ && (O !== nn && (ot = void 0, mt = [xt]), P.rejectWith(ot, mt))
                                            }
                                        };
                                    N ? Ot() : (l.Deferred.getErrorHook ? Ot.error = l.Deferred.getErrorHook() : l.Deferred.getStackHook && (Ot.error = l.Deferred.getStackHook()), t.setTimeout(Ot))
                                }
                            }
                            return l.Deferred(function(N) {
                                s[0][3].add(C(0, N, L(w) ? w : Be, N.notifyWith)), s[1][3].add(C(0, N, L(p) ? p : Be)), s[2][3].add(C(0, N, L(m) ? m : nn))
                            }).promise()
                        },
                        promise: function(p) {
                            return p != null ? l.extend(p, u) : u
                        }
                    },
                    h = {};
                return l.each(s, function(p, m) {
                    var w = m[2],
                        _ = m[5];
                    u[m[1]] = w.add, _ && w.add(function() {
                        a = _
                    }, s[3 - p][2].disable, s[3 - p][3].disable, s[0][2].lock, s[0][3].lock), w.add(m[3].fire), h[m[0]] = function() {
                        return h[m[0] + "With"](this === h ? void 0 : this, arguments), this
                    }, h[m[0] + "With"] = w.fireWith
                }), u.promise(h), i && i.call(h, h), h
            },
            when: function(i) {
                var s = arguments.length,
                    a = s,
                    u = Array(a),
                    h = c.call(arguments),
                    p = l.Deferred(),
                    m = function(w) {
                        return function(_) {
                            u[w] = this, h[w] = arguments.length > 1 ? c.call(arguments) : _, --s || p.resolveWith(u, h)
                        }
                    };
                if (s <= 1 && (Ci(i, p.done(m(a)).resolve, p.reject, !s), p.state() === "pending" || L(h[a] && h[a].then))) return p.then();
                for (; a--;) Ci(h[a], m(a), p.reject);
                return p.promise()
            }
        });
        var Tr = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        l.Deferred.exceptionHook = function(i, s) {
            t.console && t.console.warn && i && Tr.test(i.name) && t.console.warn("jQuery.Deferred exception: " + i.message, i.stack, s)
        }, l.readyException = function(i) {
            t.setTimeout(function() {
                throw i
            })
        };
        var _n = l.Deferred();
        l.fn.ready = function(i) {
            return _n.then(i).catch(function(s) {
                l.readyException(s)
            }), this
        }, l.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(i) {
                (i === !0 ? --l.readyWait : l.isReady) || (l.isReady = !0, !(i !== !0 && --l.readyWait > 0) && _n.resolveWith(M, [l]))
            }
        }), l.ready.then = _n.then;

        function rn() {
            M.removeEventListener("DOMContentLoaded", rn), t.removeEventListener("load", rn), l.ready()
        }
        M.readyState === "complete" || M.readyState !== "loading" && !M.documentElement.doScroll ? t.setTimeout(l.ready) : (M.addEventListener("DOMContentLoaded", rn), t.addEventListener("load", rn));
        var se = function(i, s, a, u, h, p, m) {
                var w = 0,
                    _ = i.length,
                    C = a == null;
                if (K(a) === "object") {
                    h = !0;
                    for (w in a) se(i, s, w, a[w], !0, p, m)
                } else if (u !== void 0 && (h = !0, L(u) || (m = !0), C && (m ? (s.call(i, u), s = null) : (C = s, s = function(N, P, O) {
                        return C.call(l(N), O)
                    })), s))
                    for (; w < _; w++) s(i[w], a, m ? u : u.call(i[w], w, s(i[w], a)));
                return h ? i : C ? s.call(i) : _ ? s(i[0], a) : p
            },
            Ar = /^-ms-/,
            Ae = /-([a-z])/g;

        function wn(i, s) {
            return s.toUpperCase()
        }

        function Wt(i) {
            return i.replace(Ar, "ms-").replace(Ae, wn)
        }
        var Ve = function(i) {
            return i.nodeType === 1 || i.nodeType === 9 || !+i.nodeType
        };

        function Ce() {
            this.expando = l.expando + Ce.uid++
        }
        Ce.uid = 1, Ce.prototype = {
            cache: function(i) {
                var s = i[this.expando];
                return s || (s = {}, Ve(i) && (i.nodeType ? i[this.expando] = s : Object.defineProperty(i, this.expando, {
                    value: s,
                    configurable: !0
                }))), s
            },
            set: function(i, s, a) {
                var u, h = this.cache(i);
                if (typeof s == "string") h[Wt(s)] = a;
                else
                    for (u in s) h[Wt(u)] = s[u];
                return h
            },
            get: function(i, s) {
                return s === void 0 ? this.cache(i) : i[this.expando] && i[this.expando][Wt(s)]
            },
            access: function(i, s, a) {
                return s === void 0 || s && typeof s == "string" && a === void 0 ? this.get(i, s) : (this.set(i, s, a), a !== void 0 ? a : s)
            },
            remove: function(i, s) {
                var a, u = i[this.expando];
                if (u !== void 0) {
                    if (s !== void 0)
                        for (Array.isArray(s) ? s = s.map(Wt) : (s = Wt(s), s = s in u ? [s] : s.match(Ut) || []), a = s.length; a--;) delete u[s[a]];
                    (s === void 0 || l.isEmptyObject(u)) && (i.nodeType ? i[this.expando] = void 0 : delete i[this.expando])
                }
            },
            hasData: function(i) {
                var s = i[this.expando];
                return s !== void 0 && !l.isEmptyObject(s)
            }
        };
        var G = new Ce,
            St = new Ce,
            $i = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            xi = /[A-Z]/g;

        function Ml(i) {
            return i === "true" ? !0 : i === "false" ? !1 : i === "null" ? null : i === +i + "" ? +i : $i.test(i) ? JSON.parse(i) : i
        }

        function fo(i, s, a) {
            var u;
            if (a === void 0 && i.nodeType === 1)
                if (u = "data-" + s.replace(xi, "-$&").toLowerCase(), a = i.getAttribute(u), typeof a == "string") {
                    try {
                        a = Ml(a)
                    } catch {}
                    St.set(i, s, a)
                } else a = void 0;
            return a
        }
        l.extend({
            hasData: function(i) {
                return St.hasData(i) || G.hasData(i)
            },
            data: function(i, s, a) {
                return St.access(i, s, a)
            },
            removeData: function(i, s) {
                St.remove(i, s)
            },
            _data: function(i, s, a) {
                return G.access(i, s, a)
            },
            _removeData: function(i, s) {
                G.remove(i, s)
            }
        }), l.fn.extend({
            data: function(i, s) {
                var a, u, h, p = this[0],
                    m = p && p.attributes;
                if (i === void 0) {
                    if (this.length && (h = St.get(p), p.nodeType === 1 && !G.get(p, "hasDataAttrs"))) {
                        for (a = m.length; a--;) m[a] && (u = m[a].name, u.indexOf("data-") === 0 && (u = Wt(u.slice(5)), fo(p, u, h[u])));
                        G.set(p, "hasDataAttrs", !0)
                    }
                    return h
                }
                return typeof i == "object" ? this.each(function() {
                    St.set(this, i)
                }) : se(this, function(w) {
                    var _;
                    if (p && w === void 0) return _ = St.get(p, i), _ !== void 0 || (_ = fo(p, i), _ !== void 0) ? _ : void 0;
                    this.each(function() {
                        St.set(this, i, w)
                    })
                }, null, s, arguments.length > 1, null, !0)
            },
            removeData: function(i) {
                return this.each(function() {
                    St.remove(this, i)
                })
            }
        }), l.extend({
            queue: function(i, s, a) {
                var u;
                if (i) return s = (s || "fx") + "queue", u = G.get(i, s), a && (!u || Array.isArray(a) ? u = G.access(i, s, l.makeArray(a)) : u.push(a)), u || []
            },
            dequeue: function(i, s) {
                s = s || "fx";
                var a = l.queue(i, s),
                    u = a.length,
                    h = a.shift(),
                    p = l._queueHooks(i, s),
                    m = function() {
                        l.dequeue(i, s)
                    };
                h === "inprogress" && (h = a.shift(), u--), h && (s === "fx" && a.unshift("inprogress"), delete p.stop, h.call(i, m, p)), !u && p && p.empty.fire()
            },
            _queueHooks: function(i, s) {
                var a = s + "queueHooks";
                return G.get(i, a) || G.access(i, a, {
                    empty: l.Callbacks("once memory").add(function() {
                        G.remove(i, [s + "queue", a])
                    })
                })
            }
        }), l.fn.extend({
            queue: function(i, s) {
                var a = 2;
                return typeof i != "string" && (s = i, i = "fx", a--), arguments.length < a ? l.queue(this[0], i) : s === void 0 ? this : this.each(function() {
                    var u = l.queue(this, i, s);
                    l._queueHooks(this, i), i === "fx" && u[0] !== "inprogress" && l.dequeue(this, i)
                })
            },
            dequeue: function(i) {
                return this.each(function() {
                    l.dequeue(this, i)
                })
            },
            clearQueue: function(i) {
                return this.queue(i || "fx", [])
            },
            promise: function(i, s) {
                var a, u = 1,
                    h = l.Deferred(),
                    p = this,
                    m = this.length,
                    w = function() {
                        --u || h.resolveWith(p, [p])
                    };
                for (typeof i != "string" && (s = i, i = void 0), i = i || "fx"; m--;) a = G.get(p[m], i + "queueHooks"), a && a.empty && (u++, a.empty.add(w));
                return w(), h.promise(s)
            }
        });
        var ho = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            si = new RegExp("^(?:([+-])=|)(" + ho + ")([a-z%]*)$", "i"),
            $e = ["Top", "Right", "Bottom", "Left"],
            sn = M.documentElement,
            En = function(i) {
                return l.contains(i.ownerDocument, i)
            },
            Il = {
                composed: !0
            };
        sn.getRootNode && (En = function(i) {
            return l.contains(i.ownerDocument, i) || i.getRootNode(Il) === i.ownerDocument
        });
        var Si = function(i, s) {
            return i = s || i, i.style.display === "none" || i.style.display === "" && En(i) && l.css(i, "display") === "none"
        };

        function po(i, s, a, u) {
            var h, p, m = 20,
                w = u ? function() {
                    return u.cur()
                } : function() {
                    return l.css(i, s, "")
                },
                _ = w(),
                C = a && a[3] || (l.cssNumber[s] ? "" : "px"),
                N = i.nodeType && (l.cssNumber[s] || C !== "px" && +_) && si.exec(l.css(i, s));
            if (N && N[3] !== C) {
                for (_ = _ / 2, C = C || N[3], N = +_ || 1; m--;) l.style(i, s, N + C), (1 - p) * (1 - (p = w() / _ || .5)) <= 0 && (m = 0), N = N / p;
                N = N * 2, l.style(i, s, N + C), a = a || []
            }
            return a && (N = +N || +_ || 0, h = a[1] ? N + (a[1] + 1) * a[2] : +a[2], u && (u.unit = C, u.start = N, u.end = h)), h
        }
        var go = {};

        function Pl(i) {
            var s, a = i.ownerDocument,
                u = i.nodeName,
                h = go[u];
            return h || (s = a.body.appendChild(a.createElement(u)), h = l.css(s, "display"), s.parentNode.removeChild(s), h === "none" && (h = "block"), go[u] = h, h)
        }

        function Tn(i, s) {
            for (var a, u, h = [], p = 0, m = i.length; p < m; p++) u = i[p], u.style && (a = u.style.display, s ? (a === "none" && (h[p] = G.get(u, "display") || null, h[p] || (u.style.display = "")), u.style.display === "" && Si(u) && (h[p] = Pl(u))) : a !== "none" && (h[p] = "none", G.set(u, "display", a)));
            for (p = 0; p < m; p++) h[p] != null && (i[p].style.display = h[p]);
            return i
        }
        l.fn.extend({
            show: function() {
                return Tn(this, !0)
            },
            hide: function() {
                return Tn(this)
            },
            toggle: function(i) {
                return typeof i == "boolean" ? i ? this.show() : this.hide() : this.each(function() {
                    Si(this) ? l(this).show() : l(this).hide()
                })
            }
        });
        var oi = /^(?:checkbox|radio)$/i,
            mo = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            vo = /^$|^module$|\/(?:java|ecma)script/i;
        (function() {
            var i = M.createDocumentFragment(),
                s = i.appendChild(M.createElement("div")),
                a = M.createElement("input");
            a.setAttribute("type", "radio"), a.setAttribute("checked", "checked"), a.setAttribute("name", "t"), s.appendChild(a), x.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, s.innerHTML = "<textarea>x</textarea>", x.noCloneChecked = !!s.cloneNode(!0).lastChild.defaultValue, s.innerHTML = "<option></option>", x.option = !!s.lastChild
        })();
        var Xt = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        Xt.tbody = Xt.tfoot = Xt.colgroup = Xt.caption = Xt.thead, Xt.th = Xt.td, x.option || (Xt.optgroup = Xt.option = [1, "<select multiple='multiple'>", "</select>"]);

        function jt(i, s) {
            var a;
            return typeof i.getElementsByTagName < "u" ? a = i.getElementsByTagName(s || "*") : typeof i.querySelectorAll < "u" ? a = i.querySelectorAll(s || "*") : a = [], s === void 0 || s && V(i, s) ? l.merge([i], a) : a
        }

        function Cr(i, s) {
            for (var a = 0, u = i.length; a < u; a++) G.set(i[a], "globalEval", !s || G.get(s[a], "globalEval"))
        }
        var Rl = /<|&#?\w+;/;

        function bo(i, s, a, u, h) {
            for (var p, m, w, _, C, N, P = s.createDocumentFragment(), O = [], j = 0, ot = i.length; j < ot; j++)
                if (p = i[j], p || p === 0)
                    if (K(p) === "object") l.merge(O, p.nodeType ? [p] : p);
                    else if (!Rl.test(p)) O.push(s.createTextNode(p));
            else {
                for (m = m || P.appendChild(s.createElement("div")), w = (mo.exec(p) || ["", ""])[1].toLowerCase(), _ = Xt[w] || Xt._default, m.innerHTML = _[1] + l.htmlPrefilter(p) + _[2], N = _[0]; N--;) m = m.lastChild;
                l.merge(O, m.childNodes), m = P.firstChild, m.textContent = ""
            }
            for (P.textContent = "", j = 0; p = O[j++];) {
                if (u && l.inArray(p, u) > -1) {
                    h && h.push(p);
                    continue
                }
                if (C = En(p), m = jt(P.appendChild(p), "script"), C && Cr(m), a)
                    for (N = 0; p = m[N++];) vo.test(p.type || "") && a.push(p)
            }
            return P
        }
        var yo = /^([^.]*)(?:\.(.+)|)/;

        function An() {
            return !0
        }

        function Cn() {
            return !1
        }

        function $r(i, s, a, u, h, p) {
            var m, w;
            if (typeof s == "object") {
                typeof a != "string" && (u = u || a, a = void 0);
                for (w in s) $r(i, w, a, u, s[w], p);
                return i
            }
            if (u == null && h == null ? (h = a, u = a = void 0) : h == null && (typeof a == "string" ? (h = u, u = void 0) : (h = u, u = a, a = void 0)), h === !1) h = Cn;
            else if (!h) return i;
            return p === 1 && (m = h, h = function(_) {
                return l().off(_), m.apply(this, arguments)
            }, h.guid = m.guid || (m.guid = l.guid++)), i.each(function() {
                l.event.add(this, s, h, u, a)
            })
        }
        l.event = {
            global: {},
            add: function(i, s, a, u, h) {
                var p, m, w, _, C, N, P, O, j, ot, mt, ft = G.get(i);
                if (Ve(i))
                    for (a.handler && (p = a, a = p.handler, h = p.selector), h && l.find.matchesSelector(sn, h), a.guid || (a.guid = l.guid++), (_ = ft.events) || (_ = ft.events = Object.create(null)), (m = ft.handle) || (m = ft.handle = function(Ot) {
                            return typeof l < "u" && l.event.triggered !== Ot.type ? l.event.dispatch.apply(i, arguments) : void 0
                        }), s = (s || "").match(Ut) || [""], C = s.length; C--;) w = yo.exec(s[C]) || [], j = mt = w[1], ot = (w[2] || "").split(".").sort(), j && (P = l.event.special[j] || {}, j = (h ? P.delegateType : P.bindType) || j, P = l.event.special[j] || {}, N = l.extend({
                        type: j,
                        origType: mt,
                        data: u,
                        handler: a,
                        guid: a.guid,
                        selector: h,
                        needsContext: h && l.expr.match.needsContext.test(h),
                        namespace: ot.join(".")
                    }, p), (O = _[j]) || (O = _[j] = [], O.delegateCount = 0, (!P.setup || P.setup.call(i, u, ot, m) === !1) && i.addEventListener && i.addEventListener(j, m)), P.add && (P.add.call(i, N), N.handler.guid || (N.handler.guid = a.guid)), h ? O.splice(O.delegateCount++, 0, N) : O.push(N), l.event.global[j] = !0)
            },
            remove: function(i, s, a, u, h) {
                var p, m, w, _, C, N, P, O, j, ot, mt, ft = G.hasData(i) && G.get(i);
                if (!(!ft || !(_ = ft.events))) {
                    for (s = (s || "").match(Ut) || [""], C = s.length; C--;) {
                        if (w = yo.exec(s[C]) || [], j = mt = w[1], ot = (w[2] || "").split(".").sort(), !j) {
                            for (j in _) l.event.remove(i, j + s[C], a, u, !0);
                            continue
                        }
                        for (P = l.event.special[j] || {}, j = (u ? P.delegateType : P.bindType) || j, O = _[j] || [], w = w[2] && new RegExp("(^|\\.)" + ot.join("\\.(?:.*\\.|)") + "(\\.|$)"), m = p = O.length; p--;) N = O[p], (h || mt === N.origType) && (!a || a.guid === N.guid) && (!w || w.test(N.namespace)) && (!u || u === N.selector || u === "**" && N.selector) && (O.splice(p, 1), N.selector && O.delegateCount--, P.remove && P.remove.call(i, N));
                        m && !O.length && ((!P.teardown || P.teardown.call(i, ot, ft.handle) === !1) && l.removeEvent(i, j, ft.handle), delete _[j])
                    }
                    l.isEmptyObject(_) && G.remove(i, "handle events")
                }
            },
            dispatch: function(i) {
                var s, a, u, h, p, m, w = new Array(arguments.length),
                    _ = l.event.fix(i),
                    C = (G.get(this, "events") || Object.create(null))[_.type] || [],
                    N = l.event.special[_.type] || {};
                for (w[0] = _, s = 1; s < arguments.length; s++) w[s] = arguments[s];
                if (_.delegateTarget = this, !(N.preDispatch && N.preDispatch.call(this, _) === !1)) {
                    for (m = l.event.handlers.call(this, _, C), s = 0;
                        (h = m[s++]) && !_.isPropagationStopped();)
                        for (_.currentTarget = h.elem, a = 0;
                            (p = h.handlers[a++]) && !_.isImmediatePropagationStopped();)(!_.rnamespace || p.namespace === !1 || _.rnamespace.test(p.namespace)) && (_.handleObj = p, _.data = p.data, u = ((l.event.special[p.origType] || {}).handle || p.handler).apply(h.elem, w), u !== void 0 && (_.result = u) === !1 && (_.preventDefault(), _.stopPropagation()));
                    return N.postDispatch && N.postDispatch.call(this, _), _.result
                }
            },
            handlers: function(i, s) {
                var a, u, h, p, m, w = [],
                    _ = s.delegateCount,
                    C = i.target;
                if (_ && C.nodeType && !(i.type === "click" && i.button >= 1)) {
                    for (; C !== this; C = C.parentNode || this)
                        if (C.nodeType === 1 && !(i.type === "click" && C.disabled === !0)) {
                            for (p = [], m = {}, a = 0; a < _; a++) u = s[a], h = u.selector + " ", m[h] === void 0 && (m[h] = u.needsContext ? l(h, this).index(C) > -1 : l.find(h, this, null, [C]).length), m[h] && p.push(u);
                            p.length && w.push({
                                elem: C,
                                handlers: p
                            })
                        }
                }
                return C = this, _ < s.length && w.push({
                    elem: C,
                    handlers: s.slice(_)
                }), w
            },
            addProp: function(i, s) {
                Object.defineProperty(l.Event.prototype, i, {
                    enumerable: !0,
                    configurable: !0,
                    get: L(s) ? function() {
                        if (this.originalEvent) return s(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[i]
                    },
                    set: function(a) {
                        Object.defineProperty(this, i, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: a
                        })
                    }
                })
            },
            fix: function(i) {
                return i[l.expando] ? i : new l.Event(i)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(i) {
                        var s = this || i;
                        return oi.test(s.type) && s.click && V(s, "input") && Oi(s, "click", !0), !1
                    },
                    trigger: function(i) {
                        var s = this || i;
                        return oi.test(s.type) && s.click && V(s, "input") && Oi(s, "click"), !0
                    },
                    _default: function(i) {
                        var s = i.target;
                        return oi.test(s.type) && s.click && V(s, "input") && G.get(s, "click") || V(s, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(i) {
                        i.result !== void 0 && i.originalEvent && (i.originalEvent.returnValue = i.result)
                    }
                }
            }
        };

        function Oi(i, s, a) {
            if (!a) {
                G.get(i, s) === void 0 && l.event.add(i, s, An);
                return
            }
            G.set(i, s, !1), l.event.add(i, s, {
                namespace: !1,
                handler: function(u) {
                    var h, p = G.get(this, s);
                    if (u.isTrigger & 1 && this[s]) {
                        if (p)(l.event.special[s] || {}).delegateType && u.stopPropagation();
                        else if (p = c.call(arguments), G.set(this, s, p), this[s](), h = G.get(this, s), G.set(this, s, !1), p !== h) return u.stopImmediatePropagation(), u.preventDefault(), h
                    } else p && (G.set(this, s, l.event.trigger(p[0], p.slice(1), this)), u.stopPropagation(), u.isImmediatePropagationStopped = An)
                }
            })
        }
        l.removeEvent = function(i, s, a) {
            i.removeEventListener && i.removeEventListener(s, a)
        }, l.Event = function(i, s) {
            if (!(this instanceof l.Event)) return new l.Event(i, s);
            i && i.type ? (this.originalEvent = i, this.type = i.type, this.isDefaultPrevented = i.defaultPrevented || i.defaultPrevented === void 0 && i.returnValue === !1 ? An : Cn, this.target = i.target && i.target.nodeType === 3 ? i.target.parentNode : i.target, this.currentTarget = i.currentTarget, this.relatedTarget = i.relatedTarget) : this.type = i, s && l.extend(this, s), this.timeStamp = i && i.timeStamp || Date.now(), this[l.expando] = !0
        }, l.Event.prototype = {
            constructor: l.Event,
            isDefaultPrevented: Cn,
            isPropagationStopped: Cn,
            isImmediatePropagationStopped: Cn,
            isSimulated: !1,
            preventDefault: function() {
                var i = this.originalEvent;
                this.isDefaultPrevented = An, i && !this.isSimulated && i.preventDefault()
            },
            stopPropagation: function() {
                var i = this.originalEvent;
                this.isPropagationStopped = An, i && !this.isSimulated && i.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var i = this.originalEvent;
                this.isImmediatePropagationStopped = An, i && !this.isSimulated && i.stopImmediatePropagation(), this.stopPropagation()
            }
        }, l.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: !0
        }, l.event.addProp), l.each({
            focus: "focusin",
            blur: "focusout"
        }, function(i, s) {
            function a(u) {
                if (M.documentMode) {
                    var h = G.get(this, "handle"),
                        p = l.event.fix(u);
                    p.type = u.type === "focusin" ? "focus" : "blur", p.isSimulated = !0, h(u), p.target === p.currentTarget && h(p)
                } else l.event.simulate(s, u.target, l.event.fix(u))
            }
            l.event.special[i] = {
                setup: function() {
                    var u;
                    if (Oi(this, i, !0), M.documentMode) u = G.get(this, s), u || this.addEventListener(s, a), G.set(this, s, (u || 0) + 1);
                    else return !1
                },
                trigger: function() {
                    return Oi(this, i), !0
                },
                teardown: function() {
                    var u;
                    if (M.documentMode) u = G.get(this, s) - 1, u ? G.set(this, s, u) : (this.removeEventListener(s, a), G.remove(this, s));
                    else return !1
                },
                _default: function(u) {
                    return G.get(u.target, i)
                },
                delegateType: s
            }, l.event.special[s] = {
                setup: function() {
                    var u = this.ownerDocument || this.document || this,
                        h = M.documentMode ? this : u,
                        p = G.get(h, s);
                    p || (M.documentMode ? this.addEventListener(s, a) : u.addEventListener(i, a, !0)), G.set(h, s, (p || 0) + 1)
                },
                teardown: function() {
                    var u = this.ownerDocument || this.document || this,
                        h = M.documentMode ? this : u,
                        p = G.get(h, s) - 1;
                    p ? G.set(h, s, p) : (M.documentMode ? this.removeEventListener(s, a) : u.removeEventListener(i, a, !0), G.remove(h, s))
                }
            }
        }), l.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(i, s) {
            l.event.special[i] = {
                delegateType: s,
                bindType: s,
                handle: function(a) {
                    var u, h = this,
                        p = a.relatedTarget,
                        m = a.handleObj;
                    return (!p || p !== h && !l.contains(h, p)) && (a.type = m.origType, u = m.handler.apply(this, arguments), a.type = s), u
                }
            }
        }), l.fn.extend({
            on: function(i, s, a, u) {
                return $r(this, i, s, a, u)
            },
            one: function(i, s, a, u) {
                return $r(this, i, s, a, u, 1)
            },
            off: function(i, s, a) {
                var u, h;
                if (i && i.preventDefault && i.handleObj) return u = i.handleObj, l(i.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler), this;
                if (typeof i == "object") {
                    for (h in i) this.off(h, s, i[h]);
                    return this
                }
                return (s === !1 || typeof s == "function") && (a = s, s = void 0), a === !1 && (a = Cn), this.each(function() {
                    l.event.remove(this, i, a, s)
                })
            }
        });
        var Hl = /<script|<style|<link/i,
            jl = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Bl = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

        function _o(i, s) {
            return V(i, "table") && V(s.nodeType !== 11 ? s : s.firstChild, "tr") && l(i).children("tbody")[0] || i
        }

        function Vl(i) {
            return i.type = (i.getAttribute("type") !== null) + "/" + i.type, i
        }

        function ql(i) {
            return (i.type || "").slice(0, 5) === "true/" ? i.type = i.type.slice(5) : i.removeAttribute("type"), i
        }

        function wo(i, s) {
            var a, u, h, p, m, w, _;
            if (s.nodeType === 1) {
                if (G.hasData(i) && (p = G.get(i), _ = p.events, _)) {
                    G.remove(s, "handle events");
                    for (h in _)
                        for (a = 0, u = _[h].length; a < u; a++) l.event.add(s, h, _[h][a])
                }
                St.hasData(i) && (m = St.access(i), w = l.extend({}, m), St.set(s, w))
            }
        }

        function Wl(i, s) {
            var a = s.nodeName.toLowerCase();
            a === "input" && oi.test(i.type) ? s.checked = i.checked : (a === "input" || a === "textarea") && (s.defaultValue = i.defaultValue)
        }

        function $n(i, s, a, u) {
            s = f(s);
            var h, p, m, w, _, C, N = 0,
                P = i.length,
                O = P - 1,
                j = s[0],
                ot = L(j);
            if (ot || P > 1 && typeof j == "string" && !x.checkClone && jl.test(j)) return i.each(function(mt) {
                var ft = i.eq(mt);
                ot && (s[0] = j.call(this, mt, ft.html())), $n(ft, s, a, u)
            });
            if (P && (h = bo(s, i[0].ownerDocument, !1, i, u), p = h.firstChild, h.childNodes.length === 1 && (h = p), p || u)) {
                for (m = l.map(jt(h, "script"), Vl), w = m.length; N < P; N++) _ = h, N !== O && (_ = l.clone(_, !0, !0), w && l.merge(m, jt(_, "script"))), a.call(i[N], _, N);
                if (w)
                    for (C = m[m.length - 1].ownerDocument, l.map(m, ql), N = 0; N < w; N++) _ = m[N], vo.test(_.type || "") && !G.access(_, "globalEval") && l.contains(C, _) && (_.src && (_.type || "").toLowerCase() !== "module" ? l._evalUrl && !_.noModule && l._evalUrl(_.src, {
                        nonce: _.nonce || _.getAttribute("nonce")
                    }, C) : tt(_.textContent.replace(Bl, ""), _, C))
            }
            return i
        }

        function Eo(i, s, a) {
            for (var u, h = s ? l.filter(s, i) : i, p = 0;
                (u = h[p]) != null; p++) !a && u.nodeType === 1 && l.cleanData(jt(u)), u.parentNode && (a && En(u) && Cr(jt(u, "script")), u.parentNode.removeChild(u));
            return i
        }
        l.extend({
            htmlPrefilter: function(i) {
                return i
            },
            clone: function(i, s, a) {
                var u, h, p, m, w = i.cloneNode(!0),
                    _ = En(i);
                if (!x.noCloneChecked && (i.nodeType === 1 || i.nodeType === 11) && !l.isXMLDoc(i))
                    for (m = jt(w), p = jt(i), u = 0, h = p.length; u < h; u++) Wl(p[u], m[u]);
                if (s)
                    if (a)
                        for (p = p || jt(i), m = m || jt(w), u = 0, h = p.length; u < h; u++) wo(p[u], m[u]);
                    else wo(i, w);
                return m = jt(w, "script"), m.length > 0 && Cr(m, !_ && jt(i, "script")), w
            },
            cleanData: function(i) {
                for (var s, a, u, h = l.event.special, p = 0;
                    (a = i[p]) !== void 0; p++)
                    if (Ve(a)) {
                        if (s = a[G.expando]) {
                            if (s.events)
                                for (u in s.events) h[u] ? l.event.remove(a, u) : l.removeEvent(a, u, s.handle);
                            a[G.expando] = void 0
                        }
                        a[St.expando] && (a[St.expando] = void 0)
                    }
            }
        }), l.fn.extend({
            detach: function(i) {
                return Eo(this, i, !0)
            },
            remove: function(i) {
                return Eo(this, i)
            },
            text: function(i) {
                return se(this, function(s) {
                    return s === void 0 ? l.text(this) : this.empty().each(function() {
                        (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = s)
                    })
                }, null, i, arguments.length)
            },
            append: function() {
                return $n(this, arguments, function(i) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var s = _o(this, i);
                        s.appendChild(i)
                    }
                })
            },
            prepend: function() {
                return $n(this, arguments, function(i) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var s = _o(this, i);
                        s.insertBefore(i, s.firstChild)
                    }
                })
            },
            before: function() {
                return $n(this, arguments, function(i) {
                    this.parentNode && this.parentNode.insertBefore(i, this)
                })
            },
            after: function() {
                return $n(this, arguments, function(i) {
                    this.parentNode && this.parentNode.insertBefore(i, this.nextSibling)
                })
            },
            empty: function() {
                for (var i, s = 0;
                    (i = this[s]) != null; s++) i.nodeType === 1 && (l.cleanData(jt(i, !1)), i.textContent = "");
                return this
            },
            clone: function(i, s) {
                return i = i ? ? !1, s = s ? ? i, this.map(function() {
                    return l.clone(this, i, s)
                })
            },
            html: function(i) {
                return se(this, function(s) {
                    var a = this[0] || {},
                        u = 0,
                        h = this.length;
                    if (s === void 0 && a.nodeType === 1) return a.innerHTML;
                    if (typeof s == "string" && !Hl.test(s) && !Xt[(mo.exec(s) || ["", ""])[1].toLowerCase()]) {
                        s = l.htmlPrefilter(s);
                        try {
                            for (; u < h; u++) a = this[u] || {}, a.nodeType === 1 && (l.cleanData(jt(a, !1)), a.innerHTML = s);
                            a = 0
                        } catch {}
                    }
                    a && this.empty().append(s)
                }, null, i, arguments.length)
            },
            replaceWith: function() {
                var i = [];
                return $n(this, arguments, function(s) {
                    var a = this.parentNode;
                    l.inArray(this, i) < 0 && (l.cleanData(jt(this)), a && a.replaceChild(s, this))
                }, i)
            }
        }), l.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(i, s) {
            l.fn[i] = function(a) {
                for (var u, h = [], p = l(a), m = p.length - 1, w = 0; w <= m; w++) u = w === m ? this : this.clone(!0), l(p[w])[s](u), d.apply(h, u.get());
                return this.pushStack(h)
            }
        });
        var xr = new RegExp("^(" + ho + ")(?!px)[a-z%]+$", "i"),
            Sr = /^--/,
            ki = function(i) {
                var s = i.ownerDocument.defaultView;
                return (!s || !s.opener) && (s = t), s.getComputedStyle(i)
            },
            To = function(i, s, a) {
                var u, h, p = {};
                for (h in s) p[h] = i.style[h], i.style[h] = s[h];
                u = a.call(i);
                for (h in s) i.style[h] = p[h];
                return u
            },
            Fl = new RegExp($e.join("|"), "i");
        (function() {
            function i() {
                if (C) {
                    _.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", C.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", sn.appendChild(_).appendChild(C);
                    var N = t.getComputedStyle(C);
                    a = N.top !== "1%", w = s(N.marginLeft) === 12, C.style.right = "60%", p = s(N.right) === 36, u = s(N.width) === 36, C.style.position = "absolute", h = s(C.offsetWidth / 3) === 12, sn.removeChild(_), C = null
                }
            }

            function s(N) {
                return Math.round(parseFloat(N))
            }
            var a, u, h, p, m, w, _ = M.createElement("div"),
                C = M.createElement("div");
            C.style && (C.style.backgroundClip = "content-box", C.cloneNode(!0).style.backgroundClip = "", x.clearCloneStyle = C.style.backgroundClip === "content-box", l.extend(x, {
                boxSizingReliable: function() {
                    return i(), u
                },
                pixelBoxStyles: function() {
                    return i(), p
                },
                pixelPosition: function() {
                    return i(), a
                },
                reliableMarginLeft: function() {
                    return i(), w
                },
                scrollboxSize: function() {
                    return i(), h
                },
                reliableTrDimensions: function() {
                    var N, P, O, j;
                    return m == null && (N = M.createElement("table"), P = M.createElement("tr"), O = M.createElement("div"), N.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", P.style.cssText = "box-sizing:content-box;border:1px solid", P.style.height = "1px", O.style.height = "9px", O.style.display = "block", sn.appendChild(N).appendChild(P).appendChild(O), j = t.getComputedStyle(P), m = parseInt(j.height, 10) + parseInt(j.borderTopWidth, 10) + parseInt(j.borderBottomWidth, 10) === P.offsetHeight, sn.removeChild(N)), m
                }
            }))
        })();

        function ai(i, s, a) {
            var u, h, p, m, w = Sr.test(s),
                _ = i.style;
            return a = a || ki(i), a && (m = a.getPropertyValue(s) || a[s], w && m && (m = m.replace(Tt, "$1") || void 0), m === "" && !En(i) && (m = l.style(i, s)), !x.pixelBoxStyles() && xr.test(m) && Fl.test(s) && (u = _.width, h = _.minWidth, p = _.maxWidth, _.minWidth = _.maxWidth = _.width = m, m = a.width, _.width = u, _.minWidth = h, _.maxWidth = p)), m !== void 0 ? m + "" : m
        }

        function Ao(i, s) {
            return {
                get: function() {
                    if (i()) {
                        delete this.get;
                        return
                    }
                    return (this.get = s).apply(this, arguments)
                }
            }
        }
        var Co = ["Webkit", "Moz", "ms"],
            $o = M.createElement("div").style,
            xo = {};

        function zl(i) {
            for (var s = i[0].toUpperCase() + i.slice(1), a = Co.length; a--;)
                if (i = Co[a] + s, i in $o) return i
        }

        function Or(i) {
            var s = l.cssProps[i] || xo[i];
            return s || (i in $o ? i : xo[i] = zl(i) || i)
        }
        var Yl = /^(none|table(?!-c[ea]).+)/,
            Kl = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            So = {
                letterSpacing: "0",
                fontWeight: "400"
            };

        function Oo(i, s, a) {
            var u = si.exec(s);
            return u ? Math.max(0, u[2] - (a || 0)) + (u[3] || "px") : s
        }

        function kr(i, s, a, u, h, p) {
            var m = s === "width" ? 1 : 0,
                w = 0,
                _ = 0,
                C = 0;
            if (a === (u ? "border" : "content")) return 0;
            for (; m < 4; m += 2) a === "margin" && (C += l.css(i, a + $e[m], !0, h)), u ? (a === "content" && (_ -= l.css(i, "padding" + $e[m], !0, h)), a !== "margin" && (_ -= l.css(i, "border" + $e[m] + "Width", !0, h))) : (_ += l.css(i, "padding" + $e[m], !0, h), a !== "padding" ? _ += l.css(i, "border" + $e[m] + "Width", !0, h) : w += l.css(i, "border" + $e[m] + "Width", !0, h));
            return !u && p >= 0 && (_ += Math.max(0, Math.ceil(i["offset" + s[0].toUpperCase() + s.slice(1)] - p - _ - w - .5)) || 0), _ + C
        }

        function ko(i, s, a) {
            var u = ki(i),
                h = !x.boxSizingReliable() || a,
                p = h && l.css(i, "boxSizing", !1, u) === "border-box",
                m = p,
                w = ai(i, s, u),
                _ = "offset" + s[0].toUpperCase() + s.slice(1);
            if (xr.test(w)) {
                if (!a) return w;
                w = "auto"
            }
            return (!x.boxSizingReliable() && p || !x.reliableTrDimensions() && V(i, "tr") || w === "auto" || !parseFloat(w) && l.css(i, "display", !1, u) === "inline") && i.getClientRects().length && (p = l.css(i, "boxSizing", !1, u) === "border-box", m = _ in i, m && (w = i[_])), w = parseFloat(w) || 0, w + kr(i, s, a || (p ? "border" : "content"), m, u, w) + "px"
        }
        l.extend({
            cssHooks: {
                opacity: {
                    get: function(i, s) {
                        if (s) {
                            var a = ai(i, "opacity");
                            return a === "" ? "1" : a
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                aspectRatio: !0,
                borderImageSlice: !0,
                columnCount: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                scale: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0,
                fillOpacity: !0,
                floodOpacity: !0,
                stopOpacity: !0,
                strokeMiterlimit: !0,
                strokeOpacity: !0
            },
            cssProps: {},
            style: function(i, s, a, u) {
                if (!(!i || i.nodeType === 3 || i.nodeType === 8 || !i.style)) {
                    var h, p, m, w = Wt(s),
                        _ = Sr.test(s),
                        C = i.style;
                    if (_ || (s = Or(w)), m = l.cssHooks[s] || l.cssHooks[w], a !== void 0) {
                        if (p = typeof a, p === "string" && (h = si.exec(a)) && h[1] && (a = po(i, s, h), p = "number"), a == null || a !== a) return;
                        p === "number" && !_ && (a += h && h[3] || (l.cssNumber[w] ? "" : "px")), !x.clearCloneStyle && a === "" && s.indexOf("background") === 0 && (C[s] = "inherit"), (!m || !("set" in m) || (a = m.set(i, a, u)) !== void 0) && (_ ? C.setProperty(s, a) : C[s] = a)
                    } else return m && "get" in m && (h = m.get(i, !1, u)) !== void 0 ? h : C[s]
                }
            },
            css: function(i, s, a, u) {
                var h, p, m, w = Wt(s),
                    _ = Sr.test(s);
                return _ || (s = Or(w)), m = l.cssHooks[s] || l.cssHooks[w], m && "get" in m && (h = m.get(i, !0, a)), h === void 0 && (h = ai(i, s, u)), h === "normal" && s in So && (h = So[s]), a === "" || a ? (p = parseFloat(h), a === !0 || isFinite(p) ? p || 0 : h) : h
            }
        }), l.each(["height", "width"], function(i, s) {
            l.cssHooks[s] = {
                get: function(a, u, h) {
                    if (u) return Yl.test(l.css(a, "display")) && (!a.getClientRects().length || !a.getBoundingClientRect().width) ? To(a, Kl, function() {
                        return ko(a, s, h)
                    }) : ko(a, s, h)
                },
                set: function(a, u, h) {
                    var p, m = ki(a),
                        w = !x.scrollboxSize() && m.position === "absolute",
                        _ = w || h,
                        C = _ && l.css(a, "boxSizing", !1, m) === "border-box",
                        N = h ? kr(a, s, h, C, m) : 0;
                    return C && w && (N -= Math.ceil(a["offset" + s[0].toUpperCase() + s.slice(1)] - parseFloat(m[s]) - kr(a, s, "border", !1, m) - .5)), N && (p = si.exec(u)) && (p[3] || "px") !== "px" && (a.style[s] = u, u = l.css(a, s)), Oo(a, u, N)
                }
            }
        }), l.cssHooks.marginLeft = Ao(x.reliableMarginLeft, function(i, s) {
            if (s) return (parseFloat(ai(i, "marginLeft")) || i.getBoundingClientRect().left - To(i, {
                marginLeft: 0
            }, function() {
                return i.getBoundingClientRect().left
            })) + "px"
        }), l.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(i, s) {
            l.cssHooks[i + s] = {
                expand: function(a) {
                    for (var u = 0, h = {}, p = typeof a == "string" ? a.split(" ") : [a]; u < 4; u++) h[i + $e[u] + s] = p[u] || p[u - 2] || p[0];
                    return h
                }
            }, i !== "margin" && (l.cssHooks[i + s].set = Oo)
        }), l.fn.extend({
            css: function(i, s) {
                return se(this, function(a, u, h) {
                    var p, m, w = {},
                        _ = 0;
                    if (Array.isArray(u)) {
                        for (p = ki(a), m = u.length; _ < m; _++) w[u[_]] = l.css(a, u[_], !1, p);
                        return w
                    }
                    return h !== void 0 ? l.style(a, u, h) : l.css(a, u)
                }, i, s, arguments.length > 1)
            }
        });

        function Bt(i, s, a, u, h) {
            return new Bt.prototype.init(i, s, a, u, h)
        }
        l.Tween = Bt, Bt.prototype = {
            constructor: Bt,
            init: function(i, s, a, u, h, p) {
                this.elem = i, this.prop = a, this.easing = h || l.easing._default, this.options = s, this.start = this.now = this.cur(), this.end = u, this.unit = p || (l.cssNumber[a] ? "" : "px")
            },
            cur: function() {
                var i = Bt.propHooks[this.prop];
                return i && i.get ? i.get(this) : Bt.propHooks._default.get(this)
            },
            run: function(i) {
                var s, a = Bt.propHooks[this.prop];
                return this.options.duration ? this.pos = s = l.easing[this.easing](i, this.options.duration * i, 0, 1, this.options.duration) : this.pos = s = i, this.now = (this.end - this.start) * s + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), a && a.set ? a.set(this) : Bt.propHooks._default.set(this), this
            }
        }, Bt.prototype.init.prototype = Bt.prototype, Bt.propHooks = {
            _default: {
                get: function(i) {
                    var s;
                    return i.elem.nodeType !== 1 || i.elem[i.prop] != null && i.elem.style[i.prop] == null ? i.elem[i.prop] : (s = l.css(i.elem, i.prop, ""), !s || s === "auto" ? 0 : s)
                },
                set: function(i) {
                    l.fx.step[i.prop] ? l.fx.step[i.prop](i) : i.elem.nodeType === 1 && (l.cssHooks[i.prop] || i.elem.style[Or(i.prop)] != null) ? l.style(i.elem, i.prop, i.now + i.unit) : i.elem[i.prop] = i.now
                }
            }
        }, Bt.propHooks.scrollTop = Bt.propHooks.scrollLeft = {
            set: function(i) {
                i.elem.nodeType && i.elem.parentNode && (i.elem[i.prop] = i.now)
            }
        }, l.easing = {
            linear: function(i) {
                return i
            },
            swing: function(i) {
                return .5 - Math.cos(i * Math.PI) / 2
            },
            _default: "swing"
        }, l.fx = Bt.prototype.init, l.fx.step = {};
        var xn, Li, Ul = /^(?:toggle|show|hide)$/,
            Xl = /queueHooks$/;

        function Lr() {
            Li && (M.hidden === !1 && t.requestAnimationFrame ? t.requestAnimationFrame(Lr) : t.setTimeout(Lr, l.fx.interval), l.fx.tick())
        }

        function Lo() {
            return t.setTimeout(function() {
                xn = void 0
            }), xn = Date.now()
        }

        function Ni(i, s) {
            var a, u = 0,
                h = {
                    height: i
                };
            for (s = s ? 1 : 0; u < 4; u += 2 - s) a = $e[u], h["margin" + a] = h["padding" + a] = i;
            return s && (h.opacity = h.width = i), h
        }

        function No(i, s, a) {
            for (var u, h = (oe.tweeners[s] || []).concat(oe.tweeners["*"]), p = 0, m = h.length; p < m; p++)
                if (u = h[p].call(a, s, i)) return u
        }

        function Gl(i, s, a) {
            var u, h, p, m, w, _, C, N, P = "width" in s || "height" in s,
                O = this,
                j = {},
                ot = i.style,
                mt = i.nodeType && Si(i),
                ft = G.get(i, "fxshow");
            a.queue || (m = l._queueHooks(i, "fx"), m.unqueued == null && (m.unqueued = 0, w = m.empty.fire, m.empty.fire = function() {
                m.unqueued || w()
            }), m.unqueued++, O.always(function() {
                O.always(function() {
                    m.unqueued--, l.queue(i, "fx").length || m.empty.fire()
                })
            }));
            for (u in s)
                if (h = s[u], Ul.test(h)) {
                    if (delete s[u], p = p || h === "toggle", h === (mt ? "hide" : "show"))
                        if (h === "show" && ft && ft[u] !== void 0) mt = !0;
                        else continue;
                    j[u] = ft && ft[u] || l.style(i, u)
                } if (_ = !l.isEmptyObject(s), !(!_ && l.isEmptyObject(j))) {
                P && i.nodeType === 1 && (a.overflow = [ot.overflow, ot.overflowX, ot.overflowY], C = ft && ft.display, C == null && (C = G.get(i, "display")), N = l.css(i, "display"), N === "none" && (C ? N = C : (Tn([i], !0), C = i.style.display || C, N = l.css(i, "display"), Tn([i]))), (N === "inline" || N === "inline-block" && C != null) && l.css(i, "float") === "none" && (_ || (O.done(function() {
                    ot.display = C
                }), C == null && (N = ot.display, C = N === "none" ? "" : N)), ot.display = "inline-block")), a.overflow && (ot.overflow = "hidden", O.always(function() {
                    ot.overflow = a.overflow[0], ot.overflowX = a.overflow[1], ot.overflowY = a.overflow[2]
                })), _ = !1;
                for (u in j) _ || (ft ? "hidden" in ft && (mt = ft.hidden) : ft = G.access(i, "fxshow", {
                    display: C
                }), p && (ft.hidden = !mt), mt && Tn([i], !0), O.done(function() {
                    mt || Tn([i]), G.remove(i, "fxshow");
                    for (u in j) l.style(i, u, j[u])
                })), _ = No(mt ? ft[u] : 0, u, O), u in ft || (ft[u] = _.start, mt && (_.end = _.start, _.start = 0))
            }
        }

        function Zl(i, s) {
            var a, u, h, p, m;
            for (a in i)
                if (u = Wt(a), h = s[u], p = i[a], Array.isArray(p) && (h = p[1], p = i[a] = p[0]), a !== u && (i[u] = p, delete i[a]), m = l.cssHooks[u], m && "expand" in m) {
                    p = m.expand(p), delete i[u];
                    for (a in p) a in i || (i[a] = p[a], s[a] = h)
                } else s[u] = h
        }

        function oe(i, s, a) {
            var u, h, p = 0,
                m = oe.prefilters.length,
                w = l.Deferred().always(function() {
                    delete _.elem
                }),
                _ = function() {
                    if (h) return !1;
                    for (var P = xn || Lo(), O = Math.max(0, C.startTime + C.duration - P), j = O / C.duration || 0, ot = 1 - j, mt = 0, ft = C.tweens.length; mt < ft; mt++) C.tweens[mt].run(ot);
                    return w.notifyWith(i, [C, ot, O]), ot < 1 && ft ? O : (ft || w.notifyWith(i, [C, 1, 0]), w.resolveWith(i, [C]), !1)
                },
                C = w.promise({
                    elem: i,
                    props: l.extend({}, s),
                    opts: l.extend(!0, {
                        specialEasing: {},
                        easing: l.easing._default
                    }, a),
                    originalProperties: s,
                    originalOptions: a,
                    startTime: xn || Lo(),
                    duration: a.duration,
                    tweens: [],
                    createTween: function(P, O) {
                        var j = l.Tween(i, C.opts, P, O, C.opts.specialEasing[P] || C.opts.easing);
                        return C.tweens.push(j), j
                    },
                    stop: function(P) {
                        var O = 0,
                            j = P ? C.tweens.length : 0;
                        if (h) return this;
                        for (h = !0; O < j; O++) C.tweens[O].run(1);
                        return P ? (w.notifyWith(i, [C, 1, 0]), w.resolveWith(i, [C, P])) : w.rejectWith(i, [C, P]), this
                    }
                }),
                N = C.props;
            for (Zl(N, C.opts.specialEasing); p < m; p++)
                if (u = oe.prefilters[p].call(C, i, N, C.opts), u) return L(u.stop) && (l._queueHooks(C.elem, C.opts.queue).stop = u.stop.bind(u)), u;
            return l.map(N, No, C), L(C.opts.start) && C.opts.start.call(i, C), C.progress(C.opts.progress).done(C.opts.done, C.opts.complete).fail(C.opts.fail).always(C.opts.always), l.fx.timer(l.extend(_, {
                elem: i,
                anim: C,
                queue: C.opts.queue
            })), C
        }
        l.Animation = l.extend(oe, {
                tweeners: {
                    "*": [function(i, s) {
                        var a = this.createTween(i, s);
                        return po(a.elem, i, si.exec(s), a), a
                    }]
                },
                tweener: function(i, s) {
                    L(i) ? (s = i, i = ["*"]) : i = i.match(Ut);
                    for (var a, u = 0, h = i.length; u < h; u++) a = i[u], oe.tweeners[a] = oe.tweeners[a] || [], oe.tweeners[a].unshift(s)
                },
                prefilters: [Gl],
                prefilter: function(i, s) {
                    s ? oe.prefilters.unshift(i) : oe.prefilters.push(i)
                }
            }), l.speed = function(i, s, a) {
                var u = i && typeof i == "object" ? l.extend({}, i) : {
                    complete: a || !a && s || L(i) && i,
                    duration: i,
                    easing: a && s || s && !L(s) && s
                };
                return l.fx.off ? u.duration = 0 : typeof u.duration != "number" && (u.duration in l.fx.speeds ? u.duration = l.fx.speeds[u.duration] : u.duration = l.fx.speeds._default), (u.queue == null || u.queue === !0) && (u.queue = "fx"), u.old = u.complete, u.complete = function() {
                    L(u.old) && u.old.call(this), u.queue && l.dequeue(this, u.queue)
                }, u
            }, l.fn.extend({
                fadeTo: function(i, s, a, u) {
                    return this.filter(Si).css("opacity", 0).show().end().animate({
                        opacity: s
                    }, i, a, u)
                },
                animate: function(i, s, a, u) {
                    var h = l.isEmptyObject(i),
                        p = l.speed(s, a, u),
                        m = function() {
                            var w = oe(this, l.extend({}, i), p);
                            (h || G.get(this, "finish")) && w.stop(!0)
                        };
                    return m.finish = m, h || p.queue === !1 ? this.each(m) : this.queue(p.queue, m)
                },
                stop: function(i, s, a) {
                    var u = function(h) {
                        var p = h.stop;
                        delete h.stop, p(a)
                    };
                    return typeof i != "string" && (a = s, s = i, i = void 0), s && this.queue(i || "fx", []), this.each(function() {
                        var h = !0,
                            p = i != null && i + "queueHooks",
                            m = l.timers,
                            w = G.get(this);
                        if (p) w[p] && w[p].stop && u(w[p]);
                        else
                            for (p in w) w[p] && w[p].stop && Xl.test(p) && u(w[p]);
                        for (p = m.length; p--;) m[p].elem === this && (i == null || m[p].queue === i) && (m[p].anim.stop(a), h = !1, m.splice(p, 1));
                        (h || !a) && l.dequeue(this, i)
                    })
                },
                finish: function(i) {
                    return i !== !1 && (i = i || "fx"), this.each(function() {
                        var s, a = G.get(this),
                            u = a[i + "queue"],
                            h = a[i + "queueHooks"],
                            p = l.timers,
                            m = u ? u.length : 0;
                        for (a.finish = !0, l.queue(this, i, []), h && h.stop && h.stop.call(this, !0), s = p.length; s--;) p[s].elem === this && p[s].queue === i && (p[s].anim.stop(!0), p.splice(s, 1));
                        for (s = 0; s < m; s++) u[s] && u[s].finish && u[s].finish.call(this);
                        delete a.finish
                    })
                }
            }), l.each(["toggle", "show", "hide"], function(i, s) {
                var a = l.fn[s];
                l.fn[s] = function(u, h, p) {
                    return u == null || typeof u == "boolean" ? a.apply(this, arguments) : this.animate(Ni(s, !0), u, h, p)
                }
            }), l.each({
                slideDown: Ni("show"),
                slideUp: Ni("hide"),
                slideToggle: Ni("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(i, s) {
                l.fn[i] = function(a, u, h) {
                    return this.animate(s, a, u, h)
                }
            }), l.timers = [], l.fx.tick = function() {
                var i, s = 0,
                    a = l.timers;
                for (xn = Date.now(); s < a.length; s++) i = a[s], !i() && a[s] === i && a.splice(s--, 1);
                a.length || l.fx.stop(), xn = void 0
            }, l.fx.timer = function(i) {
                l.timers.push(i), l.fx.start()
            }, l.fx.interval = 13, l.fx.start = function() {
                Li || (Li = !0, Lr())
            }, l.fx.stop = function() {
                Li = null
            }, l.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, l.fn.delay = function(i, s) {
                return i = l.fx && l.fx.speeds[i] || i, s = s || "fx", this.queue(s, function(a, u) {
                    var h = t.setTimeout(a, i);
                    u.stop = function() {
                        t.clearTimeout(h)
                    }
                })
            },
            function() {
                var i = M.createElement("input"),
                    s = M.createElement("select"),
                    a = s.appendChild(M.createElement("option"));
                i.type = "checkbox", x.checkOn = i.value !== "", x.optSelected = a.selected, i = M.createElement("input"), i.value = "t", i.type = "radio", x.radioValue = i.value === "t"
            }();
        var Do, ci = l.expr.attrHandle;
        l.fn.extend({
            attr: function(i, s) {
                return se(this, l.attr, i, s, arguments.length > 1)
            },
            removeAttr: function(i) {
                return this.each(function() {
                    l.removeAttr(this, i)
                })
            }
        }), l.extend({
            attr: function(i, s, a) {
                var u, h, p = i.nodeType;
                if (!(p === 3 || p === 8 || p === 2)) {
                    if (typeof i.getAttribute > "u") return l.prop(i, s, a);
                    if ((p !== 1 || !l.isXMLDoc(i)) && (h = l.attrHooks[s.toLowerCase()] || (l.expr.match.bool.test(s) ? Do : void 0)), a !== void 0) {
                        if (a === null) {
                            l.removeAttr(i, s);
                            return
                        }
                        return h && "set" in h && (u = h.set(i, a, s)) !== void 0 ? u : (i.setAttribute(s, a + ""), a)
                    }
                    return h && "get" in h && (u = h.get(i, s)) !== null ? u : (u = l.find.attr(i, s), u ? ? void 0)
                }
            },
            attrHooks: {
                type: {
                    set: function(i, s) {
                        if (!x.radioValue && s === "radio" && V(i, "input")) {
                            var a = i.value;
                            return i.setAttribute("type", s), a && (i.value = a), s
                        }
                    }
                }
            },
            removeAttr: function(i, s) {
                var a, u = 0,
                    h = s && s.match(Ut);
                if (h && i.nodeType === 1)
                    for (; a = h[u++];) i.removeAttribute(a)
            }
        }), Do = {
            set: function(i, s, a) {
                return s === !1 ? l.removeAttr(i, a) : i.setAttribute(a, a), a
            }
        }, l.each(l.expr.match.bool.source.match(/\w+/g), function(i, s) {
            var a = ci[s] || l.find.attr;
            ci[s] = function(u, h, p) {
                var m, w, _ = h.toLowerCase();
                return p || (w = ci[_], ci[_] = m, m = a(u, h, p) != null ? _ : null, ci[_] = w), m
            }
        });
        var Ql = /^(?:input|select|textarea|button)$/i,
            Jl = /^(?:a|area)$/i;
        l.fn.extend({
            prop: function(i, s) {
                return se(this, l.prop, i, s, arguments.length > 1)
            },
            removeProp: function(i) {
                return this.each(function() {
                    delete this[l.propFix[i] || i]
                })
            }
        }), l.extend({
            prop: function(i, s, a) {
                var u, h, p = i.nodeType;
                if (!(p === 3 || p === 8 || p === 2)) return (p !== 1 || !l.isXMLDoc(i)) && (s = l.propFix[s] || s, h = l.propHooks[s]), a !== void 0 ? h && "set" in h && (u = h.set(i, a, s)) !== void 0 ? u : i[s] = a : h && "get" in h && (u = h.get(i, s)) !== null ? u : i[s]
            },
            propHooks: {
                tabIndex: {
                    get: function(i) {
                        var s = l.find.attr(i, "tabindex");
                        return s ? parseInt(s, 10) : Ql.test(i.nodeName) || Jl.test(i.nodeName) && i.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), x.optSelected || (l.propHooks.selected = {
            get: function(i) {
                var s = i.parentNode;
                return s && s.parentNode && s.parentNode.selectedIndex, null
            },
            set: function(i) {
                var s = i.parentNode;
                s && (s.selectedIndex, s.parentNode && s.parentNode.selectedIndex)
            }
        }), l.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            l.propFix[this.toLowerCase()] = this
        });

        function on(i) {
            var s = i.match(Ut) || [];
            return s.join(" ")
        }

        function an(i) {
            return i.getAttribute && i.getAttribute("class") || ""
        }

        function Nr(i) {
            return Array.isArray(i) ? i : typeof i == "string" ? i.match(Ut) || [] : []
        }
        l.fn.extend({
            addClass: function(i) {
                var s, a, u, h, p, m;
                return L(i) ? this.each(function(w) {
                    l(this).addClass(i.call(this, w, an(this)))
                }) : (s = Nr(i), s.length ? this.each(function() {
                    if (u = an(this), a = this.nodeType === 1 && " " + on(u) + " ", a) {
                        for (p = 0; p < s.length; p++) h = s[p], a.indexOf(" " + h + " ") < 0 && (a += h + " ");
                        m = on(a), u !== m && this.setAttribute("class", m)
                    }
                }) : this)
            },
            removeClass: function(i) {
                var s, a, u, h, p, m;
                return L(i) ? this.each(function(w) {
                    l(this).removeClass(i.call(this, w, an(this)))
                }) : arguments.length ? (s = Nr(i), s.length ? this.each(function() {
                    if (u = an(this), a = this.nodeType === 1 && " " + on(u) + " ", a) {
                        for (p = 0; p < s.length; p++)
                            for (h = s[p]; a.indexOf(" " + h + " ") > -1;) a = a.replace(" " + h + " ", " ");
                        m = on(a), u !== m && this.setAttribute("class", m)
                    }
                }) : this) : this.attr("class", "")
            },
            toggleClass: function(i, s) {
                var a, u, h, p, m = typeof i,
                    w = m === "string" || Array.isArray(i);
                return L(i) ? this.each(function(_) {
                    l(this).toggleClass(i.call(this, _, an(this), s), s)
                }) : typeof s == "boolean" && w ? s ? this.addClass(i) : this.removeClass(i) : (a = Nr(i), this.each(function() {
                    if (w)
                        for (p = l(this), h = 0; h < a.length; h++) u = a[h], p.hasClass(u) ? p.removeClass(u) : p.addClass(u);
                    else(i === void 0 || m === "boolean") && (u = an(this), u && G.set(this, "__className__", u), this.setAttribute && this.setAttribute("class", u || i === !1 ? "" : G.get(this, "__className__") || ""))
                }))
            },
            hasClass: function(i) {
                var s, a, u = 0;
                for (s = " " + i + " "; a = this[u++];)
                    if (a.nodeType === 1 && (" " + on(an(a)) + " ").indexOf(s) > -1) return !0;
                return !1
            }
        });
        var tu = /\r/g;
        l.fn.extend({
            val: function(i) {
                var s, a, u, h = this[0];
                return arguments.length ? (u = L(i), this.each(function(p) {
                    var m;
                    this.nodeType === 1 && (u ? m = i.call(this, p, l(this).val()) : m = i, m == null ? m = "" : typeof m == "number" ? m += "" : Array.isArray(m) && (m = l.map(m, function(w) {
                        return w == null ? "" : w + ""
                    })), s = l.valHooks[this.type] || l.valHooks[this.nodeName.toLowerCase()], (!s || !("set" in s) || s.set(this, m, "value") === void 0) && (this.value = m))
                })) : h ? (s = l.valHooks[h.type] || l.valHooks[h.nodeName.toLowerCase()], s && "get" in s && (a = s.get(h, "value")) !== void 0 ? a : (a = h.value, typeof a == "string" ? a.replace(tu, "") : a ? ? "")) : void 0
            }
        }), l.extend({
            valHooks: {
                option: {
                    get: function(i) {
                        var s = l.find.attr(i, "value");
                        return s ? ? on(l.text(i))
                    }
                },
                select: {
                    get: function(i) {
                        var s, a, u, h = i.options,
                            p = i.selectedIndex,
                            m = i.type === "select-one",
                            w = m ? null : [],
                            _ = m ? p + 1 : h.length;
                        for (p < 0 ? u = _ : u = m ? p : 0; u < _; u++)
                            if (a = h[u], (a.selected || u === p) && !a.disabled && (!a.parentNode.disabled || !V(a.parentNode, "optgroup"))) {
                                if (s = l(a).val(), m) return s;
                                w.push(s)
                            } return w
                    },
                    set: function(i, s) {
                        for (var a, u, h = i.options, p = l.makeArray(s), m = h.length; m--;) u = h[m], (u.selected = l.inArray(l.valHooks.option.get(u), p) > -1) && (a = !0);
                        return a || (i.selectedIndex = -1), p
                    }
                }
            }
        }), l.each(["radio", "checkbox"], function() {
            l.valHooks[this] = {
                set: function(i, s) {
                    if (Array.isArray(s)) return i.checked = l.inArray(l(i).val(), s) > -1
                }
            }, x.checkOn || (l.valHooks[this].get = function(i) {
                return i.getAttribute("value") === null ? "on" : i.value
            })
        });
        var li = t.location,
            Mo = {
                guid: Date.now()
            },
            Dr = /\?/;
        l.parseXML = function(i) {
            var s, a;
            if (!i || typeof i != "string") return null;
            try {
                s = new t.DOMParser().parseFromString(i, "text/xml")
            } catch {}
            return a = s && s.getElementsByTagName("parsererror")[0], (!s || a) && l.error("Invalid XML: " + (a ? l.map(a.childNodes, function(u) {
                return u.textContent
            }).join(`
`) : i)), s
        };
        var Io = /^(?:focusinfocus|focusoutblur)$/,
            Po = function(i) {
                i.stopPropagation()
            };
        l.extend(l.event, {
            trigger: function(i, s, a, u) {
                var h, p, m, w, _, C, N, P, O = [a || M],
                    j = E.call(i, "type") ? i.type : i,
                    ot = E.call(i, "namespace") ? i.namespace.split(".") : [];
                if (p = P = m = a = a || M, !(a.nodeType === 3 || a.nodeType === 8) && !Io.test(j + l.event.triggered) && (j.indexOf(".") > -1 && (ot = j.split("."), j = ot.shift(), ot.sort()), _ = j.indexOf(":") < 0 && "on" + j, i = i[l.expando] ? i : new l.Event(j, typeof i == "object" && i), i.isTrigger = u ? 2 : 3, i.namespace = ot.join("."), i.rnamespace = i.namespace ? new RegExp("(^|\\.)" + ot.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, i.result = void 0, i.target || (i.target = a), s = s == null ? [i] : l.makeArray(s, [i]), N = l.event.special[j] || {}, !(!u && N.trigger && N.trigger.apply(a, s) === !1))) {
                    if (!u && !N.noBubble && !R(a)) {
                        for (w = N.delegateType || j, Io.test(w + j) || (p = p.parentNode); p; p = p.parentNode) O.push(p), m = p;
                        m === (a.ownerDocument || M) && O.push(m.defaultView || m.parentWindow || t)
                    }
                    for (h = 0;
                        (p = O[h++]) && !i.isPropagationStopped();) P = p, i.type = h > 1 ? w : N.bindType || j, C = (G.get(p, "events") || Object.create(null))[i.type] && G.get(p, "handle"), C && C.apply(p, s), C = _ && p[_], C && C.apply && Ve(p) && (i.result = C.apply(p, s), i.result === !1 && i.preventDefault());
                    return i.type = j, !u && !i.isDefaultPrevented() && (!N._default || N._default.apply(O.pop(), s) === !1) && Ve(a) && _ && L(a[j]) && !R(a) && (m = a[_], m && (a[_] = null), l.event.triggered = j, i.isPropagationStopped() && P.addEventListener(j, Po), a[j](), i.isPropagationStopped() && P.removeEventListener(j, Po), l.event.triggered = void 0, m && (a[_] = m)), i.result
                }
            },
            simulate: function(i, s, a) {
                var u = l.extend(new l.Event, a, {
                    type: i,
                    isSimulated: !0
                });
                l.event.trigger(u, null, s)
            }
        }), l.fn.extend({
            trigger: function(i, s) {
                return this.each(function() {
                    l.event.trigger(i, s, this)
                })
            },
            triggerHandler: function(i, s) {
                var a = this[0];
                if (a) return l.event.trigger(i, s, a, !0)
            }
        });
        var eu = /\[\]$/,
            Ro = /\r?\n/g,
            nu = /^(?:submit|button|image|reset|file)$/i,
            iu = /^(?:input|select|textarea|keygen)/i;

        function Mr(i, s, a, u) {
            var h;
            if (Array.isArray(s)) l.each(s, function(p, m) {
                a || eu.test(i) ? u(i, m) : Mr(i + "[" + (typeof m == "object" && m != null ? p : "") + "]", m, a, u)
            });
            else if (!a && K(s) === "object")
                for (h in s) Mr(i + "[" + h + "]", s[h], a, u);
            else u(i, s)
        }
        l.param = function(i, s) {
            var a, u = [],
                h = function(p, m) {
                    var w = L(m) ? m() : m;
                    u[u.length] = encodeURIComponent(p) + "=" + encodeURIComponent(w ? ? "")
                };
            if (i == null) return "";
            if (Array.isArray(i) || i.jquery && !l.isPlainObject(i)) l.each(i, function() {
                h(this.name, this.value)
            });
            else
                for (a in i) Mr(a, i[a], s, h);
            return u.join("&")
        }, l.fn.extend({
            serialize: function() {
                return l.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var i = l.prop(this, "elements");
                    return i ? l.makeArray(i) : this
                }).filter(function() {
                    var i = this.type;
                    return this.name && !l(this).is(":disabled") && iu.test(this.nodeName) && !nu.test(i) && (this.checked || !oi.test(i))
                }).map(function(i, s) {
                    var a = l(this).val();
                    return a == null ? null : Array.isArray(a) ? l.map(a, function(u) {
                        return {
                            name: s.name,
                            value: u.replace(Ro, `\r
`)
                        }
                    }) : {
                        name: s.name,
                        value: a.replace(Ro, `\r
`)
                    }
                }).get()
            }
        });
        var ru = /%20/g,
            su = /#.*$/,
            ou = /([?&])_=[^&]*/,
            au = /^(.*?):[ \t]*([^\r\n]*)$/mg,
            cu = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            lu = /^(?:GET|HEAD)$/,
            uu = /^\/\//,
            Ho = {},
            Ir = {},
            jo = "*/".concat("*"),
            Pr = M.createElement("a");
        Pr.href = li.href;

        function Bo(i) {
            return function(s, a) {
                typeof s != "string" && (a = s, s = "*");
                var u, h = 0,
                    p = s.toLowerCase().match(Ut) || [];
                if (L(a))
                    for (; u = p[h++];) u[0] === "+" ? (u = u.slice(1) || "*", (i[u] = i[u] || []).unshift(a)) : (i[u] = i[u] || []).push(a)
            }
        }

        function Vo(i, s, a, u) {
            var h = {},
                p = i === Ir;

            function m(w) {
                var _;
                return h[w] = !0, l.each(i[w] || [], function(C, N) {
                    var P = N(s, a, u);
                    if (typeof P == "string" && !p && !h[P]) return s.dataTypes.unshift(P), m(P), !1;
                    if (p) return !(_ = P)
                }), _
            }
            return m(s.dataTypes[0]) || !h["*"] && m("*")
        }

        function Rr(i, s) {
            var a, u, h = l.ajaxSettings.flatOptions || {};
            for (a in s) s[a] !== void 0 && ((h[a] ? i : u || (u = {}))[a] = s[a]);
            return u && l.extend(!0, i, u), i
        }

        function fu(i, s, a) {
            for (var u, h, p, m, w = i.contents, _ = i.dataTypes; _[0] === "*";) _.shift(), u === void 0 && (u = i.mimeType || s.getResponseHeader("Content-Type"));
            if (u) {
                for (h in w)
                    if (w[h] && w[h].test(u)) {
                        _.unshift(h);
                        break
                    }
            }
            if (_[0] in a) p = _[0];
            else {
                for (h in a) {
                    if (!_[0] || i.converters[h + " " + _[0]]) {
                        p = h;
                        break
                    }
                    m || (m = h)
                }
                p = p || m
            }
            if (p) return p !== _[0] && _.unshift(p), a[p]
        }

        function du(i, s, a, u) {
            var h, p, m, w, _, C = {},
                N = i.dataTypes.slice();
            if (N[1])
                for (m in i.converters) C[m.toLowerCase()] = i.converters[m];
            for (p = N.shift(); p;)
                if (i.responseFields[p] && (a[i.responseFields[p]] = s), !_ && u && i.dataFilter && (s = i.dataFilter(s, i.dataType)), _ = p, p = N.shift(), p) {
                    if (p === "*") p = _;
                    else if (_ !== "*" && _ !== p) {
                        if (m = C[_ + " " + p] || C["* " + p], !m) {
                            for (h in C)
                                if (w = h.split(" "), w[1] === p && (m = C[_ + " " + w[0]] || C["* " + w[0]], m)) {
                                    m === !0 ? m = C[h] : C[h] !== !0 && (p = w[0], N.unshift(w[1]));
                                    break
                                }
                        }
                        if (m !== !0)
                            if (m && i.throws) s = m(s);
                            else try {
                                s = m(s)
                            } catch (P) {
                                return {
                                    state: "parsererror",
                                    error: m ? P : "No conversion from " + _ + " to " + p
                                }
                            }
                    }
                } return {
                state: "success",
                data: s
            }
        }
        l.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: li.href,
                type: "GET",
                isLocal: cu.test(li.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": jo,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": l.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(i, s) {
                return s ? Rr(Rr(i, l.ajaxSettings), s) : Rr(l.ajaxSettings, i)
            },
            ajaxPrefilter: Bo(Ho),
            ajaxTransport: Bo(Ir),
            ajax: function(i, s) {
                typeof i == "object" && (s = i, i = void 0), s = s || {};
                var a, u, h, p, m, w, _, C, N, P, O = l.ajaxSetup({}, s),
                    j = O.context || O,
                    ot = O.context && (j.nodeType || j.jquery) ? l(j) : l.event,
                    mt = l.Deferred(),
                    ft = l.Callbacks("once memory"),
                    Ot = O.statusCode || {},
                    xt = {},
                    he = {},
                    pe = "canceled",
                    gt = {
                        readyState: 0,
                        getResponseHeader: function(vt) {
                            var Et;
                            if (_) {
                                if (!p)
                                    for (p = {}; Et = au.exec(h);) p[Et[1].toLowerCase() + " "] = (p[Et[1].toLowerCase() + " "] || []).concat(Et[2]);
                                Et = p[vt.toLowerCase() + " "]
                            }
                            return Et == null ? null : Et.join(", ")
                        },
                        getAllResponseHeaders: function() {
                            return _ ? h : null
                        },
                        setRequestHeader: function(vt, Et) {
                            return _ == null && (vt = he[vt.toLowerCase()] = he[vt.toLowerCase()] || vt, xt[vt] = Et), this
                        },
                        overrideMimeType: function(vt) {
                            return _ == null && (O.mimeType = vt), this
                        },
                        statusCode: function(vt) {
                            var Et;
                            if (vt)
                                if (_) gt.always(vt[gt.status]);
                                else
                                    for (Et in vt) Ot[Et] = [Ot[Et], vt[Et]];
                            return this
                        },
                        abort: function(vt) {
                            var Et = vt || pe;
                            return a && a.abort(Et), cn(0, Et), this
                        }
                    };
                if (mt.promise(gt), O.url = ((i || O.url || li.href) + "").replace(uu, li.protocol + "//"), O.type = s.method || s.type || O.method || O.type, O.dataTypes = (O.dataType || "*").toLowerCase().match(Ut) || [""], O.crossDomain == null) {
                    w = M.createElement("a");
                    try {
                        w.href = O.url, w.href = w.href, O.crossDomain = Pr.protocol + "//" + Pr.host != w.protocol + "//" + w.host
                    } catch {
                        O.crossDomain = !0
                    }
                }
                if (O.data && O.processData && typeof O.data != "string" && (O.data = l.param(O.data, O.traditional)), Vo(Ho, O, s, gt), _) return gt;
                C = l.event && O.global, C && l.active++ === 0 && l.event.trigger("ajaxStart"), O.type = O.type.toUpperCase(), O.hasContent = !lu.test(O.type), u = O.url.replace(su, ""), O.hasContent ? O.data && O.processData && (O.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (O.data = O.data.replace(ru, "+")) : (P = O.url.slice(u.length), O.data && (O.processData || typeof O.data == "string") && (u += (Dr.test(u) ? "&" : "?") + O.data, delete O.data), O.cache === !1 && (u = u.replace(ou, "$1"), P = (Dr.test(u) ? "&" : "?") + "_=" + Mo.guid++ + P), O.url = u + P), O.ifModified && (l.lastModified[u] && gt.setRequestHeader("If-Modified-Since", l.lastModified[u]), l.etag[u] && gt.setRequestHeader("If-None-Match", l.etag[u])), (O.data && O.hasContent && O.contentType !== !1 || s.contentType) && gt.setRequestHeader("Content-Type", O.contentType), gt.setRequestHeader("Accept", O.dataTypes[0] && O.accepts[O.dataTypes[0]] ? O.accepts[O.dataTypes[0]] + (O.dataTypes[0] !== "*" ? ", " + jo + "; q=0.01" : "") : O.accepts["*"]);
                for (N in O.headers) gt.setRequestHeader(N, O.headers[N]);
                if (O.beforeSend && (O.beforeSend.call(j, gt, O) === !1 || _)) return gt.abort();
                if (pe = "abort", ft.add(O.complete), gt.done(O.success), gt.fail(O.error), a = Vo(Ir, O, s, gt), !a) cn(-1, "No Transport");
                else {
                    if (gt.readyState = 1, C && ot.trigger("ajaxSend", [gt, O]), _) return gt;
                    O.async && O.timeout > 0 && (m = t.setTimeout(function() {
                        gt.abort("timeout")
                    }, O.timeout));
                    try {
                        _ = !1, a.send(xt, cn)
                    } catch (vt) {
                        if (_) throw vt;
                        cn(-1, vt)
                    }
                }

                function cn(vt, Et, fi, jr) {
                    var ge, di, me, qe, We, Gt = Et;
                    _ || (_ = !0, m && t.clearTimeout(m), a = void 0, h = jr || "", gt.readyState = vt > 0 ? 4 : 0, ge = vt >= 200 && vt < 300 || vt === 304, fi && (qe = fu(O, gt, fi)), !ge && l.inArray("script", O.dataTypes) > -1 && l.inArray("json", O.dataTypes) < 0 && (O.converters["text script"] = function() {}), qe = du(O, qe, gt, ge), ge ? (O.ifModified && (We = gt.getResponseHeader("Last-Modified"), We && (l.lastModified[u] = We), We = gt.getResponseHeader("etag"), We && (l.etag[u] = We)), vt === 204 || O.type === "HEAD" ? Gt = "nocontent" : vt === 304 ? Gt = "notmodified" : (Gt = qe.state, di = qe.data, me = qe.error, ge = !me)) : (me = Gt, (vt || !Gt) && (Gt = "error", vt < 0 && (vt = 0))), gt.status = vt, gt.statusText = (Et || Gt) + "", ge ? mt.resolveWith(j, [di, Gt, gt]) : mt.rejectWith(j, [gt, Gt, me]), gt.statusCode(Ot), Ot = void 0, C && ot.trigger(ge ? "ajaxSuccess" : "ajaxError", [gt, O, ge ? di : me]), ft.fireWith(j, [gt, Gt]), C && (ot.trigger("ajaxComplete", [gt, O]), --l.active || l.event.trigger("ajaxStop")))
                }
                return gt
            },
            getJSON: function(i, s, a) {
                return l.get(i, s, a, "json")
            },
            getScript: function(i, s) {
                return l.get(i, void 0, s, "script")
            }
        }), l.each(["get", "post"], function(i, s) {
            l[s] = function(a, u, h, p) {
                return L(u) && (p = p || h, h = u, u = void 0), l.ajax(l.extend({
                    url: a,
                    type: s,
                    dataType: p,
                    data: u,
                    success: h
                }, l.isPlainObject(a) && a))
            }
        }), l.ajaxPrefilter(function(i) {
            var s;
            for (s in i.headers) s.toLowerCase() === "content-type" && (i.contentType = i.headers[s] || "")
        }), l._evalUrl = function(i, s, a) {
            return l.ajax({
                url: i,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: {
                    "text script": function() {}
                },
                dataFilter: function(u) {
                    l.globalEval(u, s, a)
                }
            })
        }, l.fn.extend({
            wrapAll: function(i) {
                var s;
                return this[0] && (L(i) && (i = i.call(this[0])), s = l(i, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && s.insertBefore(this[0]), s.map(function() {
                    for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                    return a
                }).append(this)), this
            },
            wrapInner: function(i) {
                return L(i) ? this.each(function(s) {
                    l(this).wrapInner(i.call(this, s))
                }) : this.each(function() {
                    var s = l(this),
                        a = s.contents();
                    a.length ? a.wrapAll(i) : s.append(i)
                })
            },
            wrap: function(i) {
                var s = L(i);
                return this.each(function(a) {
                    l(this).wrapAll(s ? i.call(this, a) : i)
                })
            },
            unwrap: function(i) {
                return this.parent(i).not("body").each(function() {
                    l(this).replaceWith(this.childNodes)
                }), this
            }
        }), l.expr.pseudos.hidden = function(i) {
            return !l.expr.pseudos.visible(i)
        }, l.expr.pseudos.visible = function(i) {
            return !!(i.offsetWidth || i.offsetHeight || i.getClientRects().length)
        }, l.ajaxSettings.xhr = function() {
            try {
                return new t.XMLHttpRequest
            } catch {}
        };
        var hu = {
                0: 200,
                1223: 204
            },
            ui = l.ajaxSettings.xhr();
        x.cors = !!ui && "withCredentials" in ui, x.ajax = ui = !!ui, l.ajaxTransport(function(i) {
            var s, a;
            if (x.cors || ui && !i.crossDomain) return {
                send: function(u, h) {
                    var p, m = i.xhr();
                    if (m.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields)
                        for (p in i.xhrFields) m[p] = i.xhrFields[p];
                    i.mimeType && m.overrideMimeType && m.overrideMimeType(i.mimeType), !i.crossDomain && !u["X-Requested-With"] && (u["X-Requested-With"] = "XMLHttpRequest");
                    for (p in u) m.setRequestHeader(p, u[p]);
                    s = function(w) {
                        return function() {
                            s && (s = a = m.onload = m.onerror = m.onabort = m.ontimeout = m.onreadystatechange = null, w === "abort" ? m.abort() : w === "error" ? typeof m.status != "number" ? h(0, "error") : h(m.status, m.statusText) : h(hu[m.status] || m.status, m.statusText, (m.responseType || "text") !== "text" || typeof m.responseText != "string" ? {
                                binary: m.response
                            } : {
                                text: m.responseText
                            }, m.getAllResponseHeaders()))
                        }
                    }, m.onload = s(), a = m.onerror = m.ontimeout = s("error"), m.onabort !== void 0 ? m.onabort = a : m.onreadystatechange = function() {
                        m.readyState === 4 && t.setTimeout(function() {
                            s && a()
                        })
                    }, s = s("abort");
                    try {
                        m.send(i.hasContent && i.data || null)
                    } catch (w) {
                        if (s) throw w
                    }
                },
                abort: function() {
                    s && s()
                }
            }
        }), l.ajaxPrefilter(function(i) {
            i.crossDomain && (i.contents.script = !1)
        }), l.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(i) {
                    return l.globalEval(i), i
                }
            }
        }), l.ajaxPrefilter("script", function(i) {
            i.cache === void 0 && (i.cache = !1), i.crossDomain && (i.type = "GET")
        }), l.ajaxTransport("script", function(i) {
            if (i.crossDomain || i.scriptAttrs) {
                var s, a;
                return {
                    send: function(u, h) {
                        s = l("<script>").attr(i.scriptAttrs || {}).prop({
                            charset: i.scriptCharset,
                            src: i.url
                        }).on("load error", a = function(p) {
                            s.remove(), a = null, p && h(p.type === "error" ? 404 : 200, p.type)
                        }), M.head.appendChild(s[0])
                    },
                    abort: function() {
                        a && a()
                    }
                }
            }
        });
        var qo = [],
            Hr = /(=)\?(?=&|$)|\?\?/;
        l.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var i = qo.pop() || l.expando + "_" + Mo.guid++;
                return this[i] = !0, i
            }
        }), l.ajaxPrefilter("json jsonp", function(i, s, a) {
            var u, h, p, m = i.jsonp !== !1 && (Hr.test(i.url) ? "url" : typeof i.data == "string" && (i.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && Hr.test(i.data) && "data");
            if (m || i.dataTypes[0] === "jsonp") return u = i.jsonpCallback = L(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, m ? i[m] = i[m].replace(Hr, "$1" + u) : i.jsonp !== !1 && (i.url += (Dr.test(i.url) ? "&" : "?") + i.jsonp + "=" + u), i.converters["script json"] = function() {
                return p || l.error(u + " was not called"), p[0]
            }, i.dataTypes[0] = "json", h = t[u], t[u] = function() {
                p = arguments
            }, a.always(function() {
                h === void 0 ? l(t).removeProp(u) : t[u] = h, i[u] && (i.jsonpCallback = s.jsonpCallback, qo.push(u)), p && L(h) && h(p[0]), p = h = void 0
            }), "script"
        }), x.createHTMLDocument = function() {
            var i = M.implementation.createHTMLDocument("").body;
            return i.innerHTML = "<form></form><form></form>", i.childNodes.length === 2
        }(), l.parseHTML = function(i, s, a) {
            if (typeof i != "string") return [];
            typeof s == "boolean" && (a = s, s = !1);
            var u, h, p;
            return s || (x.createHTMLDocument ? (s = M.implementation.createHTMLDocument(""), u = s.createElement("base"), u.href = M.location.href, s.head.appendChild(u)) : s = M), h = fe.exec(i), p = !a && [], h ? [s.createElement(h[1])] : (h = bo([i], s, p), p && p.length && l(p).remove(), l.merge([], h.childNodes))
        }, l.fn.load = function(i, s, a) {
            var u, h, p, m = this,
                w = i.indexOf(" ");
            return w > -1 && (u = on(i.slice(w)), i = i.slice(0, w)), L(s) ? (a = s, s = void 0) : s && typeof s == "object" && (h = "POST"), m.length > 0 && l.ajax({
                url: i,
                type: h || "GET",
                dataType: "html",
                data: s
            }).done(function(_) {
                p = arguments, m.html(u ? l("<div>").append(l.parseHTML(_)).find(u) : _)
            }).always(a && function(_, C) {
                m.each(function() {
                    a.apply(this, p || [_.responseText, C, _])
                })
            }), this
        }, l.expr.pseudos.animated = function(i) {
            return l.grep(l.timers, function(s) {
                return i === s.elem
            }).length
        }, l.offset = {
            setOffset: function(i, s, a) {
                var u, h, p, m, w, _, C, N = l.css(i, "position"),
                    P = l(i),
                    O = {};
                N === "static" && (i.style.position = "relative"), w = P.offset(), p = l.css(i, "top"), _ = l.css(i, "left"), C = (N === "absolute" || N === "fixed") && (p + _).indexOf("auto") > -1, C ? (u = P.position(), m = u.top, h = u.left) : (m = parseFloat(p) || 0, h = parseFloat(_) || 0), L(s) && (s = s.call(i, a, l.extend({}, w))), s.top != null && (O.top = s.top - w.top + m), s.left != null && (O.left = s.left - w.left + h), "using" in s ? s.using.call(i, O) : P.css(O)
            }
        }, l.fn.extend({
            offset: function(i) {
                if (arguments.length) return i === void 0 ? this : this.each(function(h) {
                    l.offset.setOffset(this, i, h)
                });
                var s, a, u = this[0];
                if (u) return u.getClientRects().length ? (s = u.getBoundingClientRect(), a = u.ownerDocument.defaultView, {
                    top: s.top + a.pageYOffset,
                    left: s.left + a.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                }
            },
            position: function() {
                if (this[0]) {
                    var i, s, a, u = this[0],
                        h = {
                            top: 0,
                            left: 0
                        };
                    if (l.css(u, "position") === "fixed") s = u.getBoundingClientRect();
                    else {
                        for (s = this.offset(), a = u.ownerDocument, i = u.offsetParent || a.documentElement; i && (i === a.body || i === a.documentElement) && l.css(i, "position") === "static";) i = i.parentNode;
                        i && i !== u && i.nodeType === 1 && (h = l(i).offset(), h.top += l.css(i, "borderTopWidth", !0), h.left += l.css(i, "borderLeftWidth", !0))
                    }
                    return {
                        top: s.top - h.top - l.css(u, "marginTop", !0),
                        left: s.left - h.left - l.css(u, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var i = this.offsetParent; i && l.css(i, "position") === "static";) i = i.offsetParent;
                    return i || sn
                })
            }
        }), l.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(i, s) {
            var a = s === "pageYOffset";
            l.fn[i] = function(u) {
                return se(this, function(h, p, m) {
                    var w;
                    if (R(h) ? w = h : h.nodeType === 9 && (w = h.defaultView), m === void 0) return w ? w[s] : h[p];
                    w ? w.scrollTo(a ? w.pageXOffset : m, a ? m : w.pageYOffset) : h[p] = m
                }, i, u, arguments.length)
            }
        }), l.each(["top", "left"], function(i, s) {
            l.cssHooks[s] = Ao(x.pixelPosition, function(a, u) {
                if (u) return u = ai(a, s), xr.test(u) ? l(a).position()[s] + "px" : u
            })
        }), l.each({
            Height: "height",
            Width: "width"
        }, function(i, s) {
            l.each({
                padding: "inner" + i,
                content: s,
                "": "outer" + i
            }, function(a, u) {
                l.fn[u] = function(h, p) {
                    var m = arguments.length && (a || typeof h != "boolean"),
                        w = a || (h === !0 || p === !0 ? "margin" : "border");
                    return se(this, function(_, C, N) {
                        var P;
                        return R(_) ? u.indexOf("outer") === 0 ? _["inner" + i] : _.document.documentElement["client" + i] : _.nodeType === 9 ? (P = _.documentElement, Math.max(_.body["scroll" + i], P["scroll" + i], _.body["offset" + i], P["offset" + i], P["client" + i])) : N === void 0 ? l.css(_, C, w) : l.style(_, C, N, w)
                    }, s, m ? h : void 0, m)
                }
            })
        }), l.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, s) {
            l.fn[s] = function(a) {
                return this.on(s, a)
            }
        }), l.fn.extend({
            bind: function(i, s, a) {
                return this.on(i, null, s, a)
            },
            unbind: function(i, s) {
                return this.off(i, null, s)
            },
            delegate: function(i, s, a, u) {
                return this.on(s, i, a, u)
            },
            undelegate: function(i, s, a) {
                return arguments.length === 1 ? this.off(i, "**") : this.off(s, i || "**", a)
            },
            hover: function(i, s) {
                return this.on("mouseenter", i).on("mouseleave", s || i)
            }
        }), l.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(i, s) {
            l.fn[s] = function(a, u) {
                return arguments.length > 0 ? this.on(s, null, a, u) : this.trigger(s)
            }
        });
        var pu = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
        l.proxy = function(i, s) {
            var a, u, h;
            if (typeof s == "string" && (a = i[s], s = i, i = a), !!L(i)) return u = c.call(arguments, 2), h = function() {
                return i.apply(s || this, u.concat(c.call(arguments)))
            }, h.guid = i.guid = i.guid || l.guid++, h
        }, l.holdReady = function(i) {
            i ? l.readyWait++ : l.ready(!0)
        }, l.isArray = Array.isArray, l.parseJSON = JSON.parse, l.nodeName = V, l.isFunction = L, l.isWindow = R, l.camelCase = Wt, l.type = K, l.now = Date.now, l.isNumeric = function(i) {
            var s = l.type(i);
            return (s === "number" || s === "string") && !isNaN(i - parseFloat(i))
        }, l.trim = function(i) {
            return i == null ? "" : (i + "").replace(pu, "$1")
        };
        var gu = t.jQuery,
            mu = t.$;
        return l.noConflict = function(i) {
            return t.$ === l && (t.$ = mu), i && t.jQuery === l && (t.jQuery = gu), l
        }, typeof n > "u" && (t.jQuery = t.$ = l), l
    })
})(Qc);
var Cg = Qc.exports;
const $g = Zc(Cg),
    xg = e => `${e.charAt(0).toLowerCase()}${e.replace(/[\W_]/g,"|").split("|").map(t=>`${t.charAt(0).toUpperCase()}${t.slice(1)}`).join("").slice(1)}`;
class Sg {
    constructor(t) {
        this.routes = t
    }
    fire(t, n = "init", r) {
        document.dispatchEvent(new CustomEvent("routed", {
            bubbles: !0,
            detail: {
                route: t,
                fn: n
            }
        })), t !== "" && this.routes[t] && typeof this.routes[t][n] == "function" && this.routes[t][n](r)
    }
    loadEvents() {
        this.fire("common"), document.body.className.toLowerCase().replace(/-/g, "_").split(/\s+/).map(xg).forEach(t => {
            this.fire(t), this.fire(t, "finalize")
        }), this.fire("common", "finalize")
    }
}

function Og() {
    return !!(navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/))
}

function Fi(e) {
    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t ? `${parseInt(t[1],16)}, ${parseInt(t[2],16)}, ${parseInt(t[3],16)}` : null
}
const kg = {
    init() {
        $(".navbar .menu").click(function() {
            return $(".navbar").addClass("expand"), !1
        }), $(".navbar .close").click(function() {
            return $(".navbar").removeClass("expand"), !1
        }), $(".mobile-menu-toggle").off("click").on("click", function(o) {
            o.preventDefault(), o.stopPropagation();
            const c = $(".mobile-menu-overlay"),
                f = $("body"),
                d = $(".mobile-nav-bottom");
            return c.hasClass("is-open") ? (c.removeClass("is-open"), f.removeClass("mobile-menu-open"), $(this).removeClass("is-open"), d.removeClass("menu-open"), $(".mobile-nav-level").removeClass("active"), $(".main-level").addClass("active"), $(".mobile-menu-content .tagline").removeClass("hidden")) : (c.addClass("is-open"), f.addClass("mobile-menu-open"), $(this).addClass("is-open"), d.addClass("menu-open"), $(".mobile-nav-level").removeClass("active"), $(".main-level").addClass("active"), $(".mobile-menu-content .tagline").removeClass("hidden")), !1
        }), $(".mobile-menu-overlay").off("click").on("click", function(o) {
            o.target === this && ($(this).removeClass("is-open"), $("body").removeClass("mobile-menu-open"), $(".mobile-menu-toggle").removeClass("is-open"), $(".mobile-nav-bottom").removeClass("menu-open"), $(".mobile-nav-level").removeClass("active"), $(".main-level").addClass("active"), $(".mobile-menu-content .tagline").removeClass("hidden"))
        }), $(document).off("keydown.mobileMenu").on("keydown.mobileMenu", function(o) {
            o.keyCode === 27 && $(".mobile-menu-overlay").hasClass("is-open") && ($(".mobile-menu-overlay").removeClass("is-open"), $("body").removeClass("mobile-menu-open"), $(".mobile-menu-toggle").removeClass("is-open"), $(".mobile-nav-bottom").removeClass("menu-open"), $(".mobile-nav-level").removeClass("active"), $(".main-level").addClass("active"), $(".mobile-menu-content .tagline").removeClass("hidden"))
        }), $(".mobile-nav-item[data-target]").off("click").on("click", function(o) {
            o.preventDefault();
            const c = $(this).attr("data-target");
            $(".mobile-nav-level").removeClass("active"), $(`.${c}-level`).addClass("active"), $(".mobile-menu-content .tagline").addClass("hidden")
        }), $(".nav-back").off("click").on("click", function(o) {
            o.preventDefault();
            const c = $(this).attr("data-back");
            $(".mobile-nav-level").removeClass("active"), $(`.${c}-level`).addClass("active"), c === "main" ? $(".mobile-menu-content .tagline").removeClass("hidden") : $(".mobile-menu-content .tagline").addClass("hidden")
        }), $(".footer-close").off("click").on("click", function(o) {
            o.preventDefault(), $(".mobile-menu-overlay").removeClass("is-open"), $("body").removeClass("mobile-menu-open"), $(".mobile-menu-toggle").removeClass("is-open"), $(".mobile-nav-bottom").removeClass("menu-open"), $(".mobile-nav-level").removeClass("active"), $(".main-level").addClass("active"), $(".mobile-menu-content .tagline").removeClass("hidden")
        }), $(".mobile-nav-list a:not(.nav-text)").off("click").on("click", function() {
            $(".mobile-menu-overlay").removeClass("is-open"), $("body").removeClass("mobile-menu-open"), $(".mobile-menu-toggle").removeClass("is-open"), $(".mobile-nav-bottom").removeClass("menu-open")
        }), $(".mobile-search-button").off("click").on("click", function(o) {
            o.preventDefault(), o.stopPropagation();
            const c = $(".mobile-nav-bottom"),
                f = $(".mobile-search-form");
            return c.addClass("search-open"), f.css("display", "block"), setTimeout(() => {
                f.addClass("is-open")
            }, 10), setTimeout(() => {
                $(".mobile-search-input").focus()
            }, 350), !1
        }), $(".mobile-search-close").off("click").on("click", function(o) {
            o.preventDefault(), o.stopPropagation();
            const c = $(".mobile-nav-bottom"),
                f = $(".mobile-search-form");
            return f.removeClass("is-open"), c.removeClass("search-open"), setTimeout(() => {
                f.css("display", "none")
            }, 300), !1
        }), $(document).off("keydown.mobileSearch").on("keydown.mobileSearch", function(o) {
            if (o.keyCode === 27 && $(".mobile-search-form").hasClass("is-open")) {
                const c = $(".mobile-nav-bottom"),
                    f = $(".mobile-search-form");
                f.removeClass("is-open"), c.removeClass("search-open"), setTimeout(() => {
                    f.css("display", "none")
                }, 300)
            }
        }), $(window).scroll(() => {
            if ($(window).scrollTop() >= 25 && !$(".navbar").hasClass("scrolled") ? $(".navbar, .menu-work-navigation-container, .menu-spaces-navigation-container").addClass("scrolled") : $(window).scrollTop() < 25 && $(".navbar").hasClass("scrolled") && $(".navbar, .menu-work-navigation-container, .menu-spaces-navigation-container").removeClass("scrolled"), $(".article-scroll .scroll-hint").length && !$(".subscription-wall").length) {
                const o = $(".related-articles").offset().top + $(".related-articles").height() / 2;
                $(window).scrollTop() + $(window).height() > o && !$(".article-scroll .scroll-hint").hasClass("visible") ? $(".article-scroll .scroll-hint").addClass("visible") : $(window).scrollTop() + $(window).height() <= o && $(".article-scroll .scroll-hint").hasClass("visible") && $(".article-scroll .scroll-hint").removeClass("visible")
            }
            if ($("#next_preview").length && !$(".subscription-wall").length) {
                const o = $("#next_preview").offset().top + $("#next_preview").height() * .25;
                $(window).scrollTop() + $(window).height() > o && !$("#next_preview").hasClass("redirected") ? ($("#next_preview").addClass("redirected"), $(".scroll-hint.next-article").show(), $(".scroll-hint.keep-scrolling").hide()) : $(window).scrollTop() + $(window).height() <= o && $("#next_preview").hasClass("redirected") && ($("#next_preview").removeClass("redirected"), $(".scroll-hint.next-article").hide(), $(".scroll-hint.keep-scrolling").show())
            }
        }), ($(".hero-post").length || $(".hero-animated").length || $(".hero-portrait").length) && $(".navbar").addClass("media-overlay");
        const e = $("article, .overview").data("textcolor");
        e && ($("body").hasClass("single-production") ? $("header").attr("style", "--foreground:" + e) : $("html").attr("style", `--foreground: ${e}; --foreground-rgb: ${Fi(e)};`));
        const t = $("article, .overview").data("bgcolor");
        t && ($("body").addClass("has-custom-bg"), $("body").hasClass("single-production") ? $("article header").addClass("has-bg").css("background-color", t) : ($("article header").addClass("has-bg").css("background-color", t), $("html").attr("style", `${$("html").attr("style")} --background: ${t}; --background-rgb: ${Fi(t)};`))), $("body").hasClass("post-is-photo-essay-without-blocks") && $("header.navbar").attr("style", "--foreground:" + (t || "#fff") + "; --background:" + (e || "#111")), $("header.hero-photo-essay").attr("style", `--background-rgb:${e?Fi(e):"13, 13, 13"};--foreground-rgb:${t?Fi(t):"255, 255, 255"};`), $(".module-video-group").each(function() {
            let o = this;
            $(".video-teaser", o).click(function() {
                $(".video-teaser", o).removeClass("active"), $(this).addClass("active"), $(".selected-video", o).removeClass("active"), $(".selected-video:eq(" + $(this).index() + ")", o).addClass("active")
            })
        }), $(".newsletter input").off("input.newsletter change.newsletter focus.newsletter").on("input.newsletter change.newsletter focus.newsletter", function() {
            $(this).closest("form").find(".signup").removeClass("disabled")
        }), $(".newsletter .signup").off("click.newsletter").on("click.newsletter", function(o) {
            const c = $(this),
                f = c.closest("form");
            if (c.is("a") && o.preventDefault(), c.hasClass("disabled")) return !1;
            f.length && f.trigger("submit")
        }), document.body.style.setProperty("--vh", `${window.innerHeight*.01}px`), Og || window.addEventListener("resize", () => {
            document.body.style.setProperty("--vh", `${window.innerHeight*.01}px`)
        });

        function n() {
            const o = $(".hero-homepage");
            if (!o.length) return;
            const c = o.find(".hero-content");
            if (!c.length) return;
            const f = o.find(".container"),
                d = f.length ? parseInt(getComputedStyle(f[0]).paddingBottom || "0", 10) : 0,
                g = Math.ceil(c.outerHeight(!0) + d * .25);
            o[0].style.setProperty("--hero-blur-height", `${g}px`)
        }
        n();
        let r;
        $(window).off("resize.heroBlur").on("resize.heroBlur", function() {
            clearTimeout(r), r = setTimeout(n, 120)
        })
    },
    finalize() {}
};
class to {
    constructor(t, n, r, o) {
        this.$article = t, this.title = n, this.url = new URL(r.startsWith("http") ? r : window.location.protocol + r).pathname, this.index = o, this.nextArticleFetched = !1, this.init()
    }
    init() {
        console.log("🌸 INIT " + this.title), this.nextArticleUrl = this.$article.attr("data-next-article"), this.currentId = this.$article.attr("data-id");
        let t = window.localStorage.getItem("hideSubscribe") || $(".subscription-wall").length === 0;
        const n = this.$article.find("[data-load-next-advert]"),
            r = this.$article.find("[data-load-next-loading]");
        n.hide(), r.remove();
        const o = () => {
            const c = this.$article.find("[data-load-next-related-articles]"),
                f = this.$article.data("textcolor"),
                d = this.$article.data("bgcolor");
            f && this.$article.attr("style", "--foreground:" + f + ";"), d && (this.$article.attr("style", "--background:" + d + ";"), this.$article.find("header").addClass("has-bg"), this.$article.find("header").css("background-color", d));
            const g = b => {
                if (b[0].isIntersecting) {
                    console.log("👁 IN VIEW: " + this.title);
                    const v = new URL(window.location.origin + this.url);
                    if (window.history.pushState({}, this.title, v), document.title = this.title, !this.nextArticleFetched && this.index < 2) {
                        n.show();
                        const D = x => {
                            console.log("NEXT ARTICLE LOADED!");
                            const L = $(x).find("article"),
                                R = $(x).filter("title").text();
                            this.$article.after(L), c.hide(), window.dispatchEvent(window.newArticleEvent), new to(L, R, this.nextArticleUrl, this.index + 1)
                        };
                        console.log("...LOADING NEXT ARTICLE"), $.ajax({
                            url: this.nextArticleUrl,
                            data: {
                                hide_subscription_wall: !0,
                                already_loaded: this.currentId
                            },
                            method: "post",
                            success: D,
                            error: function(x) {
                                console.log(x)
                            }
                        }), this.nextArticleFetched = !0
                    }
                    $("html, header").removeAttr("style");
                    const E = this.$article.data("textcolor");
                    E && ($("body").hasClass("single-production") ? $("header").attr("style", "--foreground:" + E) : $("html").attr("style", "--foreground:" + E + ";"));
                    const A = this.$article.data("bgcolor");
                    A ? ($("body").addClass("has-custom-bg"), $("body").hasClass("single-production") || ($("body").css("background-color", A), $("html").attr("style", $("html").attr("style") + "--background:" + A + ";"))) : ($("body").removeClass("has-custom-bg"), $("body").css("background-color", "")), $("body").hasClass("post-is-photo-essay-without-blocks") && $("header.navbar").attr("style", "--foreground:" + (A || "#fff") + "; --background:" + (E || "#111"))
                }
            };
            this.articleObserver = new IntersectionObserver(g, {
                rootMargin: "0px 0px -99% 0px"
            }), this.articleObserver.observe(this.$article[0])
        };
        this.nextArticleUrl !== void 0 && t ? o() : window.addEventListener("subscribe_wall_hidden", () => {
            this.nextArticleUrl !== void 0 && o()
        })
    }
}
const Lg = {
        init() {
            new to($("article"), document.title, window.location.host + window.location.pathname, 0)
        },
        finalize() {}
    },
    {
        min: Ng,
        max: Dg
    } = Math,
    hn = (e, t = 0, n = 1) => Ng(Dg(t, e), n),
    eo = e => {
        e._clipped = !1, e._unclipped = e.slice(0);
        for (let t = 0; t <= 3; t++) t < 3 ? ((e[t] < 0 || e[t] > 255) && (e._clipped = !0), e[t] = hn(e[t], 0, 255)) : t === 3 && (e[t] = hn(e[t], 0, 1));
        return e
    },
    Jc = {};
for (let e of ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Undefined", "Null"]) Jc[`[object ${e}]`] = e.toLowerCase();

function dt(e) {
    return Jc[Object.prototype.toString.call(e)] || "object"
}
const ut = (e, t = null) => e.length >= 3 ? Array.prototype.slice.call(e) : dt(e[0]) == "object" && t ? t.split("").filter(n => e[0][n] !== void 0).map(n => e[0][n]) : e[0].slice(0),
    ti = e => {
        if (e.length < 2) return null;
        const t = e.length - 1;
        return dt(e[t]) == "string" ? e[t].toLowerCase() : null
    },
    {
        PI: br,
        min: tl,
        max: el
    } = Math,
    Jt = e => Math.round(e * 100) / 100,
    xs = e => Math.round(e * 100) / 100,
    ke = br * 2,
    cs = br / 3,
    Mg = br / 180,
    Ig = 180 / br;

function nl(e) {
    return [...e.slice(0, 3).reverse(), ...e.slice(3)]
}
const lt = {
    format: {},
    autodetect: []
};
class B {
    constructor(...t) {
        const n = this;
        if (dt(t[0]) === "object" && t[0].constructor && t[0].constructor === this.constructor) return t[0];
        let r = ti(t),
            o = !1;
        if (!r) {
            o = !0, lt.sorted || (lt.autodetect = lt.autodetect.sort((c, f) => f.p - c.p), lt.sorted = !0);
            for (let c of lt.autodetect)
                if (r = c.test(...t), r) break
        }
        if (lt.format[r]) {
            const c = lt.format[r].apply(null, o ? t : t.slice(0, -1));
            n._rgb = eo(c)
        } else throw new Error("unknown format: " + t);
        n._rgb.length === 3 && n._rgb.push(1)
    }
    toString() {
        return dt(this.hex) == "function" ? this.hex() : `[${this._rgb.join(",")}]`
    }
}
const Pg = "3.1.2",
    at = (...e) => new B(...e);
at.version = Pg;
const Yn = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        laserlemon: "#ffff54",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrod: "#fafad2",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        maroon2: "#7f0000",
        maroon3: "#b03060",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        purple2: "#7f007f",
        purple3: "#a020f0",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    },
    Rg = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    Hg = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,
    il = e => {
        if (e.match(Rg)) {
            (e.length === 4 || e.length === 7) && (e = e.substr(1)), e.length === 3 && (e = e.split(""), e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]);
            const t = parseInt(e, 16),
                n = t >> 16,
                r = t >> 8 & 255,
                o = t & 255;
            return [n, r, o, 1]
        }
        if (e.match(Hg)) {
            (e.length === 5 || e.length === 9) && (e = e.substr(1)), e.length === 4 && (e = e.split(""), e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2] + e[3] + e[3]);
            const t = parseInt(e, 16),
                n = t >> 24 & 255,
                r = t >> 16 & 255,
                o = t >> 8 & 255,
                c = Math.round((t & 255) / 255 * 100) / 100;
            return [n, r, o, c]
        }
        throw new Error(`unknown hex color: ${e}`)
    },
    {
        round: zi
    } = Math,
    rl = (...e) => {
        let [t, n, r, o] = ut(e, "rgba"), c = ti(e) || "auto";
        o === void 0 && (o = 1), c === "auto" && (c = o < 1 ? "rgba" : "rgb"), t = zi(t), n = zi(n), r = zi(r);
        let d = "000000" + (t << 16 | n << 8 | r).toString(16);
        d = d.substr(d.length - 6);
        let g = "0" + zi(o * 255).toString(16);
        switch (g = g.substr(g.length - 2), c.toLowerCase()) {
            case "rgba":
                return `#${d}${g}`;
            case "argb":
                return `#${g}${d}`;
            default:
                return `#${d}`
        }
    };
B.prototype.name = function() {
    const e = rl(this._rgb, "rgb");
    for (let t of Object.keys(Yn))
        if (Yn[t] === e) return t.toLowerCase();
    return e
};
lt.format.named = e => {
    if (e = e.toLowerCase(), Yn[e]) return il(Yn[e]);
    throw new Error("unknown color name: " + e)
};
lt.autodetect.push({
    p: 5,
    test: (e, ...t) => {
        if (!t.length && dt(e) === "string" && Yn[e.toLowerCase()]) return "named"
    }
});
B.prototype.alpha = function(e, t = !1) {
    return e !== void 0 && dt(e) === "number" ? t ? (this._rgb[3] = e, this) : new B([this._rgb[0], this._rgb[1], this._rgb[2], e], "rgb") : this._rgb[3]
};
B.prototype.clipped = function() {
    return this._rgb._clipped || !1
};
const _e = {
        Kn: 18,
        labWhitePoint: "d65",
        Xn: .95047,
        Yn: 1,
        Zn: 1.08883,
        kE: 216 / 24389,
        kKE: 8,
        kK: 24389 / 27,
        RefWhiteRGB: {
            X: .95047,
            Y: 1,
            Z: 1.08883
        },
        MtxRGB2XYZ: {
            m00: .4124564390896922,
            m01: .21267285140562253,
            m02: .0193338955823293,
            m10: .357576077643909,
            m11: .715152155287818,
            m12: .11919202588130297,
            m20: .18043748326639894,
            m21: .07217499330655958,
            m22: .9503040785363679
        },
        MtxXYZ2RGB: {
            m00: 3.2404541621141045,
            m01: -.9692660305051868,
            m02: .055643430959114726,
            m10: -1.5371385127977166,
            m11: 1.8760108454466942,
            m12: -.2040259135167538,
            m20: -.498531409556016,
            m21: .041556017530349834,
            m22: 1.0572251882231791
        },
        As: .9414285350000001,
        Bs: 1.040417467,
        Cs: 1.089532651,
        MtxAdaptMa: {
            m00: .8951,
            m01: -.7502,
            m02: .0389,
            m10: .2664,
            m11: 1.7135,
            m12: -.0685,
            m20: -.1614,
            m21: .0367,
            m22: 1.0296
        },
        MtxAdaptMaI: {
            m00: .9869929054667123,
            m01: .43230526972339456,
            m02: -.008528664575177328,
            m10: -.14705425642099013,
            m11: .5183602715367776,
            m12: .04004282165408487,
            m20: .15996265166373125,
            m21: .0492912282128556,
            m22: .9684866957875502
        }
    },
    jg = new Map([
        ["a", [1.0985, .35585]],
        ["b", [1.0985, .35585]],
        ["c", [.98074, 1.18232]],
        ["d50", [.96422, .82521]],
        ["d55", [.95682, .92149]],
        ["d65", [.95047, 1.08883]],
        ["e", [1, 1, 1]],
        ["f2", [.99186, .67393]],
        ["f7", [.95041, 1.08747]],
        ["f11", [1.00962, .6435]],
        ["icc", [.96422, .82521]]
    ]);

function Le(e) {
    const t = jg.get(String(e).toLowerCase());
    if (!t) throw new Error("unknown Lab illuminant " + e);
    _e.labWhitePoint = e, _e.Xn = t[0], _e.Zn = t[1]
}

function yi() {
    return _e.labWhitePoint
}
const no = (...e) => {
        e = ut(e, "lab");
        const [t, n, r] = e, [o, c, f] = Bg(t, n, r), [d, g, b] = sl(o, c, f);
        return [d, g, b, e.length > 3 ? e[3] : 1]
    },
    Bg = (e, t, n) => {
        const {
            kE: r,
            kK: o,
            kKE: c,
            Xn: f,
            Yn: d,
            Zn: g
        } = _e, b = (e + 16) / 116, v = .002 * t + b, E = b - .005 * n, A = v * v * v, D = E * E * E, x = A > r ? A : (116 * v - 16) / o, L = e > c ? Math.pow((e + 16) / 116, 3) : e / o, R = D > r ? D : (116 * E - 16) / o, M = x * f, Q = L * d, tt = R * g;
        return [M, Q, tt]
    },
    ls = e => {
        const t = Math.sign(e);
        return e = Math.abs(e), (e <= .0031308 ? e * 12.92 : 1.055 * Math.pow(e, 1 / 2.4) - .055) * t
    },
    sl = (e, t, n) => {
        const {
            MtxAdaptMa: r,
            MtxAdaptMaI: o,
            MtxXYZ2RGB: c,
            RefWhiteRGB: f,
            Xn: d,
            Yn: g,
            Zn: b
        } = _e, v = d * r.m00 + g * r.m10 + b * r.m20, E = d * r.m01 + g * r.m11 + b * r.m21, A = d * r.m02 + g * r.m12 + b * r.m22, D = f.X * r.m00 + f.Y * r.m10 + f.Z * r.m20, x = f.X * r.m01 + f.Y * r.m11 + f.Z * r.m21, L = f.X * r.m02 + f.Y * r.m12 + f.Z * r.m22, R = (e * r.m00 + t * r.m10 + n * r.m20) * (D / v), M = (e * r.m01 + t * r.m11 + n * r.m21) * (x / E), Q = (e * r.m02 + t * r.m12 + n * r.m22) * (L / A), tt = R * o.m00 + M * o.m10 + Q * o.m20, K = R * o.m01 + M * o.m11 + Q * o.m21, it = R * o.m02 + M * o.m12 + Q * o.m22, Y = ls(tt * c.m00 + K * c.m10 + it * c.m20), l = ls(tt * c.m01 + K * c.m11 + it * c.m21), W = ls(tt * c.m02 + K * c.m12 + it * c.m22);
        return [Y * 255, l * 255, W * 255]
    },
    io = (...e) => {
        const [t, n, r, ...o] = ut(e, "rgb"), [c, f, d] = ol(t, n, r), [g, b, v] = Vg(c, f, d);
        return [g, b, v, ...o.length > 0 && o[0] < 1 ? [o[0]] : []]
    };

function Vg(e, t, n) {
    const {
        Xn: r,
        Yn: o,
        Zn: c,
        kE: f,
        kK: d
    } = _e, g = e / r, b = t / o, v = n / c, E = g > f ? Math.pow(g, 1 / 3) : (d * g + 16) / 116, A = b > f ? Math.pow(b, 1 / 3) : (d * b + 16) / 116, D = v > f ? Math.pow(v, 1 / 3) : (d * v + 16) / 116;
    return [116 * A - 16, 500 * (E - A), 200 * (A - D)]
}

function us(e) {
    const t = Math.sign(e);
    return e = Math.abs(e), (e <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)) * t
}
const ol = (e, t, n) => {
    e = us(e / 255), t = us(t / 255), n = us(n / 255);
    const {
        MtxRGB2XYZ: r,
        MtxAdaptMa: o,
        MtxAdaptMaI: c,
        Xn: f,
        Yn: d,
        Zn: g,
        As: b,
        Bs: v,
        Cs: E
    } = _e;
    let A = e * r.m00 + t * r.m10 + n * r.m20,
        D = e * r.m01 + t * r.m11 + n * r.m21,
        x = e * r.m02 + t * r.m12 + n * r.m22;
    const L = f * o.m00 + d * o.m10 + g * o.m20,
        R = f * o.m01 + d * o.m11 + g * o.m21,
        M = f * o.m02 + d * o.m12 + g * o.m22;
    let Q = A * o.m00 + D * o.m10 + x * o.m20,
        tt = A * o.m01 + D * o.m11 + x * o.m21,
        K = A * o.m02 + D * o.m12 + x * o.m22;
    return Q *= L / b, tt *= R / v, K *= M / E, A = Q * c.m00 + tt * c.m10 + K * c.m20, D = Q * c.m01 + tt * c.m11 + K * c.m21, x = Q * c.m02 + tt * c.m12 + K * c.m22, [A, D, x]
};
B.prototype.lab = function() {
    return io(this._rgb)
};
const qg = (...e) => new B(...e, "lab");
Object.assign(at, {
    lab: qg,
    getLabWhitePoint: yi,
    setLabWhitePoint: Le
});
lt.format.lab = no;
lt.autodetect.push({
    p: 2,
    test: (...e) => {
        if (e = ut(e, "lab"), dt(e) === "array" && e.length === 3) return "lab"
    }
});
B.prototype.darken = function(e = 1) {
    const t = this,
        n = t.lab();
    return n[0] -= _e.Kn * e, new B(n, "lab").alpha(t.alpha(), !0)
};
B.prototype.brighten = function(e = 1) {
    return this.darken(-e)
};
B.prototype.darker = B.prototype.darken;
B.prototype.brighter = B.prototype.brighten;
B.prototype.get = function(e) {
    const [t, n] = e.split("."), r = this[t]();
    if (n) {
        const o = t.indexOf(n) - (t.substr(0, 2) === "ok" ? 2 : 0);
        if (o > -1) return r[o];
        throw new Error(`unknown channel ${n} in mode ${t}`)
    } else return r
};
const {
    pow: Wg
} = Math, Fg = 1e-7, zg = 20;
B.prototype.luminance = function(e, t = "rgb") {
    if (e !== void 0 && dt(e) === "number") {
        if (e === 0) return new B([0, 0, 0, this._rgb[3]], "rgb");
        if (e === 1) return new B([255, 255, 255, this._rgb[3]], "rgb");
        let n = this.luminance(),
            r = zg;
        const o = (f, d) => {
                const g = f.interpolate(d, .5, t),
                    b = g.luminance();
                return Math.abs(e - b) < Fg || !r-- ? g : b > e ? o(f, g) : o(g, d)
            },
            c = (n > e ? o(new B([0, 0, 0]), this) : o(this, new B([255, 255, 255]))).rgb();
        return new B([...c, this._rgb[3]])
    }
    return Yg(...this._rgb.slice(0, 3))
};
const Yg = (e, t, n) => (e = fs(e), t = fs(t), n = fs(n), .2126 * e + .7152 * t + .0722 * n),
    fs = e => (e /= 255, e <= .03928 ? e / 12.92 : Wg((e + .055) / 1.055, 2.4)),
    Dt = {},
    Kn = (e, t, n = .5, ...r) => {
        let o = r[0] || "lrgb";
        if (!Dt[o] && !r.length && (o = Object.keys(Dt)[0]), !Dt[o]) throw new Error(`interpolation mode ${o} is not defined`);
        return dt(e) !== "object" && (e = new B(e)), dt(t) !== "object" && (t = new B(t)), Dt[o](e, t, n).alpha(e.alpha() + n * (t.alpha() - e.alpha()))
    };
B.prototype.mix = B.prototype.interpolate = function(e, t = .5, ...n) {
    return Kn(this, e, t, ...n)
};
B.prototype.premultiply = function(e = !1) {
    const t = this._rgb,
        n = t[3];
    return e ? (this._rgb = [t[0] * n, t[1] * n, t[2] * n, n], this) : new B([t[0] * n, t[1] * n, t[2] * n, n], "rgb")
};
const {
    sin: Kg,
    cos: Ug
} = Math, al = (...e) => {
    let [t, n, r] = ut(e, "lch");
    return isNaN(r) && (r = 0), r = r * Mg, [t, Ug(r) * n, Kg(r) * n]
}, ro = (...e) => {
    e = ut(e, "lch");
    const [t, n, r] = e, [o, c, f] = al(t, n, r), [d, g, b] = no(o, c, f);
    return [d, g, b, e.length > 3 ? e[3] : 1]
}, Xg = (...e) => {
    const t = nl(ut(e, "hcl"));
    return ro(...t)
}, {
    sqrt: Gg,
    atan2: Zg,
    round: Qg
} = Math, cl = (...e) => {
    const [t, n, r] = ut(e, "lab"), o = Gg(n * n + r * r);
    let c = (Zg(r, n) * Ig + 360) % 360;
    return Qg(o * 1e4) === 0 && (c = Number.NaN), [t, o, c]
}, so = (...e) => {
    const [t, n, r, ...o] = ut(e, "rgb"), [c, f, d] = io(t, n, r), [g, b, v] = cl(c, f, d);
    return [g, b, v, ...o.length > 0 && o[0] < 1 ? [o[0]] : []]
};
B.prototype.lch = function() {
    return so(this._rgb)
};
B.prototype.hcl = function() {
    return nl(so(this._rgb))
};
const Jg = (...e) => new B(...e, "lch"),
    tm = (...e) => new B(...e, "hcl");
Object.assign(at, {
    lch: Jg,
    hcl: tm
});
lt.format.lch = ro;
lt.format.hcl = Xg;
["lch", "hcl"].forEach(e => lt.autodetect.push({
    p: 2,
    test: (...t) => {
        if (t = ut(t, e), dt(t) === "array" && t.length === 3) return e
    }
}));
B.prototype.saturate = function(e = 1) {
    const t = this,
        n = t.lch();
    return n[1] += _e.Kn * e, n[1] < 0 && (n[1] = 0), new B(n, "lch").alpha(t.alpha(), !0)
};
B.prototype.desaturate = function(e = 1) {
    return this.saturate(-e)
};
B.prototype.set = function(e, t, n = !1) {
    const [r, o] = e.split("."), c = this[r]();
    if (o) {
        const f = r.indexOf(o) - (r.substr(0, 2) === "ok" ? 2 : 0);
        if (f > -1) {
            if (dt(t) == "string") switch (t.charAt(0)) {
                    case "+":
                        c[f] += +t;
                        break;
                    case "-":
                        c[f] += +t;
                        break;
                    case "*":
                        c[f] *= +t.substr(1);
                        break;
                    case "/":
                        c[f] /= +t.substr(1);
                        break;
                    default:
                        c[f] = +t
                } else if (dt(t) === "number") c[f] = t;
                else throw new Error("unsupported value for Color.set");
            const d = new B(c, r);
            return n ? (this._rgb = d._rgb, this) : d
        }
        throw new Error(`unknown channel ${o} in mode ${r}`)
    } else return c
};
B.prototype.tint = function(e = .5, ...t) {
    return Kn(this, "white", e, ...t)
};
B.prototype.shade = function(e = .5, ...t) {
    return Kn(this, "black", e, ...t)
};
const em = (e, t, n) => {
    const r = e._rgb,
        o = t._rgb;
    return new B(r[0] + n * (o[0] - r[0]), r[1] + n * (o[1] - r[1]), r[2] + n * (o[2] - r[2]), "rgb")
};
Dt.rgb = em;
const {
    sqrt: ds,
    pow: Nn
} = Math, nm = (e, t, n) => {
    const [r, o, c] = e._rgb, [f, d, g] = t._rgb;
    return new B(ds(Nn(r, 2) * (1 - n) + Nn(f, 2) * n), ds(Nn(o, 2) * (1 - n) + Nn(d, 2) * n), ds(Nn(c, 2) * (1 - n) + Nn(g, 2) * n), "rgb")
};
Dt.lrgb = nm;
const im = (e, t, n) => {
    const r = e.lab(),
        o = t.lab();
    return new B(r[0] + n * (o[0] - r[0]), r[1] + n * (o[1] - r[1]), r[2] + n * (o[2] - r[2]), "lab")
};
Dt.lab = im;
const ei = (e, t, n, r) => {
        let o, c;
        r === "hsl" ? (o = e.hsl(), c = t.hsl()) : r === "hsv" ? (o = e.hsv(), c = t.hsv()) : r === "hcg" ? (o = e.hcg(), c = t.hcg()) : r === "hsi" ? (o = e.hsi(), c = t.hsi()) : r === "lch" || r === "hcl" ? (r = "hcl", o = e.hcl(), c = t.hcl()) : r === "oklch" && (o = e.oklch().reverse(), c = t.oklch().reverse());
        let f, d, g, b, v, E;
        (r.substr(0, 1) === "h" || r === "oklch") && ([f, g, v] = o, [d, b, E] = c);
        let A, D, x, L;
        return !isNaN(f) && !isNaN(d) ? (d > f && d - f > 180 ? L = d - (f + 360) : d < f && f - d > 180 ? L = d + 360 - f : L = d - f, D = f + n * L) : isNaN(f) ? isNaN(d) ? D = Number.NaN : (D = d, (v == 1 || v == 0) && r != "hsv" && (A = b)) : (D = f, (E == 1 || E == 0) && r != "hsv" && (A = g)), A === void 0 && (A = g + n * (b - g)), x = v + n * (E - v), r === "oklch" ? new B([x, A, D], r) : new B([D, A, x], r)
    },
    ll = (e, t, n) => ei(e, t, n, "lch");
Dt.lch = ll;
Dt.hcl = ll;
const rm = e => {
        if (dt(e) == "number" && e >= 0 && e <= 16777215) {
            const t = e >> 16,
                n = e >> 8 & 255,
                r = e & 255;
            return [t, n, r, 1]
        }
        throw new Error("unknown num color: " + e)
    },
    sm = (...e) => {
        const [t, n, r] = ut(e, "rgb");
        return (t << 16) + (n << 8) + r
    };
B.prototype.num = function() {
    return sm(this._rgb)
};
const om = (...e) => new B(...e, "num");
Object.assign(at, {
    num: om
});
lt.format.num = rm;
lt.autodetect.push({
    p: 5,
    test: (...e) => {
        if (e.length === 1 && dt(e[0]) === "number" && e[0] >= 0 && e[0] <= 16777215) return "num"
    }
});
const am = (e, t, n) => {
    const r = e.num(),
        o = t.num();
    return new B(r + n * (o - r), "num")
};
Dt.num = am;
const {
    floor: cm
} = Math, lm = (...e) => {
    e = ut(e, "hcg");
    let [t, n, r] = e, o, c, f;
    r = r * 255;
    const d = n * 255;
    if (n === 0) o = c = f = r;
    else {
        t === 360 && (t = 0), t > 360 && (t -= 360), t < 0 && (t += 360), t /= 60;
        const g = cm(t),
            b = t - g,
            v = r * (1 - n),
            E = v + d * (1 - b),
            A = v + d * b,
            D = v + d;
        switch (g) {
            case 0:
                [o, c, f] = [D, A, v];
                break;
            case 1:
                [o, c, f] = [E, D, v];
                break;
            case 2:
                [o, c, f] = [v, D, A];
                break;
            case 3:
                [o, c, f] = [v, E, D];
                break;
            case 4:
                [o, c, f] = [A, v, D];
                break;
            case 5:
                [o, c, f] = [D, v, E];
                break
        }
    }
    return [o, c, f, e.length > 3 ? e[3] : 1]
}, um = (...e) => {
    const [t, n, r] = ut(e, "rgb"), o = tl(t, n, r), c = el(t, n, r), f = c - o, d = f * 100 / 255, g = o / (255 - f) * 100;
    let b;
    return f === 0 ? b = Number.NaN : (t === c && (b = (n - r) / f), n === c && (b = 2 + (r - t) / f), r === c && (b = 4 + (t - n) / f), b *= 60, b < 0 && (b += 360)), [b, d, g]
};
B.prototype.hcg = function() {
    return um(this._rgb)
};
const fm = (...e) => new B(...e, "hcg");
at.hcg = fm;
lt.format.hcg = lm;
lt.autodetect.push({
    p: 1,
    test: (...e) => {
        if (e = ut(e, "hcg"), dt(e) === "array" && e.length === 3) return "hcg"
    }
});
const dm = (e, t, n) => ei(e, t, n, "hcg");
Dt.hcg = dm;
const {
    cos: Dn
} = Math, hm = (...e) => {
    e = ut(e, "hsi");
    let [t, n, r] = e, o, c, f;
    return isNaN(t) && (t = 0), isNaN(n) && (n = 0), t > 360 && (t -= 360), t < 0 && (t += 360), t /= 360, t < 1 / 3 ? (f = (1 - n) / 3, o = (1 + n * Dn(ke * t) / Dn(cs - ke * t)) / 3, c = 1 - (f + o)) : t < 2 / 3 ? (t -= 1 / 3, o = (1 - n) / 3, c = (1 + n * Dn(ke * t) / Dn(cs - ke * t)) / 3, f = 1 - (o + c)) : (t -= 2 / 3, c = (1 - n) / 3, f = (1 + n * Dn(ke * t) / Dn(cs - ke * t)) / 3, o = 1 - (c + f)), o = hn(r * o * 3), c = hn(r * c * 3), f = hn(r * f * 3), [o * 255, c * 255, f * 255, e.length > 3 ? e[3] : 1]
}, {
    min: pm,
    sqrt: gm,
    acos: mm
} = Math, vm = (...e) => {
    let [t, n, r] = ut(e, "rgb");
    t /= 255, n /= 255, r /= 255;
    let o;
    const c = pm(t, n, r),
        f = (t + n + r) / 3,
        d = f > 0 ? 1 - c / f : 0;
    return d === 0 ? o = NaN : (o = (t - n + (t - r)) / 2, o /= gm((t - n) * (t - n) + (t - r) * (n - r)), o = mm(o), r > n && (o = ke - o), o /= ke), [o * 360, d, f]
};
B.prototype.hsi = function() {
    return vm(this._rgb)
};
const bm = (...e) => new B(...e, "hsi");
at.hsi = bm;
lt.format.hsi = hm;
lt.autodetect.push({
    p: 2,
    test: (...e) => {
        if (e = ut(e, "hsi"), dt(e) === "array" && e.length === 3) return "hsi"
    }
});
const ym = (e, t, n) => ei(e, t, n, "hsi");
Dt.hsi = ym;
const Ss = (...e) => {
        e = ut(e, "hsl");
        const [t, n, r] = e;
        let o, c, f;
        if (n === 0) o = c = f = r * 255;
        else {
            const d = [0, 0, 0],
                g = [0, 0, 0],
                b = r < .5 ? r * (1 + n) : r + n - r * n,
                v = 2 * r - b,
                E = t / 360;
            d[0] = E + 1 / 3, d[1] = E, d[2] = E - 1 / 3;
            for (let A = 0; A < 3; A++) d[A] < 0 && (d[A] += 1), d[A] > 1 && (d[A] -= 1), 6 * d[A] < 1 ? g[A] = v + (b - v) * 6 * d[A] : 2 * d[A] < 1 ? g[A] = b : 3 * d[A] < 2 ? g[A] = v + (b - v) * (2 / 3 - d[A]) * 6 : g[A] = v;
            [o, c, f] = [g[0] * 255, g[1] * 255, g[2] * 255]
        }
        return e.length > 3 ? [o, c, f, e[3]] : [o, c, f, 1]
    },
    ul = (...e) => {
        e = ut(e, "rgba");
        let [t, n, r] = e;
        t /= 255, n /= 255, r /= 255;
        const o = tl(t, n, r),
            c = el(t, n, r),
            f = (c + o) / 2;
        let d, g;
        return c === o ? (d = 0, g = Number.NaN) : d = f < .5 ? (c - o) / (c + o) : (c - o) / (2 - c - o), t == c ? g = (n - r) / (c - o) : n == c ? g = 2 + (r - t) / (c - o) : r == c && (g = 4 + (t - n) / (c - o)), g *= 60, g < 0 && (g += 360), e.length > 3 && e[3] !== void 0 ? [g, d, f, e[3]] : [g, d, f]
    };
B.prototype.hsl = function() {
    return ul(this._rgb)
};
const _m = (...e) => new B(...e, "hsl");
at.hsl = _m;
lt.format.hsl = Ss;
lt.autodetect.push({
    p: 2,
    test: (...e) => {
        if (e = ut(e, "hsl"), dt(e) === "array" && e.length === 3) return "hsl"
    }
});
const wm = (e, t, n) => ei(e, t, n, "hsl");
Dt.hsl = wm;
const {
    floor: Em
} = Math, Tm = (...e) => {
    e = ut(e, "hsv");
    let [t, n, r] = e, o, c, f;
    if (r *= 255, n === 0) o = c = f = r;
    else {
        t === 360 && (t = 0), t > 360 && (t -= 360), t < 0 && (t += 360), t /= 60;
        const d = Em(t),
            g = t - d,
            b = r * (1 - n),
            v = r * (1 - n * g),
            E = r * (1 - n * (1 - g));
        switch (d) {
            case 0:
                [o, c, f] = [r, E, b];
                break;
            case 1:
                [o, c, f] = [v, r, b];
                break;
            case 2:
                [o, c, f] = [b, r, E];
                break;
            case 3:
                [o, c, f] = [b, v, r];
                break;
            case 4:
                [o, c, f] = [E, b, r];
                break;
            case 5:
                [o, c, f] = [r, b, v];
                break
        }
    }
    return [o, c, f, e.length > 3 ? e[3] : 1]
}, {
    min: Am,
    max: Cm
} = Math, $m = (...e) => {
    e = ut(e, "rgb");
    let [t, n, r] = e;
    const o = Am(t, n, r),
        c = Cm(t, n, r),
        f = c - o;
    let d, g, b;
    return b = c / 255, c === 0 ? (d = Number.NaN, g = 0) : (g = f / c, t === c && (d = (n - r) / f), n === c && (d = 2 + (r - t) / f), r === c && (d = 4 + (t - n) / f), d *= 60, d < 0 && (d += 360)), [d, g, b]
};
B.prototype.hsv = function() {
    return $m(this._rgb)
};
const xm = (...e) => new B(...e, "hsv");
at.hsv = xm;
lt.format.hsv = Tm;
lt.autodetect.push({
    p: 2,
    test: (...e) => {
        if (e = ut(e, "hsv"), dt(e) === "array" && e.length === 3) return "hsv"
    }
});
const Sm = (e, t, n) => ei(e, t, n, "hsv");
Dt.hsv = Sm;

function or(e, t) {
    let n = e.length;
    Array.isArray(e[0]) || (e = [e]), Array.isArray(t[0]) || (t = t.map(f => [f]));
    let r = t[0].length,
        o = t[0].map((f, d) => t.map(g => g[d])),
        c = e.map(f => o.map(d => Array.isArray(f) ? f.reduce((g, b, v) => g + b * (d[v] || 0), 0) : d.reduce((g, b) => g + b * f, 0)));
    return n === 1 && (c = c[0]), r === 1 ? c.map(f => f[0]) : c
}
const oo = (...e) => {
    e = ut(e, "lab");
    const [t, n, r, ...o] = e, [c, f, d] = Om([t, n, r]), [g, b, v] = sl(c, f, d);
    return [g, b, v, ...o.length > 0 && o[0] < 1 ? [o[0]] : []]
};

function Om(e) {
    var t = [
            [1.2268798758459243, -.5578149944602171, .2813910456659647],
            [-.0405757452148008, 1.112286803280317, -.0717110580655164],
            [-.0763729366746601, -.4214933324022432, 1.5869240198367816]
        ],
        n = [
            [1, .3963377773761749, .2158037573099136],
            [1, -.1055613458156586, -.0638541728258133],
            [1, -.0894841775298119, -1.2914855480194092]
        ],
        r = or(n, e);
    return or(t, r.map(o => o ** 3))
}
const ao = (...e) => {
    const [t, n, r, ...o] = ut(e, "rgb"), c = ol(t, n, r);
    return [...km(c), ...o.length > 0 && o[0] < 1 ? [o[0]] : []]
};

function km(e) {
    const t = [
            [.819022437996703, .3619062600528904, -.1288737815209879],
            [.0329836539323885, .9292868615863434, .0361446663506424],
            [.0481771893596242, .2642395317527308, .6335478284694309]
        ],
        n = [
            [.210454268309314, .7936177747023054, -.0040720430116193],
            [1.9779985324311684, -2.42859224204858, .450593709617411],
            [.0259040424655478, .7827717124575296, -.8086757549230774]
        ],
        r = or(t, e);
    return or(n, r.map(o => Math.cbrt(o)))
}
B.prototype.oklab = function() {
    return ao(this._rgb)
};
const Lm = (...e) => new B(...e, "oklab");
Object.assign(at, {
    oklab: Lm
});
lt.format.oklab = oo;
lt.autodetect.push({
    p: 2,
    test: (...e) => {
        if (e = ut(e, "oklab"), dt(e) === "array" && e.length === 3) return "oklab"
    }
});
const Nm = (e, t, n) => {
    const r = e.oklab(),
        o = t.oklab();
    return new B(r[0] + n * (o[0] - r[0]), r[1] + n * (o[1] - r[1]), r[2] + n * (o[2] - r[2]), "oklab")
};
Dt.oklab = Nm;
const Dm = (e, t, n) => ei(e, t, n, "oklch");
Dt.oklch = Dm;
const {
    pow: hs,
    sqrt: ps,
    PI: gs,
    cos: Oa,
    sin: ka,
    atan2: Mm
} = Math, Im = (e, t = "lrgb", n = null) => {
    const r = e.length;
    n || (n = Array.from(new Array(r)).map(() => 1));
    const o = r / n.reduce(function(E, A) {
        return E + A
    });
    if (n.forEach((E, A) => {
            n[A] *= o
        }), e = e.map(E => new B(E)), t === "lrgb") return Pm(e, n);
    const c = e.shift(),
        f = c.get(t),
        d = [];
    let g = 0,
        b = 0;
    for (let E = 0; E < f.length; E++)
        if (f[E] = (f[E] || 0) * n[0], d.push(isNaN(f[E]) ? 0 : n[0]), t.charAt(E) === "h" && !isNaN(f[E])) {
            const A = f[E] / 180 * gs;
            g += Oa(A) * n[0], b += ka(A) * n[0]
        } let v = c.alpha() * n[0];
    e.forEach((E, A) => {
        const D = E.get(t);
        v += E.alpha() * n[A + 1];
        for (let x = 0; x < f.length; x++)
            if (!isNaN(D[x]))
                if (d[x] += n[A + 1], t.charAt(x) === "h") {
                    const L = D[x] / 180 * gs;
                    g += Oa(L) * n[A + 1], b += ka(L) * n[A + 1]
                } else f[x] += D[x] * n[A + 1]
    });
    for (let E = 0; E < f.length; E++)
        if (t.charAt(E) === "h") {
            let A = Mm(b / d[E], g / d[E]) / gs * 180;
            for (; A < 0;) A += 360;
            for (; A >= 360;) A -= 360;
            f[E] = A
        } else f[E] = f[E] / d[E];
    return v /= r, new B(f, t).alpha(v > .99999 ? 1 : v, !0)
}, Pm = (e, t) => {
    const n = e.length,
        r = [0, 0, 0, 0];
    for (let o = 0; o < e.length; o++) {
        const c = e[o],
            f = t[o] / n,
            d = c._rgb;
        r[0] += hs(d[0], 2) * f, r[1] += hs(d[1], 2) * f, r[2] += hs(d[2], 2) * f, r[3] += d[3] * f
    }
    return r[0] = ps(r[0]), r[1] = ps(r[1]), r[2] = ps(r[2]), r[3] > .9999999 && (r[3] = 1), new B(eo(r))
}, {
    pow: Rm
} = Math;

function ar(e) {
    let t = "rgb",
        n = at("#ccc"),
        r = 0,
        o = [0, 1],
        c = [],
        f = [0, 0],
        d = !1,
        g = [],
        b = !1,
        v = 0,
        E = 1,
        A = !1,
        D = {},
        x = !0,
        L = 1;
    const R = function(l) {
            if (l = l || ["#fff", "#000"], l && dt(l) === "string" && at.brewer && at.brewer[l.toLowerCase()] && (l = at.brewer[l.toLowerCase()]), dt(l) === "array") {
                l.length === 1 && (l = [l[0], l[0]]), l = l.slice(0);
                for (let W = 0; W < l.length; W++) l[W] = at(l[W]);
                c.length = 0;
                for (let W = 0; W < l.length; W++) c.push(W / (l.length - 1))
            }
            return it(), g = l
        },
        M = function(l) {
            if (d != null) {
                const W = d.length - 1;
                let V = 0;
                for (; V < W && l >= d[V];) V++;
                return V - 1
            }
            return 0
        };
    let Q = l => l,
        tt = l => l;
    const K = function(l, W) {
        let V, U;
        if (W == null && (W = !1), isNaN(l) || l === null) return n;
        W ? U = l : d && d.length > 2 ? U = M(l) / (d.length - 2) : E !== v ? U = (l - v) / (E - v) : U = 1, U = tt(U), W || (U = Q(U)), L !== 1 && (U = Rm(U, L)), U = f[0] + U * (1 - f[0] - f[1]), U = hn(U, 0, 1);
        const et = Math.floor(U * 1e4);
        if (x && D[et]) V = D[et];
        else {
            if (dt(g) === "array")
                for (let rt = 0; rt < c.length; rt++) {
                    const X = c[rt];
                    if (U <= X) {
                        V = g[rt];
                        break
                    }
                    if (U >= X && rt === c.length - 1) {
                        V = g[rt];
                        break
                    }
                    if (U > X && U < c[rt + 1]) {
                        U = (U - X) / (c[rt + 1] - X), V = at.interpolate(g[rt], g[rt + 1], U, t);
                        break
                    }
                } else dt(g) === "function" && (V = g(U));
            x && (D[et] = V)
        }
        return V
    };
    var it = () => D = {};
    R(e);
    const Y = function(l) {
        const W = at(K(l));
        return b && W[b] ? W[b]() : W
    };
    return Y.classes = function(l) {
        if (l != null) {
            if (dt(l) === "array") d = l, o = [l[0], l[l.length - 1]];
            else {
                const W = at.analyze(o);
                l === 0 ? d = [W.min, W.max] : d = at.limits(W, "e", l)
            }
            return Y
        }
        return d
    }, Y.domain = function(l) {
        if (!arguments.length) return o;
        v = l[0], E = l[l.length - 1], c = [];
        const W = g.length;
        if (l.length === W && v !== E)
            for (let V of Array.from(l)) c.push((V - v) / (E - v));
        else {
            for (let V = 0; V < W; V++) c.push(V / (W - 1));
            if (l.length > 2) {
                const V = l.map((et, rt) => rt / (l.length - 1)),
                    U = l.map(et => (et - v) / (E - v));
                U.every((et, rt) => V[rt] === et) || (tt = et => {
                    if (et <= 0 || et >= 1) return et;
                    let rt = 0;
                    for (; et >= U[rt + 1];) rt++;
                    const X = (et - U[rt]) / (U[rt + 1] - U[rt]);
                    return V[rt] + X * (V[rt + 1] - V[rt])
                })
            }
        }
        return o = [v, E], Y
    }, Y.mode = function(l) {
        return arguments.length ? (t = l, it(), Y) : t
    }, Y.range = function(l, W) {
        return R(l), Y
    }, Y.out = function(l) {
        return b = l, Y
    }, Y.spread = function(l) {
        return arguments.length ? (r = l, Y) : r
    }, Y.correctLightness = function(l) {
        return l == null && (l = !0), A = l, it(), A ? Q = function(W) {
            const V = K(0, !0).lab()[0],
                U = K(1, !0).lab()[0],
                et = V > U;
            let rt = K(W, !0).lab()[0];
            const X = V + (U - V) * W;
            let Tt = rt - X,
                Mt = 0,
                At = 1,
                yt = 20;
            for (; Math.abs(Tt) > .01 && yt-- > 0;)(function() {
                return et && (Tt *= -1), Tt < 0 ? (Mt = W, W += (At - W) * .5) : (At = W, W += (Mt - W) * .5), rt = K(W, !0).lab()[0], Tt = rt - X
            })();
            return W
        } : Q = W => W, Y
    }, Y.padding = function(l) {
        return l != null ? (dt(l) === "number" && (l = [l, l]), f = l, Y) : f
    }, Y.colors = function(l, W) {
        arguments.length < 2 && (W = "hex");
        let V = [];
        if (arguments.length === 0) V = g.slice(0);
        else if (l === 1) V = [Y(.5)];
        else if (l > 1) {
            const U = o[0],
                et = o[1] - U;
            V = Hm(0, l).map(rt => Y(U + rt / (l - 1) * et))
        } else {
            e = [];
            let U = [];
            if (d && d.length > 2)
                for (let et = 1, rt = d.length, X = 1 <= rt; X ? et < rt : et > rt; X ? et++ : et--) U.push((d[et - 1] + d[et]) * .5);
            else U = o;
            V = U.map(et => Y(et))
        }
        return at[W] && (V = V.map(U => U[W]())), V
    }, Y.cache = function(l) {
        return l != null ? (x = l, Y) : x
    }, Y.gamma = function(l) {
        return l != null ? (L = l, Y) : L
    }, Y.nodata = function(l) {
        return l != null ? (n = at(l), Y) : n
    }, Y
}

function Hm(e, t, n) {
    let r = [],
        o = e < t,
        c = t;
    for (let f = e; o ? f < c : f > c; o ? f++ : f--) r.push(f);
    return r
}
const jm = function(e) {
        let t = [1, 1];
        for (let n = 1; n < e; n++) {
            let r = [1];
            for (let o = 1; o <= t.length; o++) r[o] = (t[o] || 0) + t[o - 1];
            t = r
        }
        return t
    },
    Bm = function(e) {
        let t, n, r, o;
        if (e = e.map(c => new B(c)), e.length === 2)[n, r] = e.map(c => c.lab()), t = function(c) {
            const f = [0, 1, 2].map(d => n[d] + c * (r[d] - n[d]));
            return new B(f, "lab")
        };
        else if (e.length === 3)[n, r, o] = e.map(c => c.lab()), t = function(c) {
            const f = [0, 1, 2].map(d => (1 - c) * (1 - c) * n[d] + 2 * (1 - c) * c * r[d] + c * c * o[d]);
            return new B(f, "lab")
        };
        else if (e.length === 4) {
            let c;
            [n, r, o, c] = e.map(f => f.lab()), t = function(f) {
                const d = [0, 1, 2].map(g => (1 - f) * (1 - f) * (1 - f) * n[g] + 3 * (1 - f) * (1 - f) * f * r[g] + 3 * (1 - f) * f * f * o[g] + f * f * f * c[g]);
                return new B(d, "lab")
            }
        } else if (e.length >= 5) {
            let c, f, d;
            c = e.map(g => g.lab()), d = e.length - 1, f = jm(d), t = function(g) {
                const b = 1 - g,
                    v = [0, 1, 2].map(E => c.reduce((A, D, x) => A + f[x] * b ** (d - x) * g ** x * D[E], 0));
                return new B(v, "lab")
            }
        } else throw new RangeError("No point in running bezier with only one color.");
        return t
    },
    Vm = e => {
        const t = Bm(e);
        return t.scale = () => ar(t), t
    },
    {
        round: fl
    } = Math;
B.prototype.rgb = function(e = !0) {
    return e === !1 ? this._rgb.slice(0, 3) : this._rgb.slice(0, 3).map(fl)
};
B.prototype.rgba = function(e = !0) {
    return this._rgb.slice(0, 4).map((t, n) => n < 3 ? e === !1 ? t : fl(t) : t)
};
const qm = (...e) => new B(...e, "rgb");
Object.assign(at, {
    rgb: qm
});
lt.format.rgb = (...e) => {
    const t = ut(e, "rgba");
    return t[3] === void 0 && (t[3] = 1), t
};
lt.autodetect.push({
    p: 3,
    test: (...e) => {
        if (e = ut(e, "rgba"), dt(e) === "array" && (e.length === 3 || e.length === 4 && dt(e[3]) == "number" && e[3] >= 0 && e[3] <= 1)) return "rgb"
    }
});
const le = (e, t, n) => {
        if (!le[n]) throw new Error("unknown blend mode " + n);
        return le[n](e, t)
    },
    Qe = e => (t, n) => {
        const r = at(n).rgb(),
            o = at(t).rgb();
        return at.rgb(e(r, o))
    },
    Je = e => (t, n) => {
        const r = [];
        return r[0] = e(t[0], n[0]), r[1] = e(t[1], n[1]), r[2] = e(t[2], n[2]), r
    },
    Wm = e => e,
    Fm = (e, t) => e * t / 255,
    zm = (e, t) => e > t ? t : e,
    Ym = (e, t) => e > t ? e : t,
    Km = (e, t) => 255 * (1 - (1 - e / 255) * (1 - t / 255)),
    Um = (e, t) => t < 128 ? 2 * e * t / 255 : 255 * (1 - 2 * (1 - e / 255) * (1 - t / 255)),
    Xm = (e, t) => 255 * (1 - (1 - t / 255) / (e / 255)),
    Gm = (e, t) => e === 255 ? 255 : (e = 255 * (t / 255) / (1 - e / 255), e > 255 ? 255 : e);
le.normal = Qe(Je(Wm));
le.multiply = Qe(Je(Fm));
le.screen = Qe(Je(Km));
le.overlay = Qe(Je(Um));
le.darken = Qe(Je(zm));
le.lighten = Qe(Je(Ym));
le.dodge = Qe(Je(Gm));
le.burn = Qe(Je(Xm));
const {
    pow: Zm,
    sin: Qm,
    cos: Jm
} = Math;

function tv(e = 300, t = -1.5, n = 1, r = 1, o = [0, 1]) {
    let c = 0,
        f;
    dt(o) === "array" ? f = o[1] - o[0] : (f = 0, o = [o, o]);
    const d = function(g) {
        const b = ke * ((e + 120) / 360 + t * g),
            v = Zm(o[0] + f * g, r),
            A = (c !== 0 ? n[0] + g * c : n) * v * (1 - v) / 2,
            D = Jm(b),
            x = Qm(b),
            L = v + A * (-.14861 * D + 1.78277 * x),
            R = v + A * (-.29227 * D - .90649 * x),
            M = v + A * (1.97294 * D);
        return at(eo([L * 255, R * 255, M * 255, 1]))
    };
    return d.start = function(g) {
        return g == null ? e : (e = g, d)
    }, d.rotations = function(g) {
        return g == null ? t : (t = g, d)
    }, d.gamma = function(g) {
        return g == null ? r : (r = g, d)
    }, d.hue = function(g) {
        return g == null ? n : (n = g, dt(n) === "array" ? (c = n[1] - n[0], c === 0 && (n = n[1])) : c = 0, d)
    }, d.lightness = function(g) {
        return g == null ? o : (dt(g) === "array" ? (o = g, f = g[1] - g[0]) : (o = [g, g], f = 0), d)
    }, d.scale = () => at.scale(d), d.hue(n), d
}
const ev = "0123456789abcdef",
    {
        floor: nv,
        random: iv
    } = Math,
    rv = () => {
        let e = "#";
        for (let t = 0; t < 6; t++) e += ev.charAt(nv(iv() * 16));
        return new B(e, "hex")
    },
    {
        log: La,
        pow: sv,
        floor: ov,
        abs: av
    } = Math;

function dl(e, t = null) {
    const n = {
        min: Number.MAX_VALUE,
        max: Number.MAX_VALUE * -1,
        sum: 0,
        values: [],
        count: 0
    };
    return dt(e) === "object" && (e = Object.values(e)), e.forEach(r => {
        t && dt(r) === "object" && (r = r[t]), r != null && !isNaN(r) && (n.values.push(r), n.sum += r, r < n.min && (n.min = r), r > n.max && (n.max = r), n.count += 1)
    }), n.domain = [n.min, n.max], n.limits = (r, o) => hl(n, r, o), n
}

function hl(e, t = "equal", n = 7) {
    dt(e) == "array" && (e = dl(e));
    const {
        min: r,
        max: o
    } = e, c = e.values.sort((d, g) => d - g);
    if (n === 1) return [r, o];
    const f = [];
    if (t.substr(0, 1) === "c" && (f.push(r), f.push(o)), t.substr(0, 1) === "e") {
        f.push(r);
        for (let d = 1; d < n; d++) f.push(r + d / n * (o - r));
        f.push(o)
    } else if (t.substr(0, 1) === "l") {
        if (r <= 0) throw new Error("Logarithmic scales are only possible for values > 0");
        const d = Math.LOG10E * La(r),
            g = Math.LOG10E * La(o);
        f.push(r);
        for (let b = 1; b < n; b++) f.push(sv(10, d + b / n * (g - d)));
        f.push(o)
    } else if (t.substr(0, 1) === "q") {
        f.push(r);
        for (let d = 1; d < n; d++) {
            const g = (c.length - 1) * d / n,
                b = ov(g);
            if (b === g) f.push(c[b]);
            else {
                const v = g - b;
                f.push(c[b] * (1 - v) + c[b + 1] * v)
            }
        }
        f.push(o)
    } else if (t.substr(0, 1) === "k") {
        let d;
        const g = c.length,
            b = new Array(g),
            v = new Array(n);
        let E = !0,
            A = 0,
            D = null;
        D = [], D.push(r);
        for (let R = 1; R < n; R++) D.push(r + R / n * (o - r));
        for (D.push(o); E;) {
            for (let M = 0; M < n; M++) v[M] = 0;
            for (let M = 0; M < g; M++) {
                const Q = c[M];
                let tt = Number.MAX_VALUE,
                    K;
                for (let it = 0; it < n; it++) {
                    const Y = av(D[it] - Q);
                    Y < tt && (tt = Y, K = it), v[K]++, b[M] = K
                }
            }
            const R = new Array(n);
            for (let M = 0; M < n; M++) R[M] = null;
            for (let M = 0; M < g; M++) d = b[M], R[d] === null ? R[d] = c[M] : R[d] += c[M];
            for (let M = 0; M < n; M++) R[M] *= 1 / v[M];
            E = !1;
            for (let M = 0; M < n; M++)
                if (R[M] !== D[M]) {
                    E = !0;
                    break
                } D = R, A++, A > 200 && (E = !1)
        }
        const x = {};
        for (let R = 0; R < n; R++) x[R] = [];
        for (let R = 0; R < g; R++) d = b[R], x[d].push(c[R]);
        let L = [];
        for (let R = 0; R < n; R++) L.push(x[R][0]), L.push(x[R][x[R].length - 1]);
        L = L.sort((R, M) => R - M), f.push(L[0]);
        for (let R = 1; R < L.length; R += 2) {
            const M = L[R];
            !isNaN(M) && f.indexOf(M) === -1 && f.push(M)
        }
    }
    return f
}
const cv = (e, t) => {
    e = new B(e), t = new B(t);
    const n = e.luminance(),
        r = t.luminance();
    return n > r ? (n + .05) / (r + .05) : (r + .05) / (n + .05)
};
/**
 * @license
 *
 * The APCA contrast prediction algorithm is based of the formulas published
 * in the APCA-1.0.98G specification by Myndex. The specification is available at:
 * https://raw.githubusercontent.com/Myndex/apca-w3/master/images/APCAw3_0.1.17_APCA0.0.98G.svg
 *
 * Note that the APCA implementation is still beta, so please update to
 * future versions of chroma.js when they become available.
 *
 * You can read more about the APCA Readability Criterion at
 * https://readtech.org/ARC/
 */
const Na = .027,
    lv = 5e-4,
    uv = .1,
    Da = 1.14,
    Yi = .022,
    Ma = 1.414,
    fv = (e, t) => {
        e = new B(e), t = new B(t), e.alpha() < 1 && (e = Kn(t, e, e.alpha(), "rgb"));
        const n = Ia(...e.rgb()),
            r = Ia(...t.rgb()),
            o = n >= Yi ? n : n + Math.pow(Yi - n, Ma),
            c = r >= Yi ? r : r + Math.pow(Yi - r, Ma),
            f = Math.pow(c, .56) - Math.pow(o, .57),
            d = Math.pow(c, .65) - Math.pow(o, .62),
            g = Math.abs(c - o) < lv ? 0 : o < c ? f * Da : d * Da;
        return (Math.abs(g) < uv ? 0 : g > 0 ? g - Na : g + Na) * 100
    };

function Ia(e, t, n) {
    return .2126729 * Math.pow(e / 255, 2.4) + .7151522 * Math.pow(t / 255, 2.4) + .072175 * Math.pow(n / 255, 2.4)
}
const {
    sqrt: Oe,
    pow: Ct,
    min: dv,
    max: hv,
    atan2: Pa,
    abs: Ra,
    cos: Ki,
    sin: Ha,
    exp: pv,
    PI: ja
} = Math;

function gv(e, t, n = 1, r = 1, o = 1) {
    var c = function(Kt) {
            return 360 * Kt / (2 * ja)
        },
        f = function(Kt) {
            return 2 * ja * Kt / 360
        };
    e = new B(e), t = new B(t);
    const [d, g, b] = Array.from(e.lab()), [v, E, A] = Array.from(t.lab()), D = (d + v) / 2, x = Oe(Ct(g, 2) + Ct(b, 2)), L = Oe(Ct(E, 2) + Ct(A, 2)), R = (x + L) / 2, M = .5 * (1 - Oe(Ct(R, 7) / (Ct(R, 7) + Ct(25, 7)))), Q = g * (1 + M), tt = E * (1 + M), K = Oe(Ct(Q, 2) + Ct(b, 2)), it = Oe(Ct(tt, 2) + Ct(A, 2)), Y = (K + it) / 2, l = c(Pa(b, Q)), W = c(Pa(A, tt)), V = l >= 0 ? l : l + 360, U = W >= 0 ? W : W + 360, et = Ra(V - U) > 180 ? (V + U + 360) / 2 : (V + U) / 2, rt = 1 - .17 * Ki(f(et - 30)) + .24 * Ki(f(2 * et)) + .32 * Ki(f(3 * et + 6)) - .2 * Ki(f(4 * et - 63));
    let X = U - V;
    X = Ra(X) <= 180 ? X : U <= V ? X + 360 : X - 360, X = 2 * Oe(K * it) * Ha(f(X) / 2);
    const Tt = v - d,
        Mt = it - K,
        At = 1 + .015 * Ct(D - 50, 2) / Oe(20 + Ct(D - 50, 2)),
        yt = 1 + .045 * Y,
        re = 1 + .015 * Y * rt,
        Lt = 30 * pv(-Ct((et - 275) / 25, 2)),
        je = -(2 * Oe(Ct(Y, 7) / (Ct(Y, 7) + Ct(25, 7)))) * Ha(2 * f(Lt)),
        fe = Oe(Ct(Tt / (n * At), 2) + Ct(Mt / (r * yt), 2) + Ct(X / (o * re), 2) + je * (Mt / (r * yt)) * (X / (o * re)));
    return hv(0, dv(100, fe))
}

function mv(e, t, n = "lab") {
    e = new B(e), t = new B(t);
    const r = e.get(n),
        o = t.get(n);
    let c = 0;
    for (let f in r) {
        const d = (r[f] || 0) - (o[f] || 0);
        c += d * d
    }
    return Math.sqrt(c)
}
const vv = (...e) => {
        try {
            return new B(...e), !0
        } catch {
            return !1
        }
    },
    bv = {
        cool() {
            return ar([at.hsl(180, 1, .9), at.hsl(250, .7, .4)])
        },
        hot() {
            return ar(["#000", "#f00", "#ff0", "#fff"]).mode("rgb")
        }
    },
    Os = {
        OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
        PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
        BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
        Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
        BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
        YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
        YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
        Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
        RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
        Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
        YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
        Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
        GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
        Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
        YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
        PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
        Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
        PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
        Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
        Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
        RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
        RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
        PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
        PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
        RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
        BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
        RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
        PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
        Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
        Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
        Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
        Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
        Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
        Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
        Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
        Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
    },
    pl = Object.keys(Os),
    Ba = new Map(pl.map(e => [e.toLowerCase(), e])),
    yv = typeof Proxy == "function" ? new Proxy(Os, {
        get(e, t) {
            const n = t.toLowerCase();
            if (Ba.has(n)) return e[Ba.get(n)]
        },
        getOwnPropertyNames() {
            return Object.getOwnPropertyNames(pl)
        }
    }) : Os,
    _v = (...e) => {
        e = ut(e, "cmyk");
        const [t, n, r, o] = e, c = e.length > 4 ? e[4] : 1;
        return o === 1 ? [0, 0, 0, c] : [t >= 1 ? 0 : 255 * (1 - t) * (1 - o), n >= 1 ? 0 : 255 * (1 - n) * (1 - o), r >= 1 ? 0 : 255 * (1 - r) * (1 - o), c]
    },
    {
        max: Va
    } = Math,
    wv = (...e) => {
        let [t, n, r] = ut(e, "rgb");
        t = t / 255, n = n / 255, r = r / 255;
        const o = 1 - Va(t, Va(n, r)),
            c = o < 1 ? 1 / (1 - o) : 0,
            f = (1 - t - o) * c,
            d = (1 - n - o) * c,
            g = (1 - r - o) * c;
        return [f, d, g, o]
    };
B.prototype.cmyk = function() {
    return wv(this._rgb)
};
const Ev = (...e) => new B(...e, "cmyk");
Object.assign(at, {
    cmyk: Ev
});
lt.format.cmyk = _v;
lt.autodetect.push({
    p: 2,
    test: (...e) => {
        if (e = ut(e, "cmyk"), dt(e) === "array" && e.length === 4) return "cmyk"
    }
});
const Tv = (...e) => {
        const t = ut(e, "hsla");
        let n = ti(e) || "lsa";
        return t[0] = Jt(t[0] || 0) + "deg", t[1] = Jt(t[1] * 100) + "%", t[2] = Jt(t[2] * 100) + "%", n === "hsla" || t.length > 3 && t[3] < 1 ? (t[3] = "/ " + (t.length > 3 ? t[3] : 1), n = "hsla") : t.length = 3, `${n.substr(0,3)}(${t.join(" ")})`
    },
    Av = (...e) => {
        const t = ut(e, "lab");
        let n = ti(e) || "lab";
        return t[0] = Jt(t[0]) + "%", t[1] = Jt(t[1]), t[2] = Jt(t[2]), n === "laba" || t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `lab(${t.join(" ")})`
    },
    Cv = (...e) => {
        const t = ut(e, "lch");
        let n = ti(e) || "lab";
        return t[0] = Jt(t[0]) + "%", t[1] = Jt(t[1]), t[2] = isNaN(t[2]) ? "none" : Jt(t[2]) + "deg", n === "lcha" || t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `lch(${t.join(" ")})`
    },
    $v = (...e) => {
        const t = ut(e, "lab");
        return t[0] = Jt(t[0] * 100) + "%", t[1] = xs(t[1]), t[2] = xs(t[2]), t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `oklab(${t.join(" ")})`
    },
    gl = (...e) => {
        const [t, n, r, ...o] = ut(e, "rgb"), [c, f, d] = ao(t, n, r), [g, b, v] = cl(c, f, d);
        return [g, b, v, ...o.length > 0 && o[0] < 1 ? [o[0]] : []]
    },
    xv = (...e) => {
        const t = ut(e, "lch");
        return t[0] = Jt(t[0] * 100) + "%", t[1] = xs(t[1]), t[2] = isNaN(t[2]) ? "none" : Jt(t[2]) + "deg", t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `oklch(${t.join(" ")})`
    },
    {
        round: ms
    } = Math,
    Sv = (...e) => {
        const t = ut(e, "rgba");
        let n = ti(e) || "rgb";
        if (n.substr(0, 3) === "hsl") return Tv(ul(t), n);
        if (n.substr(0, 3) === "lab") {
            const r = yi();
            Le("d50");
            const o = Av(io(t), n);
            return Le(r), o
        }
        if (n.substr(0, 3) === "lch") {
            const r = yi();
            Le("d50");
            const o = Cv(so(t), n);
            return Le(r), o
        }
        return n.substr(0, 5) === "oklab" ? $v(ao(t)) : n.substr(0, 5) === "oklch" ? xv(gl(t)) : (t[0] = ms(t[0]), t[1] = ms(t[1]), t[2] = ms(t[2]), (n === "rgba" || t.length > 3 && t[3] < 1) && (t[3] = "/ " + (t.length > 3 ? t[3] : 1), n = "rgba"), `${n.substr(0,3)}(${t.slice(0,n==="rgb"?3:4).join(" ")})`)
    },
    ml = (...e) => {
        e = ut(e, "lch");
        const [t, n, r, ...o] = e, [c, f, d] = al(t, n, r), [g, b, v] = oo(c, f, d);
        return [g, b, v, ...o.length > 0 && o[0] < 1 ? [o[0]] : []]
    },
    Me = /((?:-?\d+)|(?:-?\d+(?:\.\d+)?)%|none)/.source,
    ce = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%?)|none)/.source,
    cr = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%)|none)/.source,
    ne = /\s*/.source,
    ni = /\s+/.source,
    co = /\s*,\s*/.source,
    yr = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)(?:deg)?)|none)/.source,
    ii = /\s*(?:\/\s*((?:[01]|[01]?\.\d+)|\d+(?:\.\d+)?%))?/.source,
    vl = new RegExp("^rgba?\\(" + ne + [Me, Me, Me].join(ni) + ii + "\\)$"),
    bl = new RegExp("^rgb\\(" + ne + [Me, Me, Me].join(co) + ne + "\\)$"),
    yl = new RegExp("^rgba\\(" + ne + [Me, Me, Me, ce].join(co) + ne + "\\)$"),
    _l = new RegExp("^hsla?\\(" + ne + [yr, cr, cr].join(ni) + ii + "\\)$"),
    wl = new RegExp("^hsl?\\(" + ne + [yr, cr, cr].join(co) + ne + "\\)$"),
    El = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,
    Tl = new RegExp("^lab\\(" + ne + [ce, ce, ce].join(ni) + ii + "\\)$"),
    Al = new RegExp("^lch\\(" + ne + [ce, ce, yr].join(ni) + ii + "\\)$"),
    Cl = new RegExp("^oklab\\(" + ne + [ce, ce, ce].join(ni) + ii + "\\)$"),
    $l = new RegExp("^oklch\\(" + ne + [ce, ce, yr].join(ni) + ii + "\\)$"),
    {
        round: xl
    } = Math,
    Mn = e => e.map((t, n) => n <= 2 ? hn(xl(t), 0, 255) : t),
    $t = (e, t = 0, n = 100, r = !1) => (typeof e == "string" && e.endsWith("%") && (e = parseFloat(e.substring(0, e.length - 1)) / 100, r ? e = t + (e + 1) * .5 * (n - t) : e = t + e * (n - t)), +e),
    Pt = (e, t) => e === "none" ? t : e,
    lo = e => {
        if (e = e.toLowerCase().trim(), e === "transparent") return [0, 0, 0, 0];
        let t;
        if (lt.format.named) try {
            return lt.format.named(e)
        } catch {}
        if ((t = e.match(vl)) || (t = e.match(bl))) {
            let n = t.slice(1, 4);
            for (let o = 0; o < 3; o++) n[o] = +$t(Pt(n[o], 0), 0, 255);
            n = Mn(n);
            const r = t[4] !== void 0 ? +$t(t[4], 0, 1) : 1;
            return n[3] = r, n
        }
        if (t = e.match(yl)) {
            const n = t.slice(1, 5);
            for (let r = 0; r < 4; r++) n[r] = +$t(n[r], 0, 255);
            return n
        }
        if ((t = e.match(_l)) || (t = e.match(wl))) {
            const n = t.slice(1, 4);
            n[0] = +Pt(n[0].replace("deg", ""), 0), n[1] = +$t(Pt(n[1], 0), 0, 100) * .01, n[2] = +$t(Pt(n[2], 0), 0, 100) * .01;
            const r = Mn(Ss(n)),
                o = t[4] !== void 0 ? +$t(t[4], 0, 1) : 1;
            return r[3] = o, r
        }
        if (t = e.match(El)) {
            const n = t.slice(1, 4);
            n[1] *= .01, n[2] *= .01;
            const r = Ss(n);
            for (let o = 0; o < 3; o++) r[o] = xl(r[o]);
            return r[3] = +t[4], r
        }
        if (t = e.match(Tl)) {
            const n = t.slice(1, 4);
            n[0] = $t(Pt(n[0], 0), 0, 100), n[1] = $t(Pt(n[1], 0), -125, 125, !0), n[2] = $t(Pt(n[2], 0), -125, 125, !0);
            const r = yi();
            Le("d50");
            const o = Mn(no(n));
            Le(r);
            const c = t[4] !== void 0 ? +$t(t[4], 0, 1) : 1;
            return o[3] = c, o
        }
        if (t = e.match(Al)) {
            const n = t.slice(1, 4);
            n[0] = $t(n[0], 0, 100), n[1] = $t(Pt(n[1], 0), 0, 150, !1), n[2] = +Pt(n[2].replace("deg", ""), 0);
            const r = yi();
            Le("d50");
            const o = Mn(ro(n));
            Le(r);
            const c = t[4] !== void 0 ? +$t(t[4], 0, 1) : 1;
            return o[3] = c, o
        }
        if (t = e.match(Cl)) {
            const n = t.slice(1, 4);
            n[0] = $t(Pt(n[0], 0), 0, 1), n[1] = $t(Pt(n[1], 0), -.4, .4, !0), n[2] = $t(Pt(n[2], 0), -.4, .4, !0);
            const r = Mn(oo(n)),
                o = t[4] !== void 0 ? +$t(t[4], 0, 1) : 1;
            return r[3] = o, r
        }
        if (t = e.match($l)) {
            const n = t.slice(1, 4);
            n[0] = $t(Pt(n[0], 0), 0, 1), n[1] = $t(Pt(n[1], 0), 0, .4, !1), n[2] = +Pt(n[2].replace("deg", ""), 0);
            const r = Mn(ml(n)),
                o = t[4] !== void 0 ? +$t(t[4], 0, 1) : 1;
            return r[3] = o, r
        }
    };
lo.test = e => vl.test(e) || _l.test(e) || Tl.test(e) || Al.test(e) || Cl.test(e) || $l.test(e) || bl.test(e) || yl.test(e) || wl.test(e) || El.test(e) || e === "transparent";
B.prototype.css = function(e) {
    return Sv(this._rgb, e)
};
const Ov = (...e) => new B(...e, "css");
at.css = Ov;
lt.format.css = lo;
lt.autodetect.push({
    p: 5,
    test: (e, ...t) => {
        if (!t.length && dt(e) === "string" && lo.test(e)) return "css"
    }
});
lt.format.gl = (...e) => {
    const t = ut(e, "rgba");
    return t[0] *= 255, t[1] *= 255, t[2] *= 255, t
};
const kv = (...e) => new B(...e, "gl");
at.gl = kv;
B.prototype.gl = function() {
    const e = this._rgb;
    return [e[0] / 255, e[1] / 255, e[2] / 255, e[3]]
};
B.prototype.hex = function(e) {
    return rl(this._rgb, e)
};
const Lv = (...e) => new B(...e, "hex");
at.hex = Lv;
lt.format.hex = il;
lt.autodetect.push({
    p: 4,
    test: (e, ...t) => {
        if (!t.length && dt(e) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(e.length) >= 0) return "hex"
    }
});
const {
    log: Ui
} = Math, Sl = e => {
    const t = e / 100;
    let n, r, o;
    return t < 66 ? (n = 255, r = t < 6 ? 0 : -155.25485562709179 - .44596950469579133 * (r = t - 2) + 104.49216199393888 * Ui(r), o = t < 20 ? 0 : -254.76935184120902 + .8274096064007395 * (o = t - 10) + 115.67994401066147 * Ui(o)) : (n = 351.97690566805693 + .114206453784165 * (n = t - 55) - 40.25366309332127 * Ui(n), r = 325.4494125711974 + .07943456536662342 * (r = t - 50) - 28.0852963507957 * Ui(r), o = 255), [n, r, o, 1]
}, {
    round: Nv
} = Math, Dv = (...e) => {
    const t = ut(e, "rgb"),
        n = t[0],
        r = t[2];
    let o = 1e3,
        c = 4e4;
    const f = .4;
    let d;
    for (; c - o > f;) {
        d = (c + o) * .5;
        const g = Sl(d);
        g[2] / g[0] >= r / n ? c = d : o = d
    }
    return Nv(d)
};
B.prototype.temp = B.prototype.kelvin = B.prototype.temperature = function() {
    return Dv(this._rgb)
};
const vs = (...e) => new B(...e, "temp");
Object.assign(at, {
    temp: vs,
    kelvin: vs,
    temperature: vs
});
lt.format.temp = lt.format.kelvin = lt.format.temperature = Sl;
B.prototype.oklch = function() {
    return gl(this._rgb)
};
const Mv = (...e) => new B(...e, "oklch");
Object.assign(at, {
    oklch: Mv
});
lt.format.oklch = ml;
lt.autodetect.push({
    p: 2,
    test: (...e) => {
        if (e = ut(e, "oklch"), dt(e) === "array" && e.length === 3) return "oklch"
    }
});
Object.assign(at, {
    analyze: dl,
    average: Im,
    bezier: Vm,
    blend: le,
    brewer: yv,
    Color: B,
    colors: Yn,
    contrast: cv,
    contrastAPCA: fv,
    cubehelix: tv,
    deltaE: gv,
    distance: mv,
    input: lt,
    interpolate: Kn,
    limits: hl,
    mix: Kn,
    random: rv,
    scale: ar,
    scales: bv,
    valid: vv
});
const Iv = "https://maps.googleapis.com/maps/api/js",
    Xi = "__googleMapsApiOnLoadCallback",
    Pv = ["channel", "client", "key", "language", "region", "v"];
let bs = null;
var Rv = function(e = {}) {
    return bs = bs || new Promise(function(t, n) {
        const r = setTimeout(function() {
            window[Xi] = function() {}, n(new Error("Could not load the Google Maps API"))
        }, e.timeout || 1e4);
        window[Xi] = function() {
            r !== null && clearTimeout(r), t(window.google.maps), delete window[Xi]
        };
        const o = document.createElement("script"),
            c = [`callback=${Xi}`];
        Pv.forEach(function(f) {
            e[f] && c.push(`${f}=${e[f]}`)
        }), e.libraries && e.libraries.length && c.push(`libraries=${e.libraries.join(",")}`), o.src = `${e.apiUrl||Iv}?${c.join("&")}`, document.body.appendChild(o)
    }), bs
};
const Hv = Zc(Rv),
    jv = (e, t) => {
        let n, r, o, c, f, d, g, b, v, E;
        if (e && t) {
            const A = at(t).get("lab.l") < 70;
            n = A ? at(e).brighten().hex() : at(e).darken().hex(), r = A ? at(t).brighten().hex() : at(t).darken(.3).hex(), o = e, c = e, f = A ? at(t).brighten(.4).hex() : at(t).darken(.4).hex(), d = A ? at(t).brighten(.2).hex() : at(t).darken(.2).hex(), g = A ? at(t).brighten(.3).hex() : at(t).darken(.3).hex(), b = t, v = t, E = e
        } else n = "#9e9e9e", r = "#f5f5f5", o = "#757575", c = "#bdbdbd", f = "#c9c9c9", d = "#e5e5e5", g = "#eeeeee", b = "#dadada", v = "#ffffff", E = "#616161";
        return [{
            elementType: "geometry",
            stylers: [{
                color: r
            }]
        }, {
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            elementType: "labels.text.fill",
            stylers: [{
                color: E
            }]
        }, {
            elementType: "labels.text.stroke",
            stylers: [{
                color: r
            }]
        }, {
            featureType: "administrative.land_parcel",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [{
                color: c
            }]
        }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{
                color: g
            }]
        }, {
            featureType: "poi",
            elementType: "labels.text",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{
                color: o
            }]
        }, {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{
                color: d
            }]
        }, {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{
                color: n
            }]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                color: v
            }]
        }, {
            featureType: "road.arterial",
            elementType: "labels.text.fill",
            stylers: [{
                color: o
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{
                color: b
            }]
        }, {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#616161"
            }]
        }, {
            featureType: "road.local",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [{
                color: n
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{
                color: d
            }]
        }, {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [{
                color: g
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                color: f
            }]
        }, {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{
                color: n
            }]
        }]
    },
    Bv = {
        init() {
            Hv({
                key: "AIzaSyBJH9sqvIPn_LLfBzONy4wgSFjGgMsQYJ8"
            }).then(function(e) {
                $(".block-map .map").each(function() {
                    const t = {
                            lat: $(this).data("lat"),
                            lng: $(this).data("lng")
                        },
                        n = 14,
                        r = [],
                        o = new e.Map($(this)[0], {
                            zoom: n,
                            center: t,
                            mapTypeControl: !1,
                            streetViewControl: !1,
                            fullscreenControl: !1
                        }),
                        c = new google.maps.LatLngBounds,
                        f = getComputedStyle(document.body).getPropertyValue("--foreground").replace(/\s/g, ""),
                        d = getComputedStyle(document.body).getPropertyValue("--background").replace(/\s/g, ""),
                        g = new google.maps.StyledMapType(jv(f, d));
                    if (o.mapTypes.set("styled_map", g), o.setMapTypeId("styled_map"), o.markers = [], $(this).parent().find(".marker").each(function(b) {
                            const v = {
                                    path: "M0 16C0 7.16344 7.16344 0 16 0H22C30.8366 0 38 7.16344 38 16C38 24.8366 30.8366 32 22 32H16C7.16344 32 0 24.8366 0 16Z",
                                    fillColor: f || "black",
                                    fillOpacity: 1,
                                    strokeWeight: 0,
                                    rotation: 0,
                                    scale: 1,
                                    anchor: new google.maps.Point(0, 0),
                                    labelOrigin: new google.maps.Point(19, 16)
                                },
                                E = new google.maps.Marker({
                                    position: {
                                        lat: parseFloat($(this).data("lat")),
                                        lng: parseFloat($(this).data("lng"))
                                    },
                                    title: $(this).data("title"),
                                    map: o,
                                    icon: v,
                                    label: {
                                        text: `${b+1}`,
                                        color: d || "white",
                                        fontSize: "14px",
                                        fontFamily: "GTFAdieu",
                                        fontWeight: "300"
                                    }
                                });
                            if (o.markers.push(E), r.push({
                                    location: {
                                        lat: parseFloat($(this).data("lat")),
                                        lng: parseFloat($(this).data("lng"))
                                    }
                                }), c.extend(E.position), $(this).data("title") || $(this).data("description")) {
                                const A = new google.maps.InfoWindow({
                                    content: `<strong>${$(this).data("title")}</strong><br />${$(this).data("description")}`
                                });
                                google.maps.event.addListener(E, "click", function() {
                                    A.open(o, E)
                                })
                            }
                        }), o.markers.length > 1 && o.fitBounds(c), $(this).data("route") === 1) {
                        const b = new e.DirectionsRenderer({
                            map: o,
                            suppressMarkers: !0,
                            polylineOptions: {
                                strokeColor: "#000",
                                strokeOpacity: 0,
                                icons: [{
                                    icon: {
                                        path: "M 0,-0.5 0,0.5",
                                        strokeOpacity: 1,
                                        strokeWeight: 3,
                                        scale: 6
                                    },
                                    offset: "0",
                                    repeat: "20px"
                                }]
                            }
                        });
                        new e.DirectionsService().route({
                            origin: r[0],
                            destination: r[r.length - 1],
                            waypoints: r,
                            optimizeWaypoints: !0,
                            travelMode: google.maps.TravelMode.DRIVING
                        }, (E, A) => {
                            A === "OK" && E && b.setDirections(E)
                        })
                    }
                })
            })
        }
    };
/*!
 * Glide.js v3.7.1
 * (c) 2013-2024 Jędrzej Chałubek (https://github.com/jedrzejchalubek/)
 * Released under the MIT License.
 */
function qa(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function(o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function Wa(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? qa(Object(n), !0).forEach(function(r) {
            qv(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : qa(Object(n)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function er(e) {
    "@babel/helpers - typeof";
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? er = function(t) {
        return typeof t
    } : er = function(t) {
        return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, er(e)
}

function _r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Vv(e, t) {
    for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
    }
}

function wr(e, t, n) {
    return t && Vv(e.prototype, t), e
}

function qv(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function Wv(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            writable: !0,
            configurable: !0
        }
    }), t && ks(e, t)
}

function Un(e) {
    return Un = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) {
        return n.__proto__ || Object.getPrototypeOf(n)
    }, Un(e)
}

function ks(e, t) {
    return ks = Object.setPrototypeOf || function(r, o) {
        return r.__proto__ = o, r
    }, ks(e, t)
}

function Fv() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
    } catch {
        return !1
    }
}

function zv(e) {
    if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
}

function Yv(e, t) {
    if (t && (typeof t == "object" || typeof t == "function")) return t;
    if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
    return zv(e)
}

function Kv(e) {
    var t = Fv();
    return function() {
        var r = Un(e),
            o;
        if (t) {
            var c = Un(this).constructor;
            o = Reflect.construct(r, arguments, c)
        } else o = r.apply(this, arguments);
        return Yv(this, o)
    }
}

function Uv(e, t) {
    for (; !Object.prototype.hasOwnProperty.call(e, t) && (e = Un(e), e !== null););
    return e
}

function nr() {
    return typeof Reflect < "u" && Reflect.get ? nr = Reflect.get : nr = function(t, n, r) {
        var o = Uv(t, n);
        if (o) {
            var c = Object.getOwnPropertyDescriptor(o, n);
            return c.get ? c.get.call(arguments.length < 3 ? t : r) : c.value
        }
    }, nr.apply(this, arguments)
}
var Xv = {
    type: "slider",
    startAt: 0,
    perView: 1,
    focusAt: 0,
    gap: 10,
    autoplay: !1,
    hoverpause: !0,
    keyboard: !0,
    bound: !1,
    swipeThreshold: 80,
    dragThreshold: 120,
    perSwipe: "",
    touchRatio: .5,
    touchAngle: 45,
    animationDuration: 400,
    rewind: !0,
    rewindDuration: 800,
    animationTimingFunc: "cubic-bezier(.165, .840, .440, 1)",
    waitForTransition: !0,
    throttle: 10,
    direction: "ltr",
    peek: 0,
    cloningRatio: 1,
    breakpoints: {},
    classes: {
        swipeable: "glide--swipeable",
        dragging: "glide--dragging",
        direction: {
            ltr: "glide--ltr",
            rtl: "glide--rtl"
        },
        type: {
            slider: "glide--slider",
            carousel: "glide--carousel"
        },
        slide: {
            clone: "glide__slide--clone",
            active: "glide__slide--active"
        },
        arrow: {
            disabled: "glide__arrow--disabled"
        },
        nav: {
            active: "glide__bullet--active"
        }
    }
};

function Ie(e) {
    console.error("[Glide warn]: ".concat(e))
}

function kt(e) {
    return parseInt(e)
}

function Gv(e) {
    return parseFloat(e)
}

function Ls(e) {
    return typeof e == "string"
}

function Xn(e) {
    var t = er(e);
    return t === "function" || t === "object" && !!e
}

function lr(e) {
    return typeof e == "function"
}

function Ol(e) {
    return typeof e > "u"
}

function Ns(e) {
    return e.constructor === Array
}

function Zv(e, t, n) {
    var r = {};
    for (var o in t) lr(t[o]) ? r[o] = t[o](e, r, n) : Ie("Extension must be a function");
    for (var c in r) lr(r[c].mount) && r[c].mount();
    return r
}

function wt(e, t, n) {
    Object.defineProperty(e, t, n)
}

function Qv(e) {
    return Object.keys(e).sort().reduce(function(t, n) {
        return t[n] = e[n], t[n], t
    }, {})
}

function Ds(e, t) {
    var n = Object.assign({}, e, t);
    if (t.hasOwnProperty("classes")) {
        n.classes = Object.assign({}, e.classes, t.classes);
        var r = ["direction", "type", "slide", "arrow", "nav"];
        r.forEach(function(o) {
            t.classes.hasOwnProperty(o) && (n.classes[o] = Wa(Wa({}, e.classes[o]), t.classes[o]))
        })
    }
    return t.hasOwnProperty("breakpoints") && (n.breakpoints = Object.assign({}, e.breakpoints, t.breakpoints)), n
}
var Jv = function() {
        function e() {
            var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            _r(this, e), this.events = t, this.hop = t.hasOwnProperty
        }
        return wr(e, [{
            key: "on",
            value: function(n, r) {
                if (Ns(n)) {
                    for (var o = 0; o < n.length; o++) this.on(n[o], r);
                    return
                }
                this.hop.call(this.events, n) || (this.events[n] = []);
                var c = this.events[n].push(r) - 1;
                return {
                    remove: function() {
                        delete this.events[n][c]
                    }
                }
            }
        }, {
            key: "emit",
            value: function(n, r) {
                if (Ns(n)) {
                    for (var o = 0; o < n.length; o++) this.emit(n[o], r);
                    return
                }
                this.hop.call(this.events, n) && this.events[n].forEach(function(c) {
                    c(r || {})
                })
            }
        }]), e
    }(),
    tb = function() {
        function e(t) {
            var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            _r(this, e), this._c = {}, this._t = [], this._e = new Jv, this.disabled = !1, this.selector = t, this.settings = Ds(Xv, n), this.index = this.settings.startAt
        }
        return wr(e, [{
            key: "mount",
            value: function() {
                var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return this._e.emit("mount.before"), Xn(n) ? this._c = Zv(this, n, this._e) : Ie("You need to provide a object on `mount()`"), this._e.emit("mount.after"), this
            }
        }, {
            key: "mutate",
            value: function() {
                var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
                return Ns(n) ? this._t = n : Ie("You need to provide a array on `mutate()`"), this
            }
        }, {
            key: "update",
            value: function() {
                var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return this.settings = Ds(this.settings, n), n.hasOwnProperty("startAt") && (this.index = n.startAt), this._e.emit("update"), this
            }
        }, {
            key: "go",
            value: function(n) {
                return this._c.Run.make(n), this
            }
        }, {
            key: "move",
            value: function(n) {
                return this._c.Transition.disable(), this._c.Move.make(n), this
            }
        }, {
            key: "destroy",
            value: function() {
                return this._e.emit("destroy"), this
            }
        }, {
            key: "play",
            value: function() {
                var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                return n && (this.settings.autoplay = n), this._e.emit("play"), this
            }
        }, {
            key: "pause",
            value: function() {
                return this._e.emit("pause"), this
            }
        }, {
            key: "disable",
            value: function() {
                return this.disabled = !0, this
            }
        }, {
            key: "enable",
            value: function() {
                return this.disabled = !1, this
            }
        }, {
            key: "on",
            value: function(n, r) {
                return this._e.on(n, r), this
            }
        }, {
            key: "isType",
            value: function(n) {
                return this.settings.type === n
            }
        }, {
            key: "settings",
            get: function() {
                return this._o
            },
            set: function(n) {
                Xn(n) ? this._o = n : Ie("Options must be an `object` instance.")
            }
        }, {
            key: "index",
            get: function() {
                return this._i
            },
            set: function(n) {
                this._i = kt(n)
            }
        }, {
            key: "type",
            get: function() {
                return this.settings.type
            }
        }, {
            key: "disabled",
            get: function() {
                return this._d
            },
            set: function(n) {
                this._d = !!n
            }
        }]), e
    }();

function eb(e, t, n) {
    var r = {
        mount: function() {
            this._o = !1
        },
        make: function(b) {
            var v = this;
            e.disabled || (!e.settings.waitForTransition || e.disable(), this.move = b, n.emit("run.before", this.move), this.calculate(), n.emit("run", this.move), t.Transition.after(function() {
                v.isStart() && n.emit("run.start", v.move), v.isEnd() && n.emit("run.end", v.move), v.isOffset() && (v._o = !1, n.emit("run.offset", v.move)), n.emit("run.after", v.move), e.enable()
            }))
        },
        calculate: function() {
            var b = this.move,
                v = this.length,
                E = b.steps,
                A = b.direction,
                D = 1;
            if (A === "=") {
                if (e.settings.bound && kt(E) > v) {
                    e.index = v;
                    return
                }
                e.index = E;
                return
            }
            if (A === ">" && E === ">") {
                e.index = v;
                return
            }
            if (A === "<" && E === "<") {
                e.index = 0;
                return
            }
            if (A === "|" && (D = e.settings.perView || 1), A === ">" || A === "|" && E === ">") {
                var x = o(D);
                x > v && (this._o = !0), e.index = c(x, D);
                return
            }
            if (A === "<" || A === "|" && E === "<") {
                var L = f(D);
                L < 0 && (this._o = !0), e.index = d(L, D);
                return
            }
            Ie("Invalid direction pattern [".concat(A).concat(E, "] has been used"))
        },
        isStart: function() {
            return e.index <= 0
        },
        isEnd: function() {
            return e.index >= this.length
        },
        isOffset: function() {
            var b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
            return b ? this._o ? b === "|>" ? this.move.direction === "|" && this.move.steps === ">" : b === "|<" ? this.move.direction === "|" && this.move.steps === "<" : this.move.direction === b : !1 : this._o
        },
        isBound: function() {
            return e.isType("slider") && e.settings.focusAt !== "center" && e.settings.bound
        }
    };

    function o(g) {
        var b = e.index;
        return e.isType("carousel") ? b + g : b + (g - b % g)
    }

    function c(g, b) {
        var v = r.length;
        return g <= v ? g : e.isType("carousel") ? g - (v + 1) : e.settings.rewind ? r.isBound() && !r.isEnd() ? v : 0 : r.isBound() ? v : Math.floor(v / b) * b
    }

    function f(g) {
        var b = e.index;
        if (e.isType("carousel")) return b - g;
        var v = Math.ceil(b / g);
        return (v - 1) * g
    }

    function d(g, b) {
        var v = r.length;
        return g >= 0 ? g : e.isType("carousel") ? g + (v + 1) : e.settings.rewind ? r.isBound() && r.isStart() ? v : Math.floor(v / b) * b : 0
    }
    return wt(r, "move", {
        get: function() {
            return this._m
        },
        set: function(b) {
            var v = b.substr(1);
            this._m = {
                direction: b.substr(0, 1),
                steps: v ? kt(v) ? kt(v) : v : 0
            }
        }
    }), wt(r, "length", {
        get: function() {
            var b = e.settings,
                v = t.Html.slides.length;
            return this.isBound() ? v - 1 - (kt(b.perView) - 1) + kt(b.focusAt) : v - 1
        }
    }), wt(r, "offset", {
        get: function() {
            return this._o
        }
    }), r
}

function Fa() {
    return new Date().getTime()
}

function Er(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
        r, o, c, f, d = 0,
        g = function() {
            d = n.leading === !1 ? 0 : Fa(), r = null, f = e.apply(o, c), r || (o = c = null)
        },
        b = function() {
            var E = Fa();
            !d && n.leading === !1 && (d = E);
            var A = t - (E - d);
            return o = this, c = arguments, A <= 0 || A > t ? (r && (clearTimeout(r), r = null), d = E, f = e.apply(o, c), r || (o = c = null)) : !r && n.trailing !== !1 && (r = setTimeout(g, A)), f
        };
    return b.cancel = function() {
        clearTimeout(r), d = 0, r = o = c = null
    }, b
}
var Gi = {
    ltr: ["marginLeft", "marginRight"],
    rtl: ["marginRight", "marginLeft"]
};

function nb(e, t, n) {
    var r = {
        apply: function(c) {
            for (var f = 0, d = c.length; f < d; f++) {
                var g = c[f].style,
                    b = t.Direction.value;
                f !== 0 ? g[Gi[b][0]] = "".concat(this.value / 2, "px") : g[Gi[b][0]] = "", f !== c.length - 1 ? g[Gi[b][1]] = "".concat(this.value / 2, "px") : g[Gi[b][1]] = ""
            }
        },
        remove: function(c) {
            for (var f = 0, d = c.length; f < d; f++) {
                var g = c[f].style;
                g.marginLeft = "", g.marginRight = ""
            }
        }
    };
    return wt(r, "value", {
        get: function() {
            return kt(e.settings.gap)
        }
    }), wt(r, "grow", {
        get: function() {
            return r.value * t.Sizes.length
        }
    }), wt(r, "reductor", {
        get: function() {
            var c = e.settings.perView;
            return r.value * (c - 1) / c
        }
    }), n.on(["build.after", "update"], Er(function() {
        r.apply(t.Html.wrapper.children)
    }, 30)), n.on("destroy", function() {
        r.remove(t.Html.wrapper.children)
    }), r
}

function kl(e) {
    if (e && e.parentNode) {
        for (var t = e.parentNode.firstChild, n = []; t; t = t.nextSibling) t.nodeType === 1 && t !== e && n.push(t);
        return n
    }
    return []
}

function Ms(e) {
    return Array.prototype.slice.call(e)
}
var ib = '[data-glide-el="track"]';

function rb(e, t, n) {
    var r = {
        mount: function() {
            this.root = e.selector, this.track = this.root.querySelector(ib), this.collectSlides()
        },
        collectSlides: function() {
            this.slides = Ms(this.wrapper.children).filter(function(c) {
                return !c.classList.contains(e.settings.classes.slide.clone)
            })
        }
    };
    return wt(r, "root", {
        get: function() {
            return r._r
        },
        set: function(c) {
            Ls(c) && (c = document.querySelector(c)), c !== null ? r._r = c : Ie("Root element must be a existing Html node")
        }
    }), wt(r, "track", {
        get: function() {
            return r._t
        },
        set: function(c) {
            r._t = c
        }
    }), wt(r, "wrapper", {
        get: function() {
            return r.track.children[0]
        }
    }), n.on("update", function() {
        r.collectSlides()
    }), r
}

function sb(e, t, n) {
    var r = {
        mount: function() {
            this.value = e.settings.peek
        }
    };
    return wt(r, "value", {
        get: function() {
            return r._v
        },
        set: function(c) {
            Xn(c) ? (c.before = kt(c.before), c.after = kt(c.after)) : c = kt(c), r._v = c
        }
    }), wt(r, "reductor", {
        get: function() {
            var c = r.value,
                f = e.settings.perView;
            return Xn(c) ? c.before / f + c.after / f : c * 2 / f
        }
    }), n.on(["resize", "update"], function() {
        r.mount()
    }), r
}

function ob(e, t, n) {
    var r = {
        mount: function() {
            this._o = 0
        },
        make: function() {
            var c = this,
                f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
            this.offset = f, n.emit("move", {
                movement: this.value
            }), t.Transition.after(function() {
                n.emit("move.after", {
                    movement: c.value
                })
            })
        }
    };
    return wt(r, "offset", {
        get: function() {
            return r._o
        },
        set: function(c) {
            r._o = Ol(c) ? 0 : kt(c)
        }
    }), wt(r, "translate", {
        get: function() {
            return t.Sizes.slideWidth * e.index
        }
    }), wt(r, "value", {
        get: function() {
            var c = this.offset,
                f = this.translate;
            return t.Direction.is("rtl") ? f + c : f - c
        }
    }), n.on(["build.before", "run"], function() {
        r.make()
    }), r
}

function ab(e, t, n) {
    var r = {
        setupSlides: function() {
            for (var c = "".concat(this.slideWidth, "px"), f = t.Html.slides, d = 0; d < f.length; d++) f[d].style.width = c
        },
        setupWrapper: function() {
            t.Html.wrapper.style.width = "".concat(this.wrapperSize, "px")
        },
        remove: function() {
            for (var c = t.Html.slides, f = 0; f < c.length; f++) c[f].style.width = "";
            t.Html.wrapper.style.width = ""
        }
    };
    return wt(r, "length", {
        get: function() {
            return t.Html.slides.length
        }
    }), wt(r, "width", {
        get: function() {
            return t.Html.track.offsetWidth
        }
    }), wt(r, "wrapperSize", {
        get: function() {
            return r.slideWidth * r.length + t.Gaps.grow + t.Clones.grow
        }
    }), wt(r, "slideWidth", {
        get: function() {
            return r.width / e.settings.perView - t.Peek.reductor - t.Gaps.reductor
        }
    }), n.on(["build.before", "resize", "update"], function() {
        r.setupSlides(), r.setupWrapper()
    }), n.on("destroy", function() {
        r.remove()
    }), r
}

function cb(e, t, n) {
    var r = {
        mount: function() {
            n.emit("build.before"), this.typeClass(), this.activeClass(), n.emit("build.after")
        },
        typeClass: function() {
            t.Html.root.classList.add(e.settings.classes.type[e.settings.type])
        },
        activeClass: function() {
            var c = e.settings.classes,
                f = t.Html.slides[e.index];
            f && (f.classList.add(c.slide.active), kl(f).forEach(function(d) {
                d.classList.remove(c.slide.active)
            }))
        },
        removeClasses: function() {
            var c = e.settings.classes,
                f = c.type,
                d = c.slide;
            t.Html.root.classList.remove(f[e.settings.type]), t.Html.slides.forEach(function(g) {
                g.classList.remove(d.active)
            })
        }
    };
    return n.on(["destroy", "update"], function() {
        r.removeClasses()
    }), n.on(["resize", "update"], function() {
        r.mount()
    }), n.on("move.after", function() {
        r.activeClass()
    }), r
}

function lb(e, t, n) {
    var r = {
        mount: function() {
            this.items = [], e.isType("carousel") && (this.items = this.collect())
        },
        collect: function() {
            var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
                f = t.Html.slides,
                d = e.settings,
                g = d.perView,
                b = d.classes,
                v = d.cloningRatio;
            if (f.length > 0)
                for (var E = +!!e.settings.peek, A = g + E + Math.round(g / 2), D = f.slice(0, A).reverse(), x = f.slice(A * -1), L = 0; L < Math.max(v, Math.floor(g / f.length)); L++) {
                    for (var R = 0; R < D.length; R++) {
                        var M = D[R].cloneNode(!0);
                        M.classList.add(b.slide.clone), c.push(M)
                    }
                    for (var Q = 0; Q < x.length; Q++) {
                        var tt = x[Q].cloneNode(!0);
                        tt.classList.add(b.slide.clone), c.unshift(tt)
                    }
                }
            return c
        },
        append: function() {
            for (var c = this.items, f = t.Html, d = f.wrapper, g = f.slides, b = Math.floor(c.length / 2), v = c.slice(0, b).reverse(), E = c.slice(b * -1).reverse(), A = "".concat(t.Sizes.slideWidth, "px"), D = 0; D < E.length; D++) d.appendChild(E[D]);
            for (var x = 0; x < v.length; x++) d.insertBefore(v[x], g[0]);
            for (var L = 0; L < c.length; L++) c[L].style.width = A
        },
        remove: function() {
            for (var c = this.items, f = 0; f < c.length; f++) t.Html.wrapper.removeChild(c[f])
        }
    };
    return wt(r, "grow", {
        get: function() {
            return (t.Sizes.slideWidth + t.Gaps.value) * r.items.length
        }
    }), n.on("update", function() {
        r.remove(), r.mount(), r.append()
    }), n.on("build.before", function() {
        e.isType("carousel") && r.append()
    }), n.on("destroy", function() {
        r.remove()
    }), r
}
var tn = function() {
    function e() {
        var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _r(this, e), this.listeners = t
    }
    return wr(e, [{
        key: "on",
        value: function(n, r, o) {
            var c = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
            Ls(n) && (n = [n]);
            for (var f = 0; f < n.length; f++) this.listeners[n[f]] = o, r.addEventListener(n[f], this.listeners[n[f]], c)
        }
    }, {
        key: "off",
        value: function(n, r) {
            var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            Ls(n) && (n = [n]);
            for (var c = 0; c < n.length; c++) r.removeEventListener(n[c], this.listeners[n[c]], o)
        }
    }, {
        key: "destroy",
        value: function() {
            delete this.listeners
        }
    }]), e
}();

function ub(e, t, n) {
    var r = new tn,
        o = {
            mount: function() {
                this.bind()
            },
            bind: function() {
                r.on("resize", window, Er(function() {
                    n.emit("resize")
                }, e.settings.throttle))
            },
            unbind: function() {
                r.off("resize", window)
            }
        };
    return n.on("destroy", function() {
        o.unbind(), r.destroy()
    }), o
}
var fb = ["ltr", "rtl"],
    db = {
        ">": "<",
        "<": ">",
        "=": "="
    };

function hb(e, t, n) {
    var r = {
        mount: function() {
            this.value = e.settings.direction
        },
        resolve: function(c) {
            var f = c.slice(0, 1);
            return this.is("rtl") ? c.split(f).join(db[f]) : c
        },
        is: function(c) {
            return this.value === c
        },
        addClass: function() {
            t.Html.root.classList.add(e.settings.classes.direction[this.value])
        },
        removeClass: function() {
            t.Html.root.classList.remove(e.settings.classes.direction[this.value])
        }
    };
    return wt(r, "value", {
        get: function() {
            return r._v
        },
        set: function(c) {
            fb.indexOf(c) > -1 ? r._v = c : Ie("Direction value must be `ltr` or `rtl`")
        }
    }), n.on(["destroy", "update"], function() {
        r.removeClass()
    }), n.on("update", function() {
        r.mount()
    }), n.on(["build.before", "update"], function() {
        r.addClass()
    }), r
}

function pb(e, t) {
    return {
        modify: function(r) {
            return t.Direction.is("rtl") ? -r : r
        }
    }
}

function gb(e, t) {
    return {
        modify: function(r) {
            var o = Math.floor(r / t.Sizes.slideWidth);
            return r + t.Gaps.value * o
        }
    }
}

function mb(e, t) {
    return {
        modify: function(r) {
            return r + t.Clones.grow / 2
        }
    }
}

function vb(e, t) {
    return {
        modify: function(r) {
            if (e.settings.focusAt >= 0) {
                var o = t.Peek.value;
                return Xn(o) ? r - o.before : r - o
            }
            return r
        }
    }
}

function bb(e, t) {
    return {
        modify: function(r) {
            var o = t.Gaps.value,
                c = t.Sizes.width,
                f = e.settings.focusAt,
                d = t.Sizes.slideWidth;
            return f === "center" ? r - (c / 2 - d / 2) : r - d * f - o * f
        }
    }
}

function yb(e, t, n) {
    var r = [gb, mb, vb, bb].concat(e._t, [pb]);
    return {
        mutate: function(c) {
            for (var f = 0; f < r.length; f++) {
                var d = r[f];
                lr(d) && lr(d().modify) ? c = d(e, t, n).modify(c) : Ie("Transformer should be a function that returns an object with `modify()` method")
            }
            return c
        }
    }
}

function _b(e, t, n) {
    var r = {
        set: function(c) {
            var f = yb(e, t).mutate(c),
                d = "translate3d(".concat(-1 * f, "px, 0px, 0px)");
            t.Html.wrapper.style.mozTransform = d, t.Html.wrapper.style.webkitTransform = d, t.Html.wrapper.style.transform = d
        },
        remove: function() {
            t.Html.wrapper.style.transform = ""
        },
        getStartIndex: function() {
            var c = t.Sizes.length,
                f = e.index,
                d = e.settings.perView;
            return t.Run.isOffset(">") || t.Run.isOffset("|>") ? c + (f - d) : (f + d) % c
        },
        getTravelDistance: function() {
            var c = t.Sizes.slideWidth * e.settings.perView;
            return t.Run.isOffset(">") || t.Run.isOffset("|>") ? c * -1 : c
        }
    };
    return n.on("move", function(o) {
        if (!e.isType("carousel") || !t.Run.isOffset()) return r.set(o.movement);
        t.Transition.after(function() {
            n.emit("translate.jump"), r.set(t.Sizes.slideWidth * e.index)
        });
        var c = t.Sizes.slideWidth * t.Translate.getStartIndex();
        return r.set(c - t.Translate.getTravelDistance())
    }), n.on("destroy", function() {
        r.remove()
    }), r
}

function wb(e, t, n) {
    var r = !1,
        o = {
            compose: function(f) {
                var d = e.settings;
                return r ? "".concat(f, " 0ms ").concat(d.animationTimingFunc) : "".concat(f, " ").concat(this.duration, "ms ").concat(d.animationTimingFunc)
            },
            set: function() {
                var f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
                t.Html.wrapper.style.transition = this.compose(f)
            },
            remove: function() {
                t.Html.wrapper.style.transition = ""
            },
            after: function(f) {
                setTimeout(function() {
                    f()
                }, this.duration)
            },
            enable: function() {
                r = !1, this.set()
            },
            disable: function() {
                r = !0, this.set()
            }
        };
    return wt(o, "duration", {
        get: function() {
            var f = e.settings;
            return e.isType("slider") && t.Run.offset ? f.rewindDuration : f.animationDuration
        }
    }), n.on("move", function() {
        o.set()
    }), n.on(["build.before", "resize", "translate.jump"], function() {
        o.disable()
    }), n.on("run", function() {
        o.enable()
    }), n.on("destroy", function() {
        o.remove()
    }), o
}
var Ll = !1;
try {
    var za = Object.defineProperty({}, "passive", {
        get: function() {
            Ll = !0
        }
    });
    window.addEventListener("testPassive", null, za), window.removeEventListener("testPassive", null, za)
} catch {}
var Is = Ll,
    Zi = ["touchstart", "mousedown"],
    Ya = ["touchmove", "mousemove"],
    Ka = ["touchend", "touchcancel", "mouseup", "mouseleave"],
    Ua = ["mousedown", "mousemove", "mouseup", "mouseleave"];

function Eb(e, t, n) {
    var r = new tn,
        o = 0,
        c = 0,
        f = 0,
        d = !1,
        g = Is ? {
            passive: !0
        } : !1,
        b = {
            mount: function() {
                this.bindSwipeStart()
            },
            start: function(E) {
                if (!d && !e.disabled) {
                    this.disable();
                    var A = this.touches(E);
                    o = null, c = kt(A.pageX), f = kt(A.pageY), this.bindSwipeMove(), this.bindSwipeEnd(), n.emit("swipe.start")
                }
            },
            move: function(E) {
                if (!e.disabled) {
                    var A = e.settings,
                        D = A.touchAngle,
                        x = A.touchRatio,
                        L = A.classes,
                        R = this.touches(E),
                        M = kt(R.pageX) - c,
                        Q = kt(R.pageY) - f,
                        tt = Math.abs(M << 2),
                        K = Math.abs(Q << 2),
                        it = Math.sqrt(tt + K),
                        Y = Math.sqrt(K);
                    if (o = Math.asin(Y / it), o * 180 / Math.PI < D) E.stopPropagation(), t.Move.make(M * Gv(x)), t.Html.root.classList.add(L.dragging), n.emit("swipe.move");
                    else return !1
                }
            },
            end: function(E) {
                if (!e.disabled) {
                    var A = e.settings,
                        D = A.perSwipe,
                        x = A.touchAngle,
                        L = A.classes,
                        R = this.touches(E),
                        M = this.threshold(E),
                        Q = R.pageX - c,
                        tt = o * 180 / Math.PI;
                    this.enable(), Q > M && tt < x ? t.Run.make(t.Direction.resolve("".concat(D, "<"))) : Q < -M && tt < x ? t.Run.make(t.Direction.resolve("".concat(D, ">"))) : t.Move.make(), t.Html.root.classList.remove(L.dragging), this.unbindSwipeMove(), this.unbindSwipeEnd(), n.emit("swipe.end")
                }
            },
            bindSwipeStart: function() {
                var E = this,
                    A = e.settings,
                    D = A.swipeThreshold,
                    x = A.dragThreshold;
                D && r.on(Zi[0], t.Html.wrapper, function(L) {
                    E.start(L)
                }, g), x && r.on(Zi[1], t.Html.wrapper, function(L) {
                    E.start(L)
                }, g)
            },
            unbindSwipeStart: function() {
                r.off(Zi[0], t.Html.wrapper, g), r.off(Zi[1], t.Html.wrapper, g)
            },
            bindSwipeMove: function() {
                var E = this;
                r.on(Ya, t.Html.wrapper, Er(function(A) {
                    E.move(A)
                }, e.settings.throttle), g)
            },
            unbindSwipeMove: function() {
                r.off(Ya, t.Html.wrapper, g)
            },
            bindSwipeEnd: function() {
                var E = this;
                r.on(Ka, t.Html.wrapper, function(A) {
                    E.end(A)
                })
            },
            unbindSwipeEnd: function() {
                r.off(Ka, t.Html.wrapper)
            },
            touches: function(E) {
                return Ua.indexOf(E.type) > -1 ? E : E.touches[0] || E.changedTouches[0]
            },
            threshold: function(E) {
                var A = e.settings;
                return Ua.indexOf(E.type) > -1 ? A.dragThreshold : A.swipeThreshold
            },
            enable: function() {
                return d = !1, t.Transition.enable(), this
            },
            disable: function() {
                return d = !0, t.Transition.disable(), this
            }
        };
    return n.on("build.after", function() {
        t.Html.root.classList.add(e.settings.classes.swipeable)
    }), n.on("destroy", function() {
        b.unbindSwipeStart(), b.unbindSwipeMove(), b.unbindSwipeEnd(), r.destroy()
    }), b
}

function Tb(e, t, n) {
    var r = new tn,
        o = {
            mount: function() {
                this.bind()
            },
            bind: function() {
                r.on("dragstart", t.Html.wrapper, this.dragstart)
            },
            unbind: function() {
                r.off("dragstart", t.Html.wrapper)
            },
            dragstart: function(f) {
                f.preventDefault()
            }
        };
    return n.on("destroy", function() {
        o.unbind(), r.destroy()
    }), o
}

function Ab(e, t, n) {
    var r = new tn,
        o = !1,
        c = !1,
        f = {
            mount: function() {
                this._a = t.Html.wrapper.querySelectorAll("a"), this.bind()
            },
            bind: function() {
                r.on("click", t.Html.wrapper, this.click)
            },
            unbind: function() {
                r.off("click", t.Html.wrapper)
            },
            click: function(g) {
                c && (g.stopPropagation(), g.preventDefault())
            },
            detach: function() {
                if (c = !0, !o) {
                    for (var g = 0; g < this.items.length; g++) this.items[g].draggable = !1;
                    o = !0
                }
                return this
            },
            attach: function() {
                if (c = !1, o) {
                    for (var g = 0; g < this.items.length; g++) this.items[g].draggable = !0;
                    o = !1
                }
                return this
            }
        };
    return wt(f, "items", {
        get: function() {
            return f._a
        }
    }), n.on("swipe.move", function() {
        f.detach()
    }), n.on("swipe.end", function() {
        t.Transition.after(function() {
            f.attach()
        })
    }), n.on("destroy", function() {
        f.attach(), f.unbind(), r.destroy()
    }), f
}
var Cb = '[data-glide-el="controls[nav]"]',
    uo = '[data-glide-el^="controls"]',
    $b = "".concat(uo, ' [data-glide-dir*="<"]'),
    xb = "".concat(uo, ' [data-glide-dir*=">"]');

function Sb(e, t, n) {
    var r = new tn,
        o = Is ? {
            passive: !0
        } : !1,
        c = {
            mount: function() {
                this._n = t.Html.root.querySelectorAll(Cb), this._c = t.Html.root.querySelectorAll(uo), this._arrowControls = {
                    previous: t.Html.root.querySelectorAll($b),
                    next: t.Html.root.querySelectorAll(xb)
                }, this.addBindings()
            },
            setActive: function() {
                for (var d = 0; d < this._n.length; d++) this.addClass(this._n[d].children)
            },
            removeActive: function() {
                for (var d = 0; d < this._n.length; d++) this.removeClass(this._n[d].children)
            },
            addClass: function(d) {
                var g = e.settings,
                    b = d[e.index];
                b && (b.classList.add(g.classes.nav.active), kl(b).forEach(function(v) {
                    v.classList.remove(g.classes.nav.active)
                }))
            },
            removeClass: function(d) {
                var g = d[e.index];
                g == null || g.classList.remove(e.settings.classes.nav.active)
            },
            setArrowState: function() {
                if (!e.settings.rewind) {
                    var d = c._arrowControls.next,
                        g = c._arrowControls.previous;
                    this.resetArrowState(d, g), e.index === 0 && this.disableArrow(g), e.index === t.Run.length && this.disableArrow(d)
                }
            },
            resetArrowState: function() {
                for (var d = e.settings, g = arguments.length, b = new Array(g), v = 0; v < g; v++) b[v] = arguments[v];
                b.forEach(function(E) {
                    Ms(E).forEach(function(A) {
                        A.classList.remove(d.classes.arrow.disabled)
                    })
                })
            },
            disableArrow: function() {
                for (var d = e.settings, g = arguments.length, b = new Array(g), v = 0; v < g; v++) b[v] = arguments[v];
                b.forEach(function(E) {
                    Ms(E).forEach(function(A) {
                        A.classList.add(d.classes.arrow.disabled)
                    })
                })
            },
            addBindings: function() {
                for (var d = 0; d < this._c.length; d++) this.bind(this._c[d].children)
            },
            removeBindings: function() {
                for (var d = 0; d < this._c.length; d++) this.unbind(this._c[d].children)
            },
            bind: function(d) {
                for (var g = 0; g < d.length; g++) r.on("click", d[g], this.click), r.on("touchstart", d[g], this.click, o)
            },
            unbind: function(d) {
                for (var g = 0; g < d.length; g++) r.off(["click", "touchstart"], d[g])
            },
            click: function(d) {
                !Is && d.type === "touchstart" && d.preventDefault();
                var g = d.currentTarget.getAttribute("data-glide-dir");
                t.Run.make(t.Direction.resolve(g))
            }
        };
    return wt(c, "items", {
        get: function() {
            return c._c
        }
    }), n.on(["mount.after", "move.after"], function() {
        c.setActive()
    }), n.on(["mount.after", "run"], function() {
        c.setArrowState()
    }), n.on("destroy", function() {
        c.removeBindings(), c.removeActive(), r.destroy()
    }), c
}

function Ob(e, t, n) {
    var r = new tn,
        o = {
            mount: function() {
                e.settings.keyboard && this.bind()
            },
            bind: function() {
                r.on("keyup", document, this.press)
            },
            unbind: function() {
                r.off("keyup", document)
            },
            press: function(f) {
                var d = e.settings.perSwipe,
                    g = {
                        ArrowRight: ">",
                        ArrowLeft: "<"
                    };
                ["ArrowRight", "ArrowLeft"].includes(f.code) && t.Run.make(t.Direction.resolve("".concat(d).concat(g[f.code])))
            }
        };
    return n.on(["destroy", "update"], function() {
        o.unbind()
    }), n.on("update", function() {
        o.mount()
    }), n.on("destroy", function() {
        r.destroy()
    }), o
}

function kb(e, t, n) {
    var r = new tn,
        o = {
            mount: function() {
                this.enable(), this.start(), e.settings.hoverpause && this.bind()
            },
            enable: function() {
                this._e = !0
            },
            disable: function() {
                this._e = !1
            },
            start: function() {
                var f = this;
                this._e && (this.enable(), e.settings.autoplay && Ol(this._i) && (this._i = setInterval(function() {
                    f.stop(), t.Run.make(">"), f.start(), n.emit("autoplay")
                }, this.time)))
            },
            stop: function() {
                this._i = clearInterval(this._i)
            },
            bind: function() {
                var f = this;
                r.on("mouseover", t.Html.root, function() {
                    f._e && f.stop()
                }), r.on("mouseout", t.Html.root, function() {
                    f._e && f.start()
                })
            },
            unbind: function() {
                r.off(["mouseover", "mouseout"], t.Html.root)
            }
        };
    return wt(o, "time", {
        get: function() {
            var f = t.Html.slides[e.index].getAttribute("data-glide-autoplay");
            return kt(f || e.settings.autoplay)
        }
    }), n.on(["destroy", "update"], function() {
        o.unbind()
    }), n.on(["run.before", "swipe.start", "update"], function() {
        o.stop()
    }), n.on(["pause", "destroy"], function() {
        o.disable(), o.stop()
    }), n.on(["run.after", "swipe.end"], function() {
        o.start()
    }), n.on(["play"], function() {
        o.enable(), o.start()
    }), n.on("update", function() {
        o.mount()
    }), n.on("destroy", function() {
        r.destroy()
    }), o
}

function Xa(e) {
    return Xn(e) ? Qv(e) : (Ie("Breakpoints option must be an object"), {})
}

function Lb(e, t, n) {
    var r = new tn,
        o = e.settings,
        c = Xa(o.breakpoints),
        f = Object.assign({}, o),
        d = {
            match: function(b) {
                if (typeof window.matchMedia < "u") {
                    for (var v in b)
                        if (b.hasOwnProperty(v) && window.matchMedia("(max-width: ".concat(v, "px)")).matches) return b[v]
                }
                return f
            }
        };
    return Object.assign(o, d.match(c)), r.on("resize", window, Er(function() {
        e.settings = Ds(o, d.match(c))
    }, e.settings.throttle)), n.on("update", function() {
        c = Xa(c), f = Object.assign({}, o)
    }), n.on("destroy", function() {
        r.off("resize", window)
    }), d
}
var Nb = {
        Html: rb,
        Translate: _b,
        Transition: wb,
        Direction: hb,
        Peek: sb,
        Sizes: ab,
        Gaps: nb,
        Move: ob,
        Clones: lb,
        Resize: ub,
        Build: cb,
        Run: eb,
        Swipe: Eb,
        Images: Tb,
        Anchors: Ab,
        Controls: Sb,
        Keyboard: Ob,
        Autoplay: kb,
        Breakpoints: Lb
    },
    Db = function(e) {
        Wv(n, e);
        var t = Kv(n);

        function n() {
            return _r(this, n), t.apply(this, arguments)
        }
        return wr(n, [{
            key: "mount",
            value: function() {
                var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return nr(Un(n.prototype), "mount", this).call(this, Object.assign({}, Nb, o))
            }
        }]), n
    }(tb);
const Mb = {
        init() {
            $(".glide").length && $(".glide").each(function() {
                const e = $(this)[0];
                if (e && e.dataset && e.dataset.glideMounted === "1") return;
                const t = $(window).width() < 992 ? 8 : 32,
                    n = $(window).width() < 992 ? t + 20 : t + 64,
                    r = new Db(e, {
                        type: "carousel",
                        gap: t,
                        peek: {
                            before: n,
                            after: n
                        },
                        perView: 1.5,
                        focusAt: "center",
                        startAt: 0,
                        bound: !0,
                        autoplay: !1,
                        animationDuration: 500,
                        hoverpause: !0,
                        breakpoints: {
                            991: {
                                peek: {
                                    before: Math.max(8, Math.round(t / 2)),
                                    after: Math.max(8, Math.round(t / 2))
                                },
                                focusAt: "center"
                            },
                            768: {
                                perView: 1.2,
                                peek: {
                                    before: 12,
                                    after: 12
                                },
                                focusAt: "center"
                            }
                        }
                    }),
                    o = () => {
                        try {
                            r.mount()
                        } catch {}
                        const c = () => {
                            try {
                                r.update(), r.go("=" + r.index)
                            } catch {}
                        };
                        setTimeout(c, 150), r.on("resize", c), $(e).find("img").on("load", c), window.ResizeObserver && new ResizeObserver(() => c()).observe(e), e && e.dataset && (e.dataset.glideMounted = "1")
                    };
                document.readyState === "complete" ? o() : window.addEventListener("load", o, {
                    once: !0
                })
            }), $(".glide__slide").each(function() {
                const e = this;
                $(e).find("img").on("lazyload", function() {
                    setTimeout(function() {
                        const t = $(e).find("figure > div").position().left - $(e).find("figure").position().left;
                        t > 0 ? ($(e).find("figcaption").css("margin-left", t), $(e).find("figcaption").css("margin-right", t)) : ($(e).find("figcaption").css("margin-left", 0), $(e).find("figcaption").css("margin-right", 0))
                    }, 75)
                })
            })
        }
    },
    Ib = {
        init() {
            $(".block-cta").each(function() {
                $(this).data("bgcolor") && ($(this).css("background-color", $(this).data("bgcolor")), $(".btn", this).attr("style", "color: " + $(this).data("bgcolor") + " !important")), $(this).data("textcolor") && ($(this).css("color", $(this).data("textcolor")), $(".btn", this).css("background-color", $(this).data("textcolor")), $("svg path", this).css("fill", $(this).data("textcolor")))
            })
        }
    },
    Pb = {
        init() {
            $(".wp-block-audio:not(.init)").each(function() {
                $(this).addClass("init"), $("audio", this).wrap('<div class="audio-player-snippet"></div>'), $("audio", this).before('<button class="btn play"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.5L18.3333 12L7 20.5V3.5ZM8 5.5V18.5L16.6667 12L8 5.5Z" fill="currentColor"/></svg>Play Audio</button>'), $("audio", this).after('<div class="duration">Loading...</div>')
            });
            const e = $(".audio-snippet-fixed"),
                t = $(".audio-snippet-fixed button:not(.close)");
            let n;
            const r = o => {
                const c = $("audio", o)[0];
                c.paused ? ($("button", o).add(t).removeClass("play"), $("button", o).add(t).addClass("pause"), $("button", o).html('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 6C6 4.89543 6.89543 4 8 4H9C10.1046 4 11 4.89543 11 6V18C11 19.1046 10.1046 20 9 20H8C6.89543 20 6 19.1046 6 18V6ZM8 5H9C9.55228 5 10 5.44772 10 6V18C10 18.5523 9.55228 19 9 19H8C7.44772 19 7 18.5523 7 18V6C7 5.44772 7.44772 5 8 5Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13 6C13 4.89543 13.8954 4 15 4H16C17.1046 4 18 4.89543 18 6V18C18 19.1046 17.1046 20 16 20H15C13.8954 20 13 19.1046 13 18V6ZM15 5H16C16.5523 5 17 5.44772 17 6V18C17 18.5523 16.5523 19 16 19H15C14.4477 19 14 18.5523 14 18V6C14 5.44772 14.4477 5 15 5Z" fill="currentColor"/></svg>Pause'), c.play()) : ($("button", o).add(t).removeClass("pause"), $("button", o).add(t).addClass("play"), $("button", o).html('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.5L18.3333 12L7 20.5V3.5ZM8 5.5V18.5L16.6667 12L8 5.5Z" fill="currentColor"/></svg>Play Audio'), c.pause())
            };
            $(".audio-player-snippet:not(.init)").each(function() {
                $(this).addClass("init");
                const o = this;
                var c = "",
                    f = "";
                $("audio", o).on("canplay", function() {
                    c = $("audio", o)[0].duration, f = Math.floor(c % 60), $(".position, .duration", o).text(Math.floor(c / 60) + ":" + (f < 10 ? "0" : "") + f)
                }), $("audio", o)[0].readyState >= 2 && $("audio", o).trigger("canplay"), $("audio", o).on("timeupdate", function() {
                    var d = $("audio", o)[0].currentTime,
                        g = Math.floor(d % 60);
                    const b = Math.floor(d / 60) + ":" + (g < 10 ? "0" : "") + g;
                    $(".position", o).add($(".position", e)).text(b), $("#progress").width(d / c * 74 + "px")
                }), $("button", o).click(function() {
                    !$("audio", n)[0].paused && n !== o && r(n), n = o, r(o), e.addClass("visible")
                }), t.click(function() {
                    r(n)
                }), $(".close", e).click(function() {
                    e.removeClass("visible"), $("audio", n)[0].paused || r(n)
                }), $("audio", o).on("ended", function() {
                    $("button", o).removeClass("pause"), $("button", o).addClass("play"), $("button", o).html('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.5L18.3333 12L7 20.5V3.5ZM8 5.5V18.5L16.6667 12L8 5.5Z" fill="white"/></svg>Play Audio'), $("audio", o)[0].pause()
                })
            }), $(".audio-player:not(.init)").each(function() {
                $(this).addClass("init");
                const o = this;
                var c = "";
                const f = $("audio", o)[0];
                let d = !1;
                $("audio", o).on("loadedmetadata", function() {
                    c = f.duration, $("audio", o).trigger("timeupdate")
                }), $("audio", o).on("timeupdate", function() {
                    console.log("timeupdate");
                    var b = f.currentTime,
                        v = Math.floor(b % 60);
                    $(".position", o).text(Math.floor(b / 60) + ":" + (v < 10 ? "0" : "") + v);
                    var E = Math.floor((c - b) % 60);
                    $(".remaining", o).text("-" + Math.floor((c - b) / 60) + ":" + (E < 10 ? "0" : "") + E), d || $(".elapsed", o).width(b / c * 100 + "%")
                }), $("audio", o).on("ended", function() {
                    $(".pause, .play", o).attr("class", "play")
                }), $(".pause, .play", o).click(function() {
                    $(this).hasClass("play") ? ($(".pause, .play", o).attr("class", "pause"), f.play()) : ($(".pause, .play", o).attr("class", "play"), f.pause())
                }), $(".scrubber", o).click(function(b) {
                    if (!d) {
                        const E = (b.clientX - $(".scrubber", o)[0].offsetLeft) / this.clientWidth * f.duration;
                        f.currentTime = E
                    }
                }), $(".skip-backward", o).click(function() {
                    const b = f.currentTime;
                    f.currentTime = Math.max(b - 15, 0)
                }), $(".skip-forward", o).click(function() {
                    const b = f.currentTime,
                        v = f.duration;
                    f.currentTime = Math.min(b + 15, v)
                }), $(".inline figure, .inline p", o).click(function() {
                    $(".sticky-controls", o).addClass("expanded")
                }), $(".shrink", o).click(function() {
                    $(".sticky-controls", o).removeClass("expanded")
                }), $(".drag-button", o).on("mousedown touchstart", function() {
                    d = !0
                }), $(".scrubber", o).on("mousemove touchmove", function(b) {
                    const E = (b.touches ? b.touches[0].clientX : b.clientX) - $(".scrubber", o)[0].offsetLeft;
                    d && $(".elapsed", o).width(E / this.clientWidth * 100 + "%")
                });
                const g = () => {
                    d && (d = !1, console.log(f.currentTime), f.currentTime = Math.floor(c * $(".elapsed", o).width() / this.clientWidth), console.log(f.currentTime))
                };
                $(".drag-button", o).on("mouseup touchend", g), $(".scrubber", o).on("mouseleave", g)
            })
        }
    },
    Rb = {
        init() {
            if ($(".hero-video .video-media a.play").length) {
                const n = o => {
                        if (!o) return "";
                        const c = String(o),
                            f = [/youtu\.be\/([\w-]{6,})/i, /v=([\w-]{6,})/i, /embed\/([\w-]{6,})/i, /^([\w-]{6,})$/i];
                        for (const d of f) {
                            const g = c.match(d);
                            if (g && g[1]) return g[1]
                        }
                        return c
                    },
                    r = function() {
                        $(".hero-video .video-media a.play").each(function() {
                            const o = $(this).data("ytid"),
                                c = n(o),
                                f = "yt-" + c,
                                d = $(this).siblings('div[id^="yt-"]').first();
                            d.length && d.attr("id", f);
                            const g = new YT.Player(f, {
                                videoId: c,
                                playerVars: {
                                    playsinline: 1,
                                    width: "100%"
                                }
                            });
                            $(this).on("click", function(b) {
                                if (b.preventDefault(), $(this).parent().addClass("yt-active"), g && typeof g.playVideo == "function") try {
                                    g.playVideo()
                                } catch {}
                            })
                        })
                    };
                if (window.YT === void 0 || !window.YT.Player) {
                    var e = document.createElement("script");
                    e.src = "https://www.youtube.com/iframe_api";
                    var t = document.getElementsByTagName("script")[0];
                    t.parentNode.insertBefore(e, t), window.onYouTubeIframeAPIReady = r
                } else r()
            }
        }
    },
    Hb = {
        init() {
            if ($(".subscription-wall").length) {
                $("body").addClass("has-subscription-wall");
                const e = () => {
                    $(".subscription-wall").remove(), $("body").removeClass("has-subscription-wall")
                };
                $('[data-target="#signUpModal"]').on("click", function() {
                    $("#signUpModal").modal()
                }), $('[data-dismiss="modal"]').on("click", function() {
                    $("#signUpModal").modal("hide"), this.getAttribute("aria-label") === "Close" && setTimeout(e, 1e3)
                });
                let t = window.localStorage.getItem("hideSubscribe");
                t && (t = new Date(t), t.setDate(t.getDate() + 7), new Date <= t && e()), $("[data-skip-signup]").on("click", function() {
                    window.localStorage.setItem("hideSubscribe", new Date().toISOString()), window.dispatchEvent(window.subscribeWallHidden), e()
                }), $('#subscribe input[type="checkbox"]').change(function() {
                    $(this).is(":checked") ? $(this).parent().addClass("checked") : $(this).parent().removeClass("checked")
                }), $("#subscribe .terms-input svg").click(function() {
                    $('#subscribe input[type="checkbox"]').click()
                }), $("#subscribe .btn").click(function() {
                    if ($("#subscribe input").removeClass("error"), $(".error-message").text(""), !$('#subscribe input[type="checkbox"]').is(":checked")) return $('#subscribe input[type="checkbox"]').addClass("error"), !1;
                    if (!$("#subscribe")[0].checkValidity()) return $('input[type="email"], input[type="password"]', "#subscribe").addClass("error"), $(".error-message").text("Invalid email address or password."), !1;
                    $("#subscribe").addClass("loading"), $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: $("#subscribe").data("ajaxurl"),
                        data: {
                            action: "ajaxlogin",
                            login: $('#subscribe input[name="email"]').val(),
                            password: $('#subscribe input[name="password"]').val(),
                            security: $("#security").val()
                        },
                        success: function(r) {
                            $("#subscribe").removeClass("loading"), r.logged_in === !0 && r.new_account === !0 || r.logged_in === !0 ? n(r.new_account === !0) : $(".error-message").text("Incorrect email address or password.")
                        }
                    });
                    const n = r => {
                        $("#subscribe").remove(), r || $(".signup-form-success h3").text("Welcome back!"), $(".signup-form-success").css("display", "flex")
                    }
                })
            }
        }
    },
    jb = {
        init() {
            $(".load-next-results").click(function(e) {
                e.preventDefault(), console.log("Load more button clicked!");
                const t = this,
                    n = $(t).parents(".container.modules, .modules.index-page");
                console.log("Container found:", n.length);
                const r = n.find(".results[data-exclude]").first(),
                    o = r.length ? r : n.find(".results").first(),
                    c = o.data("current-page"),
                    f = o.data("offset"),
                    d = o.data("total-posts"),
                    g = o.data("query"),
                    b = o.data("exclude");
                console.log("Page data:", {
                    current_page: c,
                    offset: f,
                    total_results: d,
                    query: g,
                    exclude: b
                }), $(t).parent().addClass("loading");
                const v = {
                    url: window.location.href,
                    data: {
                        page: c + 1,
                        offset: f || 0,
                        ajax: !0
                    },
                    success: function(E) {
                        console.log("AJAX success! Data received:", E.length, "characters"), $(t).parent().removeClass("loading"), o.data("current-page", c + 1);
                        const A = o.find(".teaser-highlights-grid");
                        console.log("Grid container found:", A.length), A.length ? (A.append(E), console.log("Data appended to grid")) : (o.append(E), console.log("Data appended to results")), o.addClass("has-loaded-more");
                        const D = o.find(".teaser-highlight, .teaser-medium").length;
                        console.log("Current count:", D, "Total:", d), D >= d && ($(t).remove(), console.log("Load more button removed"))
                    },
                    error: function(E, A, D) {
                        console.error("AJAX error:", A, D), $(t).parent().removeClass("loading")
                    }
                };
                g && (v.url = "/", v.data.s = g), b && (v.data.exclude = b), console.log("Making AJAX request:", v), $.ajax(v)
            })
        }
    },
    Nl = {
        init() {
            const e = () => {
                $(".module-more-articles .tags > a").each(function() {
                    $(this).removeAttr("tag-second-line"), this.getBoundingClientRect().top - this.parentElement.getBoundingClientRect().top > 2 && $(this).attr("tag-second-line", !0)
                })
            };
            e(), window.addEventListener("resize", () => e());
            const t = document.querySelector("[module-more-articles]");
            if (t) {
                const n = t.querySelectorAll("[module-more-articles-item]"),
                    r = t.querySelector("[module-more-articles-expand-button]");
                n.length > 3 && (t.classList.add("show-expand-button"), n.forEach((o, c) => {
                    c > 3 && o.classList.add("hide")
                }), r.addEventListener("click", () => {
                    n.forEach((o, c) => {
                        c > 3 && o.classList.remove("hide")
                    }), t.classList.remove("show-expand-button")
                }))
            }
        }
    },
    Bb = {
        init() {
            $(".pagination-trigger").click(function(e) {
                e.preventDefault(), $(".pagination").addClass("active")
            }), $(".pagination__close-btn").click(function(e) {
                e.preventDefault(), $(".pagination").removeClass("active")
            })
        }
    };

function ys(e, t, n, r, o) {
    return (e - t) / (n - t) * (o - r) + r
}
const Vb = {
        init() {
            $("[data-parallax]").each(function() {
                let e = 0;
                const t = $(this).find("[data-parallax-elem]"),
                    n = $(this).find("[data-parallax-rotate]"),
                    r = () => {
                        const f = this.getBoundingClientRect(),
                            d = ys(f.top, window.innerHeight, -f.height, 0, 100);
                        e = Math.max(0, Math.min(100, d)), t.each((g, b) => {
                            const v = $(this).height() * .5,
                                E = ys(e, 0, 100, +v, -v);
                            $(b).css("transform", `translateY(${E}px)`)
                        }), n.each((g, b) => {
                            const v = ys(e, 0, 100, -120, 360);
                            $(b).css("transform", `rotateY(${v}deg)`)
                        })
                    },
                    o = f => {
                        f[0].isIntersecting ? window.addEventListener("scroll", r) : window.removeEventListener("scroll", r)
                    };
                new IntersectionObserver(o).observe(this)
            })
        }
    },
    qb = {
        init() {
            const e = document.querySelector(".hero-photo-essay");
            if (e) {
                const t = e.querySelector("[data-photo-essay-thumbnail-bar]"),
                    n = e.querySelector("[data-photo-essay-previous]"),
                    r = e.querySelector("[data-photo-essay-next]"),
                    o = e.querySelectorAll("[data-photo-essay-thumbnail]"),
                    c = e.querySelectorAll("[data-photo-essay-slide]"),
                    f = e.querySelectorAll("[data-photo-essay-caption]"),
                    d = e.querySelector("[data-photo-essay-sidebar-toggle]"),
                    g = e.querySelector("[data-photo-essay-sidebar-mobile-toggle]"),
                    b = (x, L) => {
                        if (!x) return !1;
                        const R = x.querySelector("video");
                        if (!R) return !1;
                        L ? R.pause() : (R.currentTime = 0, R.play())
                    },
                    v = x => {
                        const L = o[x],
                            R = L.getBoundingClientRect(),
                            Q = (t.getBoundingClientRect().width - L.clientWidth) / 2;
                        t.scrollBy(R.left - Q, 0)
                    },
                    E = x => {
                        x < 0 || x > c.length - 1 || (this.activeIndex !== void 0 && (c[this.activeIndex].classList.remove("active"), f[this.activeIndex].classList.remove("active"), o[this.activeIndex].classList.remove("active"), b(c[this.activeIndex], !0), e.classList.remove("links-slide-active"), e.classList.remove("first-slide-active"), e.classList.remove("last-slide-active")), b(c[x], !1), c[x].classList.add("active"), f[x].classList.add("active"), o[x].classList.add("active"), g.scrollTo(window.innerWidth * x, 0), v(x), c[x].hasAttribute("data-photo-essay-links-slide") && e.classList.add("links-slide-active"), x === 0 && e.classList.add("first-slide-active"), x === c.length - 1 && e.classList.add("last-slide-active"), this.activeIndex = x)
                    },
                    A = x => {
                        x.key === "ArrowRight" ? E(this.activeIndex + 1) : x.key === "ArrowLeft" && E(this.activeIndex - 1)
                    };
                E(0), o.forEach((x, L) => {
                    x.addEventListener("click", () => {
                        E(L)
                    })
                }), d.addEventListener("click", () => {
                    e.classList.toggle("sidebar-toggled")
                }), g.addEventListener("click", () => {
                    e.classList.toggle("sidebar-mobile-toggled")
                }), g.addEventListener("scroll", () => {
                    const x = Math.round(g.scrollLeft / window.innerWidth);
                    x !== this.activeIndex && E(x)
                }), n.addEventListener("click", () => E(this.activeIndex - 1)), r.addEventListener("click", () => E(this.activeIndex + 1)), new IntersectionObserver(x => {
                    x[0].isIntersecting ? document.addEventListener("keydown", A) : document.removeEventListener("keydown", A)
                }, {
                    threshold: .5
                }).observe(e)
            }
        }
    },
    Wb = {
        init() {
            $("[data-expandeable-text]").each(function() {
                const e = this.querySelector("[data-expandeable-text-toggle-button]"),
                    t = this.querySelector("[data-expandeable-text-content-wrapper]"),
                    n = this.querySelector("[data-expandeable-text-content]");
                e.addEventListener("click", () => {
                    this.classList.toggle("toggled"), t.style.maxHeight = `${n.scrollHeight}px`
                }), t.style.maxHeight = `${n.scrollHeight}px`
            })
        }
    },
    Fb = {
        init() {
            $(".hero-animated").each(function() {
                const e = this.querySelector("[data-hero-animated-headline]"),
                    t = this.querySelector("[data-hero-animated-cover-wrapper]"),
                    n = this.querySelector("[data-hero-animated-cover-image]");
                let r = 0;
                const o = () => {
                    this.style.setProperty("--headline-height", `${e.clientHeight}px`)
                };
                o(), window.addEventListener("resize", o), setTimeout(() => {
                    e.classList.add("animated")
                }, 100);
                const c = () => {
                    const d = window.pageYOffset || document.documentElement.scrollTop,
                        g = window.innerHeight;
                    r = d / g;
                    const b = d > (window.innerHeight - e.clientHeight) / 2;
                    n.style.setProperty("--scale", `${1+.3*r}`), n.style.setProperty("--opacity", `${1-r}`), e.style.setProperty("--invert", `${b?0:100}%`)
                };
                window.addEventListener("scroll", c), new IntersectionObserver(d => {
                    const g = d[0];
                    g && (g.isIntersecting ? window.addEventListener("scroll", c) : window.removeEventListener("scroll", c))
                }, {}).observe(t)
            })
        }
    },
    zb = {
        init() {
            this.setRespondentWidths(), window.addEventListener("resize", () => this.setRespondentWidths()), document.fonts && document.fonts.ready.then(() => this.setRespondentWidths())
        },
        setRespondentWidths() {
            document.querySelectorAll(".block-qa .respondent-answer-wrapper").forEach(t => {
                const n = t.querySelector(".respondent"),
                    r = t.querySelector(".answer p:first-of-type, .answer .first-alinea");
                if (n && r) {
                    const o = document.createElement("span");
                    o.style.font = window.getComputedStyle(n).font, o.style.fontWeight = window.getComputedStyle(n).fontWeight, o.style.fontSize = window.getComputedStyle(n).fontSize, o.style.visibility = "hidden", o.style.position = "absolute", o.style.whiteSpace = "nowrap", o.textContent = n.textContent, document.body.appendChild(o);
                    const c = o.offsetWidth;
                    document.body.removeChild(o), t.style.setProperty("--respondent-width", c + "px")
                }
            })
        }
    },
    Yb = {
        init() {
            this.bindEvents()
        },
        bindEvents() {
            const e = [".teaser-medium", ".teaser-highlight", ".teaser-horizontal", ".teaser-xsmall"];
            e.forEach(n => {
                document.addEventListener("click", r => {
                    const o = r.target.closest(n);
                    if (!o || r.target.closest("a, button")) return;
                    let c = null;
                    if (c = o.querySelector(".teaser-content p a, h3 a, .headline a"), !c) {
                        const f = o.querySelectorAll("a[href]");
                        c = Array.from(f).find(d => !d.closest(".tags") && !d.parentElement.classList.contains("tag"))
                    }
                    c && (r.ctrlKey || r.metaKey || r.button === 1 ? window.open(c.href, "_blank") : window.location.href = c.href)
                })
            }), document.querySelectorAll(e.join(", ")).forEach(n => {
                n.style.cursor = "pointer"
            })
        }
    },
    Kb = {
        init() {
            this.bindEvents()
        },
        bindEvents() {
            const e = document.querySelectorAll(".nav-primary .nav li"),
                t = document.querySelectorAll(".mobile-menu-overlay li .chevron-right"),
                n = document.querySelectorAll(".mobile-menu-overlay li .sub-nav-dropdown .sub-nav-header"),
                r = document.querySelector(".mobile-menu-toggle");
            let o;
            e.forEach(c => {
                const f = c.querySelector("a");
                if (!f) return;
                if (f.textContent.trim().toUpperCase() === "CITIES") {
                    const g = c.querySelector(".cities-dropdown");
                    if (!g) return;
                    c.addEventListener("mouseenter", () => {
                        clearTimeout(o), this.hideAllDropdowns(), this.showDropdown(g)
                    }), c.addEventListener("mouseleave", () => {
                        o = setTimeout(() => {
                            this.hideDropdown(g)
                        }, 300)
                    }), g.addEventListener("mouseenter", () => {
                        clearTimeout(o), this.showDropdown(g)
                    }), g.addEventListener("mouseleave", () => {
                        o = setTimeout(() => {
                            this.hideDropdown(g)
                        }, 200)
                    });
                    return
                }
                const d = c.querySelector(".standard-dropdown");
                d && (c.addEventListener("mouseenter", () => {
                    clearTimeout(o), this.hideAllDropdowns(), this.showDropdown(d)
                }), c.addEventListener("mouseleave", () => {
                    o = setTimeout(() => {
                        this.hideDropdown(d)
                    }, 300)
                }), d.addEventListener("mouseenter", () => {
                    clearTimeout(o), this.showDropdown(d)
                }), d.addEventListener("mouseleave", () => {
                    o = setTimeout(() => {
                        this.hideDropdown(d)
                    }, 200)
                }))
            }), t.forEach(c => {
                c.addEventListener("click", f => {
                    f.preventDefault();
                    const d = c.parentNode.querySelector(".sub-nav-dropdown:not(.cities-dropdown)");
                    if (!d) return;
                    d.classList.add("open");
                    const g = document.querySelector(".mobile-menu-content .tagline");
                    g && g.classList.add("hidden")
                })
            }), n.forEach(c => {
                c.addEventListener("click", f => {
                    var g;
                    f.preventDefault();
                    let d = c.closest(".sub-nav-dropdown");
                    for (; d && d.classList.contains("cities-dropdown");) d = (g = d.parentElement) == null ? void 0 : g.closest(".sub-nav-dropdown");
                    d && (d.classList.remove("open"), setTimeout(() => {
                        const b = document.querySelectorAll(".sub-nav-dropdown.open"),
                            v = document.querySelector(".mobile-menu-content .tagline");
                        b.length === 0 && v && v.classList.remove("hidden")
                    }, 50))
                })
            }), r && r.addEventListener("click", () => {
                setTimeout(() => {
                    document.querySelectorAll(".sub-nav-dropdown.open").forEach(d => {
                        d.classList.remove("open")
                    });
                    const f = document.querySelector(".mobile-menu-content .tagline");
                    f && f.classList.remove("hidden")
                }, 100)
            })
        },
        hideAllDropdowns() {
            document.querySelectorAll(".sub-nav-dropdown").forEach(t => {
                this.hideDropdown(t)
            })
        },
        showDropdown(e) {
            e && (e.style.opacity = "1", e.style.visibility = "visible", e.style.transform = "translateX(0%)")
        },
        hideDropdown(e) {
            e && (e.style.opacity = "0", e.style.visibility = "hidden")
        }
    },
    Ub = {
        init() {
            const e = document.querySelector(".cities-container");
            if (!e) return;
            const t = Array.from(e.children),
                n = e.scrollWidth;
            t.forEach(x => {
                e.appendChild(x.cloneNode(!0))
            });
            let r = null,
                o = .3,
                c = 1,
                f = !1,
                d = 0,
                g = 0;
            const b = n;

            function v() {
                f || (e.scrollLeft += o * c), e.scrollLeft >= b ? e.scrollLeft -= b : e.scrollLeft < 0 && (e.scrollLeft += b), r = requestAnimationFrame(v)
            }
            r = requestAnimationFrame(v), e.addEventListener("mouseenter", () => o = 0), e.addEventListener("mouseleave", () => o = .3);
            const E = x => {
                    f = !0, d = x, g = e.scrollLeft, e.classList.add("is-dragging")
                },
                A = x => {
                    if (!f) return;
                    const L = x - d;
                    e.scrollLeft = g - L, e.scrollLeft >= b ? (e.scrollLeft -= b, g -= b, d = x) : e.scrollLeft < 0 && (e.scrollLeft += b, g += b, d = x)
                },
                D = () => {
                    f = !1, e.classList.remove("is-dragging")
                };
            e.addEventListener("mousedown", x => E(x.clientX)), window.addEventListener("mousemove", x => A(x.clientX)), window.addEventListener("mouseup", D), e.addEventListener("touchstart", x => E(x.touches[0].clientX), {
                passive: !0
            }), e.addEventListener("touchmove", x => A(x.touches[0].clientX), {
                passive: !0
            }), e.addEventListener("touchend", D), window.addEventListener("unload", () => cancelAnimationFrame(r))
        }
    };
window.jQuery = window.$ = $g;
window.newArticleEvent = new Event("new_article");
window.subscribeWallHidden = new Event("subscribe_wall_hidden");
const Xb = new Sg({
        common: kg,
        single: Lg
    }),
    Dl = () => {
        Bv.init(), Mb.init(), Ib.init(), Pb.init(), Rb.init(), Hb.init(), Wb.init(), jb.init(), Bb.init(), qb.init(), Fb.init(), zb.init(), Yb.init(), Kb.init(), Ub.init()
    };
document.addEventListener("DOMContentLoaded", () => {
    Xb.loadEvents(), Dl(), Vb.init(), setTimeout(() => {
        Nl.init()
    }, 100)
});
window.addEventListener("new_article", () => {
    Dl(), Nl.init(), window.instgrm && window.instgrm.Embeds && window.instgrm.Embeds.process()
});
