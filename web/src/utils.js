export function toInt(value) {
  var v = parseInt(value, 10);
  return Number.isFinite(v) ? v : 0;
}

export function escapeHtml(value) {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function saveTextDownload(fileName, text, mimeType) {
  var blob = new Blob([text], { type: mimeType || "text/plain;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    URL.revokeObjectURL(url);
  }, 100);
}

export function debounce(func, wait) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
}

export function parseMarkdown(text) {
  if (!text) return "";
  let html = text;

  // Escape HTML tags to prevent injection (since we're parsing markdown)
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Headers (e.g. ### Header)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Inline Code
  html = html.replace(/`(.*?)`/gim, '<code>$1</code>');

  // Horizontal Rule
  html = html.replace(/^---$/gim, '<hr>');
  
  // Lists (Bulleted)
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
  
  // Newlines: split by double newline to form paragraphs
  let paragraphs = html.split(/\n\n+/);
  html = paragraphs.map(p => {
    // If it's a heading or hr or already a block element, leave it
    if (p.startsWith('<h') || p.startsWith('<hr>')) return p;
    // If it contains list items, wrap in ul
    if (p.includes('<li>')) {
      return `<ul>${p}</ul>`;
    }
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  return html;
}
