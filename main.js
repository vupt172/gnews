$(document).ready(function() {
    $(".header-search").on("click", function() {
        $(".modal-box").show();
    });
    $(".close").on("click", function() {

        $(".modal-box").hide();
    });
    $(window).on("click", function(e) {
        if ($(e.target).is('.modal-box')) {
            $(".modal-box").hide();
        }
    });
    $("#search-gnews").on("click", function() {
        var myAPIToken = "07a539e6ea2dae0cd4dadc2669ba0ce0";
        var searchUrl = "https://gnews.io/api/v4/search?q=" + $("#search-keywords").val() + "&token=" + myAPIToken + "&lang=en";
        $(".modal-box").hide();
        $(".searching-report").empty();
        $(".articles-list").empty();
        const beforeSearchTime = Date.now();
        getGNews(searchUrl);
        const afterSearchTime = Date.now();
        $(".searching-report").append("<span>Thời gian tìm kiếm " + (afterSearchTime - beforeSearchTime) + " ms</span>");
    })
});

function getGNews(url) {
    var xhttp = new XMLHttpRequest()
    xhttp.addEventListener("loadstart", e => {
        $(".loading ").show();
    });
    xhttp.addEventListener("loadend", e => {
        $(".loading ").hide();
    })
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resultObj = JSON.parse(this.responseText);
            var myArticles = resultObj.articles
            myArticles.forEach(function(article) {
                /*  console.log(article); */
                var newHtml = "<div class='article-group'>";
                newHtml += "<img class='article-image' src='" + article.image + "'>";
                newHtml += "<div class='article-info'>";
                newHtml += "<a href='" + article.url + "'" + "target='_blank'>";
                newHtml += "<h3 class='article-title'>" + article.title + "</h3>";
                newHtml += "</a>"
                newHtml += "<span class='article-published-at'>" + article.publishedAt + "</span>"
                newHtml += "<p class='article-description'>" + article.description + "</p>";
                newHtml += "</div>";
                newHtml += "</div>";
                $(".articles-list").append(newHtml);
            });
        }
    }

    xhttp.open("GET", url);
    xhttp.send();
}