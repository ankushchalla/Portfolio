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
            if (!targetNode.classList.contains('active')) {
                console.log('in if');
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