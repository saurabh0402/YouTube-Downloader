(function(){
	var animation, count = 0, dir = 1;
	var circles = document.getElementsByClassName("circle");

	function startAnimation(){
		animation = setTimeout(animate, 0);
	}

	function stopAnimation(){
		clearTimeout(animation);
	}

	function animate(){
		count += dir;
		circles[count].className = "circle big";
		circles[count - dir].className = "circle";

		if(count == 3 || count == 0)
			dir = -dir;

		animation = setTimeout(animate, 300);
	}
})();