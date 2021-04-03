const uiProcessor = {
    containerList: $(".blog-list"),
    sourceList: $(".source-list"),
    topNewsList: $(".top-news"),

    formatDateTime: (date) => {
        return new Date(date).toString()
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
                        <img src="${article.urlToImage}" alt="" class="img-fluid">
                        <div class="hovereffect"></div>
                    </a>
                </div>
            </div>

            <div class="blog-meta big-meta col-md-8">
                <h4><a href="details.html?id=${article.id}" title="">${article.title}</a></h4>
                <p>Aenean interdum arcu blandit, vehicula magna non, placerat elit. Mauris et pharetratortor. Suspendissea sodales urna. In at augue elit. Vivamus enim nibh, maximus ac felis nec, maximus tempor odio.</p>
                
                <small><a href="details.html?id=${article.id}" title="">${uiProcessor.formatDateTime(article.publishedAt)}</a></small>
                <small><a href="tech-author.html" title="">${article.source}</a></small>
            </div>
        </div> `
    },

    buildNewsListLayout: (newsList) => {

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
                    <h5 class="mb-1">${source}</h5>
              </div>`
    },


    buildNewsSourceList: (newsSources) => {
        newsSources.forEach(source => {
            let sourceItem = uiProcessor.buildNewsSourceListItem(source)
            uiProcessor.sourceList.append(sourceItem)
        });
    },


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