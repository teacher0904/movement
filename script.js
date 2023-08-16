google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(run);

const sheetId = "1xS4f9iGMz6LK_-LKQ9MzvWwySL1595_BpEXTMTvCIp8"; // 구글 시트 ID
const apiKey = "AIzaSyDbPZ-tyZLPpMpMYgrkwcv8Sm8cHozdD7s"; // 구글 API 키
const sheetDataRanges = ["Sheet3!A2:B", "Sheet3!C2:D","Sheet3!E2:F", "Sheet3!G2:H","Sheet3!I2:J", "Sheet3!K2:L",
"Sheet3!M2:N", "Sheet3!O2:P","Sheet3!Q2:R", "Sheet3!S2:T","Sheet3!U2:V", "Sheet3!W2:X",
 "Sheet3!Y2:Z","Sheet3!AA2:AB", "Sheet3!AC2:AD","Sheet3!AE2:AF", "Sheet3!AG2:AH"];


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

async function showDataToggle(dataRange, parentId, loadingMsgId) {
  
  const loadingMsg = document.getElementById(loadingMsgId);
  if (!loadingMsg) {
    console.error(`로딩 메시지 요소를 찾지 못했습니다. ID: ${loadingMsgId}`);
    return;
  }
  loadingMsg.style.display = 'block';

  const data = await fetchData(sheetId, dataRange, apiKey);
  loadingMsg.style.display = 'none';
  
  if (!data) {
    return;
  }

  const parentElement = document.getElementById(parentId);
  const listContainer = document.createElement("div");
  const toggleButton = document.createElement("div");
  const dataList = document.createElement("ul");
  parentElement.appendChild(listContainer);
  listContainer.appendChild(toggleButton);
  listContainer.appendChild(dataList);

  toggleButton.innerHTML = `<span>▶</span> ${data[0].join('       ')+"명"}`;
  dataList.style.display = "none";

  for (let i = 1; i < data.length; i++) {
    if (i !== 1) {
      const rowData = data[i];
      const listItem = document.createElement("li");
      listItem.textContent = rowData.join("  ")+"명";
      dataList.appendChild(listItem);
    }
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

async function run() {
  await showDataToggle(sheetDataRanges[0], "list-parent-1", "loading1");
  await showDataToggle(sheetDataRanges[1], "list-parent-2", "loading2");
  await showDataToggle(sheetDataRanges[2], "list-parent-3", "loading3");
  await showDataToggle(sheetDataRanges[3], "list-parent-4", "loading4");
  await showDataToggle(sheetDataRanges[4], "list-parent-5", "loading5");
  await showDataToggle(sheetDataRanges[5], "list-parent-6", "loading6");
  await showDataToggle(sheetDataRanges[6], "list-parent-7", "loading7");
  await showDataToggle(sheetDataRanges[7], "list-parent-8", "loading8");
  await showDataToggle(sheetDataRanges[8], "list-parent-9", "loading9");
  await showDataToggle(sheetDataRanges[9], "list-parent-10", "loading10");
  await showDataToggle(sheetDataRanges[10], "list-parent-11", "loading11");
  await showDataToggle(sheetDataRanges[11], "list-parent-12", "loading12");
  await showDataToggle(sheetDataRanges[12], "list-parent-13", "loading13");
  await showDataToggle(sheetDataRanges[13], "list-parent-14", "loading14");
  await showDataToggle(sheetDataRanges[14], "list-parent-15", "loading15");
  await showDataToggle(sheetDataRanges[15], "list-parent-16", "loading16");
  await showDataToggle(sheetDataRanges[16], "list-parent-17", "loading17");
}



async function getCellData(dataRange, elementId) {
  // API를 사용하여 특정 범위의 데이터를 가져옵니다.
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${dataRange}?key=${apiKey}`);
  const data = await response.json();
  
  // 불러온 데이터에서 첫 번째 셀의 값을 가져옵니다.
  const cellData = data.values[0][0];

  // HTML 요소를 찾아 데이터를 업데이트합니다.
  const element = document.getElementById(elementId);
  element.textContent = cellData;
}

async function run2() {
  // Sheet1의 A1 셀 데이터를 가져와 id가 "cell-data"인 요소에 표시합니다.
  await getCellData("Sheet3!B1:B1", "cell-data");
}

run2();

async function displayCellDataAsList(dataRange, elementId) {
  // API를 사용하여 특정 범위의 데이터를 가져옵니다.
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${dataRange}?key=${apiKey}`);
  const data = await response.json();
  
  // HTML 요소를 찾아 데이터를 업데이트합니다.
  const listElement = document.getElementById(elementId);
  listElement.innerHTML = ""; // 기존 리스트를 비웁니다.
  for (const rowData of data.values) {
    const listItem = document.createElement("li");
    listItem.textContent = rowData.join(" ")+"명";
    listElement.appendChild(listItem);
  }
}

async function run3() {
  // Sheet1의 A1부터 B3까지의 셀 데이터를 가져와 id가 "data-list"인 요소에 리스트로 표시합니다.
  await displayCellDataAsList("Sheet3!AI2:AJ4", "data-list");
}

run3();
