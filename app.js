//------------ Сортировка ------------// 

function sortTableByColumn(table, column, asc = true) {
  const directionModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  // Сортировка строк
  const sortedRows = rows.sort((a, b) => {
      const firstColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
      const secontColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

      // Использую directionModifier чтобы перевернуть число
      return firstColText > secontColText ? (1 * directionModifier) : (-1 * directionModifier);
  });

  // Удаляю существующие строки
  while (tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
  }
  // Добавляю отсортированные
  tBody.append(...sortedRows);

  // Помечаю, в каком порядке отсортирована колонка 
  table.querySelectorAll("th").forEach(th => th.classList.remove("th-asc", "th-desc"));
  table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-asc", asc);
  table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-desc", !asc);
}

document.querySelectorAll(".table th").forEach(th => {
  th.addEventListener("click", () => {
      const tableElement = th.parentElement.parentElement.parentElement;
      const headerIndex = Array.from(th.parentElement.children).indexOf(th);
      const currentIsAscending = th.classList.contains("th-asc");

      sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});


//------------ Поиск ------------//

let container = document.querySelector('#table-body');

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(posts => {
  let postsData = posts;
  displayFiltered(postsData);
  init(postsData);
});
  
  
// Отображение данных в таблице
function displayFiltered(obj){
  let out = '';
  
  for(let post of obj){
    out += `
    <tr>
    <td>${post.title}</td>
    <td>${post.body}</td>
    </tr>
    `
  };
  container.innerHTML = '';
  container.innerHTML = out;
};

// Хелпер для инициализация данных
function init(obj){
  document.querySelector('.search-input').addEventListener('keyup', (e) => {
    let value = e.target.value;
    search(obj, value);
  });
};

// Поиск 
function search(obj, searchStr){
  if(!searchStr || searchStr.length < 3) return obj;
  
  const filtered = obj.filter(item=>{
    return item.title.includes(searchStr) || item.body.includes(searchStr);
  });
  
  displayFiltered(filtered);
};
