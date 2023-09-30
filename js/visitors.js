(async () =>{
	await fetch('https://web2022-visitors-pioddimwva-an.a.run.app')
	.then((res) => {
		return text = res.text()
	})
	.then((text) => {
		const visitors = document.getElementById("visitors");
		var visit_num = `${text}`
		visitors.insertAdjacentHTML("beforeend", visit_num);
	})

	
})()