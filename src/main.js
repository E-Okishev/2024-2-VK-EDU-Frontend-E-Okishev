import './style.css';

const STORAGE_KEY = 'chatMessages';

let dialog = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  {
    isMyMessage: true,
    name: 'Егор Окишев',
    link: 'https://vk.com/kakoi_to_student',
    text: 'Некоторые моменты надо будет переделать. Например, тут менюха внизу, а в вашем макете боковое',
    time: '19:52',
  },
  {
    isMyMessage: false,
    name: 'Дмитрий Зайцев',
    link: 'https://vk.com/haseprogram',
    text: 'Выглядит супер)',
    time: '09:47',
  },
  {
    isMyMessage: true,
    name: 'Егор Окишев',
    link: 'https://vk.com/kakoi_to_student',
    text: 'ее, спасибо)',
    time: '09:48',
  },
  {
    isMyMessage: false,
    name: 'Дмитрий Зайцев',
    link: 'https://vk.com/haseprogram',
    text: 'Для мобильной версии можно так и оставить все, а для десктопной сделать выдвигающееся меню. Но как Мартин написал в общем чате, про респонсив до 4 лекции можно не беспокоиться',
    time: '09:47',
  },
];

// Элементы DOM
const messageBox = document.querySelector('.box');
const form = document.querySelector('.form');
const input = document.querySelector('.input');

// Функция для создания сообщения на основе шаблона
function createMessageElement(message) {
  const template = message.isMyMessage
    ? document.getElementById('my-message-template')
    : document.getElementById('message-template');

  const messageElement = template.content.cloneNode(true);

  const authorElement = messageElement.querySelector('.message__author');
  const textElement = messageElement.querySelector('.message__text');
  const timeElement = messageElement.querySelector('.message__time');
  const linkElement = messageElement.querySelector('a');

  authorElement.textContent = message.name;
  textElement.textContent = message.text;
  timeElement.textContent = message.time;
  linkElement.href = message.link;

  return messageElement;
}

// Функция для отображения всех сообщений из массива
function renderMessages() {
  messageBox.innerHTML = '';
  dialog.forEach(message => {
    const messageElement = createMessageElement(message);
    messageBox.appendChild(messageElement);
  });
}

// Функция для сохранения диалога в localStorage
function saveMessages() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dialog));
}

// Добавление нового сообщения
function addMessage(author, text, isMyMessage) {
  const newMessage = {
    isMyMessage,
    name: author,
    link: isMyMessage ? 'https://vk.com/kakoi_to_student' : '#',
    text: text,
    time: new Date().toLocaleTimeString().slice(0, -3)
  };
  dialog.push(newMessage);
  renderMessages();
  saveMessages(); // Сохраняем обновлённый диалог
  toBottom();
}

// Обработка отправки формы
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    addMessage('Егор Окишев', text, true);
    input.value = '';
  }
});

function toBottom() {
  messageBox.scroll(0, messageBox.scrollHeight)
}

// Инициализация: рендерим сообщения из localStorage
renderMessages();
toBottom()