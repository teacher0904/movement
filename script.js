


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
      divEl.innerHTML = `<span class="arrow" onclick="toggleList(this)">➤</span> <span class="location">${title}</span>명`;
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
  ];

  var randomIndex = Math.floor(Math.random() * links.length);
  var selectedLink = links[randomIndex];

  window.location.href = selectedLink; // Navigate to the selected link in the current window
}


function goToLink() {
  window.open('https://forms.gle/gS3E1mCA7xcqkxhY6', '_blank');
}


async function fetchSchoolData() {
  const url = 'https://script.google.com/macros/s/AKfycbyLlP51VyfU1wpUpsStqu2dArXFG5P8gqM0WgHdEtty2cJSycCjGaZtXwP6TIFHoCJA/exec'; // 여기에 실제 배포 URL 입력

  try {
    const response = await fetch(url);
    const cellValue = await response.text();
    // 원하는 HTML 요소에 셀 값 추가
    const cellValueOutput = document.querySelector('.school-data-output');
    cellValueOutput.innerText = cellValue;
  } catch (error) {
    console.error('Fetch 요청 실패:', error);
  }
}

// 이 함수를 HTML 페이지 로드 시 호출하거나, 버튼 클릭, 이벤트 리스너 등을 사용하여 원하는 시점에 호출할 수 있습니다.
window.addEventListener('DOMContentLoaded', fetchSchoolData);
