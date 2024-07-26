const apiKey = "T2tO-_csKh6dBalU2_m05WgnElEgiETrxZScp-ITcO4"



window.addEventListener("load", () => {
  renderPhoto();
});

async function getRandomPhoto() {
  // //               ключ сюда
  // const apiKey = "teI77ybP41b2nJcQY-mOmE8nEH0sFeXnWJQTxdgpZcA";
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}`
    );
    const photo = await response.json();
    return photo;
  } catch (error) {
    console.error("Ошибка при загрузке фотографий:", error);
    return {};
  }
}

async function renderPhoto() {
  const photo = await getRandomPhoto();
  if (photo) {
    createCardPhoto(photo);
  }
}

function createCardPhoto(photo) {
  const contentDiv = document.querySelector(".content");
  contentDiv.innerHTML = `
        <div class="box-photo">
            <div class="box-photo__id"><span>${photo.id}</span></div>
            <div class="box-photo__photo">
                <img src="${photo.urls.regular}" alt="${photo.alt_description}" />
                <span>photo</span>
            </div>
            <div class="box-photo__photographer">
                <span>имя фотографа :</span>
                <span class="image_photographer-name">${photo.user.name}</span>
            </div>
            <div class="box-photo__like like">
                <button type="button" class="image__likes-button">Поставить лайк</button>
                <button type="button" class="image__dislikes-button">убрать лайк</button>
                <div class="like__counter">
                    <span>Количество лайков </span><span class="image__likes-counter">0</span>
                </div>
                
            </div>
            <button class="next">Следующее фото</button>
            
        </div>
    `;

  //кнопка лайка
  const likeButtonEl = document.querySelector(".image__likes-button");
  likeButtonEl.addEventListener("click", function () {
    saveThisPhotoToLocalStorage();
  });
  
  //кнопка дизлайка
  const disLikeButtonEl = document.querySelector(".image__dislikes-button");
  disLikeButtonEl.addEventListener("click", function () {
    deleteThisPhotoFromLocalStorage();
  });

  //кнопка следующей фотографии
  const btnNext = document.querySelector(".next");
  btnNext.addEventListener("click", () => {
    const photoID = document.querySelector(".box-photo__id span").textContent;

    if (localStorage.getItem(photoID)) {
      likeButtonEl.disabled = true;
    }
     location.reload();
  });
}

function saveThisPhotoToLocalStorage() {
  const likesCounterEl = document.querySelector(".image__likes-counter"); // счетчик лайков
  const boxPhotoIdTextEl = document.querySelector(".box-photo__id span").textContent; // id фото
  const currentCounter = parseInt(likesCounterEl.textContent, 10);
  const boxPhotographerNameTextEl = document.querySelector(".image_photographer-name").textContent; //  photographer
  if (isNaN(currentCounter)) {
    console.error("Cannot convert likes counter to a number");
    return;
  }
  
  likesCounterEl.textContent = currentCounter + 1;
  
  const dislikeButtonEl = document.querySelector(".image__dislikes-button");
  const likeButtonEl = document.querySelector(".image__likes-button");
  dislikeButtonEl.disabled = false;
  likeButtonEl.disabled = true;
  
  // Сохраняем в localStorage по photo ID
  localStorage.setItem(boxPhotoIdTextEl,`${boxPhotographerNameTextEl} liked`);
}

function deleteThisPhotoFromLocalStorage(photoID) {
  const boxPhotoIdTextEl = document.querySelector(".box-photo__id span").textContent;
  localStorage.removeItem(boxPhotoIdTextEl);
  const likesCounterEl = document.querySelector(".image__likes-counter");
  const currentCounter = parseInt(likesCounterEl.textContent, 10);
  // Проверка на корректность преобразования
  if (isNaN(currentCounter)) {
    console.error("Cannot convert likes counter to a number");
    return;
  }

  likesCounterEl.textContent = currentCounter - 1;
  
  const dislikeButtonEl = document.querySelector(".image__dislikes-button");
  const likeButtonEl = document.querySelector(".image__likes-button");
  dislikeButtonEl.disabled = true;
  likeButtonEl.disabled = false;
}


//-----------------------------------------------------------------------








