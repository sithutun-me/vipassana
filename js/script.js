window.onscroll = function() {myFunction1()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction1() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
//Filter for search box of index page
function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("main-content");
  tr = table.getElementsByTagName("div");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("span")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
//Filter End--------
function openNav() {
  document.getElementById("myNav").style.height = "100%";
}
function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}
var myModal = document.getElementById('myModal');
myModal.addEventListener("click",function(e){
  myModal.style.display="none";
});
// function play() {

//   var id=id;
//   var track = document.getElementById('id');
//   var controlBtn = document.getElementById('play-pause');
//   function playPause() {
//     var play = document.getElementById("play");
//     var current = document.getElementsByClassName(" play");
//     if (track.paused) {
//       track.play();
//       controlBtn.className += ' active';
//       play.innerText = 'pause';
//     } else {
//       track.pause();
//       play.innerText = 'play_arrow';
//       controlBtn.classList.remove("active");
//     }
//   }
//   controlBtn.addEventListener("click", playPause);
//   track.addEventListener("ended", function () {
//     controlBtn.className = "play";
//   });

// }


(function (global) {
  var dhmma = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCatagoriesUrl = "categories.json";
  // Convenience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };
  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // Return substitute of '{{propName}}'
  // with propValue in given 'string'
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string
      .replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };
  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    // On first load, show home view
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCatagoriesUrl,
      buildAndShowCategoriesHTML);
  });

  // Builds HTML for the categories page based on the data
  // from the server
  function buildAndShowCategoriesHTML(categories) {
    // Load title snippet of categories page
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtmlUrl) {
        // Switch CSS class active to menu button

        var categoriesViewHtml =
          buildCategoriesViewHtml(categories,
            homeHtmlUrl);
        insertHtml("#main-content", categoriesViewHtml);
        var playing = false;
        $('.mytoggle').on('click', function () {
          var player = $(this).parent().parent().find('audio').get(0);
          // if you restructure your HTML this has to change
          var icon = $(this).get(0);
          var a_list = $(this).parent().parent().find('.list-group-item').get(0);
          var modal = $(this).parent().parent().parent().parent().find('.modal').get(0);
          console.log(player);
          if (navigator.onLine) {
            if (player.paused || player.currentTime == 0) {
              if (!playing) {
                player.play();
                console.log(icon);
                $(icon).text('pause');
                console.log(a_list);
                $(a_list).addClass("active");
              }
              playing = true;
            } else {
              player.pause();
              $(icon).text('play_arrow');
              $(a_list).removeClass("active");
              playing = false;
            }
          }else{
            console.log(modal);
            $(modal).show();
          }
        });
      },
      false);
  }

  function buildCategoriesViewHtml(categories,
    homeHtmlUrl) {

    var finalHtml = "";
    // Loop over categories
    for (var i = 0; i < categories.length; i++) {
      // Insert category values
      var html = homeHtmlUrl;

      var id = "" + categories[i].id;
      global.$id = id;
      var sname = "" + categories[i].sname;
      var name = "" + categories[i].name;
      var link = "" + categories[i].link;
      html = insertProperty(html, "id", id);
      html = insertProperty(html, "sname", sname);
      html = insertProperty(html, "name", name);
      html = insertProperty(html, "link", link);
      finalHtml += html;
    }

    finalHtml += "";
    return finalHtml;
  }

  global.$dhmma = dhmma;

})(window);