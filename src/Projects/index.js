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


const projects = document.querySelector('#projects')
projects.addEventListener('click', event => {
    const projectName = event.target.id
    const projectDetailsNode = document.querySelector(`#${projectName}-details`)
    if (!projectDetailsNode.classList.contains('active')) {
        projectDetailsNode.classList.add('active')
        
        projectDetailsNode.classList.add('visible')
        
    }
    else projectDetailsNode.classList.remove('active')
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
    cursorImage.src = `screenshots/${screenshots[event.target.id]}`

})