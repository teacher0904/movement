document.addEventListener("DOMContentLoaded", () => {
    function search(keyword) {
      const searchResult = [];
      const listContainers = document.getElementsByClassName("list-content");
  
      for (let i = 0; i < listContainers.length; i++) {
        const listItems = listContainers[i].getElementsByTagName("li");
  
        for (let j = 0; j < listItems.length; j++) {
          const listItemText = listItems[j].textContent.toLowerCase();
  
          if (listItemText.includes(keyword.toLowerCase())) {
            searchResult.push({ parentIndex: i, itemIndex: j, itemText: listItemText });
          }
        }
      }
  
      return searchResult;
    }
  
    function displaySearchResults(results, keyword) {
        const resultsElement = document.getElementById("search-results");
      
        while (resultsElement.firstChild) {
          resultsElement.removeChild(resultsElement.firstChild);
        }
      
        resultsElement.style.display = "block"; // 검색 결과를 보여주기 전에 search-results 리스트를 표시
      
        if (!keyword) { // 키워드가 비어있거나 공백일 때
          const noKeywordElement = document.createElement("li");
          noKeywordElement.textContent = "올바른 학교이름을 입력하세요.";
          resultsElement.appendChild(noKeywordElement);
        } else if (results.length === 0) {
          const noResultsElement = document.createElement("li");
          noResultsElement.textContent = "결과가 없습니다.";
          resultsElement.appendChild(noResultsElement);
        } else {
          results.forEach((result) => {
            const listItem = document.createElement("li");
            listItem.textContent = result.itemText;
            resultsElement.appendChild(listItem);
          });
        }
      }

      document.getElementById("search-btn").addEventListener("click", () => {
        const keyword = document.getElementById("search-box").value.trim();
        const searchResult = search(keyword);
        displaySearchResults(searchResult, keyword); // 인수에 keyword 추가
      });
      
  });
  