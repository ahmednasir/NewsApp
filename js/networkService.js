const networkService = {

    BASE_URL: "https://newsapi.org",
    TOP_HEADLINES_URLS: "/v2/top-headlines?country=in&apiKey=",
    TOKEN: "38307d4ff53b47d78438e5c4d10a3c54",

    newsList: [],
    newsSources: [],
    topNewsList: [],



    ajaxGet: (url) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: "GET",
                success: data => {
                    resolve(data);
                },
                error: error => {
                    reject(error);
                }
            });
        });
    },

    getNews: (isLazy) => {
        const URL = `${networkService.BASE_URL}${networkService.TOP_HEADLINES_URLS}${networkService.TOKEN}`
        networkService.ajaxGet(URL)
            .then(response => {
                console.log(response)
                networkService.processInfo(response.articles, isLazy)
            }).catch(error => {
                console.log(error)
            })
    },

    processInfo: (articles, isLazy) => {
        let sources = {}

        let index = 0;
        for (let article of articles) {
            sources[article.source.name] = article.source.name;
            article.source = article.source.name;
            article.id = new Date().getTime().toString()+ index.toString()
            index++;
        }


        if (isLazy) {
            networkService.newsList = networkService.newsList.concat(articles)
        } else {
            networkService.newsList = articles;
            networkService.topNewsList = articles.slice(Math.max(articles.length - 4, 0))
        }

        networkService.newsSources = Object.keys(sources);

        uiProcessor.buildTopNewsList(networkService.topNewsList)
        uiProcessor.buildNewsListLayout(networkService.newsList)
        uiProcessor.buildNewsSourceList(networkService.newsSources)

        window.sessionStorage.setItem("newsSources", JSON.stringify(networkService.newsSources))
        window.sessionStorage.setItem("newsList", JSON.stringify(networkService.newsList))
        window.sessionStorage.setItem("topNewsList", JSON.stringify(networkService.topNewsList))
    },


    initApp: () => {
        networkService.getNews(false)
    }

}