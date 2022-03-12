import '../styles/projects.css'


const cursorImage = document.querySelector('.cursor-image')

const ratio = cursorImage.width / cursorImage.height
// Use css for a lot of this stuff later.
const imageHeight = 300
cursorImage.style.position = 'absolute'
cursorImage.style.left = 5
const offsetX = 50
const offsetY = 100
document.body.prepend(cursorImage)

const showScreenshot = true
let hiddenImage = null


const projects = document.querySelector('#projects')
projects.addEventListener('click', event => {
    const projectName = event.target.id

    // Open information section for clicked project. Close information section for other projects. 
    for (const screenshot in screenshots) {
        if (screenshot === projectName) {
            const targetNode = document.querySelector(`#${projectName}-details`)
            // If clicked section is not open, open it. 
            if (!targetNode.classList.contains('active')) {
                targetNode.classList.add('active')
                hiddenImage = projectName
                cursorImage.src = '#'
            }
            else {
                targetNode.classList.remove('active')
                hiddenImage = null
            }
        } else {
            // If a non-target section is open, close it.
            const nonTargetNode = document.querySelector(`#${screenshot}-details`)
            nonTargetNode.classList.remove('active')
            cursorImage.style.display = 'block'
        }
    }

    // Make sure navbar takes up full height of page.
    const navbar = document.querySelector('.navbar')
    navbar.style.height = '100%'

})

const screenshots = {
    dabblr: 'dabblr.jpg',
    weatherDashboard: 'dashboard.png',
    onlyFoods: 'onlyfoods.jpg',
    shufflePlaylists: 'spotify.png'
}

window.addEventListener('mousemove', event => {
    if (!(event.target.id in screenshots) && showScreenshot) {
        cursorImage.src = '#'
        return
    }
    cursorImage.style.left = `${event.clientX + offsetX}px`
    cursorImage.style.top = `${event.clientY - offsetY}px`
    if (event.target.id != hiddenImage) cursorImage.src = `screenshots/${screenshots[event.target.id]}`
    else cursorImage.src = '#'
})

let timer = 0

const borders = document.getElementsByClassName('border')
async function translateBorders() {
    for (let i = 0; i < borders.length; i++) {
        setTimeout(() => {
            borders[i].classList.add('show-border')
        })
    }
}

const projectTitles = document.getElementsByClassName('moving-letter')
let delayedEnterProjects = []
let delayProjectTitle = 170
for (let i = 0; i < projectTitles.length; i++, timer++) {
    delayedEnterProjects[i] = new Promise(resolve => {
        setTimeout(() => {
            projectTitles[i].classList.add('enter')
            resolve()
        }, timer * delayProjectTitle)
    })
}

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
    await translateBorders()
    for (const projectEnter of delayedEnterProjects) await projectEnter
    for (const iconEnter of delayedEnterIcons) await iconEnter
})