var kontra = (function() {
  "use strict";
  let t,
    e,
    i = {};
  function n(t, e) {
    (i[t] = i[t] || []), i[t].push(e);
  }
  function s(t, ...e) {
    i[t] && i[t].map(t => t(...e));
  }
  function h() {
    return t;
  }
  function o() {
    return e;
  }
  class r {
    constructor({
      spriteSheet: t,
      frames: e,
      frameRate: i,
      loop: n = !0
    } = {}) {
      (this.spriteSheet = t),
        (this.frames = e),
        (this.frameRate = i),
        (this.loop = n);
      let { width: s, height: h, margin: o = 0 } = t.frame;
      (this.width = s),
        (this.height = h),
        (this.margin = o),
        (this._f = 0),
        (this._a = 0);
    }
    clone() {
      return a(this);
    }
    reset() {
      (this._f = 0), (this._a = 0);
    }
    update(t = 1 / 60) {
      if (this.loop || this._f != this.frames.length - 1)
        for (this._a += t; this._a * this.frameRate >= 1; )
          (this._f = ++this._f % this.frames.length),
            (this._a -= 1 / this.frameRate);
    }
    render({
      x: t,
      y: e,
      width: i = this.width,
      height: n = this.height,
      context: s = o()
    } = {}) {
      let h = (this.frames[this._f] / this.spriteSheet._f) | 0,
        r = this.frames[this._f] % this.spriteSheet._f | 0;
      s.drawImage(
        this.spriteSheet.image,
        r * this.width + (2 * r + 1) * this.margin,
        h * this.height + (2 * h + 1) * this.margin,
        this.width,
        this.height,
        t,
        e,
        i,
        n
      );
    }
  }
  function a(t) {
    return new r(t);
  }
  (a.prototype = r.prototype), (a.class = r);
  let c = /(jpeg|jpg|gif|png)$/,
    l = /(wav|mp3|ogg|aac)$/,
    u = /^\//,
    d = /\/$/,
    f = new WeakMap(),
    g = "",
    m = "",
    p = "";
  function _(t, e) {
    return new URL(t, e).href;
  }
  function w(t, e) {
    return [t.replace(d, ""), t ? e.replace(u, "") : e]
      .filter(t => t)
      .join("/");
  }
  function y(t) {
    return t.split(".").pop();
  }
  function x(t) {
    let e = t.replace("." + y(t), "");
    return 2 == e.split("/").length ? e.replace(u, "") : e;
  }
  let b = {},
    v = {},
    j = {};
  function A() {
    window.__k || (window.__k = { dm: f, u: _, d: j, i: b });
  }
  function S(t) {
    return (
      A(),
      new Promise((e, i) => {
        let n, h, o;
        if (((n = w(g, t)), b[n])) return e(b[n]);
        ((h = new Image()).onload = function() {
          (o = _(n, window.location.href)),
            (b[x(t)] = b[n] = b[o] = this),
            s("assetLoaded", this, t),
            e(this);
        }),
          (h.onerror = function() {
            i(n);
          }),
          (h.src = n);
      })
    );
  }
  function O(t) {
    return new Promise((e, i) => {
      let n, h, o, r;
      return (
        (n = new Audio()),
        (h = (function(t) {
          return {
            wav: "",
            mp3: t.canPlayType("audio/mpeg;"),
            ogg: t.canPlayType('audio/ogg; codecs="vorbis"'),
            aac: t.canPlayType("audio/aac;")
          };
        })(n)),
        (t = [].concat(t).reduce((t, e) => t || (h[y(e)] ? e : null), 0))
          ? ((o = w(m, t)),
            v[o]
              ? e(v[o])
              : (n.addEventListener("canplay", function() {
                  (r = _(o, window.location.href)),
                    (v[x(t)] = v[o] = v[r] = this),
                    s("assetLoaded", this, t),
                    e(this);
                }),
                (n.onerror = function() {
                  i(o);
                }),
                (n.src = o),
                void n.load()))
          : i(t)
      );
    });
  }
  function P(t) {
    let e, i;
    return (
      A(),
      (e = w(p, t)),
      j[e]
        ? Promise.resolve(j[e])
        : fetch(e)
            .then(t => {
              if (!t.ok) throw t;
              return t
                .clone()
                .json()
                .catch(() => t.text());
            })
            .then(
              n => (
                (i = _(e, window.location.href)),
                "object" == typeof n && f.set(n, i),
                (j[x(t)] = j[e] = j[i] = n),
                s("assetLoaded", n, t),
                n
              )
            )
    );
  }
  const k = () => {};
  function E() {
    let t = h();
    o().clearRect(0, 0, t.width, t.height);
  }
  let L = {},
    I = {},
    M = {
      13: "enter",
      27: "esc",
      32: "space",
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };
  function z(t) {
    let e = M[t.which];
    (I[e] = !0), L[e] && L[e](t);
  }
  function D(t) {
    I[M[t.which]] = !1;
  }
  function R() {
    I = {};
  }
  function W(t) {
    let e = t.substr(t.search(/[A-Z]/));
    return e[0].toLowerCase() + e.substr(1);
  }
  function C(t, e) {
    let i = t.indexOf(e);
    -1 !== i && t.splice(i, 1);
  }
  let T = [],
    N = [],
    U = {},
    q = [],
    F = {},
    K = { 0: "left", 1: "middle", 2: "right" },
    $ = { x: 0, y: 0, radius: 5 };
  function B(t) {
    let e = t.x,
      i = t.y;
    t.anchor && ((e -= t.width * t.anchor.x), (i -= t.height * t.anchor.y));
    let n = $.x - Math.max(e, Math.min($.x, e + t.width)),
      s = $.y - Math.max(i, Math.min($.y, i + t.height));
    return n * n + s * s < $.radius * $.radius;
  }
  function H() {
    let t,
      e,
      i = N.length ? N : T;
    for (let n = i.length - 1; n >= 0; n--)
      if (
        (e = (t = i[n]).collidesWithPointer ? t.collidesWithPointer($) : B(t))
      )
        return t;
  }
  function J(t) {
    let e = void 0 !== t.button ? K[t.button] : "left";
    (F[e] = !0), Q(t, "onDown");
  }
  function X(t) {
    let e = void 0 !== t.button ? K[t.button] : "left";
    (F[e] = !1), Q(t, "onUp");
  }
  function Y(t) {
    Q(t, "onOver");
  }
  function G() {
    F = {};
  }
  function Q(t, e) {
    let i,
      n,
      s = h();
    if (!s) return;
    -1 !== ["touchstart", "touchmove", "touchend"].indexOf(t.type)
      ? ((i = (t.touches[0] || t.changedTouches[0]).clientX),
        (n = (t.touches[0] || t.changedTouches[0]).clientY))
      : ((i = t.clientX), (n = t.clientY));
    let o = s.height / s.offsetHeight,
      r = s.getBoundingClientRect(),
      a = (i - r.left) * o,
      c = (n - r.top) * o;
    ($.x = a), ($.y = c), t.preventDefault();
    let l = H();
    l && l[e] && l[e](t), U[e] && U[e](t, l);
  }
  class V {
    constructor({ create: t, maxSize: e = 1024 } = {}) {
      (this._c = t),
        (this._i = 0),
        (this.objects = [t()]),
        (this.size = 1),
        (this.maxSize = e);
    }
    get(t = {}) {
      if (this.objects.length == this._i) {
        if (this.size === this.maxSize) return;
        for (
          let t = 0;
          t < this.size && this.objects.length < this.maxSize;
          t++
        )
          this.objects.unshift(this._c());
        this.size = this.objects.length;
      }
      let e = this.objects.shift();
      return e.init(t), this.objects.push(e), this._i++, e;
    }
    getAliveObjects() {
      return this.objects.slice(this.objects.length - this._i);
    }
    clear() {
      (this._i = this.objects.length = 0),
        (this.size = 1),
        this.objects.push(this._c());
    }
    update(t) {
      let e,
        i = this.size - 1,
        n = Math.max(this.objects.length - this._i, 0);
      for (; i >= n; )
        (e = this.objects[i]).update(t),
          e.isAlive()
            ? i--
            : ((this.objects = this.objects.splice(i, 1).concat(this.objects)),
              this._i--,
              n++);
    }
    render() {
      let t = Math.max(this.objects.length - this._i, 0);
      for (let e = this.size - 1; e >= t; e--) this.objects[e].render();
    }
  }
  function Z(t) {
    return new V(t);
  }
  function tt(t, e) {
    let i = [],
      n = e.x + e.width / 2,
      s = e.y + e.height / 2,
      h = t.y < s && t.y + t.height >= e.y,
      o = t.y + t.height >= s && t.y < e.y + e.height;
    return (
      t.x < n && t.x + t.width >= e.x && (h && i.push(0), o && i.push(2)),
      t.x + t.width >= n &&
        t.x < e.x + e.width &&
        (h && i.push(1), o && i.push(3)),
      i
    );
  }
  (Z.prototype = V.prototype), (Z.class = V);
  class et {
    constructor({ maxDepth: t = 3, maxObjects: e = 25, bounds: i } = {}) {
      (this.maxDepth = t), (this.maxObjects = e);
      let n = h();
      (this.bounds = i || { x: 0, y: 0, width: n.width, height: n.height }),
        (this._b = !1),
        (this._d = 0),
        (this._o = []),
        (this._s = []),
        (this._p = null);
    }
    clear() {
      this._s.map(function(t) {
        t.clear();
      }),
        (this._b = !1),
        (this._o.length = 0);
    }
    get(t) {
      let e,
        i,
        n = new Set();
      for (; this._s.length && this._b; ) {
        for (e = tt(t, this.bounds), i = 0; i < e.length; i++)
          this._s[e[i]].get(t).forEach(t => n.add(t));
        return Array.from(n);
      }
      return this._o.filter(e => e !== t);
    }
    add() {
      let t, e, i, n;
      for (e = 0; e < arguments.length; e++)
        if (((i = arguments[e]), Array.isArray(i))) this.add.apply(this, i);
        else if (this._b) this._a(i);
        else if (
          (this._o.push(i),
          this._o.length > this.maxObjects && this._d < this.maxDepth)
        ) {
          for (this._sp(), t = 0; (n = this._o[t]); t++) this._a(n);
          this._o.length = 0;
        }
    }
    _a(t, e, i) {
      for (e = tt(t, this.bounds), i = 0; i < e.length; i++)
        this._s[e[i]].add(t);
    }
    _sp(t, e, i) {
      if (((this._b = !0), !this._s.length))
        for (
          t = (this.bounds.width / 2) | 0,
            e = (this.bounds.height / 2) | 0,
            i = 0;
          i < 4;
          i++
        )
          (this._s[i] = it({
            bounds: {
              x: this.bounds.x + (i % 2 == 1 ? t : 0),
              y: this.bounds.y + (i >= 2 ? e : 0),
              width: t,
              height: e
            },
            maxDepth: this.maxDepth,
            maxObjects: this.maxObjects
          })),
            (this._s[i]._d = this._d + 1);
    }
  }
  function it(t) {
    return new et(t);
  }
  (it.prototype = et.prototype), (it.class = et);
  class nt {
    constructor(t = 0, e = 0) {
      (this._x = t), (this._y = e);
    }
    add(t, e = 1) {
      return st(this.x + (t.x || 0) * e, this.y + (t.y || 0) * e, this);
    }
    clamp(t, e, i, n) {
      (this._c = !0),
        (this._a = t),
        (this._b = e),
        (this._d = i),
        (this._e = n);
    }
    get x() {
      return this._x;
    }
    get y() {
      return this._y;
    }
    set x(t) {
      this._x = this._c ? Math.min(Math.max(this._a, t), this._d) : t;
    }
    set y(t) {
      this._y = this._c ? Math.min(Math.max(this._b, t), this._e) : t;
    }
  }
  function st(t, e, i = {}) {
    let n = new nt(t, e);
    return i._c && (n.clamp(i._a, i._b, i._d, i._e), (n.x = t), (n.y = e)), n;
  }
  (st.prototype = nt.prototype), (st.class = nt);
  class ht {
    constructor(t) {
      this.init(t);
    }
    init(t = {}) {
      let {
        x: e,
        y: i,
        dx: n,
        dy: s,
        ddx: h,
        ddy: r,
        width: a,
        height: c,
        image: l
      } = t;
      (this.position = st(e, i)),
        (this.velocity = st(n, s)),
        (this.acceleration = st(h, r)),
        (this.width = this.height = this.rotation = 0),
        (this.ttl = 1 / 0),
        (this.anchor = { x: 0, y: 0 }),
        (this.context = o());
      for (let e in t) this[e] = t[e];
      l &&
        ((this.width = void 0 !== a ? a : l.width),
        (this.height = void 0 !== c ? c : l.height));
    }
    get x() {
      return this.position.x;
    }
    get y() {
      return this.position.y;
    }
    get dx() {
      return this.velocity.x;
    }
    get dy() {
      return this.velocity.y;
    }
    get ddx() {
      return this.acceleration.x;
    }
    get ddy() {
      return this.acceleration.y;
    }
    get animations() {
      return this._a;
    }
    set x(t) {
      this.position.x = t;
    }
    set y(t) {
      this.position.y = t;
    }
    set dx(t) {
      this.velocity.x = t;
    }
    set dy(t) {
      this.velocity.y = t;
    }
    set ddx(t) {
      this.acceleration.x = t;
    }
    set ddy(t) {
      this.acceleration.y = t;
    }
    set animations(t) {
      let e, i;
      for (e in ((this._a = {}), t))
        (this._a[e] = t[e].clone()), (i = i || this._a[e]);
      (this.currentAnimation = i),
        (this.width = this.width || i.width),
        (this.height = this.height || i.height);
    }
    isAlive() {
      return this.ttl > 0;
    }
    collidesWith(t) {
      if (this.rotation || t.rotation) return null;
      let e = this.x - this.width * this.anchor.x,
        i = this.y - this.height * this.anchor.y,
        n = t.x,
        s = t.y;
      return (
        t.anchor && ((n -= t.width * t.anchor.x), (s -= t.height * t.anchor.y)),
        e < n + t.width &&
          e + this.width > n &&
          i < s + t.height &&
          i + this.height > s
      );
    }
    update(t) {
      this.advance(t);
    }
    render() {
      this.draw();
    }
    playAnimation(t) {
      (this.currentAnimation = this.animations[t]),
        this.currentAnimation.loop || this.currentAnimation.reset();
    }
    advance(t) {
      (this.velocity = this.velocity.add(this.acceleration, t)),
        (this.position = this.position.add(this.velocity, t)),
        this.ttl--,
        this.currentAnimation && this.currentAnimation.update(t);
    }
    draw() {
      let t = -this.width * this.anchor.x,
        e = -this.height * this.anchor.y;
      this.context.save(),
        this.context.translate(this.x, this.y),
        this.rotation && this.context.rotate(this.rotation),
        this.image
          ? this.context.drawImage(
              this.image,
              0,
              0,
              this.image.width,
              this.image.height,
              t,
              e,
              this.width,
              this.height
            )
          : this.currentAnimation
          ? this.currentAnimation.render({
              x: t,
              y: e,
              width: this.width,
              height: this.height,
              context: this.context
            })
          : ((this.context.fillStyle = this.color),
            this.context.fillRect(t, e, this.width, this.height)),
        this.context.restore();
    }
  }
  function ot(t) {
    return new ht(t);
  }
  function rt(t) {
    if (+t === t) return t;
    let e = [],
      i = t.split(".."),
      n = +i[0],
      s = +i[1],
      h = n;
    if (n < s) for (; h <= s; h++) e.push(h);
    else for (; h >= s; h--) e.push(h);
    return e;
  }
  (ot.prototype = ht.prototype), (ot.class = ht);
  class at {
    constructor({
      image: t,
      frameWidth: e,
      frameHeight: i,
      frameMargin: n,
      animations: s
    } = {}) {
      (this.animations = {}),
        (this.image = t),
        (this.frame = { width: e, height: i, margin: n }),
        (this._f = (t.width / e) | 0),
        this.createAnimations(s);
    }
    createAnimations(t) {
      let e, i;
      for (i in t) {
        let { frames: n, frameRate: s, loop: h } = t[i];
        (e = []),
          [].concat(n).map(t => {
            e = e.concat(rt(t));
          }),
          (this.animations[i] = a({
            spriteSheet: this,
            frames: e,
            frameRate: s,
            loop: h
          }));
      }
    }
  }
  function ct(t) {
    return new at(t);
  }
  return (
    (ct.prototype = at.prototype),
    (ct.class = at),
    {
      Animation: a,
      imageAssets: b,
      audioAssets: v,
      dataAssets: j,
      setImagePath: function(t) {
        g = t;
      },
      setAudioPath: function(t) {
        m = t;
      },
      setDataPath: function(t) {
        p = t;
      },
      loadImage: S,
      loadAudio: O,
      loadData: P,
      load: function(...t) {
        return (
          A(),
          Promise.all(
            t.map(t => {
              let e = y([].concat(t)[0]);
              return e.match(c) ? S(t) : e.match(l) ? O(t) : P(t);
            })
          )
        );
      },
      init: function(i) {
        return (
          (t =
            document.getElementById(i) ||
            i ||
            document.querySelector("canvas")),
          ((e = t.getContext("2d")).imageSmoothingEnabled = !1),
          s("init"),
          { canvas: t, context: e }
        );
      },
      getCanvas: h,
      getContext: o,
      on: n,
      off: function(t, e) {
        let n;
        !i[t] || (n = i[t].indexOf(e)) < 0 || i[t].splice(n, 1);
      },
      emit: s,
      GameLoop: function({
        fps: t = 60,
        clearCanvas: e = !0,
        update: i,
        render: n
      } = {}) {
        let h,
          o,
          r,
          a,
          c,
          l = 0,
          u = 1e3 / t,
          d = 1 / t,
          f = e ? E : k;
        function g() {
          if (
            ((o = requestAnimationFrame(g)),
            (r = performance.now()),
            (a = r - h),
            (h = r),
            !(a > 1e3))
          ) {
            for (s("tick"), l += a; l >= u; ) c.update(d), (l -= u);
            f(), c.render();
          }
        }
        return (c = {
          update: i,
          render: n,
          isStopped: !0,
          start() {
            (h = performance.now()),
              (this.isStopped = !1),
              requestAnimationFrame(g);
          },
          stop() {
            (this.isStopped = !0), cancelAnimationFrame(o);
          }
        });
      },
      keyMap: M,
      initKeys: function() {
        let t;
        for (t = 0; t < 26; t++) M[65 + t] = (10 + t).toString(36);
        for (t = 0; t < 10; t++) M[48 + t] = "" + t;
        window.addEventListener("keydown", z),
          window.addEventListener("keyup", D),
          window.addEventListener("blur", R);
      },
      bindKeys: function(t, e) {
        [].concat(t).map(t => (L[t] = e));
      },
      unbindKeys: function(t) {
        [].concat(t).map(t => (L[t] = 0));
      },
      keyPressed: function(t) {
        return !!I[t];
      },
      registerPlugin: function(t, e) {
        let i = t.prototype;
        i &&
          (i._inc ||
            ((i._inc = {}),
            (i._bInc = function(t, e, ...i) {
              return this._inc[e].before.reduce((e, i) => {
                let n = i(t, ...e);
                return n || e;
              }, i);
            }),
            (i._aInc = function(t, e, i, ...n) {
              return this._inc[e].after.reduce((e, i) => {
                let s = i(t, e, ...n);
                return s || e;
              }, i);
            })),
          Object.getOwnPropertyNames(e).forEach(t => {
            let n = W(t);
            i[n] &&
              (i["_o" + n] ||
                ((i["_o" + n] = i[n]),
                (i[n] = function(...t) {
                  let e = this._bInc(this, n, ...t),
                    s = i["_o" + n].call(this, ...e);
                  return this._aInc(this, n, s, ...t);
                })),
              i._inc[n] || (i._inc[n] = { before: [], after: [] }),
              t.startsWith("before")
                ? i._inc[n].before.push(e[t])
                : t.startsWith("after") && i._inc[n].after.push(e[t]));
          }));
      },
      unregisterPlugin: function(t, e) {
        let i = t.prototype;
        i &&
          i._inc &&
          Object.getOwnPropertyNames(e).forEach(t => {
            let n = W(t);
            t.startsWith("before")
              ? C(i._inc[n].before, e[t])
              : t.startsWith("after") && C(i._inc[n].after, e[t]);
          });
      },
      extendObject: function(t, e) {
        let i = t.prototype;
        i &&
          Object.getOwnPropertyNames(e).forEach(t => {
            i[t] || (i[t] = e[t]);
          });
      },
      initPointer: function() {
        let t = h();
        t.addEventListener("mousedown", J),
          t.addEventListener("touchstart", J),
          t.addEventListener("mouseup", X),
          t.addEventListener("touchend", X),
          t.addEventListener("blur", G),
          t.addEventListener("mousemove", Y),
          t.addEventListener("touchmove", Y),
          n("tick", () => {
            (N.length = 0),
              T.map(t => {
                N.push(t);
              }),
              (T.length = 0);
          });
      },
      pointer: $,
      track: function(t) {
        [].concat(t).map(t => {
          t._r ||
            ((t._r = t.render),
            (t.render = function() {
              T.push(this), this._r();
            }),
            q.push(t));
        });
      },
      untrack: function(t) {
        [].concat(t).map(t => {
          (t.render = t._r), (t._r = 0);
          let e = q.indexOf(t);
          -1 !== e && q.splice(e, 1);
        });
      },
      pointerOver: function(t) {
        return !!q.includes(t) && H() === t;
      },
      onPointerDown: function(t) {
        U.onDown = t;
      },
      onPointerUp: function(t) {
        U.onUp = t;
      },
      pointerPressed: function(t) {
        return !!F[t];
      },
      Pool: Z,
      Quadtree: it,
      Sprite: ot,
      SpriteSheet: ct,
      setStoreItem: function(t, e) {
        void 0 === e
          ? localStorage.removeItem(t)
          : localStorage.setItem(t, JSON.stringify(e));
      },
      getStoreItem: function(t) {
        let e = localStorage.getItem(t);
        try {
          e = JSON.parse(e);
        } catch (t) {}
        return e;
      },
      TileEngine: function(t = {}) {
        let {
            width: e,
            height: i,
            tilewidth: n,
            tileheight: s,
            context: r = o(),
            tilesets: a,
            layers: c
          } = t,
          l = e * n,
          u = i * s,
          d = document.createElement("canvas"),
          f = d.getContext("2d");
        (d.width = l), (d.height = u);
        let g = {},
          m = {},
          p = Object.assign(
            {
              context: r,
              mapwidth: l,
              mapheight: u,
              _sx: 0,
              _sy: 0,
              get sx() {
                return this._sx;
              },
              get sy() {
                return this._sy;
              },
              set sx(t) {
                this._sx = Math.min(Math.max(0, t), l - h().width);
              },
              set sy(t) {
                this._sy = Math.min(Math.max(0, t), u - h().height);
              },
              render() {
                x(d);
              },
              renderLayer(t) {
                let e = m[t],
                  i = g[t];
                e ||
                  (((e = document.createElement("canvas")).width = l),
                  (e.height = u),
                  (m[t] = e),
                  p._r(i, e.getContext("2d"))),
                  x(e);
              },
              layerCollidesWith(t, e) {
                let i = _(e.y),
                  n = w(e.x),
                  s = _(e.y + e.height),
                  h = w(e.x + e.width),
                  o = g[t];
                for (let t = i; t <= s; t++)
                  for (let e = n; e <= h; e++)
                    if (o.data[e + t * this.width]) return !0;
                return !1;
              },
              tileAtLayer(t, e) {
                let i = e.row || _(e.y),
                  n = e.col || w(e.x);
                return g[t] ? g[t].data[n + i * p.width] : -1;
              },
              setTileAtLayer(t, e, i) {
                let n = e.row || _(e.y),
                  s = e.col || w(e.x);
                g[t] && ((g[t].data[s + n * p.width] = i), y());
              },
              _r: function(t, e) {
                e.save(),
                  (e.globalAlpha = t.opacity),
                  t.data.map((t, i) => {
                    if (!t) return;
                    let n;
                    for (
                      let e = p.tilesets.length - 1;
                      e >= 0 && ((n = p.tilesets[e]), !(t / n.firstgid >= 1));
                      e--
                    );
                    let s = n.tilewidth || p.tilewidth,
                      h = n.tileheight || p.tileheight,
                      o = n.margin || 0,
                      r = n.image,
                      a = t - n.firstgid,
                      c = n.columns || (r.width / (s + o)) | 0,
                      l = (i % p.width) * s,
                      u = ((i / p.width) | 0) * h,
                      d = (a % c) * (s + o),
                      f = ((a / c) | 0) * (h + o);
                    e.drawImage(r, d, f, s, h, l, u, s, h);
                  }),
                  e.restore();
              }
            },
            t
          );
        function _(t) {
          return ((p.sy + t) / p.tileheight) | 0;
        }
        function w(t) {
          return ((p.sx + t) / p.tilewidth) | 0;
        }
        function y() {
          p.layers &&
            p.layers.map(t => {
              (g[t.name] = t), !1 !== t.visible && p._r(t, f);
            });
        }
        function x(t) {
          let { width: e, height: i } = h();
          p.context.drawImage(t, p.sx, p.sy, e, i, 0, 0, e, i);
        }
        return (
          p.tilesets.map(e => {
            let i =
              (window.__k ? window.__k.dm.get(t) : "") || window.location.href;
            if (e.source) {
              let t = window.__k.d[window.__k.u(e.source, i)];
              Object.keys(t).map(i => {
                e[i] = t[i];
              });
            }
            if ("" + e.image === e.image) {
              let t = window.__k.i[window.__k.u(e.image, i)];
              e.image = t;
            }
          }),
          y(),
          p
        );
      },
      Vector: st
    }
  );
})();
