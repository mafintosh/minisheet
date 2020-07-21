module.exports = minisheet

function minisheet (strs) {
  const s = strs[0]
  const cls = 'ms' + Math.random().toString(16).slice(2)
  const e = document.createElement('style')
  e.setAttribute('type', 'text/css')
  e.textContent += s.replace(/:host/g, '.' + cls)
  document.head.appendChild(e)
  return cls
}
