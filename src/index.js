import Stats from 'stats-js'
import * as dat from 'dat.gui'

import { Gameobject } from './player'

const canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height

let stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom

const settings = {
  message: 'dat.gui',
  speed: 0.01,
  displayOutline: false,
  explode: function() {
    console.log('EXPLODE')
  },
}

const gui = new dat.GUI()
gui.add(settings, 'message')
gui.add(settings, 'speed', -0.1, 0.1)
gui.add(settings, 'displayOutline')
gui.add(settings, 'explode')

document.body.appendChild(stats.dom)

let keys = []
let gameobjects = Array()
let spaceship = new Gameobject(20, 59, 0, 0, 0)

const init = () => {
  document.addEventListener('keydown', function(e) {
    keys[e.which] = true
  })
  document.addEventListener('keyup', function(e) {
    keys[e.which] = false
  })

  gameobjects.push(spaceship)
}

const animate = () => {
  stats.begin()

  ctx.fillStyle = '#9ea7b8'
  ctx.fillRect(0, 0, width, height) // clear canvas

  // //rotation
  // if (keys[37]) spaceship.rotation -= 0.05
  // if (keys[39]) spaceship.rotation += 0.05

  // //thrust
  // if (keys[38]) {
  //   spaceship.acc.x = Math.cos(spaceship.rotation) * 0.05
  //   spaceship.acc.y = Math.sin(spaceship.rotation) * 0.05
  // } else {
  //   spaceship.acc.x = spaceship.acc.y = 0
  // }

  if (keys[37]) spaceship.acc.x -= 0.02
  if (keys[39]) spaceship.acc.x += 0.02

  if (keys[38]) {
    spaceship.jumping = true
  } else if (!keys[38]) spaceship.jumping = false

  gameobjects.forEach(o => {
    o.update()
    o.draw(ctx)
  })

  stats.end()
  requestAnimationFrame(animate)
}

init()
animate()
