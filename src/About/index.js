import '../styles/about.css'

let timer = 0
const icons = document.getElementsByTagName('i')
let delayedEnterIcons = []
const delayIcon = 200
for (let i = 0; i < icons.length; i++, timer++) {
    delayedEnterIcons[i] = new Promise(resolve => {
        setTimeout(() => {
            icons[i].classList.add('show-icons')
            resolve()
        }, timer * delayIcon)
    })
}

window.addEventListener('pageshow', async event => {
    for (const iconEnter of delayedEnterIcons) await iconEnter
})