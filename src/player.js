import Victor from 'victor'
import image from './kirby.png'

class Gameobject {
  constructor(posx, posy, velx, vely, rotation) {
    this.pos = new Victor(posx, posy)
    this.vel = new Victor(velx, vely)
    this.acc = new Victor(0, 0)

    this.friction = new Victor(0.97, 0.97)
    this.rotation = rotation

    this.baseline = this.pos.clone()
    this.gravity = new Victor(0, 0.05)
    this.onGround = true

    this.jumps = 15
    this.jumping = false
    this.canJumpMore = true

    this.loaded = false
    this.sprite = new Image()
    this.sprite.src = image

    this.width = 128
    this.height = 64

    this.count = 0
  }

  update() {
    if (this.pos.y < this.baseline.y) {
      this.acc.add(this.gravity)
      this.onGround = false
      this.color = 'red'
    } else {
      this.onGround = true
      this.color = 'white'
      this.canJumpMore = true
    }

    if (!this.onGround && !this.jumping) {
      this.canJumpMore = false
    }
    if (this.jumping && this.jumps && this.canJumpMore) {
      this.acc.y -= 0.01 * this.jumps
      this.jumps--
    }

    if (this.pos.x > this.width + 10) this.pos.x = 0
    if (this.pos.x < 0) this.pos.x = this.width + 10

    //update velocity
    this.vel.add(this.acc)

    //cheat's friction (friction = 0.97) - this is a cheat, not real phyics
    this.vel.multiply(this.friction)

    //update position
    this.pos.add(this.vel)

    if (this.pos.y > this.baseline.y) {
      this.pos.y = this.baseline.y
      this.jumps = 15
    }

    // think this is dampening... should be added to base
    this.acc.multiply(new Victor(0.85, 0.85))
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.pos.x, this.pos.y)
    ctx.rotate(this.rotation)
    // ctx.fillStyle = this.color
    // ctx.fillRect(-10, -5, 20, 10)

    if (Math.abs(this.vel.x) > 0.01) this.count++

    if (!this.onGround) this.count++

    this.drawSprite(ctx, this.count)

    ctx.restore()
  }

  drawSprite(ctx, count) {
    // ctx.drawImage(this.sprite, 5, 55, 25, 25, -25, -25, 20, 20)
    if (this.onGround) {count = Math.round(count / 10)
      count %= 10}

    else{ 
      count = Math.round(count / 5)

      if (this.acc.y < 0.1)
        count %=6
      else
        count = 6
    }
    

    if (this.vel.x < 0) ctx.scale(-1, 1)

    if (this.onGround)
      ctx.drawImage(this.sprite, 8 + count * 23, 55, 23, 25, -10, -10, 20, 20)
    // jumping
    else
      ctx.drawImage(this.sprite, 8 + count * 24, 130, 23, 25, -10, -10, 20, 20)
  }
}

class Player extends Gameobject {
  constructor() {
    super()
  }
}

export { Gameobject, Player }
