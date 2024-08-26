const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const boids = new Boids(100, 600, 0.1);

boids.init()

let last_timestamp = 0
let dt = 0

function frame(timestamp) {
	dt = timestamp - last_timestamp
	last_timestamp = timestamp
	console.log(dt)
	boids.update(dt)
	ctx.fillStyle = "blue"
	ctx.fillRect(0, 0, 600, 600)
	boids.draw(ctx)
	requestAnimationFrame(frame)
}

requestAnimationFrame(frame)