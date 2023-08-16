google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(run);

const sheetId = "1xS4f9iGMz6LK_-LKQ9MzvWwySL1595_BpEXTMTvCIp8"; // 구글 시트 ID
const apiKey = "AIzaSyDbPZ-tyZLPpMpMYgrkwcv8Sm8cHozdD7s"; // 구글 API 키
const sheetDataRange = "Sheet3!A2:B";

async function fetchData(sheetId, dataRange, apiKey) {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${dataRange}?key=${apiKey}`
  );

  if (!response.ok) {
    console.error("서버로부터 에러 메시지를 받았습니다:", response.status);
    return null;
  }
  
  const responseData = await response.json();
  return responseData.values;
}

async function run() {
}

// 데이터를 출력하는 함수 정의
async function showDataList() {
    const data = await fetchData(sheetId, sheetDataRange, apiKey);
    const listContainer = document.getElementById("sheetDataList");
  
    data.forEach((row) => {
      const listItem = document.createElement("li");
      listItem.textContent = row.join("\u00a0\u00a0");
      listContainer.appendChild(listItem);
    });
  }
  
  // 코드 실행
  showDataList();
  

      // 데이터를 출력하는 함수 정의
      async function showDataToggle() {
        const data = await fetchData(sheetId, sheetDataRange, apiKey);
        const listContainer = document.getElementById("list");
        const toggleButton = document.getElementById("toggle-button");
  
        // 첫 번째 행을 토글 버튼 제목으로 설정
        toggleButton.innerHTML = `<span>▶</span> ${data[0].join(' / ')}`;
  
        // 두 번째 행부터 리스트 항목으로 추가
        for (let i = 1; i < data.length; i++) {
          const rowData = data[i];
          const listItem = document.createElement("li");
          listItem.textContent = rowData.join("  ");
          listContainer.appendChild(listItem);
        }
      // 화살표 요소를 선택
      const arrow = toggleButton.querySelector("span")

      // 토글 버튼 이벤트 리스너를 추가
      toggleButton.addEventListener('click', function() {
        const listContainer = document.getElementById('list-container');
        if (listContainer.style.display === 'none') {
          listContainer.style.display = 'block';
          arrow.textContent = '▼'; // 아래 방향 세모로 변경
        } else {
          listContainer.style.display = 'none';
          arrow.textContent = '▶'; // 오른쪽 방향 세모로 변경
        }
      });        
      }

      // 코드 실행
      showDataToggle();
  

