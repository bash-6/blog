//alert('hola')
let api = `https://api.thedogapi.com/v1/images/search?limit=`
let Time = 5000
let R = 0
let interval

/*
fetch(api)
	.then(res => res.json())
	.then(data => {
		console.log(data[0].url);
		let IMG = [...document.querySelectorAll('.slider')];
		console.log(IMG.length);
		for(let I of IMG){
			let indice = IMG.indexOf(I)
			perros.push(data[indice].url)
		}
	})
	*/

async function reloadApi(URL,n) {
	let res = await fetch(`${URL}${n}`)
	let data = await res.json()
	console.log(data);
	let IMGapi = [...document.querySelectorAll('.slider')];
	for(let i in data){
		IMGapi[i].setAttribute('id',data[i].id)
		let imgAPI = IMGapi[i].querySelector('img')
		imgAPI.setAttribute('src',data[i].url)

		let div = document.createElement('div')
		let img = document.createElement('img')
		img.setAttribute('src',data[i].url)
		div.setAttribute('class','box')
		div.setAttribute('id',data[i].id)
		div.appendChild(img)
		document.querySelector('#contenedor-box').appendChild(div)
		}

	 interval = setInterval(()=>{
		mostrarSlider()
		if (R >= IMGapi.length) {
		R = 0
		IMGapi[0].style.display = 'block'
			return
		}
		IMGapi[R].style.display = 'block'
		R++
	},Time)
	
//evento de imagenes
let boxs = [...document.querySelectorAll('.box')]
boxs.forEach(e =>{
	e.addEventListener('click',(E)=>{
		window.clearInterval(interval)
		let slider = [...document.querySelectorAll('.slider')];
		console.clear()
		let url = E.target.getAttribute('src')
		//box
		console.log(url);
		for(let e of slider) {
			let img = e.querySelector('img')
			if (url === img.getAttribute('src')) {
				mostrarSlider()
				e.style.display = 'block'
			}
		}
		//continuando setInterval
		setTimeout(()=>{
		window.clearInterval(interval)
	 interval = setInterval(()=>{
		mostrarSlider()
		if (R >= IMGapi.length) {
		R = 0
		IMGapi[0].style.display = 'block'
			return
		}
		IMGapi[R].style.display = 'block'
		R++
	},Time)
		},5000)
	})
})
}

let IMGapi = [...document.querySelectorAll('.slider')];
let N = IMGapi.length;

let perros = reloadApi(api,N)

//slider con contenido
function mostrarSlider() {
let sliders = [...document.querySelectorAll('.slider')]
sliders.forEach(e => {
	e.style.display = 'none'
})
}
//evento de imagenes
[...document.querySelectorAll('.box')].forEach(e =>{
	e.addEventListener('click',(E)=>{
		console.log('click');
		window.clearInterval(interval)
		let IMG = [...document.querySelectorAll('.slider')];
		console.clear()
		let url = E.target.getAttribute('src')
		console.log(url);
		for(let e of IMG) {
			console.log(e);
			if (e.id === url) {
			mostrarSlider()
				e.style.display = 'block'
			}
		}
		//continuando setInterval
		setTimeout(()=>{
			//let R = 0
		window.clearInterval(interval)
			let sliders = [...document.querySelectorAll('.slider')]
			 interval = setInterval(()=>{
				mostrarSlider()
				if (R >= sliders.length) {
				R = 0
				sliders[0].style.display = 'block'
					return
				}
				sliders[R].style.display = 'block'
				R++
			},Time)
		},5000)
	})
})
