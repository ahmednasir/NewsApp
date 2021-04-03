const mainController = {

    BASE_URL: "https://newsapi.org",
    TOP_HEADLINES_URLS: "/v2/top-headlines?country=in&apiKey=",
    TOKEN: "38307d4ff53b47d78438e5c4d10a3c54",

    newsList: [],
    newsSources: [],
    topNewsList: [],
    sources : {},

    isSourceClicked:false,
    prevClickedSource:"",

    loader: $(".bottom-loader"),


    // function to filter news by source
    onSourceClicked:(event)=>{
        mainController.isSourceClicked = true;
        let id = event.target.id
        if(id == "source-list") return

        let filteredArray =mainController.newsList.filter(news => news.source.toLowerCase() == id.toLowerCase())
        uiProcessor.buildNewsListLayout(filteredArray, true)
        if(mainController.prevClickedSource){
            document.getElementById(mainController.prevClickedSource).style.fontWeight = 'normal';    
        }
        document.getElementById(id).style.fontWeight = 'bold';
        mainController.prevClickedSource = id;
    },


    // network call to get the news
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

    //controller for getting the news
    getNews: (isLazy) => {
        mainController.loader.show()
        const URL = `${mainController.BASE_URL}${mainController.TOP_HEADLINES_URLS}${mainController.TOKEN}`
        mainController.ajaxGet(URL)
            .then(response => {
                mainController.loader.hide()
                mainController.processInfo(response.articles, isLazy)
            }).catch(error => {
                mainController.loader.hide()
                console.log(error)
                alert("Something went wrong. Please try again later")
            })
    },

    // process all the news articles and make different types of list
    processInfo: (articles, isLazy) => {
        

        let index = 0;
        for (let article of articles) {
            mainController.sources[article.source.name] = article.source.name;
            article.source = article.source.name;
            article.id = new Date().getTime().toString()+ index.toString()
            index++;
        }


        if (isLazy) {
            mainController.newsList = mainController.newsList.concat(articles)
        } else {
            mainController.newsList = articles;
            mainController.topNewsList = articles.slice(Math.max(articles.length - 4, 0))
        }

        mainController.newsSources = Object.keys(mainController.sources);

        if(!isLazy)uiProcessor.buildTopNewsList(mainController.topNewsList)
        uiProcessor.buildNewsListLayout(mainController.newsList, false)
        uiProcessor.buildNewsSourceList(mainController.newsSources)

        window.sessionStorage.setItem("newsSources", JSON.stringify(mainController.newsSources))
        window.sessionStorage.setItem("newsList", JSON.stringify(mainController.newsList))
        window.sessionStorage.setItem("topNewsList", JSON.stringify(mainController.topNewsList))
    },

    // function to handle infinite scroll
    infiniteScroll: ()=>{
        $(window).scroll(function(event) {
            if ($(window).scrollTop() + $(window).height() >= $(document).height() && !mainController.isSourceClicked) {
              event.stopPropagation();
              
              mainController.getNews(true)
            }
          });
    },


    initApp: () => {
        mainController.getNews(false)

        /**
         * Event Listeners
         */
        $(".source-list").click(mainController.onSourceClicked)
        mainController.infiniteScroll()
       
    }

}