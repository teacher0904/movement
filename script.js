let data = [];
let totalData = [];
let typeData = [];


async function fetchData() {
    const response = await fetch('./report.html');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const regions = doc.querySelectorAll('ul');
    const firstLine = html.split("\n")[0];

    for (const region of regions) {
      const id = region.id;
      const items = Array.from(region.querySelectorAll('li')).map(li => li.innerText);
      if(id === "total" || id === "type"){
          const values = {id: id, items: items};
          if(id === "total"){
              totalData.push(values);
          }else{
              typeData.push(values);
          }
      }else{
          data.push({ id, items });
      }
  }
  createLists();
  displayTotalData();
  displayTypeData();
  displayDataTime(firstLine);
}

function toggleList(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    content.style.maxHeight = content.style.maxHeight ? '' : (content.scrollHeight + "px");
    arrow.classList.toggle('rotate');
}

function createLists() {
  const listsContainer = document.querySelector('.col-3-1');

  for (const d of data) {
    const listDiv = document.createElement('div');
    listDiv.className = `list-parent${data.indexOf(d) + 1}`;

      const title = d.items[0];
      const divEl = document.createElement('div');
      divEl.className = 'list-title';
      divEl.setAttribute('onclick', `toggleList(this)`);
      divEl.innerHTML = `<span class="arrow" onclick="toggleList(this)">➤</span> ${title}명`;
      listDiv.appendChild(divEl);

      const ulEl = document.createElement('ul');
      ulEl.className = 'list-content';
      const itemListHtml = d.items.slice(1).map(item => `<li>${item}명</li>`).join('');
      ulEl.innerHTML = itemListHtml;
      listDiv.appendChild(ulEl);

      listsContainer.appendChild(listDiv);
  }
}



function displayTotalData() {
  const totalOutput = document.querySelector('.total-output');
  totalData.forEach(data => {
    const { items } = data;
    const text = items.join(', ');
    const p = document.createElement('p');
    p.innerText = text + "명";
    totalOutput.appendChild(p);
  });
}


function displayTypeData() {
  const typeOutput = document.querySelector('.type-output');
  typeData.forEach(data => {
      const { items } = data;
      const ul = document.createElement('ul');
      items.forEach(item => {
          const li = document.createElement('li');
          li.innerText = item + "명";
          ul.appendChild(li);
      });
      typeOutput.appendChild(ul);
  });
}

function displayDataTime(dataTime) {
  const dataTimeOutput = document.querySelector(".report-data-time-output");
  const p = document.createElement("p");
  p.innerText = dataTime;
  dataTimeOutput.appendChild(p);
}

function randomLink() {
  var links = [
    'https://open.kakao.com/o/sRSdZ8Bf'//YJ
  ];

  var randomIndex = Math.floor(Math.random() * links.length);
  var selectedLink = links[randomIndex];

  window.open(selectedLink); // 새 창으로 링크를 엽니다.
}
