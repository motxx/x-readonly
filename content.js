const COMPOSE_PATH = /^\/(compose|intent)\/(post|tweet)/;

function leaveComposeRoute() {
  if (COMPOSE_PATH.test(location.pathname)) {
    history.length > 1 ? history.back() : location.replace("/home");
  }
}

// X は SPA なので pushState をフックしてルート変更を検知する
for (const method of ["pushState", "replaceState"]) {
  const original = history[method];
  history[method] = function (...args) {
    const result = original.apply(this, args);
    queueMicrotask(leaveComposeRoute);
    return result;
  };
}
window.addEventListener("popstate", leaveComposeRoute);
leaveComposeRoute();

// 「n」キーの投稿ショートカットを無効化
document.addEventListener(
  "keydown",
  (e) => {
    const t = e.target;
    const typing = t && (t.isContentEditable || /^(INPUT|TEXTAREA)$/.test(t.tagName));
    if (!typing && !e.ctrlKey && !e.metaKey && !e.altKey && e.key.toLowerCase() === "n") {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  },
  true
);

// 投稿欄のラッパーには data-testid が無いので、アバターとツールバーを含む最小の祖先を投稿フォームとみなして隠す
function hideComposeBlock() {
  for (const textarea of document.querySelectorAll('[data-testid="tweetTextarea_0"]')) {
    let el = textarea;
    while (
      el.parentElement &&
      !(el.querySelector('[data-testid^="UserAvatar-Container-"]') && el.querySelector('[data-testid="toolBar"]'))
    ) {
      el = el.parentElement;
    }
    if (el === document.documentElement) continue;
    el.style.setProperty("display", "none", "important");
  }
}
new MutationObserver(hideComposeBlock).observe(document.documentElement, { childList: true, subtree: true });
