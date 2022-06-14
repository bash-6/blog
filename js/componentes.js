class boton extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode:'open'})
  }
  static get observedAttributes() {
    return ["bg","cl"]
  }
  attributeChangedCallback(atributo,viejo,nuevo) {
    if(atributo === "bg") {
      this.bg = nuevo
    }
    if(atributo === "cl") {
      this.cl = nuevo
    }
  }
  getTemplate() {
    const template = document.createElement("template")
    template.innerHTML = `
      <slot></slot>
    ${this.getStyles()}
    `
    return template
  }
  getStyles() {
    return `
        <style>
          :host {
            display: inline-block;
            background-color: ${this.bg};
            padding: 10px;
            border-radius: 10px;
            color: ${this.cl}
          }
          ::slotted(a) {
            color: ${this.cl};
          }
        </style>
    `
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
  }
  connectedCallback() {
    this.render()
  }
}
//customElements.define("btn-n",Boton)

class bar extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode:'open'})
  }
  static get observedAttributes() {
    return ["color"]
  }
  attributeChangedCallback(atributo,viejo,nuevo) {
    if(atributo === "color") {
      this.color = nuevo
    }
  }
  getTemplate() {
    const template = document.createElement("template")
    template.innerHTML = `
    <button>
      <div></div>
    </button>
    ${this.getStyles()}
    `
    return template
  }
  getStyles() {
    return `
        <style>
        :host {
        }
#menu-bar{display:none}        
button {
  width: 40px;
  height: 40px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  transition: all .5s;
  padding: 0;
  position: relative;
  border: none;
  background-color: transparent;
}
div {
  width: 35px;
  height: 5px;
  border-radius: 5px;
  background-color: ${this.color};
}
button::after,
button::before {
  position: absolute;
  content: "";
  display: block;
  width: 35px;
  height: 5px;
  border-radius: 5px;
  background-color: ${this.color};
  transition: all .5s;
}
:host {
 --Y: translateY(11px);
 --y: translateY(-11px);

  --RT: rotate(0deg);
  --rt: rotate(0deg);
}
button.x {
  --Y: translate(0px,0px);
  --y: translate(0px,0px);
  --RT: rotate(45deg);
  --rt: rotate(-45deg);
}
button::after{transform: var(--RT) var(--Y)}
button::before{transform: var(--rt) var(--y)}
/*
label::before {
  transform: translateY(-11px);
}
label::after {
  transform: translateY(11px);
}
#menu-bar:checked ~ label section {
  transform: translateX(-100%);
}
#menu-bar:checked ~label::after {
  transform: rotate(45deg) translate(0px,0px);
}
#menu-bar:checked ~label::before {
  transform: rotate(-45deg) translate(0px,0px);
}
*/
        </style>
    `
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
  }
  connectedCallback() {
  this.render()
  let estado=false
  let button = this.shadowRoot.querySelector("button").addEventListener("click",() => {
   if(!estado) {
    this.shadowRoot.querySelector("div").style.transform = "translateX(-100%)"
    this.shadowRoot.querySelector("button").classList.add("x")
    return estado=1
   }
   if(estado) {
    this.shadowRoot.querySelector("div").style.transform = "translateX(0%)"
    this.shadowRoot.querySelector("button").classList.remove("x")
    return estado=0
   }
  })
}
}
//customElements.define("mi-icon",Bar)
class theme extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode:'open'})
    }
  getTemplate() {
    const template = document.createElement("template")
    template.innerHTML = `
    <div>
      <input type="checkbox" name="on" id="on">
      <label id="btn" for="power">
        <span class='on'>light</span>
        <span class='of'>dark</span>
      </label>
    </div>
    ${this.getStyles()}
    `
    return template
  }
  getStyles() {
    return `

  <style>
    input{
      -webkit-appearance: none;
      appearance: none;
      width: 44px;
      height: 24px;
      border: 1px solid var(--color);
      background-color: var(--fondo);
      border-radius: 12px;
      transition: all 0.4s;
      }
    input::before{
        width: 20px;
        height: 20px;
        border-radius: 9px;
        background-color: var(--color);
        content: '';
        top: 5px;
        left: 10%;
        position: absolute;
      transition: all 0.4s;
      }
    input:checked::before {
        left: 30%;
      }
    input:checked{
      background-color: var(--fondo);
      border: none;
    }
    
    div{
      width: 90px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      position: relative;
      }
      label .on,
      input:checked ~ label .of{
          display: none;
          overflow: hidden;
        }
      input:checked ~ input::before {
        background-color: var(--color);
      }
      label .of,
      input:checked ~ label .on{
          display: inline;
          overflow: visible;
        color: var(--color);
        }
      input:checked ~ label .on{
        color: var(--color);
        }
    </style>
    `
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
  }
  connectedCallback() {
    this.render()
    let modo = this.shadowRoot.querySelector("#on")
    let getRoot = getComputedStyle(document.documentElement)
    let setRoot = document.documentElement.style
    modo.addEventListener("click",(e)=> {
  if(e.target.checked) {//true
    //change dark
    setRoot.setProperty("--color","#fff")
    setRoot.setProperty("--fondo","#222")
    document.body.style.color = "#fff"

    setRoot.setProperty("--card","#444")
    //storage dark
    let actualFondo = getRoot.getPropertyValue("--fondo")
    let actualColor = getRoot.getPropertyValue("--color")
    let actualCard = getRoot.getPropertyValue("--card")
    localStorage.setItem("fondo",actualFondo)
    localStorage.setItem("color",actualColor)
    localStorage.setItem("card",actualCard)
    document.body.style.transition = "all .3s"
    localStorage.setItem("theme","dark")
  } else {//false
    //change light
    setRoot.setProperty("--color","#333")
    setRoot.setProperty("--fondo","#eeeeee")
    document.body.style.color = "#333"
    setRoot.setProperty("--card","#fff")
    //storage light
    let actualFondo = getRoot.getPropertyValue("--fondo")
    let actualColor = getRoot.getPropertyValue("--color")
    let actualCard = getRoot.getPropertyValue("--card")
    localStorage.setItem("fondo",actualFondo)
    localStorage.setItem("color",actualColor)
    localStorage.setItem("card",actualCard)
    document.body.style.transition = "all .3s"
    localStorage.setItem("theme","light")
    //location.reload()
  }

})
document.addEventListener("DOMContentLoaded",e => {
  if(localStorage.getItem("theme") === null) {
    localStorage.setItem("fondo","#eee")
    localStorage.setItem("card","#fff")
    localStorage.setItem("color","#333")
    localStorage.setItem("theme","light")
  }
  if(localStorage.getItem("theme") === "dark") {

    setRoot.setProperty("--fondo",localStorage.getItem("fondo"))
    setRoot.setProperty("--color",localStorage.getItem("color"))
    setRoot.setProperty("--card",localStorage.getItem("card"))
    modo.checked = true
  }
  if(localStorage.getItem("theme") === "light") {
    setRoot.setProperty("--fondo",localStorage.getItem("fondo"))
    setRoot.setProperty("--color",localStorage.getItem("color"))
    setRoot.setProperty("--card",localStorage.getItem("card"))
    modo.checked = false
  }
})
}
}
//export default customElements.define('mi-theme',OnOff)
class sliderText extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode:'open'})
  }
  static get observedAttributes() {
    return ["contenido","cl"]
  }
  attributeChangedCallback(atributo,viejo,nuevo) {
    if(atributo === "contenido") {
      this.text = nuevo
    }
    if(atributo === "cl") {
      this.color = nuevo
    }
  }
  getTemplate() {
    const template = document.createElement("template")
    template.innerHTML = `
      <p>${this.text}</p>
    ${this.getStyles()}
    `
    return template
  }
  getStyles() {
    return `
        <style>
        :host {
          display: grid;
          height: 250px;
          place-content: center;
        }
        p {
          font-size: 1.5rem;
          color: ${this.color};
          margin-top: 0.1px;
          width: 80%;
          margin-left: auto;
          margin-right: auto;
        }
          @media (min-width: 600px) {
          :host {
            height: 350px;
          }
            p { font-size: 2rem; }
          }
          @media (min-width: 1000px) {
          :host {
            height: 450px;
          }
          p{ font-size: 3rem; }
          }
        </style>
    `
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
  }
  connectedCallback() {
    this.render()
  }
}
//customElements.define("slider-text",sliderText)

