const som = document.querySelector("#som")
const usd = document.querySelector("#usd")
const rub = document.querySelector("#rub")

const convert = (elem, target, rate) => {
  elem.addEventListener("input", () => {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
          if (rate === "KGS") {
            target.value = (elem.value / data.usd).toFixed(2)
          } else if (rate === "RUB") {
            target.value = (elem.value / data.rub).toFixed(2)
          } else if (rate === "KGS2") {
            target.value = (elem.value * data.usd).toFixed(2)
          } else if (rate === "RUB2") {
            target.value = (elem.value * data.rub).toFixed(2)
          }
          elem.value !== "" || (target.value = "")
        })
        .catch(error => console.error(error))
  })
}

convert(som, usd, "KGS") 
convert(usd, som, "KGS2") 
convert(rub, usd, "RUB") 
convert(usd, rub, "RUB2") 
convert(som, rub, "KGS2");
convert(rub, som, "RUB2");



const form = document.getElementById('myForm');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeButton = document.querySelector('.close');

// Закрываем модальное окно при клике на крестик
closeButton.onclick = function() {
  modal.style.display = 'none';
};

// Закрываем модальное окно при клике вне его области
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const url = 'https://example.com/api/data';
  const data = JSON.stringify({
    name: form.name.value,
    email: form.email.value
  });

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: data
  })
      .then(response => {
        if (response.ok) {
          modal.style.display = 'block';
          modalMessage.textContent = 'Данные успешно отправлены!';
        } else if (response.status === 400) {
          modal.style.display = 'block';
          modalMessage.textContent = 'Ошибка: неверный запрос.';
        } else if (response.status === 500) {
          modal.style.display = 'block';
          modalMessage.textContent = 'Ошибка сервера.';
        } else {
          modal.style.display = 'block';
          modalMessage.textContent = 'Ошибка: ' + response.statusText;
        }
      })
      .catch(error => {
// Если произошла ошибка
        modal.style.display = 'block';
        modalMessage.textContent = 'Ошибка запроса.';
      });
});


