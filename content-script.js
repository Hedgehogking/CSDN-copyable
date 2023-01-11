// ==UserScript==
// @name        CSDN 可选可复制
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      -
// @description 2023/1/11 下午17:46:04
// ==/UserScript==


const cssText = '#content_views pre {user-select: unset !important;} #content_views pre code {user-select: unset !important;}';
const style = document.createElement('style');
style.innerHTML = cssText;
document.body.appendChild(style);

setTimeout(() => {
  // 点击复制
  const copyButton = document.querySelectorAll('[data-title="登录后复制"]');
  Array.from(copyButton).forEach(item => {
    const parent = item.parentElement;
    const newDiv = document.createElement('div');
    newDiv.classList.add('hljs-button');
    newDiv.dataset.title = '点击复制';
    newDiv.onclick = (e) => {
      const textContent = parent.textContent;
      const input = document.createElement('input');
      input.value = textContent;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove()
    }
    parent.insertBefore(newDiv, item);
    parent.removeChild(item);
  })
  // 移除 关注才能查看
  const hide = document.querySelectorAll('.hide-article-box')
  Array.from(hide).forEach(item => {
    item.remove()
  })
  // 设置全部可见
  const article_content = document.querySelector("#article_content")
  article_content.style.height = 'auto';
  article_content.style.overflow = 'auto';
}, 100)