class imagen extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode:'open'})
  }
  static get observedAttributes() {
    return ["url"]
  }
  attributeChangedCallback(atributo,viejo,nuevo) {
    if(atributo === "url") {
      this.url = nuevo
    }
  }
  getTemplate() {
    const template = document.createElement("template")
    template.innerHTML = `
     <div>
      <slot name="contenido"></slot>
     </div>
    ${this.getStyles()}
    `
    return template
  }
  getStyles() {
    return `
        <style>
        :host {
        }
          div {
          background-image: url("${this.url}");
          background-repeat: no-repeat;
          background-size: 100% 100%;;
          text-align: center;
          font-size: 1.2rem;
          min-height: 250px;
          }
          @media (min-width: 600px) {
            div { min-height: 300px; }
          ::slotted(p),
          ::slotted(div){
          font-size: 1.5rem;
          }
          }
          @media (min-width: 1000px) {
            div { min-height: 400px; }
          ::slotted(p),
          ::slotted(div){
          font-size: 2rem;
          }
          }
          ::slotted(p),
          ::slotted(div){
          margin-top: 0.1px;
          padding-top: 100px;
          }
          ::slotted(a) {
            cursor: pointer;
            text-decoration: none;
            padding: 10px;
            display: inline-block;
            border: 1px solid var(--fondo);
            background-color: var(--fondo);
            border-radius: 10px;
            color: var(--color);
            margin: 10px;
          }
          
        </style>
    `
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
  }
  connectedCallback() {
    this.render()
  }
}
//customElements.define("img-box",imagen)
export {
boton,
bar,
theme,
imagen,
sliderText,
} 
