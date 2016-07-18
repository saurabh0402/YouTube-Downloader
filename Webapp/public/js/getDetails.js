(function(){
	document.getElementsByName("searchVid")[0].addEventListener("submit", function(e){
		e.preventDefault();
		var link = this.link.value;
		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			
			if(req.readyState == 4){
				console.log(req.responseText);
				stopAnimation();
				var obj = JSON.parse(req.responseText);
				if(!obj.error){
					document.getElementsByClassName("image")[0].src = obj.img;
					document.getElementsByClassName("videoTitle")[0].innerHTML = obj.title;
					document.getElementsByClassName("noViews")[0].innerHTML = obj.views + " Views";

					obj.urls.forEach(function(item){
						var a = document.createElement("a");
						a.className = "downloadButton";
						a.download = "download";
						a.href = item.url;
						a.appendChild(document.createTextNode(item.quality + " : " + item.type.split(";")[0]))
						document.getElementsByClassName("divDownload")[0].appendChild(a);
					});

					document.getElementsByClassName("unloaded")[0].className = "unloaded gone";
				}
			}
		}
		req.open("POST", "/getvideolink");
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send("link=" + link);

		document.getElementsByClassName("divDownload")[0].innerHTML = "";
		document.getElementsByClassName("unloaded")[0].className = "unloaded present";
		startAnimation();
	});
})();