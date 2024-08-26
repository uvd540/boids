class Boids {
	constructor(n, world_size, max_vel) {
		this.n = n
		this.world_size = world_size
		this.max_vel = max_vel
		// position
		this.x = new Array(n).fill(0)
		this.y = new Array(n).fill(0)
		// velocity
		this.vx = new Array(n).fill(0)
		this.vy = new Array(n).fill(0)
		// radius
		this.radius = 5
		// awareness radius
		this.awareness_radius = 10 * this.radius
		// tracked boid
		this.tracked_id = 0
	}
	init() {
		for (let i = 0; i < this.n; i++) {
			this.x[i] = (Math.random() * this.world_size)
			this.y[i] = (Math.random() * this.world_size)
			this.vx[i] = (Math.random() < 0.5 ? -1 : 1) * Math.random() * this.max_vel
			this.vy[i] = (Math.random() < 0.5 ? -1 : 1) * Math.random() * this.max_vel
		}
	}
	update(dt) {
		for (let i = 0; i < this.n; i++) {
			// update position based on velocity
			this.x[i] += this.vx[i] * dt
			this.y[i] += this.vy[i] * dt
			// wrap around position (TODO: incorporate wrap around logic for awareness)
			if (this.x[i] < 0) {
				this.x[i] = this.world_size
			}
			if (this.x[i] > this.world_size) {
				this.x[i] = 0
			}
			if (this.y[i] < 0) {
				this.y[i] = this.world_size
			}
			if (this.y[i] > this.world_size) {
				this.y[i] = 0
			}
		}
	}
	draw(ctx) {
		for (let i = 0; i < this.n; i++) {
			if (i == this.tracked_id) {
				ctx.fillStyle = `rgba(255, 255, 0, 0.5)`
				ctx.beginPath()
				ctx.ellipse(this.x[i], this.y[i], this.awareness_radius, this.awareness_radius, 0, 0, 2 * Math.PI)
				ctx.fill()
				ctx.fillStyle = "red"
			} else {
				ctx.fillStyle = "white"
			}
			ctx.beginPath()
			ctx.ellipse(this.x[i], this.y[i], this.radius, this.radius, 0, 0, 2 * Math.PI)
			ctx.fill()
		}
	}
}
