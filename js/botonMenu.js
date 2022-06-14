class botonMenu extends HTMLElement {
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
  width: 25px;
  height: 3px;
  border-radius: 5px;
  background-color: ${this.color};
}
button::after,
button::before {
  position: absolute;
  content: "";
  display: block;
  width: 25px;
  height: 3px;
  border-radius: 5px;
  background-color: ${this.color};
  transition: all .5s;
}
:host {
 --Y: translateY(8px);
 --y: translateY(-8px);

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

customElements.define("boton-menu",botonMenu)
