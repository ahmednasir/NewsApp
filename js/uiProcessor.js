const uiProcessor = {
    containerList: $(".blog-list"),
    sourceList: $(".source-list"),
    topNewsList: $(".top-news"),
    sourcesTitle: document.getElementById("source-title"),

    DEFAULT_IMAGE_URL: "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg",

    formatDateTime: (date) => {
        return moment(date).format('MMMM Do y, h:mm a');
    },

    /**
     * build UI for news list
     * 
     */

    buildNewsCard: (article) => {
        return `<div class="blog-box row">
        <div class="col-md-4">
                <div class="post-media">
                    <a href="details.html?id=${article.id}" title="">
                        <img src="${article.urlToImage ? article.urlToImage : uiProcessor.DEFAULT_IMAGE_URL}" alt="" class="img-fluid">
                        <div class="hovereffect"></div>
                    </a>
                </div>
            </div>

            <div class="blog-meta big-meta col-md-8">
                <h4><a href="details.html?id=${article.id}" title="">${article.title}</a></h4>
                <p>${article.description}</p>
                
                <small><a href="details.html?id=${article.id}" title="">${uiProcessor.formatDateTime(article.publishedAt)}</a></small>
                <small><a href="tech-author.html" title="">${article.source}</a></small>
            </div>
        </div> `
    },

    buildNewsListLayout: (newsList, doEmpty) => {
        if (doEmpty) {
            uiProcessor.containerList.empty()
        }
        newsList.forEach(news => {
            let card = uiProcessor.buildNewsCard(news)
            uiProcessor.containerList.append(card)
        });
    },

    /**
     * build UI for news sources
     * 
     */

    buildNewsSourceListItem: (source) => {
        return `<div class="w-100 justify-content-between source-item">                                
                    <h5 class="mb-1" id="${source}">${source}</h5>
              </div>`
    },


    buildNewsSourceList: (newsSources, doEmpty) => {
        if (doEmpty) {
            uiProcessor.sourceList.empty()
        }
        newsSources.forEach(source => {
            let sourceItem = uiProcessor.buildNewsSourceListItem(source)
            uiProcessor.sourceList.append(sourceItem)
        });
        uiProcessor.sourcesTitle.textContent = "Sources"
    },


    /**
     * build UI for top news headlines
     * 
     */
    buildTopNewsCard: (article) => {
        return `<div class="second-slot">
                        <div class="masonry-box post-media">
                             <img src="${article.urlToImage}" alt="" class="img-fluid">
                             <div class="shadoweffect">
                                <div class="shadow-desc">
                                    <div class="blog-meta">
                                        
                                        <h4><a href="details.html?id=${article.id}" title="">${article.title}</a></h4>
                                        <small><a href="details.html?id=${article.id}" title="">${uiProcessor.formatDateTime(article.publishedAt)}</a></small>
                                        <small><a href="tech-author.html" title="">${article.source}</a></small>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>`
    },

    buildTopNewsList: (topNewsList) => {
        topNewsList.forEach(article => {
            let item = uiProcessor.buildTopNewsCard(article)
            uiProcessor.topNewsList.append(item)
        });
    }

}