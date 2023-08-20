document.addEventListener("DOMContentLoaded", () => {
    function search(keyword) {
        const searchResult = [];
        const listContainers = document.querySelectorAll(".list-parent1, .list-parent2, .list-parent3, .list-parent4, .list-parent5, .list-parent6, .list-parent7, .list-parent8, .list-parent9, .list-parent10, .list-parent11, .list-parent12, .list-parent13, .list-parent14, .list-parent15, .list-parent16, .list-parent17");

        for (let i = 0; i < listContainers.length; i++) {
            const listItems = listContainers[i].getElementsByTagName("li");

            for (let j = 0; j < listItems.length; j++) {
                const listItemText = listItems[j].textContent.trim().toLowerCase();

                if (listItemText.includes(keyword.trim().toLowerCase())) {
                    searchResult.push({ parentIndex: i, itemIndex: j, itemText: listItemText });
                }
            }
        }

        return searchResult;
    }

    function displaySearchResults(results, keyword) {
        const resultsElement = document.getElementById("search-results");
        const listContainers = document.querySelectorAll(".list-parent1, .list-parent2, .list-parent3, .list-parent4, .list-parent5, .list-parent6, .list-parent7, .list-parent8, .list-parent9, .list-parent10, .list-parent11, .list-parent12, .list-parent13, .list-parent14, .list-parent15, .list-parent16, .list-parent17");

        while (resultsElement.firstChild) {
            resultsElement.removeChild(resultsElement.firstChild);
        }

        resultsElement.style.display = "block";

        if (!keyword.trim()) {
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
                const listTitleElement = listContainers[result.parentIndex].querySelector(".list-title");
                const extractedText = listTitleElement ? listTitleElement.querySelector(".location").textContent : "";
                const listTitleText = extractedText.substring(0, 2);
                listItem.textContent = "[" + listTitleText + "] " + result.itemText;
                resultsElement.appendChild(listItem);
            });
        }
    }

    document.getElementById("search-btn").addEventListener("click", () => {
        const keyword = document.getElementById("search-box").value;
        const searchResult = search(keyword);
        displaySearchResults(searchResult, keyword);
    });
});
