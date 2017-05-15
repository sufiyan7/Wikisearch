function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}


$(document).ready(function(){
 // click ajax call
     $(".fetch").on("click", function() {
     	var searchterm = $(this).siblings(".searchTerm").val();
      var lang = $(this).siblings(".language").val();
      var url = "http://"+lang+".wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+searchterm+"&callback=?"

    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
          var all_keys = Object.keys(data);
          var key = all_keys[0];
          if(key == "parse"){
            var title = data["parse"]["title"];
            $(".head h1").text(title);

            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);

            // remove links as they will not work
            blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });

            // remove any references
            blurb.find('sup').remove();

            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();

            $('.display').html($(blurb).find('p'));
          }
          else
          {
            var err = "ERROR 404";
            var err2 = "Page not found"
            $('.display').html("<h1>"+err+"</h1><h3>"+err2+"</h3>");
          }

        },
        error: function (errorMessage) {
        }
    });
    });
});
