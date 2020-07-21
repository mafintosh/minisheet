const enabled = new Set()
let main

module.exports = css

function css (strs, ...args) {
  const host = '_ms' + Math.random().toString(16).slice(2)
  let s = strs[0]
  let i = 1
  for (const arg of args) s += arg + strs[i++]
  for (const rule of rules(s.replace(/:host/g, '.' + host))) {
    if (enabled.has(rule)) continue
    enabled.add(rule)

    if (!main) {
      main = document.createElement('style')
      main.setAttribute('type', 'text/css')
      document.head.appendChild(main)
    }

    main.sheet.insertRule(rule, main.sheet.cssRules.length)
  }

  return host
}

function rules (s) {
  const all = []
  let rule = ''
  let string = ''
  let escaped = false
  let ctrl = true
  let lvl = 0

  for (let i = 0; i < s.length; i++) {
    const ch = s[i]

    const wasCtrl = ctrl
    ctrl = false

    if (escaped) {
      rule += '\\' + ch
      escaped = false
      continue
    }

    if (string) {
      rule += ch
      if (ch === string) string = ''
      continue
    }

    if (ch === '{' || ch === ';' || ch === ':') {
      lvl++
      ctrl = true
    }

    if (ch === '"' || ch === "'") {
      string = ch
    }

    if (ch === '}') {
      lvl--
      rule += ch
      if (lvl === 0) {
        all.push(rule + ch)
        rule = ''
        ctrl = true
      }
      continue
    }

    if (ch === ' ' || ch === '\n' || ch === '\t') {
      ctrl = true
      if (wasCtrl) continue
    }

    rule += ch
  }

  return all
}
