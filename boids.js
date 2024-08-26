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
			let sum_vx = 0
			let sum_vy = 0
			let num_neighbors = 0
			for (let j = 0; j < this.n; j++) {
				if (i != j) {
					if (distance(this.x[i], this.y[i], this.x[j], this.y[j]) < this.awareness_radius) {
						sum_vx += this.vx[j]
						sum_vy += this.vy[j]
						num_neighbors++;
					}
				}
			}
			if (num_neighbors > 0) {
				// alignment
				const avg_vx = sum_vx / num_neighbors
				const avg_vy = sum_vy / num_neighbors
				// TODO applying a constant "alignment coefficient" causes all boids to tend
				// towards the average velocity at the start of the simulation, which 
				// is close to 0. As a result, all boids slow down
				this.vx[i] += 0.01 * (avg_vx - this.vx[i])
				this.vy[i] += 0.01 * (avg_vy - this.vy[i])
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

function distance(x1, y1, x2, y2) {
	return Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)))
}