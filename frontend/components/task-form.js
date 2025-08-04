// Функция для создания универсальной формы задачи
function createTaskForm(task = null, onSubmit, onCancel = () => null) {
  const formElem = document.createElement("form");
  formElem.classList.add("task-form"); // Общий класс для формы

  // Определяем, создаем мы новую задачу или редактируем существующую
  const isEditing = task !== null;

  // Заполняем значения для полей формы (если это редактирование)
  const titleValue = task ? task.title : '';
  const descriptionValue = task ? task.description : '';
  const statusValue = task ? task.status : '';

  // Формируем HTML-структуру формы
  formElem.innerHTML = `
    <p id="task-form-error" class="form-error" style="color: red" hidden></p>

    <label class="edit-form-label">
        Title: <input
            class="task-form-item"
            type="text"
            name="title"
            value="${escapeHtml(titleValue)}"
            ${isEditing ? 'autofocus' : ''}
        />
    </label>

     <div>
        <label class="edit-form-label" for="task-description">Description:</label>
        <textarea
            style="resize: none;"
            class="task-form-item"
            name="description"
            id="task-description"
            rows="10"
            cols="50"
        >${escapeHtml(descriptionValue)}</textarea>
     </div>

    <label class="edit-form-label">
        Status: <input
            class="task-form-item"
            type="text"
            name="status"
            value="${escapeHtml(statusValue)}"
        />
    </label>

    <div class="edit-task-form-actions">
        <button class="submit-btn" type="submit">${isEditing ? 'Сохранить' : 'Добавить'}</button>
        <button class="cancel-btn" type="button">Отмена</button>
    </div>
  `;

  // --- Обработчики событий ---

  // Обработчик для поля ввода заголовка (для скрытия ошибки при фокусе)
  const titleInput = formElem.querySelector('input[name="title"]');
  if (titleInput) {
    titleInput.addEventListener('focus', () => {
      const errorElement = formElem.querySelector("#task-form-error");
      if (errorElement) {
        errorElement.hidden = true;
      }
    });
  }

  // Обработчик отправки формы
  formElem.addEventListener("submit", (event) => {
    event.preventDefault(); // Предотвращаем стандартную отправку

    const formData = {
      title: formElem.querySelector('input[name="title"]').value,
      description: formElem.querySelector('textarea[name="description"]').value,
      status: formElem.querySelector('input[name="status"]').value
    };

    // Здесь можно добавить валидацию формы
    if (formData.title.trim() === '' || formData.description.trim() === '') {
        const errorElement = formElem.querySelector("#task-form-error");
        if (errorElement) {
            errorElement.textContent = "Пожалуйста, заполните заголовок и описание.";
            errorElement.hidden = false;
        }
        return; // Прерываем отправку, если есть ошибки
    }

    onSubmit(formData, task ? task.id : null); // Передаем данные и ID (если редактируем)
  });

  // Обработчик кнопки "Отмена"
  const cancelButton = formElem.querySelector(".cancel-btn"); // Используем общий класс
  if (cancelButton) {
    cancelButton.addEventListener("click", (event) => {
      onCancel(); // Вызываем функцию отмены
      formElem.remove(); // Удаляем форму из DOM
    });
  }

  return formElem;
}

// Вспомогательная функция для экранирования HTML-символов (для безопасности)
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

export { createTaskForm };