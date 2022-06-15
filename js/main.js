function $(tag) { return document.querySelector(tag); }
function $$(tag) { return [...document.querySelectorAll(tag)]; }

//mostrando menu navegacion
$('boton-menu').addEventListener('click',(e)=>{
	let btn = $('boton-menu');
	if (btn.classList.contains('open')) {
		$('.navegacion-top').style.transform = 'translateX(-100%)'
		//$('.navegacion-top').style.backgroundColor = 'rgba(0,0,0,.6)'
		$('body').style.overflow = 'hidden'
		btn.classList.remove('open');
		btn.classList.add('close');
	} else {
		$('.navegacion-top').style.transform = 'translateX(-200%)'
		btn.classList.remove('close');
		btn.classList.add('open');
		$('body').style.overflow = 'auto'
	}
})

//animacion modal
let inputs = $$('.modal div input')
//mostrando servicios
$('.ver-servicios').addEventListener('click',()=>{
	$('.modal').style.display = 'block'
	inputs.forEach(e => {
		//e.setAttribute('checked','false')
	})
	setTimeout(()=>{
		inputs[2].checked = 'true'
	},1000)
})

$('#close-modal').addEventListener('click',()=>{
	$('.modal').style.display = 'none'
	inputs.forEach(e => {
		e.setAttribute('checked','false')
	})
	inputs[0].checked = 'true'
})

//cambiar tema a dark
$$('.theme').forEach(e => {
	e.addEventListener('click',()=>{
		if ($('.acerca').classList.contains('light')) {
			$('.acerca').style.backgroundColor = '#222'
			$('.acerca').style.color = '#fff'
			$('.acerca').classList.remove('light')
			$('.acerca').classList.add('dark')
			$('.acerca .fa-sun').style.display = 'block'
			$('.acerca .fa-moon').style.display = 'none'
			
		} else if($('.acerca').classList.contains('dark')){
			$('.acerca').style.backgroundColor = '#fff'
			$('.acerca').style.color = '#222'
			$('.acerca').classList.remove('dark')
			$('.acerca').classList.add('light')
			$('.acerca .fa-sun').style.display = 'none'
			$('.acerca .fa-moon').style.display = 'block'
		}
	})
})

//scroll animado
let card = $$('.card-herramienta')
window.addEventListener('scroll',()=>{
	let scrollTop = document.documentElement.scrollTop
	card.forEach(e => {
		let alturaAnimado = e.offsetTop
		if (alturaAnimado -550 < scrollTop) {
			e.style.opacity = '1'
		}
	})
})
