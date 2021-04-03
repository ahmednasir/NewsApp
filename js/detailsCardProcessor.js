const detailsCard = {
    title: document.getElementById("title"),
    time: document.getElementById("time"),
    source: document.getElementById("source"),
    articleImage: document.getElementById("article-image"),
    articleDescription: document.getElementById("article-description"),
    articleContent: document.getElementById("article-content"),

    applyPlaceholder: (article) => {
        detailsCard.title.textContent = article.title
        detailsCard.time.textContent = uiProcessor.formatDateTime(article.publishedAt)
        detailsCard.source.textContent = article.source
        detailsCard.articleImage.setAttribute("src", article.urlToImage)
        detailsCard.articleDescription.textContent = article.description;
        detailsCard.articleContent.innerHTML = `<p>${article.content} <a href="${article.url}" target="_blank">Read more...</a></p>`
        

    },

    initPage: () => {
        try {
            let newsId = window.location.search.replace("?id=", "");
            let newsList = window.sessionStorage.getItem("newsList");
            if (!newsList) throw "nullList";
            
            newsList =JSON.parse(newsList)
            let article = newsList.filter(news=> news.id === newsId)
            detailsCard.applyPlaceholder(article[0])
        } catch (error) {
            console.log(error);
            alert("Something went wrong. Please try again later.");
        }


    }

}

$(document).ready(function () { detailsCard.initPage() })