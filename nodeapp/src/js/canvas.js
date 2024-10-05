import platform from '../img/platform1.png'
import front from '../img/front.png'
import right from '../img/right.png'
import left from '../img/left.png'

console.log(platform)
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1.5

class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 100
        this.height = 100

        this.image = createImage(front)
        this.frames = 0
        this.sprites = {
            stand: {
                right: createImage(front),
                left: createImage(front)
            },
            run: {
                right: createImage(right),
                left: createImage(left)
            }
        }

        this.currentSprites = this.sprites.stand.right
    }

    draw(){
        //c.fillStyle = "blue"
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.currentSprites, this.position.x, this.position.y,
            this.width, this.height
        )
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
//        else this.velocity.y = 0
            
    }
}

class Platform {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
        
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

function createImage(imageSrc){
    const image = new Image()
    image.src = imageSrc
    return image
}
//const image = new Image()
//image.src = platform

//console.log(image)

let player = new Player()
//const platform = new Platform()
let platforms = [
    new Platform({
        x: 0, 
        y: 500, 
        image: createImage(platform) 
}), 
new Platform({
    x: 500, 
    y: 500, 
    image: createImage(platform) 
}),
new Platform({x: 1200, y: 250, image: createImage(platform) }
),
new Platform({
    x: 1800, 
    y: 100, 
    image: createImage(platform) 
}),
new Platform({
    x: 2000, 
    y: 320, 
    image: createImage(platform) 
}),
new Platform({
    x: 2500, 
    y: 500, 
    image: createImage(platform) 
}),]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

function init() {


player = new Player()
//const platform = new Platform()
platforms = [
    new Platform({
        x: 0, 
        y: 500, 
        image: createImage(platform) 
}), 
new Platform({
    x: 500, 
    y: 500, 
    image: createImage(platform) 
}),
new Platform({x: 1200, y: 250, image: createImage(platform) }
),
new Platform({
    x: 1800, 
    y: 100, 
    image: createImage(platform) 
}),
new Platform({
    x: 2000, 
    y: 320, 
    image: createImage(platform) 
}),
new Platform({
    x: 2500, 
    y: 500, 
    image: createImage(platform) 
}),]

//const keys = {
 //   right: {
 //       pressed: false
 //   },
//    left: {
 //       pressed: false
 //   }
//}

scrollOffset = 0
}
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    //player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
   // platform.draw()
   player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5

    }else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    }else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
            
        }else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
            
        }
    }
// platform collusion condition

platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y 
        >= platform.position.y && player.position.x + player.width >= 
        platform.position.x && player.position.x <= platform.position.x + 
        platform.width) {
        player.velocity.y = 0
    }
})
// win condition
if (scrollOffset > 2000) {
    console.log("To be continued")
}

// lose condition
if (player.position.y > canvas.height) {
    //console.log("you lose")
    init()
}
}
animate()

addEventListener('keydown', ({keyCode}) => {

    switch (keyCode){
        case 65:
            console.log('left')
           // player.velocity.x -= 1
           keys.left.pressed = true
           player.currentSprites = player.sprites.run.left
            break

        case 83:
            console.log('down')
           // player.velocity.y += 20
            break

        case 68:
            console.log('right')
           // player.velocity.x += 1
            keys.right.pressed = true
            player.currentSprites = player.sprites.run.right
            break

        case 87:
            console.log('up')
            player.velocity.y -= 30 
            break
            
    }
    console.log(keys.right.pressed)
})

addEventListener('keyup', ({keyCode}) => {

    switch (keyCode){
        case 65:
            console.log('left')
           // player.velocity.x = 0
            keys.left.pressed = false
            player.currentSprites = player.sprites.stand.left
            break

        case 83:
            console.log('down')
           // player.velocity.y += 20
            break

        case 68:
            console.log('right')
           // player.velocity.x = 0
            keys.right.pressed = false
            player.currentSprites = player.sprites.stand.right
            break

        case 87:
            console.log('up')
            player.velocity.y = 0
            break
            
    }
    console.log(keys.right.pressed)
})
