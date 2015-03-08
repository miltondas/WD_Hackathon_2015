$(document).ready(function () {
	var games = games || {};

	games.oddMan = {
		init: function () {
			this.eventHandlers();
			this.getImages();
		},

		getRandomArbitrary: function (max) {
		    return Math.floor(Math.random()*max);
		},

		getImages: function () {
			$(".quizy-mg-notification-fly").hide();
			var imgDir = "images/oddman/";
			var imagesFolderArray = ["chair", "animal", "game", "phone", "obama"];
			var dirIndex = this.getRandomArbitrary(imagesFolderArray.length);
			var category = imagesFolderArray[dirIndex];
			var dir = imgDir + category +"/";
			var listOfImages = "";
			var listImgArr = [];

			var selection = ["1.png","2.png","3.png","4.png","odd.png"];
			for(var i = 0; i < 5; i++) {
				var randomPosition = Math.floor(Math.random() * selection.length);
				var selected = selection.splice(randomPosition,1);
				var imageName = category + selected;
				if(selected == "odd.png"){
					imageName = selected;
				}
				listImgArr.push("<li><img class='oddManOut ui-btn' data-about='" + imageName + "' src='" + dir + imageName + "' /></li>");
			}
			listImgArr.sort(function () {
				return 0.5 - Math.random();
			});

			for(var i = 0; i < listImgArr.length; i++) {
				listOfImages += listImgArr[i];
			}
			$("#imagesSection").html("<ul class='oddManOutSection'>" + listOfImages + "</ul>");
			
		},

        //shows and hids the correct/wrong message after an action
        showResIcon: function (type) {
			var time = Math.round(4000/3);
        	var element = (type === "correct") ? $("#quizy-mg-msgcorrect") : $("#quizy-mg-msgwrong");
        	element.show().delay(time / 2).hide("explode", time / 2);
        },

		eventHandlers: function () {
			var that = games.oddMan;
			$("#imagesSection").on("click", "img", function (event) {
				if(($(this).attr("data-about")).indexOf("odd") > -1) {
					that.showResIcon("correct");
				} else {
					that.showResIcon("wrong");
				}
			});
		}
	};
	$("#playOddManNow").click(function (event) {
		$(this).html("Play With Another Set!");
		$("#imagesSection").show();
	    games.oddMan.init();
	});
});