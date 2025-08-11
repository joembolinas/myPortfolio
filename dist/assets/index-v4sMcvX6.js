import { r as K, a as Q, g as Y } from './vendor-DavUf6mE.js';
import { r as g, m as c, u as O, A as q, R as X } from './ui-Bz53u27h.js';
(function () {
  const n = document.createElement('link').relList;
  if (n && n.supports && n.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) l(r);
  new MutationObserver((r) => {
    for (const s of r)
      if (s.type === 'childList')
        for (const i of s.addedNodes) i.tagName === 'LINK' && i.rel === 'modulepreload' && l(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(r) {
    const s = {};
    return (
      r.integrity && (s.integrity = r.integrity),
      r.referrerPolicy && (s.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : r.crossOrigin === 'anonymous'
          ? (s.credentials = 'omit')
          : (s.credentials = 'same-origin'),
      s
    );
  }
  function l(r) {
    if (r.ep) return;
    r.ep = !0;
    const s = o(r);
    fetch(r.href, s);
  }
})();
var R = { exports: {} },
  P = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var E;
function ee() {
  if (E) return P;
  E = 1;
  var t = K(),
    n = Symbol.for('react.element'),
    o = Symbol.for('react.fragment'),
    l = Object.prototype.hasOwnProperty,
    r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(d, a, u) {
    var m,
      p = {},
      v = null,
      j = null;
    (u !== void 0 && (v = '' + u),
      a.key !== void 0 && (v = '' + a.key),
      a.ref !== void 0 && (j = a.ref));
    for (m in a) l.call(a, m) && !s.hasOwnProperty(m) && (p[m] = a[m]);
    if (d && d.defaultProps) for (m in ((a = d.defaultProps), a)) p[m] === void 0 && (p[m] = a[m]);
    return { $$typeof: n, type: d, key: v, ref: j, props: p, _owner: r.current };
  }
  return ((P.Fragment = o), (P.jsx = i), (P.jsxs = i), P);
}
var z;
function te() {
  return (z || ((z = 1), (R.exports = ee())), R.exports);
}
var e = te(),
  L = {},
  B;
function ie() {
  if (B) return L;
  B = 1;
  var t = Q();
  return ((L.createRoot = t.createRoot), (L.hydrateRoot = t.hydrateRoot), L);
}
var ne = ie();
const ae = Y(ne),
  re = [
    {
      type: 'email',
      icon: '📧',
      label: 'Email',
      value: 'bolinasjoem@gmail.com',
      url: 'mailto:bolinasjoem@gmail.com',
    },
    {
      type: 'linkedin',
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/joem',
      url: 'https://linkedin.com/in/joembolinas',
    },
    {
      type: 'github',
      icon: '💻',
      label: 'GitHub',
      value: 'github.com/joembolinas',
      url: 'https://github.com/joembolinas',
    },
  ],
  G = [
    { id: 'home', label: 'home', href: '#home' },
    { id: 'about', label: 'about', href: '#about' },
    { id: 'projects', label: 'projects', href: '#projects' },
    { id: 'learning-journey', label: 'journey', href: '#learning-journey' },
    { id: 'blog', label: 'blog', href: '#blog' },
    { id: 'websites', label: 'websites', href: '#websites' },
    { id: 'contact', label: 'contact', href: '#contact' },
  ],
  oe = (t) => {
    const [n, o] = g.useState(t[0]);
    return (
      g.useEffect(() => {
        const l = new Map(),
          r = (i) => {
            i.forEach((d) => {
              d.isIntersecting && o(d.target.id);
            });
          },
          s = new IntersectionObserver(r, { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' });
        return (
          t.forEach((i) => {
            const d = document.getElementById(i);
            d && (s.observe(d), l.set(i, s));
          }),
          () => {
            l.forEach((i) => i.disconnect());
          }
        );
      }, [t]),
      n
    );
  },
  _ = () => ({
    scrollToSection: g.useCallback((n) => {
      const o = document.getElementById(n);
      o && o.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []),
  }),
  se = () => {
    const t = G.map((r) => r.id),
      n = oe(t),
      { scrollToSection: o } = _(),
      l = (r) => {
        o(r);
      };
    return e.jsx('nav', {
      className: 'fixed top-0 w-full bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-800',
      children: e.jsx('div', {
        className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        children: e.jsxs('div', {
          className: 'flex justify-between items-center py-4',
          children: [
            e.jsx('div', {
              className: 'text-2xl font-bold text-blue-400',
              children: 'Joem Portfolio',
            }),
            e.jsx('div', {
              className: 'hidden md:flex space-x-8',
              children: G.map((r) =>
                e.jsx(
                  'button',
                  {
                    onClick: () => l(r.id),
                    className: `nav-link capitalize hover:text-blue-400 transition-colors duration-300 ${n === r.id ? 'text-blue-400' : 'text-gray-300'}`,
                    children: r.label,
                  },
                  r.id,
                ),
              ),
            }),
            e.jsx('div', {
              className: 'md:hidden',
              children: e.jsx('button', {
                className: 'text-gray-300 hover:text-blue-400',
                children: e.jsx('svg', {
                  className: 'w-6 h-6',
                  fill: 'none',
                  stroke: 'currentColor',
                  viewBox: '0 0 24 24',
                  children: e.jsx('path', {
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 2,
                    d: 'M4 6h16M4 12h16M4 18h16',
                  }),
                }),
              }),
            }),
          ],
        }),
      }),
    });
  },
  le = () =>
    e.jsx('footer', {
      className: 'py-8 text-center border-t border-gray-800 relative z-10',
      children: e.jsx('p', {
        className: 'text-gray-400',
        children: '© 2024 Joem Portfolio. Built with React & Tailwind CSS.',
      }),
    }),
  S = ({
    children: t,
    variant: n = 'primary',
    size: o = 'md',
    onClick: l,
    className: r = '',
    disabled: s = !1,
  }) => {
    const i =
        'font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      d = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary:
          'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
        outline: 'border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white',
      },
      a = { sm: 'px-4 py-2 text-sm', md: 'px-8 py-3', lg: 'px-10 py-4 text-lg' },
      u = s ? 'opacity-50 cursor-not-allowed hover:scale-100' : '';
    return e.jsx('button', {
      onClick: s ? void 0 : l,
      className: `${i} ${d[n]} ${a[o]} ${u} ${r}`,
      disabled: s,
      children: t,
    });
  },
  ce = ({
    particleCount: t = 50,
    colors: n = ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.2)', 'rgba(236, 72, 153, 0.2)'],
    maxSize: o = 4,
    minSize: l = 1,
    speed: r = 0.5,
    className: s = '',
    enableMouse: i = !0,
  }) => {
    const [d, a] = g.useState([]),
      [u, m] = g.useState({ x: 0, y: 0 }),
      [p, v] = g.useState({ width: 0, height: 0 }),
      j = g.useMemo(
        () =>
          Array.from({ length: t }, (h, y) => ({
            id: y,
            x: Math.random() * (p.width || window.innerWidth),
            y: Math.random() * (p.height || window.innerHeight),
            size: Math.random() * (o - l) + l,
            opacity: Math.random() * 0.5 + 0.1,
            speedX: (Math.random() - 0.5) * r,
            speedY: (Math.random() - 0.5) * r,
            color: n[Math.floor(Math.random() * n.length)],
          })),
        [t, n, o, l, r, p],
      );
    return (
      g.useEffect(() => {
        const h = () => {
          v({ width: window.innerWidth, height: window.innerHeight });
        };
        return (
          h(),
          window.addEventListener('resize', h),
          () => window.removeEventListener('resize', h)
        );
      }, []),
      g.useEffect(() => {
        a(j);
      }, [j]),
      g.useEffect(() => {
        const h = (y) => {
          i && m({ x: y.clientX, y: y.clientY });
        };
        if (i)
          return (
            window.addEventListener('mousemove', h),
            () => window.removeEventListener('mousemove', h)
          );
      }, [i]),
      g.useEffect(() => {
        const y = setInterval(() => {
          a((k) =>
            k.map((f) => {
              let b = f.x + f.speedX,
                w = f.y + f.speedY;
              if (i) {
                const D = u.x - f.x,
                  A = u.y - f.y,
                  I = Math.sqrt(D * D + A * A);
                if (I < 100) {
                  const H = (100 - I) / 100;
                  ((b -= (D / I) * H * 2), (w -= (A / I) * H * 2));
                }
              }
              return (
                b < 0 && (b = p.width),
                b > p.width && (b = 0),
                w < 0 && (w = p.height),
                w > p.height && (w = 0),
                { ...f, x: b, y: w }
              );
            }),
          );
        }, 50);
        return () => clearInterval(y);
      }, [u, p, i]),
      e.jsx('div', {
        className: `absolute inset-0 overflow-hidden pointer-events-none ${s}`,
        children: e.jsxs('svg', {
          width: '100%',
          height: '100%',
          className: 'absolute inset-0',
          children: [
            d.map((h) =>
              e.jsx(
                c.circle,
                {
                  cx: h.x,
                  cy: h.y,
                  r: h.size,
                  fill: h.color,
                  initial: { opacity: 0 },
                  animate: { opacity: h.opacity, scale: [1, 1.2, 1] },
                  transition: {
                    opacity: { duration: 2 },
                    scale: { duration: 3 + Math.random() * 2, repeat: 1 / 0, ease: 'easeInOut' },
                  },
                },
                h.id,
              ),
            ),
            d.map((h, y) =>
              d.slice(y + 1).map((k, f) => {
                const b = Math.sqrt(Math.pow(h.x - k.x, 2) + Math.pow(h.y - k.y, 2));
                if (b < 150) {
                  const w = ((150 - b) / 150) * 0.1;
                  return e.jsx(
                    c.line,
                    {
                      x1: h.x,
                      y1: h.y,
                      x2: k.x,
                      y2: k.y,
                      stroke: 'rgba(59, 130, 246, 0.2)',
                      strokeWidth: '1',
                      opacity: w,
                    },
                    `${y}-${f}`,
                  );
                }
                return null;
              }),
            ),
          ],
        }),
      })
    );
  },
  x = ({
    children: t,
    delay: n = 0,
    duration: o = 0.6,
    direction: l = 'up',
    distance: r = 50,
    className: s = '',
    stagger: i = !1,
    staggerDelay: d = 0.1,
  }) => {
    const a = g.useRef(null),
      u = O(a, { once: !0, margin: '-10% 0px -10% 0px' }),
      p = {
        hidden: (() => {
          switch (l) {
            case 'up':
              return { y: r, opacity: 0 };
            case 'down':
              return { y: -r, opacity: 0 };
            case 'left':
              return { x: r, opacity: 0 };
            case 'right':
              return { x: -r, opacity: 0 };
            default:
              return { y: r, opacity: 0 };
          }
        })(),
        visible: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            duration: o,
            delay: n,
            ease: [0.25, 0.4, 0.25, 1],
            ...(i && { staggerChildren: d, delayChildren: n }),
          },
        },
      };
    return e.jsx(c.div, {
      ref: a,
      variants: p,
      initial: 'hidden',
      animate: u ? 'visible' : 'hidden',
      className: s,
      children: t,
    });
  },
  T = ({ children: t, className: n = '' }) => {
    const o = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
    };
    return e.jsx(c.div, { variants: o, className: n, children: t });
  },
  de = ({ texts: t, interval: n = 3e3, className: o = '', animationDuration: l = 0.5 }) => {
    const [r, s] = g.useState(0);
    g.useEffect(() => {
      if (t.length <= 1) return;
      const d = setInterval(() => {
        s((a) => (a + 1) % t.length);
      }, n);
      return () => clearInterval(d);
    }, [t.length, n]);
    const i = {
      enter: { x: 20, opacity: 0 },
      center: { x: 0, opacity: 1 },
      exit: { x: -20, opacity: 0 },
    };
    return e.jsx('div', {
      className: `relative inline-block ${o}`,
      children: e.jsx(q, {
        mode: 'wait',
        children: e.jsx(
          c.span,
          {
            variants: i,
            initial: 'enter',
            animate: 'center',
            exit: 'exit',
            transition: { duration: l, ease: 'easeInOut' },
            className: 'block',
            children: t[r],
          },
          r,
        ),
      }),
    });
  },
  me = () => {
    const { scrollToSection: t } = _(),
      n = [
        'Full Stack Developer',
        'Frontend Specialist',
        'React Enthusiast',
        'Career Changer',
        'Problem Solver',
      ];
    return e.jsxs('section', {
      id: 'home',
      className: 'min-h-screen flex items-center justify-center px-4 relative overflow-hidden',
      children: [
        e.jsx(ce, {
          particleCount: 100,
          colors: ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.2)'],
          className: 'absolute inset-0',
        }),
        e.jsxs('div', {
          className: 'text-center max-w-4xl mx-auto relative z-10',
          children: [
            e.jsx(c.div, {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.2 },
              children: e.jsxs('h1', {
                className: 'text-5xl md:text-7xl font-bold mb-6 gradient-text',
                children: [
                  "Hello, I'm",
                  ' ',
                  e.jsxs('span', {
                    className: 'relative',
                    children: [
                      'Joem',
                      e.jsx(c.div, {
                        className:
                          'absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25',
                        animate: { scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] },
                        transition: { duration: 3, repeat: 1 / 0, repeatType: 'loop' },
                      }),
                    ],
                  }),
                ],
              }),
            }),
            e.jsx(x, {
              delay: 0.4,
              children: e.jsxs('div', {
                className: 'text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed',
                children: [
                  e.jsx(de, {
                    texts: n,
                    className:
                      'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold',
                    interval: 3e3,
                  }),
                  e.jsx('div', {
                    className: 'mt-2',
                    children:
                      'passionate about creating beautiful, functional, and user-friendly applications',
                  }),
                ],
              }),
            }),
            e.jsx(x, {
              delay: 0.6,
              children: e.jsxs('div', {
                className: 'flex flex-col sm:flex-row gap-4 justify-center',
                children: [
                  e.jsx(c.div, {
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    children: e.jsx(S, {
                      variant: 'primary',
                      onClick: () => t('projects'),
                      className:
                        'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300',
                      children: 'View My Work',
                    }),
                  }),
                  e.jsx(c.div, {
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    children: e.jsx(S, {
                      variant: 'outline',
                      onClick: () => t('learning-journey'),
                      className:
                        'border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300',
                      children: 'My Journey',
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(c.div, {
              className: 'absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full opacity-60',
              animate: { y: [0, -20, 0], opacity: [0.6, 1, 0.6] },
              transition: { duration: 4, repeat: 1 / 0, delay: 1 },
            }),
            e.jsx(c.div, {
              className:
                'absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-500 rounded-full opacity-40',
              animate: { y: [0, 15, 0], opacity: [0.4, 0.8, 0.4] },
              transition: { duration: 3.5, repeat: 1 / 0, delay: 2 },
            }),
          ],
        }),
      ],
    });
  },
  U = ({
    children: t,
    className: n = '',
    staggerDelay: o = 0.1,
    animationType: l = 'fade',
    direction: r = 'up',
  }) => {
    const s = g.useRef(null),
      i = O(s, { once: !0, margin: '-10% 0px -10% 0px' }),
      a = (() => {
        const m = { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] };
        switch (l) {
          case 'slide':
            return {
              container: { hidden: {}, visible: { transition: { staggerChildren: o } } },
              item: {
                hidden: (() => {
                  switch (r) {
                    case 'up':
                      return { y: 50, opacity: 0 };
                    case 'down':
                      return { y: -50, opacity: 0 };
                    case 'left':
                      return { x: 50, opacity: 0 };
                    case 'right':
                      return { x: -50, opacity: 0 };
                  }
                })(),
                visible: { x: 0, y: 0, opacity: 1, transition: m },
              },
            };
          case 'scale':
            return {
              container: { hidden: {}, visible: { transition: { staggerChildren: o } } },
              item: {
                hidden: { scale: 0.8, opacity: 0 },
                visible: { scale: 1, opacity: 1, transition: m },
              },
            };
          case 'rotate':
            return {
              container: { hidden: {}, visible: { transition: { staggerChildren: o } } },
              item: {
                hidden: { rotate: -10, scale: 0.9, opacity: 0 },
                visible: { rotate: 0, scale: 1, opacity: 1, transition: m },
              },
            };
          default:
            return {
              container: { hidden: {}, visible: { transition: { staggerChildren: o } } },
              item: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: m } },
            };
        }
      })(),
      u = g.Children.toArray(t);
    return e.jsx(c.div, {
      ref: s,
      variants: a.container,
      initial: 'hidden',
      animate: i ? 'visible' : 'hidden',
      className: n,
      children: u.map((m, p) => e.jsx(c.div, { variants: a.item, children: m }, p)),
    });
  },
  M = ({
    children: t,
    className: n = '',
    liftHeight: o = 8,
    glowIntensity: l = 'medium',
    disabled: r = !1,
  }) => {
    const [s, i] = g.useState(!1),
      d = {
        subtle: '0 4px 20px rgba(59, 130, 246, 0.15)',
        medium: '0 8px 30px rgba(59, 130, 246, 0.25)',
        strong: '0 12px 40px rgba(59, 130, 246, 0.35)',
      },
      a = {
        rest: {
          y: 0,
          scale: 1,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] },
        },
        hover: {
          y: -o,
          scale: 1.02,
          boxShadow: d[l],
          transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] },
        },
      };
    return r
      ? e.jsx('div', { className: n, children: t })
      : e.jsxs(c.div, {
          variants: a,
          initial: 'rest',
          whileHover: 'hover',
          onHoverStart: () => i(!0),
          onHoverEnd: () => i(!1),
          className: `cursor-pointer ${n}`,
          style: { borderRadius: '0.75rem', transformOrigin: 'center' },
          children: [
            t,
            s &&
              e.jsx(c.div, {
                className:
                  'absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 pointer-events-none',
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.2 },
              }),
          ],
        });
  },
  pe = ({ children: t, className: n = '' }) =>
    e.jsx(M, {
      liftHeight: 12,
      glowIntensity: 'strong',
      className: `relative overflow-hidden ${n}`,
      children: t,
    }),
  F = ({ children: t, className: n = '' }) =>
    e.jsx(M, { liftHeight: 6, glowIntensity: 'subtle', className: `relative ${n}`, children: t }),
  ge = [
    { name: 'React', category: 'dev', proficiency: 'intermediate', icon: 'react' },
    { name: 'JavaScript', category: 'dev', proficiency: 'intermediate', icon: 'javascript' },
    { name: 'TypeScript', category: 'dev', proficiency: 'beginner', icon: 'typescript' },
    { name: 'HTML5', category: 'dev', proficiency: 'intermediate', icon: 'html' },
    { name: 'CSS3', category: 'dev', proficiency: 'intermediate', icon: 'css' },
    { name: 'Tailwind CSS', category: 'dev', proficiency: 'intermediate', icon: 'tailwind' },
    { name: 'Node.js', category: 'dev', proficiency: 'beginner', icon: 'nodejs' },
    { name: 'Python', category: 'dev', proficiency: 'beginner', icon: 'python' },
    { name: 'Git & GitHub', category: 'dev', proficiency: 'intermediate', icon: 'git' },
    { name: 'Vite', category: 'dev', proficiency: 'beginner', icon: 'vite' },
    { name: 'Network Security', category: 'network', proficiency: 'beginner', icon: 'shield' },
    { name: 'Linux/Unix', category: 'network', proficiency: 'beginner', icon: 'linux' },
    { name: 'Ethical Hacking', category: 'network', proficiency: 'beginner', icon: 'hack' },
    { name: 'Security Tools', category: 'network', proficiency: 'beginner', icon: 'tools' },
    { name: 'TryHackMe', category: 'network', proficiency: 'beginner', icon: 'tryhackme' },
    { name: 'Penetration Testing', category: 'network', proficiency: 'beginner', icon: 'pentest' },
    { name: 'Data Analysis', category: 'data', proficiency: 'beginner', icon: 'chart' },
    { name: 'SQL', category: 'data', proficiency: 'beginner', icon: 'database' },
    { name: 'PostgreSQL', category: 'data', proficiency: 'beginner', icon: 'postgresql' },
    { name: 'MongoDB', category: 'data', proficiency: 'beginner', icon: 'mongodb' },
    {
      name: 'Data Visualization',
      category: 'data',
      proficiency: 'beginner',
      icon: 'visualization',
    },
    { name: 'Machine Learning', category: 'data', proficiency: 'beginner', icon: 'ai' },
  ],
  ue = {
    dev: {
      title: 'Development',
      description: 'Frontend & backend development technologies',
      color: 'from-blue-500 to-cyan-500',
      icon: '💻',
    },
    network: {
      title: 'Network & CyberSec',
      description: 'Security, networking, and ethical hacking',
      color: 'from-red-500 to-orange-500',
      icon: '🔒',
    },
    data: {
      title: 'Data Analytics & AI',
      description: 'Data analysis, databases, and machine learning',
      color: 'from-green-500 to-emerald-500',
      icon: '📊',
    },
  },
  he = (t) => ge.filter((n) => n.category === t),
  xe = () => {
    const [t, n] = g.useState({
      isLowEnd: !1,
      connectionSpeed: 'unknown',
      reducedMotion: !1,
      shouldReduceAnimations: !1,
    });
    return (
      g.useEffect(() => {
        const o = () => {
          const s = window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            i = window.navigator,
            d = i.deviceMemory || 4,
            a = i.connection || i.mozConnection || i.webkitConnection,
            u = a
              ? a.effectiveType === 'slow-2g' || a.effectiveType === '2g'
                ? 'slow'
                : 'fast'
              : 'unknown',
            m = d < 2 || u === 'slow' || i.hardwareConcurrency < 4,
            p = t.memory
              ? {
                  totalJSHeapSize: t.memory.totalJSHeapSize,
                  usedJSHeapSize: t.memory.usedJSHeapSize,
                  jsHeapSizeLimit: t.memory.jsHeapSizeLimit,
                }
              : void 0;
          n({
            isLowEnd: m,
            memoryInfo: p,
            connectionSpeed: u,
            reducedMotion: s,
            shouldReduceAnimations: m || s,
          });
        };
        o();
        const l = window.matchMedia('(prefers-reduced-motion: reduce)'),
          r = () => o();
        return (l.addEventListener('change', r), () => l.removeEventListener('change', r));
      }, []),
      t
    );
  },
  ye = () => {
    const [t, n] = g.useState(60),
      [o, l] = g.useState(!0);
    return (
      g.useEffect(() => {
        let r = 0,
          s = performance.now(),
          i = [];
        const d = () => {
            r++;
            const u = performance.now();
            if (u >= s + 1e3) {
              const m = Math.round((r * 1e3) / (u - s));
              (i.push(m), i.length > 10 && (i = i.slice(-10)));
              const p = i.reduce((v, j) => v + j, 0) / i.length;
              (n(Math.round(p)), l(p > 30), (r = 0), (s = u));
            }
            requestAnimationFrame(d);
          },
          a = requestAnimationFrame(d);
        return () => cancelAnimationFrame(a);
      }, []),
      { fps: t, isStable: o }
    );
  },
  V = () => {
    const t = xe(),
      { fps: n, isStable: o } = ye();
    return {
      ...t,
      fps: n,
      isStable: o,
      config:
        t.shouldReduceAnimations || !o || n < 30
          ? { duration: 0.3, particles: !1, heavyEffects: !1, staggerDelay: 0.05, quality: 'low' }
          : t.isLowEnd || n < 50
            ? {
                duration: 0.4,
                particles: !1,
                heavyEffects: !1,
                staggerDelay: 0.08,
                quality: 'medium',
              }
            : {
                duration: 0.6,
                particles: !0,
                heavyEffects: !0,
                staggerDelay: 0.1,
                quality: 'high',
              },
    };
  },
  fe = () => {
    const { config: t } = V(),
      n = [
        { label: 'Years Experience', value: '2+', description: 'Learning & Building' },
        { label: 'Projects Completed', value: '5+', description: 'Portfolio & Practice' },
        { label: 'Technologies', value: '15+', description: 'And Growing' },
        { label: 'LeetCode Problems', value: '50+', description: 'Problem Solving' },
      ];
    return e.jsxs('section', {
      id: 'about',
      className: 'py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative',
      children: [
        e.jsx('div', {
          className: 'absolute inset-0 opacity-5',
          children: e.jsx('div', {
            className:
              "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzMzMzMzMyIvPgogIDwvZz4KPHN2Zz4K')] repeat",
          }),
        }),
        e.jsxs('div', {
          className: 'max-w-6xl mx-auto relative z-10',
          children: [
            e.jsx(x, {
              children: e.jsxs('div', {
                className: 'text-center mb-16',
                children: [
                  e.jsx(c.h2, {
                    className:
                      'text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent',
                    ...(t.quality === 'high' && {
                      animate: { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] },
                      transition: { duration: 5, repeat: 1 / 0, ease: 'linear' },
                    }),
                    children: 'About Me',
                  }),
                  e.jsx('p', {
                    className: 'text-xl text-gray-300 max-w-2xl mx-auto',
                    children:
                      'From administration to code - building bridges between business operations and technology solutions',
                  }),
                ],
              }),
            }),
            e.jsx(x, {
              direction: 'up',
              className: 'mb-20',
              children: e.jsxs('div', {
                className: 'grid lg:grid-cols-2 gap-12 items-center',
                children: [
                  e.jsxs('div', {
                    className: 'space-y-6',
                    children: [
                      e.jsx('h3', {
                        className: 'text-3xl font-semibold text-white mb-6',
                        children: 'My Journey',
                      }),
                      e.jsxs(U, {
                        animationType: 'slide',
                        direction: 'left',
                        staggerDelay: t.staggerDelay,
                        children: [
                          e.jsxs('p', {
                            className: 'text-gray-300 leading-relaxed text-lg',
                            children: [
                              'As a ',
                              e.jsx('span', {
                                className: 'text-blue-400 font-semibold',
                                children: '2nd year college student',
                              }),
                              ' and former',
                              e.jsx('span', {
                                className: 'text-emerald-400 font-semibold',
                                children: ' Senior Administrative Officer',
                              }),
                              ', I bring a unique perspective to software development that combines ',
                              e.jsx('span', {
                                className: 'text-purple-400 font-semibold',
                                children: '5+ years of business operations experience',
                              }),
                              ' with growing technical expertise.',
                            ],
                          }),
                          e.jsxs('p', {
                            className: 'text-gray-300 leading-relaxed text-lg',
                            children: [
                              "My transition from government administration to technology isn't just a career change—it's about applying",
                              e.jsx('span', {
                                className: 'text-blue-400 font-semibold',
                                children:
                                  ' systematic thinking, project management skills, and stakeholder communication',
                              }),
                              ' to create software solutions that actually solve real-world problems.',
                            ],
                          }),
                          e.jsxs('p', {
                            className: 'text-gray-300 leading-relaxed text-lg',
                            children: [
                              'Currently focused on ',
                              e.jsx('span', {
                                className: 'text-emerald-400 font-semibold',
                                children: 'frontend development with React and TypeScript',
                              }),
                              ', while exploring cybersecurity through ',
                              e.jsx('span', {
                                className: 'text-red-400 font-semibold',
                                children: 'TryHackMe',
                              }),
                              ' and strengthening algorithmic thinking via ',
                              e.jsx('span', {
                                className: 'text-yellow-400 font-semibold',
                                children: 'LeetCode',
                              }),
                              '.',
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsx('div', {
                    className: 'grid grid-cols-2 gap-4',
                    children: n.map((o, l) =>
                      e.jsx(
                        T,
                        {
                          children: e.jsx(F, {
                            className:
                              'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl text-center',
                            children: e.jsxs(c.div, {
                              initial: { scale: 0.5, opacity: 0 },
                              animate: { scale: 1, opacity: 1 },
                              transition: { delay: l * 0.1, duration: 0.5 },
                              children: [
                                e.jsx('div', {
                                  className: 'text-3xl font-bold text-blue-400 mb-2',
                                  children: o.value,
                                }),
                                e.jsx('div', {
                                  className: 'text-sm font-semibold text-white mb-1',
                                  children: o.label,
                                }),
                                e.jsx('div', {
                                  className: 'text-xs text-gray-400',
                                  children: o.description,
                                }),
                              ],
                            }),
                          }),
                        },
                        o.label,
                      ),
                    ),
                  }),
                ],
              }),
            }),
            e.jsx(x, {
              direction: 'up',
              delay: 0.2,
              children: e.jsxs('div', {
                className: 'space-y-12',
                children: [
                  e.jsxs('div', {
                    className: 'text-center',
                    children: [
                      e.jsx('h3', {
                        className: 'text-3xl font-semibold text-white mb-4',
                        children: 'Skills & Technologies',
                      }),
                      e.jsx('p', {
                        className: 'text-gray-300 text-lg max-w-3xl mx-auto',
                        children:
                          'Building a comprehensive skill set across development, security, and data analysis',
                      }),
                    ],
                  }),
                  e.jsx('div', {
                    className: 'grid lg:grid-cols-3 gap-8',
                    children: Object.entries(ue).map(([o, l]) => {
                      const r = he(o);
                      return e.jsx(
                        T,
                        {
                          children: e.jsxs('div', {
                            className:
                              'bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 h-full',
                            children: [
                              e.jsxs('div', {
                                className: 'text-center mb-6',
                                children: [
                                  e.jsx('div', { className: 'text-4xl mb-3', children: l.icon }),
                                  e.jsx('h4', {
                                    className: 'text-xl font-semibold text-white mb-2',
                                    children: l.title,
                                  }),
                                  e.jsx('p', {
                                    className: 'text-gray-400 text-sm',
                                    children: l.description,
                                  }),
                                ],
                              }),
                              e.jsx('div', {
                                className: 'space-y-3',
                                children: r.map((s) =>
                                  e.jsx(
                                    F,
                                    {
                                      children: e.jsx('div', {
                                        className: 'bg-gray-700/80 px-4 py-3 rounded-lg',
                                        children: e.jsxs('div', {
                                          className: 'flex items-center justify-between',
                                          children: [
                                            e.jsx('span', {
                                              className: 'text-white font-medium',
                                              children: s.name,
                                            }),
                                            e.jsx('span', {
                                              className: `text-xs px-2 py-1 rounded-full ${s.proficiency === 'advanced' ? 'bg-green-500/20 text-green-400' : s.proficiency === 'intermediate' ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`,
                                              children: s.proficiency,
                                            }),
                                          ],
                                        }),
                                      }),
                                    },
                                    s.name,
                                  ),
                                ),
                              }),
                            ],
                          }),
                        },
                        o,
                      );
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(x, {
              direction: 'up',
              delay: 0.4,
              className: 'text-center mt-16',
              children: e.jsxs('div', {
                className:
                  'bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8',
                children: [
                  e.jsx('h4', {
                    className: 'text-2xl font-semibold text-white mb-4',
                    children: 'Ready to Collaborate',
                  }),
                  e.jsx('p', {
                    className: 'text-gray-300 text-lg mb-6 max-w-2xl mx-auto',
                    children:
                      "Looking for opportunities to contribute to meaningful projects and grow alongside experienced developers. Let's build something amazing together!",
                  }),
                  e.jsx(c.button, {
                    className:
                      'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300',
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    onClick: () =>
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
                    children: 'Get In Touch',
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  },
  be = [
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB'],
      gradient: 'from-blue-500 to-cyan-500',
      demoUrl: '#',
      sourceUrl: '#',
    },
    {
      id: 'task-management',
      title: 'Task Management App',
      description: 'A collaborative task management tool with real-time updates',
      technologies: ['React', 'Socket.io', 'PostgreSQL'],
      gradient: 'from-purple-500 to-pink-500',
      demoUrl: '#',
      sourceUrl: '#',
    },
    {
      id: 'weather-dashboard',
      title: 'Weather Dashboard',
      description: 'A responsive weather app with geolocation and forecasting',
      technologies: ['JavaScript', 'API Integration', 'CSS3'],
      gradient: 'from-green-500 to-teal-500',
      demoUrl: '#',
      sourceUrl: '#',
    },
  ],
  W = ({ children: t, className: n = '', gradient: o = '', hover: l = !0 }) => {
    const r = 'bg-gray-800 rounded-xl overflow-hidden border border-gray-600/50',
      s = l
        ? 'hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50'
        : '',
      i = o ? `bg-gradient-to-br ${o}` : '';
    return e.jsx('div', { className: `${r} ${s} ${i} ${n}`, children: t });
  },
  ve = ({ project: t }) =>
    e.jsx(M, {
      className: 'h-full',
      children: e.jsxs(W, {
        className: 'group h-full overflow-hidden',
        children: [
          e.jsxs('div', {
            className: `h-48 bg-gradient-to-br ${t.gradient} relative overflow-hidden`,
            children: [
              e.jsx(c.div, {
                className:
                  'absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300',
                whileHover: { scale: 1.05, transition: { duration: 0.3 } },
              }),
              e.jsx('div', {
                className:
                  'absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                children: e.jsx('div', {
                  className: 'flex gap-1',
                  children: t.technologies
                    .slice(0, 3)
                    .map((n, o) =>
                      e.jsx(
                        c.div,
                        {
                          className: 'w-2 h-2 bg-white rounded-full',
                          initial: { scale: 0 },
                          whileInView: { scale: 1 },
                          transition: { delay: o * 0.1 },
                        },
                        n,
                      ),
                    ),
                }),
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'p-6 flex flex-col flex-grow',
            children: [
              e.jsx(c.h3, {
                className:
                  'text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300',
                whileHover: { x: 2 },
                children: t.title,
              }),
              e.jsx('p', {
                className: 'text-gray-400 mb-4 flex-grow leading-relaxed',
                children: t.description,
              }),
              e.jsx('div', {
                className: 'flex flex-wrap gap-2 mb-6',
                children: t.technologies.map((n, o) =>
                  e.jsx(
                    c.span,
                    {
                      className:
                        'px-3 py-1 bg-gray-700 text-xs rounded-full hover:bg-blue-600 transition-colors duration-200',
                      whileHover: { scale: 1.05 },
                      initial: { opacity: 0, y: 10 },
                      whileInView: { opacity: 1, y: 0 },
                      transition: { delay: o * 0.05 },
                      children: n,
                    },
                    n,
                  ),
                ),
              }),
              e.jsxs('div', {
                className: 'flex gap-3 mt-auto',
                children: [
                  e.jsx(c.div, {
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.98 },
                    className: 'flex-1',
                    children: e.jsx(S, {
                      size: 'sm',
                      className:
                        'w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
                      onClick: () => window.open(t.demoUrl, '_blank'),
                      children: 'Live Demo',
                    }),
                  }),
                  e.jsx(c.div, {
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.98 },
                    className: 'flex-1',
                    children: e.jsx(S, {
                      variant: 'outline',
                      size: 'sm',
                      className: 'w-full border-gray-600 hover:border-blue-500 hover:text-blue-400',
                      onClick: () => window.open(t.sourceUrl, '_blank'),
                      children: 'Source',
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  we = () =>
    e.jsx('section', {
      id: 'projects',
      className: 'py-20 px-4 relative',
      children: e.jsxs('div', {
        className: 'max-w-6xl mx-auto',
        children: [
          e.jsx(x, {
            children: e.jsxs('div', {
              className: 'text-center mb-16',
              children: [
                e.jsx(c.h2, {
                  className:
                    'text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent',
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  viewport: { once: !0 },
                  children: 'Featured Projects',
                }),
                e.jsx(c.p, {
                  className: 'text-lg text-gray-300 max-w-2xl mx-auto',
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  transition: { duration: 0.6, delay: 0.2 },
                  viewport: { once: !0 },
                  children:
                    'A collection of projects showcasing my journey from career transition to full-stack development',
                }),
              ],
            }),
          }),
          e.jsx(U, {
            className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
            staggerDelay: 0.1,
            children: be.map((t, n) =>
              e.jsx(
                c.div,
                {
                  className: 'h-full',
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay: n * 0.1, ease: 'easeOut' },
                  viewport: { once: !0, margin: '-50px' },
                  whileHover: { y: -5 },
                  children: e.jsx(ve, { project: t }),
                },
                t.id,
              ),
            ),
          }),
          e.jsx(x, {
            delay: 0.4,
            children: e.jsx(c.div, {
              className: 'text-center mt-16',
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              transition: { duration: 0.6, delay: 0.4 },
              viewport: { once: !0 },
              children: e.jsxs(c.div, {
                className:
                  'inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300',
                whileHover: { scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' },
                whileTap: { scale: 0.98 },
                children: [
                  e.jsx('svg', {
                    className: 'w-5 h-5',
                    fill: 'currentColor',
                    viewBox: '0 0 24 24',
                    children: e.jsx('path', {
                      d: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
                    }),
                  }),
                  e.jsx('span', {
                    className: 'text-gray-300',
                    children: 'View more projects on GitHub',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    }),
  N = [
    {
      id: 'career-start',
      title: 'Senior Admin/Procurement Officer',
      period: '2018-2023',
      category: 'work',
      description:
        'Building foundational business and organizational skills in government service.',
      expandedContent: {
        overview:
          'Developed comprehensive administrative and procurement expertise while managing complex projects and stakeholder relationships in a fast-paced government environment.',
        keyLearnings: [
          'Project management and deadline coordination',
          'Stakeholder communication and relationship building',
          'Process optimization and workflow improvement',
          'Budget management and financial oversight',
          'Compliance and regulatory understanding',
        ],
        achievements: [
          'Streamlined procurement processes, reducing processing time by 30%',
          'Managed multi-million peso procurement projects',
          'Led cross-departmental collaboration initiatives',
          'Implemented digital filing systems improving efficiency',
        ],
        challenges: [
          'Balancing multiple competing priorities and deadlines',
          'Navigating complex regulatory requirements',
          'Managing stakeholder expectations across departments',
        ],
        nextSteps: [
          'Transition skills to tech industry',
          'Apply organizational skills to software development',
          'Leverage communication skills in technical teams',
        ],
      },
      icon: '💼',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'college-return',
      title: 'College Return - 2nd Year Student',
      period: '2023-Present',
      category: 'education',
      description:
        'Pursuing formal computer science education to strengthen technical foundations.',
      expandedContent: {
        overview:
          'Returned to formal education to build strong theoretical foundations in computer science while applying real-world experience to academic learning.',
        keyLearnings: [
          'Data structures and algorithms fundamentals',
          'Object-oriented programming principles',
          'Database design and management',
          'Software engineering methodologies',
          'Mathematical foundations for computing',
        ],
        technologies: ['Java', 'Python', 'SQL', 'HTML/CSS', 'JavaScript basics'],
        achievements: [
          'Maintaining high academic performance while learning',
          'Successfully balancing work experience with new concepts',
          'Active participation in programming assignments',
          'Building portfolio projects alongside coursework',
        ],
        challenges: [
          'Adapting to formal academic structure after work experience',
          'Balancing intensive learning with practical application',
          'Keeping up with rapidly evolving technology landscape',
        ],
      },
      icon: '🎓',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'leetcode-journey',
      title: 'LeetCode Problem Solving',
      period: '2024-Present',
      category: 'skill',
      description:
        'Developing algorithmic thinking and problem-solving skills through consistent practice.',
      expandedContent: {
        overview:
          'Committed to daily problem-solving practice to strengthen algorithmic thinking and prepare for technical interviews while building confidence in coding abilities.',
        keyLearnings: [
          'Algorithm design and optimization techniques',
          'Time and space complexity analysis',
          'Data structure selection and implementation',
          'Problem decomposition strategies',
          'Pattern recognition in coding problems',
        ],
        technologies: [
          'Python for algorithms',
          'Java for data structures',
          'Problem-solving patterns',
        ],
        achievements: [
          'Solved 50+ problems across different difficulty levels',
          'Improved problem-solving speed and accuracy',
          'Gained confidence in technical problem analysis',
          'Developed systematic approach to unknown problems',
        ],
        challenges: [
          'Overcoming initial intimidation with complex problems',
          'Maintaining consistent daily practice schedule',
          'Balancing speed with code quality and readability',
        ],
      },
      icon: '🧩',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'tryhackme-security',
      title: 'TryHackMe Security Learning',
      period: '2024-Present',
      category: 'skill',
      description: 'Exploring cybersecurity fundamentals and ethical hacking concepts.',
      expandedContent: {
        overview:
          'Developing cybersecurity awareness and technical skills through hands-on labs and security challenges, building a well-rounded tech skill set.',
        keyLearnings: [
          'Network security fundamentals',
          'Linux command line proficiency',
          'Security tool usage and analysis',
          'Ethical hacking methodologies',
          'Incident response and forensics basics',
        ],
        technologies: [
          'Linux/Unix systems',
          'Network tools (Nmap, Wireshark)',
          'Security frameworks',
          'Virtual machines',
        ],
        achievements: [
          'Completed 20+ security learning modules',
          'Gained hands-on experience with security tools',
          'Developed security-first mindset for development',
          'Understanding of common vulnerabilities and mitigations',
        ],
        challenges: [
          'Learning complex security concepts from scratch',
          'Setting up proper lab environments',
          'Balancing security learning with development skills',
        ],
      },
      icon: '🔒',
      color: 'from-red-500 to-red-600',
    },
    {
      id: 'web-development',
      title: 'Web Development Foundations',
      period: '2024-Present',
      category: 'skill',
      description: 'Building modern web development skills with HTML, CSS, JavaScript, and React.',
      expandedContent: {
        overview:
          'Transitioning from traditional programming concepts to modern web development, focusing on creating interactive and responsive user experiences.',
        keyLearnings: [
          'Modern HTML5 semantic structure',
          'CSS3 advanced styling and animations',
          'JavaScript ES6+ features and concepts',
          'React component-based architecture',
          'Responsive design principles',
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'Tailwind CSS', 'Git/GitHub'],
        achievements: [
          'Built first portfolio website from scratch',
          'Created interactive React components',
          'Implemented responsive design patterns',
          'Deployed projects to live environments',
        ],
        challenges: [
          'Understanding modern JavaScript ecosystem complexity',
          'Learning React state management and lifecycle',
          'Keeping up with rapidly changing frontend technologies',
        ],
      },
      icon: '🌐',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'portfolio-project',
      title: 'Portfolio Development Project',
      period: '2024-Present',
      category: 'project',
      description: 'Creating a comprehensive portfolio to showcase skills and career transition.',
      expandedContent: {
        overview:
          'Developing a professional portfolio that demonstrates technical skills while telling the story of career transition from administration to technology.',
        keyLearnings: [
          'Project planning and execution',
          'Modern development workflow (Git, CI/CD)',
          'Performance optimization techniques',
          'User experience design principles',
          'Professional presentation of technical work',
        ],
        technologies: [
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Framer Motion',
          'Vite',
          'GitHub Actions',
        ],
        achievements: [
          'Designed and implemented responsive portfolio site',
          'Set up professional development workflow',
          'Integrated modern animation and interaction design',
          'Documented development process and decisions',
        ],
        challenges: [
          'Balancing feature complexity with performance',
          'Creating compelling narrative around career transition',
          'Learning advanced development tools and practices',
        ],
      },
      icon: '🚀',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      id: 'roadmap-learning',
      title: 'roadmap.sh Guided Learning',
      period: '2024-Present',
      category: 'skill',
      description: 'Following structured learning paths for frontend and backend development.',
      expandedContent: {
        overview:
          'Using roadmap.sh to ensure comprehensive coverage of essential web development concepts and maintain a structured approach to skill building.',
        keyLearnings: [
          'Structured approach to technology learning',
          'Industry-standard development practices',
          'Full-stack development concepts',
          'Tool selection and ecosystem understanding',
          'Career path planning in tech',
        ],
        technologies: [
          'Frontend roadmap tools',
          'Backend fundamentals',
          'DevOps basics',
          'Database concepts',
        ],
        achievements: [
          'Completed 40% of frontend developer roadmap',
          'Gained clarity on learning priorities',
          'Identified knowledge gaps and improvement areas',
          'Built systematic approach to skill development',
        ],
        challenges: [
          'Managing overwhelm from extensive roadmap scope',
          'Prioritizing learning objectives with limited time',
          'Balancing breadth vs depth in learning approach',
        ],
      },
      icon: '🗺️',
      color: 'from-teal-500 to-teal-600',
    },
    {
      id: 'github-collaboration',
      title: 'Git & GitHub Workflow Mastery',
      period: '2024-Present',
      category: 'skill',
      description: 'Learning professional version control and collaboration practices.',
      expandedContent: {
        overview:
          'Developing proficiency in Git version control and GitHub collaboration features essential for professional software development teams.',
        keyLearnings: [
          'Git version control fundamentals',
          'Branching strategies and merge workflows',
          'Pull request and code review processes',
          'Issue tracking and project management',
          'Open source contribution practices',
        ],
        technologies: ['Git CLI', 'GitHub', 'GitHub Actions', 'Markdown documentation'],
        achievements: [
          'Set up professional GitHub profile and repositories',
          'Implemented GitHub Actions for CI/CD',
          'Created comprehensive project documentation',
          'Established consistent commit and branching practices',
        ],
        challenges: [
          'Understanding complex Git concepts and conflict resolution',
          'Learning collaborative workflow best practices',
          'Maintaining consistent documentation standards',
        ],
      },
      icon: '📚',
      color: 'from-gray-500 to-gray-600',
    },
    {
      id: 'typescript-learning',
      title: 'TypeScript Skill Development',
      period: '2024-Present',
      category: 'skill',
      description: 'Adding type safety and advanced JavaScript concepts to development toolkit.',
      expandedContent: {
        overview:
          'Learning TypeScript to improve code quality, catch errors early, and work with modern enterprise-level JavaScript applications.',
        keyLearnings: [
          'Static type checking concepts',
          'Interface and type definition creation',
          'Generic programming patterns',
          'Advanced TypeScript features',
          'Integration with React and modern tooling',
        ],
        technologies: [
          'TypeScript',
          'TSConfig optimization',
          'Type definition files',
          'ESLint integration',
        ],
        achievements: [
          'Successfully migrated portfolio project to TypeScript',
          'Created comprehensive type definitions',
          'Improved code reliability and developer experience',
          'Reduced runtime errors through compile-time checking',
        ],
        challenges: [
          'Learning type system complexity and advanced patterns',
          'Balancing type safety with development speed',
          'Understanding TypeScript ecosystem and tooling',
        ],
      },
      icon: '⚡',
      color: 'from-blue-400 to-blue-500',
    },
    {
      id: 'job-preparation',
      title: 'Remote/VA Job Preparation',
      period: '2024-Present',
      category: 'work',
      description: 'Preparing for remote work opportunities in tech and virtual assistance roles.',
      expandedContent: {
        overview:
          'Combining technical skills with administrative experience to prepare for remote opportunities that value both technical capability and strong organizational skills.',
        keyLearnings: [
          'Remote work best practices and tools',
          'Technical interview preparation',
          'Professional online presence development',
          'Client communication in remote settings',
          'Time management for distributed work',
        ],
        technologies: [
          'Communication tools',
          'Project management platforms',
          'Remote collaboration software',
        ],
        achievements: [
          'Built comprehensive portfolio demonstrating capabilities',
          'Developed professional online presence',
          'Created systematic approach to job applications',
          'Prepared for technical and behavioral interviews',
        ],
        challenges: [
          'Competing with more experienced developers',
          'Demonstrating value proposition as career changer',
          'Building confidence in technical abilities',
        ],
        nextSteps: [
          'Apply to entry-level remote positions',
          'Network within tech communities',
          'Continue building portfolio projects',
          'Gain real-world project experience',
        ],
      },
      icon: '💻',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      id: 'continuous-learning',
      title: 'Continuous Skill Development',
      period: 'Ongoing',
      category: 'skill',
      description: 'Commitment to lifelong learning and staying current with technology trends.',
      expandedContent: {
        overview:
          'Maintaining a growth mindset and systematic approach to learning new technologies and improving existing skills in the rapidly evolving tech landscape.',
        keyLearnings: [
          'Learning how to learn effectively in tech',
          'Staying current with industry trends',
          'Building sustainable skill development habits',
          'Balancing specialization with broad knowledge',
          'Creating feedback loops for improvement',
        ],
        achievements: [
          'Established daily learning routine',
          'Built network of learning resources and communities',
          'Developed system for tracking progress and goals',
          'Created sustainable approach to skill development',
        ],
        challenges: [
          'Managing information overload in fast-moving field',
          'Prioritizing learning objectives with limited time',
          'Maintaining motivation during challenging periods',
        ],
        nextSteps: [
          'Expand into backend development',
          'Explore mobile development opportunities',
          'Deepen understanding of software architecture',
          'Contribute to open source projects',
        ],
      },
      icon: '🌱',
      color: 'from-green-400 to-green-500',
    },
    {
      id: 'future-goals',
      title: 'Future Learning Objectives',
      period: '2025+',
      category: 'skill',
      description: 'Planned learning path for continued growth and career advancement.',
      expandedContent: {
        overview:
          'Strategic learning plan focused on becoming a well-rounded developer capable of contributing to complex projects and eventually mentoring others.',
        keyLearnings: [
          'Advanced React patterns and state management',
          'Backend development with Node.js/Python',
          'Database design and optimization',
          'System design and architecture',
          'DevOps and cloud technologies',
        ],
        technologies: [
          'Node.js',
          'Python/Django',
          'PostgreSQL',
          'AWS/Azure',
          'Docker',
          'Kubernetes',
        ],
        nextSteps: [
          'Complete first professional development project',
          'Contribute to open source projects',
          'Build full-stack applications',
          'Mentor other career changers',
          'Speak at local tech meetups',
        ],
      },
      icon: '🎯',
      color: 'from-violet-500 to-violet-600',
    },
  ];
var je = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const Ne = (t) => t.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  ke = (t, n) => {
    const o = g.forwardRef(
      (
        {
          color: l = 'currentColor',
          size: r = 24,
          strokeWidth: s = 2,
          absoluteStrokeWidth: i,
          children: d,
          ...a
        },
        u,
      ) =>
        g.createElement(
          'svg',
          {
            ref: u,
            ...je,
            width: r,
            height: r,
            stroke: l,
            strokeWidth: i ? (Number(s) * 24) / Number(r) : s,
            className: `lucide lucide-${Ne(t)}`,
            ...a,
          },
          [...n.map(([m, p]) => g.createElement(m, p)), ...((Array.isArray(d) ? d : [d]) || [])],
        ),
    );
    return ((o.displayName = `${t}`), o);
  };
var C = ke;
const Se = C('Calendar', [
    ['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', ry: '2', key: 'eu3xkr' }],
    ['line', { x1: '16', x2: '16', y1: '2', y2: '6', key: 'm3sa8f' }],
    ['line', { x1: '8', x2: '8', y1: '2', y2: '6', key: '18kwsl' }],
    ['line', { x1: '3', x2: '21', y1: '10', y2: '10', key: 'xt86sb' }],
  ]),
  $ = C('ChevronDown', [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]]),
  Ce = C('ChevronUp', [['path', { d: 'm18 15-6-6-6 6', key: '153udz' }]]),
  Pe = C('Clock', [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['polyline', { points: '12 6 12 12 16 14', key: '68esgv' }],
  ]),
  Ie = C('ExternalLink', [
    ['path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', key: 'a6xqqp' }],
    ['polyline', { points: '15 3 21 3 21 9', key: 'mznyad' }],
    ['line', { x1: '10', x2: '21', y1: '14', y2: '3', key: '18c3s4' }],
  ]),
  Le = C('Tag', [
    [
      'path',
      {
        d: 'M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z',
        key: '14b2ls',
      },
    ],
    ['path', { d: 'M7 7h.01', key: '7u93v4' }],
  ]),
  Te = () => {
    const [t, n] = g.useState(null),
      [o, l] = g.useState(!1),
      { config: r } = V(),
      s = o ? N : N.slice(0, 6),
      i = (a) => {
        n(t === a ? null : a);
      },
      d = (a) =>
        ({ education: '🎓', work: '💼', skill: '🛠️', project: '🚀', certification: '📜' })[a];
    return e.jsxs('section', {
      id: 'learning-journey',
      className: 'py-20 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative',
      children: [
        e.jsxs('div', {
          className: 'absolute inset-0 opacity-20',
          children: [
            e.jsx('div', {
              className: 'absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl',
            }),
            e.jsx('div', {
              className:
                'absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl',
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'max-w-6xl mx-auto relative z-10',
          children: [
            e.jsx(x, {
              children: e.jsxs('div', {
                className: 'text-center mb-16',
                children: [
                  e.jsx(c.h2, {
                    className:
                      'text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent',
                    children: 'My Learning Journey',
                  }),
                  e.jsx('p', {
                    className: 'text-xl text-gray-300 max-w-3xl mx-auto',
                    children:
                      'From administrative excellence to technical proficiency - every step tells a story of growth, curiosity, and the determination to build a meaningful career in technology.',
                  }),
                ],
              }),
            }),
            e.jsxs('div', {
              className: 'relative',
              children: [
                e.jsx('div', {
                  className:
                    'absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 transform md:-translate-x-1/2',
                }),
                e.jsx('div', {
                  className: 'space-y-8',
                  children: s.map((a, u) =>
                    e.jsx(
                      T,
                      {
                        children: e.jsxs('div', {
                          className: `flex items-start gap-8 ${u % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:items-center`,
                          children: [
                            e.jsx('div', {
                              className:
                                'absolute left-4 md:left-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform md:-translate-x-1/2 flex items-center justify-center z-10',
                              children: e.jsx('div', {
                                className: 'w-3 h-3 bg-white rounded-full',
                              }),
                            }),
                            e.jsx('div', {
                              className: `flex-1 ml-12 md:ml-0 ${u % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`,
                              children: e.jsx(M, {
                                liftHeight: 6,
                                glowIntensity: 'medium',
                                className: 'relative',
                                children: e.jsxs(c.div, {
                                  layout: !0,
                                  className:
                                    'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 cursor-pointer',
                                  onClick: () => i(a.id),
                                  children: [
                                    e.jsxs('div', {
                                      className: 'flex items-start justify-between mb-4',
                                      children: [
                                        e.jsxs('div', {
                                          className: 'flex items-center gap-3',
                                          children: [
                                            e.jsx('div', {
                                              className: `w-12 h-12 bg-gradient-to-r ${a.color} rounded-lg flex items-center justify-center text-2xl`,
                                              children: a.icon,
                                            }),
                                            e.jsxs('div', {
                                              children: [
                                                e.jsxs('div', {
                                                  className: 'flex items-center gap-2 mb-1',
                                                  children: [
                                                    e.jsxs('span', {
                                                      className:
                                                        'text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300',
                                                      children: [d(a.category), ' ', a.category],
                                                    }),
                                                    e.jsx('span', {
                                                      className: 'text-sm text-gray-400',
                                                      children: a.period,
                                                    }),
                                                  ],
                                                }),
                                                e.jsx('h3', {
                                                  className: 'text-xl font-semibold text-white',
                                                  children: a.title,
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        e.jsx(c.div, {
                                          animate: { rotate: t === a.id ? 180 : 0 },
                                          transition: { duration: 0.3 },
                                          className:
                                            'text-gray-400 hover:text-white transition-colors',
                                          children: e.jsx($, { size: 20 }),
                                        }),
                                      ],
                                    }),
                                    e.jsx('p', {
                                      className: 'text-gray-300 mb-4',
                                      children: a.description,
                                    }),
                                    e.jsx(q, {
                                      children:
                                        t === a.id &&
                                        e.jsx(c.div, {
                                          initial: { height: 0, opacity: 0 },
                                          animate: { height: 'auto', opacity: 1 },
                                          exit: { height: 0, opacity: 0 },
                                          transition: { duration: r.duration },
                                          className: 'overflow-hidden',
                                          children: e.jsxs('div', {
                                            className: 'border-t border-gray-700 pt-4 space-y-4',
                                            children: [
                                              e.jsxs('div', {
                                                children: [
                                                  e.jsx('h4', {
                                                    className:
                                                      'text-lg font-semibold text-blue-400 mb-2',
                                                    children: 'Overview',
                                                  }),
                                                  e.jsx('p', {
                                                    className:
                                                      'text-gray-300 text-sm leading-relaxed',
                                                    children: a.expandedContent.overview,
                                                  }),
                                                ],
                                              }),
                                              e.jsxs('div', {
                                                children: [
                                                  e.jsx('h4', {
                                                    className:
                                                      'text-lg font-semibold text-emerald-400 mb-2',
                                                    children: 'Key Learnings',
                                                  }),
                                                  e.jsx('ul', {
                                                    className: 'space-y-1',
                                                    children: a.expandedContent.keyLearnings.map(
                                                      (m, p) =>
                                                        e.jsxs(
                                                          'li',
                                                          {
                                                            className:
                                                              'text-gray-300 text-sm flex items-start gap-2',
                                                            children: [
                                                              e.jsx('span', {
                                                                className: 'text-emerald-400 mt-1',
                                                                children: '•',
                                                              }),
                                                              m,
                                                            ],
                                                          },
                                                          p,
                                                        ),
                                                    ),
                                                  }),
                                                ],
                                              }),
                                              a.expandedContent.technologies &&
                                                e.jsxs('div', {
                                                  children: [
                                                    e.jsx('h4', {
                                                      className:
                                                        'text-lg font-semibold text-purple-400 mb-2',
                                                      children: 'Technologies',
                                                    }),
                                                    e.jsx('div', {
                                                      className: 'flex flex-wrap gap-2',
                                                      children: a.expandedContent.technologies.map(
                                                        (m, p) =>
                                                          e.jsx(
                                                            'span',
                                                            {
                                                              className:
                                                                'text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full',
                                                              children: m,
                                                            },
                                                            p,
                                                          ),
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              a.expandedContent.achievements &&
                                                e.jsxs('div', {
                                                  children: [
                                                    e.jsx('h4', {
                                                      className:
                                                        'text-lg font-semibold text-yellow-400 mb-2',
                                                      children: 'Achievements',
                                                    }),
                                                    e.jsx('ul', {
                                                      className: 'space-y-1',
                                                      children: a.expandedContent.achievements.map(
                                                        (m, p) =>
                                                          e.jsxs(
                                                            'li',
                                                            {
                                                              className:
                                                                'text-gray-300 text-sm flex items-start gap-2',
                                                              children: [
                                                                e.jsx('span', {
                                                                  className: 'text-yellow-400 mt-1',
                                                                  children: '★',
                                                                }),
                                                                m,
                                                              ],
                                                            },
                                                            p,
                                                          ),
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              a.expandedContent.challenges &&
                                                e.jsxs('div', {
                                                  children: [
                                                    e.jsx('h4', {
                                                      className:
                                                        'text-lg font-semibold text-red-400 mb-2',
                                                      children: 'Challenges',
                                                    }),
                                                    e.jsx('ul', {
                                                      className: 'space-y-1',
                                                      children: a.expandedContent.challenges.map(
                                                        (m, p) =>
                                                          e.jsxs(
                                                            'li',
                                                            {
                                                              className:
                                                                'text-gray-300 text-sm flex items-start gap-2',
                                                              children: [
                                                                e.jsx('span', {
                                                                  className: 'text-red-400 mt-1',
                                                                  children: '⚡',
                                                                }),
                                                                m,
                                                              ],
                                                            },
                                                            p,
                                                          ),
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              a.expandedContent.nextSteps &&
                                                e.jsxs('div', {
                                                  children: [
                                                    e.jsx('h4', {
                                                      className:
                                                        'text-lg font-semibold text-cyan-400 mb-2',
                                                      children: 'Next Steps',
                                                    }),
                                                    e.jsx('ul', {
                                                      className: 'space-y-1',
                                                      children: a.expandedContent.nextSteps.map(
                                                        (m, p) =>
                                                          e.jsxs(
                                                            'li',
                                                            {
                                                              className:
                                                                'text-gray-300 text-sm flex items-start gap-2',
                                                              children: [
                                                                e.jsx('span', {
                                                                  className: 'text-cyan-400 mt-1',
                                                                  children: '→',
                                                                }),
                                                                m,
                                                              ],
                                                            },
                                                            p,
                                                          ),
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                            ],
                                          }),
                                        }),
                                    }),
                                  ],
                                }),
                              }),
                            }),
                          ],
                        }),
                      },
                      a.id,
                    ),
                  ),
                }),
              ],
            }),
            N.length > 6 &&
              e.jsx(x, {
                delay: 0.3,
                className: 'text-center mt-12',
                children: e.jsx(c.button, {
                  onClick: () => l(!o),
                  className:
                    'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto',
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  children: o
                    ? e.jsxs(e.Fragment, { children: ['Show Less ', e.jsx(Ce, { size: 20 })] })
                    : e.jsxs(e.Fragment, {
                        children: [
                          'View More (',
                          N.length - 6,
                          ' more items) ',
                          e.jsx($, { size: 20 }),
                        ],
                      }),
                }),
              }),
            e.jsx(x, {
              delay: 0.4,
              className: 'mt-16',
              children: e.jsxs('div', {
                className:
                  'bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm border border-gray-600/50 rounded-xl p-8',
                children: [
                  e.jsx('h3', {
                    className: 'text-2xl font-semibold text-center text-white mb-8',
                    children: 'Journey Summary',
                  }),
                  e.jsxs('div', {
                    className: 'grid grid-cols-2 md:grid-cols-4 gap-6 text-center',
                    children: [
                      e.jsxs('div', {
                        children: [
                          e.jsx('div', {
                            className: 'text-3xl font-bold text-blue-400 mb-2',
                            children: N.length,
                          }),
                          e.jsx('div', {
                            className: 'text-gray-300 text-sm',
                            children: 'Learning Milestones',
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        children: [
                          e.jsx('div', {
                            className: 'text-3xl font-bold text-emerald-400 mb-2',
                            children: N.filter((a) => a.category === 'skill').length,
                          }),
                          e.jsx('div', {
                            className: 'text-gray-300 text-sm',
                            children: 'Skills Developed',
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        children: [
                          e.jsx('div', {
                            className: 'text-3xl font-bold text-purple-400 mb-2',
                            children: N.filter((a) => a.category === 'project').length,
                          }),
                          e.jsx('div', {
                            className: 'text-gray-300 text-sm',
                            children: 'Projects Completed',
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        children: [
                          e.jsx('div', {
                            className: 'text-3xl font-bold text-yellow-400 mb-2',
                            children: '2+',
                          }),
                          e.jsx('div', {
                            className: 'text-gray-300 text-sm',
                            children: 'Years Growing',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  },
  Z = [
    {
      id: 'career-transition-story',
      title: 'From Admin to Developer: My Career Transition Story',
      excerpt:
        'The challenges, learnings, and mindset shifts involved in transitioning from government administration to software development.',
      publishDate: '2024-12-01',
      readTime: 8,
      category: 'experience',
      tags: ['career-change', 'personal-story', 'motivation'],
      featured: !0,
      status: 'coming-soon',
    },
    {
      id: 'first-react-project',
      title: 'Building My First React Portfolio: Lessons Learned',
      excerpt:
        'Technical challenges and design decisions involved in creating a modern portfolio website with React and TypeScript.',
      publishDate: '2024-11-15',
      readTime: 12,
      category: 'project',
      tags: ['react', 'typescript', 'portfolio', 'web-development'],
      featured: !0,
      status: 'coming-soon',
    },
    {
      id: 'leetcode-beginner-guide',
      title: 'LeetCode for Career Changers: A Practical Approach',
      excerpt:
        'How to approach algorithmic problem-solving when coming from a non-technical background.',
      publishDate: '2024-11-01',
      readTime: 10,
      category: 'tutorial',
      tags: ['algorithms', 'leetcode', 'learning', 'career-change'],
      featured: !1,
      status: 'coming-soon',
    },
    {
      id: 'admin-skills-in-tech',
      title: 'How Administrative Skills Transfer to Tech Roles',
      excerpt:
        'Discovering the unexpected value of administrative experience in software development teams.',
      publishDate: '2024-10-20',
      readTime: 6,
      category: 'reflection',
      tags: ['soft-skills', 'career-change', 'teamwork'],
      featured: !1,
      status: 'coming-soon',
    },
    {
      id: 'learning-system-setup',
      title: 'Building a Learning System for Self-Taught Developers',
      excerpt:
        'Tools, methods, and strategies for efficient self-directed learning in programming.',
      publishDate: '2024-10-05',
      readTime: 7,
      category: 'tutorial',
      tags: ['learning', 'productivity', 'self-taught', 'resources'],
      featured: !1,
      status: 'coming-soon',
    },
    {
      id: 'typescript-migration-experience',
      title: "Migrating from JavaScript to TypeScript: A Beginner's Experience",
      excerpt:
        'The benefits, challenges, and practical steps involved in adopting TypeScript for better code quality.',
      publishDate: '2024-09-15',
      readTime: 9,
      category: 'technical',
      tags: ['typescript', 'javascript', 'code-quality', 'migration'],
      featured: !1,
      status: 'coming-soon',
    },
    {
      id: 'remote-work-preparation',
      title: 'Preparing for Remote Tech Work: Beyond Technical Skills',
      excerpt:
        'Communication, time management, and professional skills essential for successful remote work in tech.',
      publishDate: '2024-09-01',
      readTime: 5,
      category: 'experience',
      tags: ['remote-work', 'communication', 'professional-development'],
      featured: !1,
      status: 'coming-soon',
    },
    {
      id: 'github-workflow-setup',
      title: 'Setting Up a Professional GitHub Workflow',
      excerpt:
        'Best practices for version control, documentation, and project management using GitHub.',
      publishDate: '2024-08-20',
      readTime: 11,
      category: 'tutorial',
      tags: ['github', 'git', 'workflow', 'documentation'],
      featured: !1,
      status: 'coming-soon',
    },
  ],
  J = (t) => Z.filter((n) => n.category === t),
  Me = () => {
    const [t, n] = g.useState('all'),
      o = [
        { key: 'all', label: 'All Posts', color: 'from-gray-500 to-gray-600' },
        { key: 'tutorial', label: 'Tutorials', color: 'from-blue-500 to-blue-600' },
        { key: 'experience', label: 'Experience', color: 'from-green-500 to-green-600' },
        { key: 'project', label: 'Projects', color: 'from-purple-500 to-purple-600' },
        { key: 'reflection', label: 'Reflections', color: 'from-yellow-500 to-orange-500' },
        { key: 'technical', label: 'Technical', color: 'from-red-500 to-red-600' },
      ],
      l = t === 'all' ? Z : J(t),
      r = (i) => {
        switch (i) {
          case 'published':
            return 'bg-green-500/20 text-green-400';
          case 'draft':
            return 'bg-yellow-500/20 text-yellow-400';
          case 'coming-soon':
            return 'bg-blue-500/20 text-blue-400';
          default:
            return 'bg-gray-500/20 text-gray-400';
        }
      },
      s = (i) => {
        switch (i) {
          case 'published':
            return '✓';
          case 'draft':
            return '✏️';
          case 'coming-soon':
            return '🚀';
          default:
            return '📄';
        }
      };
    return e.jsxs('section', {
      id: 'blog',
      className: 'py-20 px-4 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative',
      children: [
        e.jsxs('div', {
          className: 'absolute inset-0 opacity-10',
          children: [
            e.jsx('div', {
              className:
                'absolute top-1/3 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl',
            }),
            e.jsx('div', {
              className:
                'absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-3xl',
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'max-w-7xl mx-auto relative z-10',
          children: [
            e.jsx(x, {
              children: e.jsxs('div', {
                className: 'text-center mb-16',
                children: [
                  e.jsx(c.h2, {
                    className:
                      'text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent',
                    children: 'Blog & Posts',
                  }),
                  e.jsx('p', {
                    className: 'text-xl text-gray-300 max-w-3xl mx-auto mb-8',
                    children:
                      'Sharing insights, experiences, and learnings from my journey in tech. Writing helps me reflect on progress and hopefully helps others on similar paths.',
                  }),
                  e.jsxs('div', {
                    className:
                      'bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-gray-600/50 rounded-xl p-6 max-w-2xl mx-auto',
                    children: [
                      e.jsxs('div', {
                        className: 'flex items-center justify-center gap-3 mb-3',
                        children: [
                          e.jsx('span', { className: 'text-2xl', children: '🚀' }),
                          e.jsx('h3', {
                            className: 'text-lg font-semibold text-white',
                            children: 'Content Coming Soon',
                          }),
                        ],
                      }),
                      e.jsx('p', {
                        className: 'text-gray-300 text-sm',
                        children:
                          "I'm actively working on creating valuable content that documents my learning journey, technical tutorials, and career transition insights. Each post will be thoroughly researched and written to provide real value to fellow learners and career changers.",
                      }),
                    ],
                  }),
                ],
              }),
            }),
            e.jsx(x, {
              delay: 0.2,
              children: e.jsx('div', {
                className: 'flex flex-wrap justify-center gap-3 mb-12',
                children: o.map((i) =>
                  e.jsxs(
                    c.button,
                    {
                      onClick: () => n(i.key),
                      className: `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${t === i.key ? `bg-gradient-to-r ${i.color} text-white shadow-lg` : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60'}`,
                      whileHover: { scale: 1.05 },
                      whileTap: { scale: 0.95 },
                      children: [
                        i.label,
                        i.key !== 'all' &&
                          e.jsxs('span', {
                            className: 'ml-2 text-xs opacity-70',
                            children: ['(', J(i.key).length, ')'],
                          }),
                      ],
                    },
                    i.key,
                  ),
                ),
              }),
            }),
            e.jsx('div', {
              className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
              children: l.map((i, d) =>
                e.jsx(
                  T,
                  {
                    children: e.jsx(pe, {
                      className: 'h-full',
                      children: e.jsxs(c.article, {
                        layout: !0,
                        className:
                          'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden h-full flex flex-col',
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: d * 0.1 },
                        children: [
                          i.featured &&
                            e.jsx('div', {
                              className:
                                'bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 text-center',
                              children: '⭐ Featured Post',
                            }),
                          e.jsxs('div', {
                            className:
                              'h-48 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden',
                            children: [
                              e.jsx('div', {
                                className:
                                  'absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20',
                              }),
                              e.jsx('div', {
                                className: 'absolute inset-0 flex items-center justify-center',
                                children: e.jsxs('div', {
                                  className: 'text-center',
                                  children: [
                                    e.jsx('div', {
                                      className: 'text-4xl mb-2',
                                      children:
                                        i.category === 'tutorial'
                                          ? '📚'
                                          : i.category === 'experience'
                                            ? '🌱'
                                            : i.category === 'project'
                                              ? '🚀'
                                              : i.category === 'reflection'
                                                ? '💭'
                                                : '⚡',
                                    }),
                                    e.jsx('div', {
                                      className: 'text-xs text-gray-300 opacity-60',
                                      children: i.category.toUpperCase(),
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                          e.jsxs('div', {
                            className: 'p-6 flex-1 flex flex-col',
                            children: [
                              e.jsxs('div', {
                                className: 'flex items-center gap-4 text-xs text-gray-400 mb-3',
                                children: [
                                  e.jsxs('div', {
                                    className: 'flex items-center gap-1',
                                    children: [
                                      e.jsx(Se, { size: 12 }),
                                      new Date(i.publishDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                      }),
                                    ],
                                  }),
                                  e.jsxs('div', {
                                    className: 'flex items-center gap-1',
                                    children: [e.jsx(Pe, { size: 12 }), i.readTime, ' min read'],
                                  }),
                                ],
                              }),
                              e.jsx('h3', {
                                className: 'text-xl font-semibold text-white mb-3 line-clamp-2',
                                children: i.title,
                              }),
                              e.jsx('p', {
                                className: 'text-gray-300 text-sm leading-relaxed mb-4 flex-1',
                                children: i.excerpt,
                              }),
                              e.jsxs('div', {
                                className: 'flex flex-wrap gap-2 mb-4',
                                children: [
                                  i.tags
                                    .slice(0, 3)
                                    .map((a) =>
                                      e.jsxs(
                                        'span',
                                        {
                                          className:
                                            'text-xs px-2 py-1 bg-gray-700/60 text-gray-300 rounded-full flex items-center gap-1',
                                          children: [e.jsx(Le, { size: 10 }), a],
                                        },
                                        a,
                                      ),
                                    ),
                                  i.tags.length > 3 &&
                                    e.jsxs('span', {
                                      className:
                                        'text-xs px-2 py-1 bg-gray-700/60 text-gray-400 rounded-full',
                                      children: ['+', i.tags.length - 3, ' more'],
                                    }),
                                ],
                              }),
                              e.jsxs('div', {
                                className: 'flex items-center justify-between',
                                children: [
                                  e.jsxs('span', {
                                    className: `text-xs px-2 py-1 rounded-full flex items-center gap-1 ${r(i.status)}`,
                                    children: [
                                      e.jsx('span', { children: s(i.status) }),
                                      i.status === 'coming-soon'
                                        ? 'Coming Soon'
                                        : i.status === 'draft'
                                          ? 'Draft'
                                          : 'Published',
                                    ],
                                  }),
                                  e.jsx(c.button, {
                                    className: `text-sm font-medium flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-300 ${i.status === 'published' ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10' : 'text-gray-500 cursor-not-allowed'}`,
                                    whileHover: i.status === 'published' ? { scale: 1.05 } : {},
                                    disabled: i.status !== 'published',
                                    children:
                                      i.status === 'published'
                                        ? e.jsxs(e.Fragment, {
                                            children: ['Read More ', e.jsx(Ie, { size: 12 })],
                                          })
                                        : 'Coming Soon',
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  },
                  i.id,
                ),
              ),
            }),
            l.length === 0 &&
              e.jsx(x, {
                children: e.jsxs('div', {
                  className: 'text-center py-12',
                  children: [
                    e.jsx('div', { className: 'text-6xl mb-4', children: '📝' }),
                    e.jsx('h3', {
                      className: 'text-xl font-semibold text-gray-400 mb-2',
                      children: 'No posts in this category yet',
                    }),
                    e.jsx('p', {
                      className: 'text-gray-500',
                      children: 'Check back soon for new content!',
                    }),
                  ],
                }),
              }),
            e.jsx(x, {
              delay: 0.4,
              className: 'text-center mt-16',
              children: e.jsxs('div', {
                className:
                  'bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm border border-gray-600/50 rounded-xl p-8 max-w-3xl mx-auto',
                children: [
                  e.jsx('h3', {
                    className: 'text-2xl font-semibold text-white mb-4',
                    children: 'Stay Updated',
                  }),
                  e.jsx('p', {
                    className: 'text-gray-300 mb-6',
                    children:
                      'Want to be notified when I publish new content? Follow my journey on GitHub or connect with me on LinkedIn for updates on new posts, projects, and insights.',
                  }),
                  e.jsxs('div', {
                    className: 'flex flex-wrap justify-center gap-4',
                    children: [
                      e.jsxs(c.a, {
                        href: 'https://github.com/joembolinas',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className:
                          'bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2',
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.95 },
                        children: [e.jsx('span', { children: '📚' }), ' Follow on GitHub'],
                      }),
                      e.jsx(c.button, {
                        onClick: () =>
                          document
                            .getElementById('contact')
                            ?.scrollIntoView({ behavior: 'smooth' }),
                        className:
                          'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300',
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.95 },
                        children: 'Get In Touch',
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  },
  De = [
    {
      id: 'business-card',
      title: 'Digital Business Card',
      icon: '👤',
      useCase: 'Perfect for freelancers and consultants',
      example:
        'A one-page site with bio, services, contact details, and social links to establish credibility.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'brochure',
      title: 'Online Brochure/Catalog',
      icon: '📋',
      useCase: 'Showcase products without e-commerce',
      example: "A local bakery's gallery of cakes and pastries with descriptions and pricing.",
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'portfolio',
      title: 'Portfolio Showcase',
      icon: '🎨',
      useCase: 'Must-have for photographers and artists',
      example: "A wedding photographer's stunning galleries organized by event type.",
      gradient: 'from-green-500 to-teal-500',
    },
    {
      id: 'restaurant',
      title: 'Restaurant/Café Menu',
      icon: '🍽️',
      useCase: 'Essential for food establishments',
      example: 'Clean, mobile-friendly site with menu, hours, and embedded map location.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'landing-page',
      title: 'Event Landing Page',
      icon: '🎪',
      useCase: 'Drive registrations and attendance',
      example: 'Conference site with speakers, schedule, and ticket purchasing integration.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'nonprofit',
      title: 'Nonprofit Awareness',
      icon: '❤️',
      useCase: 'Share mission and drive donations',
      example: 'Local charity with impact stories, volunteer opportunities, and donation buttons.',
      gradient: 'from-rose-500 to-pink-500',
    },
  ],
  Ae = ({ website: t }) =>
    e.jsxs(W, {
      className: 'group bg-gray-700/50',
      children: [
        e.jsx('div', { className: `h-2 bg-gradient-to-r ${t.gradient}` }),
        e.jsxs('div', {
          className: 'p-6',
          children: [
            e.jsxs('div', {
              className: 'flex items-center mb-4',
              children: [
                e.jsx('span', { className: 'text-3xl mr-3', children: t.icon }),
                e.jsx('h3', {
                  className:
                    'text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300',
                  children: t.title,
                }),
              ],
            }),
            e.jsxs('div', {
              className: 'mb-4',
              children: [
                e.jsx('p', {
                  className: 'text-sm font-semibold text-blue-300 mb-2',
                  children: 'Use Case:',
                }),
                e.jsx('p', { className: 'text-gray-300 text-sm', children: t.useCase }),
              ],
            }),
            e.jsxs('div', {
              className: 'mb-4',
              children: [
                e.jsx('p', {
                  className: 'text-sm font-semibold text-green-300 mb-2',
                  children: 'Example:',
                }),
                e.jsx('p', {
                  className: 'text-gray-400 text-sm leading-relaxed',
                  children: t.example,
                }),
              ],
            }),
            e.jsx('div', {
              className: 'mt-6 pt-4 border-t border-gray-600/50',
              children: e.jsx(S, {
                variant: 'secondary',
                size: 'sm',
                className: 'w-full transform group-hover:scale-105',
                children: 'Get Quote',
              }),
            }),
          ],
        }),
      ],
    }),
  Re = () =>
    e.jsx('section', {
      id: 'websites',
      className: 'py-20 px-4 bg-gray-800/95 backdrop-blur-sm relative z-10',
      children: e.jsxs('div', {
        className: 'max-w-7xl mx-auto',
        children: [
          e.jsxs('div', {
            className: 'text-center mb-16',
            children: [
              e.jsx('h2', {
                className: 'text-4xl font-bold mb-6 text-blue-400',
                children: '10 Essential Static Websites',
              }),
              e.jsx('p', {
                className: 'text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed',
                children:
                  'Empower your small business with cost-effective, fast-loading, and secure static websites. Perfect for establishing a strong online presence without the complexity.',
              }),
            ],
          }),
          e.jsx('div', {
            className: 'grid lg:grid-cols-2 xl:grid-cols-3 gap-8',
            children: De.map((t) => e.jsx(Ae, { website: t }, t.id)),
          }),
        ],
      }),
    }),
  He = () => {
    const t = (n) => {
      n && window.open(n, '_blank');
    };
    return e.jsx('section', {
      id: 'contact',
      className: 'py-20 px-4 relative z-10',
      children: e.jsxs('div', {
        className: 'max-w-6xl mx-auto text-center',
        children: [
          e.jsx('h2', {
            className: 'text-4xl font-bold mb-16 text-blue-400',
            children: 'Get In Touch',
          }),
          e.jsx('div', {
            className: 'grid md:grid-cols-3 gap-8 mb-12',
            children: re.map((n) =>
              e.jsxs(
                'div',
                {
                  className:
                    'bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition-colors duration-300 cursor-pointer',
                  onClick: () => t(n.url),
                  children: [
                    e.jsx('div', { className: 'text-3xl mb-3', children: n.icon }),
                    e.jsx('h3', { className: 'font-semibold mb-2', children: n.label }),
                    e.jsx('p', { className: 'text-gray-300', children: n.value }),
                  ],
                },
                n.type,
              ),
            ),
          }),
          e.jsx(S, {
            variant: 'secondary',
            onClick: () => {
              alert('Resume download will be implemented with actual resume file');
            },
            children: 'Download Resume',
          }),
        ],
      }),
    });
  };
function Ee() {
  return e.jsxs('div', {
    className: 'min-h-screen bg-gray-900 text-white overflow-x-hidden',
    children: [
      e.jsx(se, {}),
      e.jsxs('main', {
        className: 'relative',
        children: [
          e.jsx(me, {}),
          e.jsx(fe, {}),
          e.jsx(we, {}),
          e.jsx(Te, {}),
          e.jsx(Me, {}),
          e.jsx(Re, {}),
          e.jsx(He, {}),
        ],
      }),
      e.jsx(le, {}),
    ],
  });
}
ae.createRoot(document.getElementById('root')).render(
  e.jsx(X.StrictMode, { children: e.jsx(Ee, {}) }),
);
//# sourceMappingURL=index-v4sMcvX6.js.map
