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
