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

  // Display math blocks $$...$$
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, function (match, formula) {
    return '<div class="formula-block">' + formula.trim().replace(/\\text\{([^}]+)\}/g, '$1') + '</div>';
  });

  // Headers (e.g. ### Header)
  html = html.replace(/^### ([^\n\r]+)/gim, '<h3>$1</h3>');
  html = html.replace(/^## ([^\n\r]+)/gim, '<h2>$1</h2>');
  html = html.replace(/^# ([^\n\r]+)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Inline Code
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

  // Horizontal Rule
  html = html.replace(/^---$/gim, '<hr>');
  
  // Lists (Bulleted)
  html = html.replace(/^- ([^\n\r]+)/gim, '<li class="bullet">$1</li>');

  // Lists (Numbered / Ordered)
  html = html.replace(/^\d+\.\s+([^\n\r]+)/gim, '<li class="ordered">$1</li>');
  
  // Newlines: split by double newline to form paragraphs
  let paragraphs = html.split(/\n\n+/);
  html = paragraphs.map(p => {
    // If it's a heading or hr or formula or already a block element, leave it
    if (p.startsWith('<h') || p.startsWith('<hr>') || p.startsWith('<div class="formula-block"')) return p;
    // If it contains ordered list items, wrap in ol
    if (p.includes('<li class="ordered">')) {
      return `<ol>${p.replace(/ class="ordered"/g, '')}</ol>`;
    }
    // If it contains bullet list items, wrap in ul
    if (p.includes('<li class="bullet">')) {
      return `<ul>${p.replace(/ class="bullet"/g, '')}</ul>`;
    }
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  return html;
}
