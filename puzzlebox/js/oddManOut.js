$(document).ready(function () {
	var games = games || {};

	games.oddMan = {
		init: function () {
			this.eventHandlers();
			this.getImages();
		},

		getImages: function () {
			var dir = "images/oddman/chairs/";
			var listOfImages = "";
			var listImgArr = [];
			var fileExt = [".gif", ".png", ".jpg"];

			$.ajax({
				url: dir,
				success: function (data) {
					$(data).find("a").each(function () {
						var file = $(this).attr("href");
						$.each(fileExt, function (key, val) {
							if(file.indexOf(val) > -1) {
							    listImgArr.push("<li><img class='oddManOut ui-btn' data-about='" + file + "' src='" + dir + file + "' /></li>");
							}
						});
					});

					listImgArr.sort(function () {
						return 0.5 - Math.random();
					});
					console.log(listImgArr);

					for(var i = 0; i < listImgArr.length; i++) {
						console.log(listImgArr[i]);
						listOfImages += listImgArr[i];
					}
					$("#imagesSection").html("<ul class='oddManOutSection'>" + listOfImages + "</ul>");
				}
			});
		},

		eventHandlers: function () {
			$("#imagesSection").on("click", "img", function (event) {
				if(($(this).attr("data-about")).indexOf("odd") > -1) {
					alert("Well Done! Good Job!");
				} else {
					alert("Ooops! Find the right Odd Man");
				}
			});
		}
	};
			$("#dialog").dialog({
				autoOpen: false
			});
			$("#button").on("click", function() {
				$("#dialog").dialog("open");
			});
			    games.oddMan.init();
});