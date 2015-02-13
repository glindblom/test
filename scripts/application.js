$(document).on("ready", function() {
  // Use AJAX to get JSON
  $.ajax({
    url: "scripts/menu-links.json",
    dataType: "json",
    data: {},
    success: renderMenu,
    error: function(data) {
      console.log("menuLinks error: ", data);
    }
  });

  function renderMenu(menuData) {
    console.log("menuLinks success: ", menuData);

    for (var i = 0; i < menuData.length; i++)
    {
      console.log("menuData["+i+"]: ", menuData[i]);
    }

    var menuHtml = $("<ul/>");
    menuData.forEach(function(item) {
      var itemLink = $("<li><a href='" + item.path + "'>" + item.title + "</a>");
      menuHtml.append(itemLink);
      if (item.children.length > 0)
      {
        var submenuHtml = $("<ul/>");
        item.children.forEach(function(childItem) {
          var submenuLink = $("<li><a href='" + childItem.path + "'>" + childItem.title + "</a></li>");
          submenuHtml.append(submenuLink);
        });
        itemLink.append(submenuHtml);
      }
    })
    $("header nav").html(menuHtml);

    $("nav > ul > li").on("mouseenter", showSubmenu).on("mouseleave", hideSubmenu);
    $("nav a").on("click", function() {
      $("nav").find(".active").removeClass("active");
      $(this).addClass("active");
    });
  }

  $("nav > ul > li").on("mouseenter", showSubmenu).on("mouseleave", hideSubmenu);
  $("nav a").on("click", function() {
    $("nav").find(".active").removeClass("active");
    $(this).addClass("active");
  });
});

function showSubmenu() {
  $(this).find("ul").slideToggle("fast");
}

function hideSubmenu() {
  $(this).find("ul").slideToggle("fast");
}
