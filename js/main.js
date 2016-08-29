;(function($){

	var counter = 0;
	var $postCont = $('#posts-container');
	var $postBtn = $('#next-posts');
	var dimensions = {
		x: window.innerWidth,
		y: window.innerHeight
	}

	var scrH = $postCont.offset().top + $postCont.height() - dimensions.y - 200;

	console.log(scrH);

	window.onunload = function(){
		window.scroll(0, 0);
	}

	$(window).scroll(function(){
		console.log("scrolling" + $(window).scrollTop());
		if ($(window).scrollTop() > scrH) {
			$postBtn.addClass('show');
		} else {
			$postBtn.removeClass('show');
		}
	});

	$('#next-posts').click(function(){
		$.ajax({
			url: "posts.xml",
			type: "GET",
			dataType: "xml",

		}).done(function(xml){
			var posts = xml.getElementsByTagName('post').length;
			var post = xml.getElementsByTagName('post')[0];
			var elem = $(document.createElement('article'));
			elem.addClass('post');
			elem.html("<header class='post-header'><h2>" + post.getElementsByTagName('title')[0].childNodes[0].nodeValue + "</h2><span><date>" + post.getElementsByTagName('date')[0].childNodes[0].nodeValue + "</date></span></header>" + 
				          		"<div class='post-content'><p>" + post.getElementsByTagName('content')[0].childNodes[0].nodeValue + "</p></div>" +
				          		"<footer class='post-footer clearfix'><div class='post-footer-left'><span>Like this post</span><span><i></i></span></div><div class='post-footer-right'><span>Read more...</span></div></footer>");
			$postCont.append(elem);
			$elem = $(elem);
			$('html, body').animate({
				scrollTop: elem.offset().top - 10
			}, 1500, 'easeInOutQuart');
 			scrH = $postCont.offset().top + $postCont.height() - dimensions.y - 200;;
			console.log(scrH);
		})
	});

})(jQuery);