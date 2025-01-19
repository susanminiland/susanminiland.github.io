// 祝福語資料庫
const wishes = {
  family: [
    "祝家人新年快樂，身體健康，萬事如意！",
    "願新的一年，家人平安喜樂，幸福美滿！",
    "祝福家人新年新氣象，心想事成！"
  ],
  friend: [
    "祝好友新年快樂，友誼長存！",
    "願新的一年，我們繼續一起創造美好回憶！",
    "祝福好友事業順利，愛情甜蜜！"
  ],
  business: [
    "祝貴公司新年新氣象，業績長紅！",
    "願新的一年，合作愉快，共創雙贏！",
    "祝福事業蒸蒸日上，財源廣進！"
  ],
  humor: [
    "祝你新年快樂，紅包拿來！",
    "願新的一年，體重不增，錢包不減！",
    "祝福你新年吃好睡好，煩惱全消！"
  ]
};

// DOM元素
const generateBtn = document.getElementById('generate-btn');
const resultText = document.getElementById('result-text');
const categories = document.querySelectorAll('.category');
const countdown = document.getElementById('countdown');

// 當前選擇的分類
let currentCategory = 'family';

// 設定倒數計時
function setCountdown() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const newYear = new Date(nextYear, 0, 1);
  const diff = newYear - now;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.textContent = `距離新年還有 ${days} 天`;
}

// 播放音效
function playSound() {
  const audio = new Audio('new-year-sound.mp3');
  audio.play().catch(() => {
    // 如果音效無法播放，則不處理
  });
}

// 生成祝福語
function generateWish() {
  const categoryWishes = wishes[currentCategory];
  const randomIndex = Math.floor(Math.random() * categoryWishes.length);
  return categoryWishes[randomIndex];
}

// 處理按鈕點擊
generateBtn.addEventListener('click', () => {
  // 按鈕動畫
  generateBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    generateBtn.style.transform = 'scale(1)';
  }, 100);

  // 生成並顯示祝福語
  const wish = generateWish();
  resultText.style.opacity = 0;
  resultText.textContent = wish;
  setTimeout(() => {
    resultText.style.opacity = 1;
  }, 10);

  // 播放音效
  playSound();
});

// 處理分類選擇
categories.forEach(category => {
  category.addEventListener('click', () => {
    // 移除所有active類別
    categories.forEach(c => c.classList.remove('active'));
    // 添加active類別到當前選擇的分類
    category.classList.add('active');
    // 更新當前分類
    currentCategory = category.dataset.category;
  });
});

// 處理祝福語複製
resultText.addEventListener('click', () => {
  navigator.clipboard.writeText(resultText.textContent)
    .then(() => {
      const copySuccess = document.createElement('div');
      copySuccess.textContent = '複製成功！';
      copySuccess.style.position = 'fixed';
      copySuccess.style.top = '20px';
      copySuccess.style.left = '50%';
      copySuccess.style.transform = 'translateX(-50%)';
      copySuccess.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      copySuccess.style.color = '#fff';
      copySuccess.style.padding = '10px 20px';
      copySuccess.style.borderRadius = '5px';
      copySuccess.style.zIndex = '1000';
      copySuccess.style.animation = 'fadeOut 0.5s forwards';
      document.body.appendChild(copySuccess);
      setTimeout(() => {
        document.body.removeChild(copySuccess);
      }, 500);
    })
    .catch(() => {
      alert('複製失敗，請手動複製文字');
    });
});

// 初始化
setCountdown();
