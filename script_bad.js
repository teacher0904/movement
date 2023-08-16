const sheetId = "1xS4f9iGMz6LK_-LKQ9MzvWwySL1595_BpEXTMTvCIp8"; // 구글 시트 ID
const apiKey = "AIzaSyDbPZ-tyZLPpMpMYgrkwcv8Sm8cHozdD7s"; // 구글 API 키
const sheetDataRange = ["Sheet3!A2:B","Sheet3!C2:D"];

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

async function showDataList(sheetDataRange) {
  const data = await fetchData(sheetId, sheetDataRange, apiKey);
  if (!data) return;

  const listContainer = document.createElement("div");
  listContainer.className = "list-container";
  document.body.appendChild(listContainer);

  const toggleButton = document.createElement("button");
  toggleButton.innerHTML = `<span>▶</span> ${data[0].join(' / ')}`;
  listContainer.appendChild(toggleButton);

  const dataList = document.createElement("ul");
  dataList.style.display = "none";
  listContainer.appendChild(dataList);

  for (let i = 1; i < data.length; i++) {
    const rowData = data[i];
    const listItem = document.createElement("li");
    listItem.textContent = rowData.join("  ");
    dataList.appendChild(listItem);
  }

  const arrow = toggleButton.querySelector("span");

  toggleButton.addEventListener("click", function () {
    if (dataList.style.display === "none") {
      dataList.style.display = "block";
      arrow.textContent = "▼";
    } else {
      dataList.style.display = "none";
      arrow.textContent = "▶";
    }
  });
}

(async function run() {
  for (const sheetDataRange of sheetDataRanges) {
    await showDataList(sheetDataRange);
  }
})().catch((error) => {
  console.error("실행 중 문제가 발생했습니다:", error);
});