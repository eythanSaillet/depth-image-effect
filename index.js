const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundColor: 0xffffff,
	resolution: 2,
	autoResize: true,
})
document.body.appendChild(app.view)
const container = new PIXI.Container()

// let sprite = PIXI.Sprite.from('assets/image.jpg')

const loader = new PIXI.Loader()

loader.add('assets/image.jpg').add('assets/image-depth.png').load(setup)

function setup() {
	// the resources hash provided by the loader:
	let resources = loader.resources

	// initialize background image
	image = new PIXI.Sprite(resources['assets/image.jpg'].texture)
	image.width = window.innerHeight - 10
	image.height = window.innerHeight - 10
	image.position.x = window.innerWidth / 2 - image.width / 2
	image.position.y = window.innerHeight / 2 - image.height / 2

	depthMap = new PIXI.Sprite(resources['assets/image-depth.png'].texture)
	depthMap.width = window.innerHeight - 10
	depthMap.height = window.innerHeight - 10
	depthMap.position.x = window.innerWidth / 2 - image.width / 2
	depthMap.position.y = window.innerHeight / 2 - image.height / 2

	let displacementFilter = new PIXI.filters.DisplacementFilter(depthMap)
	app.stage.filters = [displacementFilter]

	window.onmousemove = function (e) {
		displacementFilter.scale.x = (window.innerWidth / 2 - e.clientX) / 30
		displacementFilter.scale.y = (window.innerHeight / 2 - e.clientY) / 30
	}

	app.stage.addChild(image)
	app.stage.addChild(depthMap)
}

// let graphics = new PIXI.Graphics()

// graphics.beginFill(0xffff00)

// // set the line style to have a width of 5 and set the color to red
// graphics.lineStyle(5, 0xff0000)

// // draw a rectangle
// graphics.drawRect(0, 0, 50, 50)

// app.stage.addChild(graphics)
