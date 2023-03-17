function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto'; // 先將高度設為auto以重新調整高度
    textarea.style.height = textarea.scrollHeight + 'px'; // 設置高度為文本高度
}

// 監聽<textarea>的輸入事件
var textarea = document.querySelector('textarea');
textarea.addEventListener('input', function () {
    autoResizeTextarea(this); // 調整高度
});
autoResizeTextarea(textarea)