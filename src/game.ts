import { TriggerBoxShape, TriggerComponent } from "@dcl/ecs-scene-utils";
import { WeMeta } from "@wemeta/analytics"

const wemetaBuilderTag: string = 'any-random-code'
WeMeta(wemetaBuilderTag);

const myVideo = new Entity
const cube = new Entity
const screenPosition = new Transform({position: new Vector3(8, 1, 8)})

let firstVideoclip = new VideoClip('video/cat.mp4')
let videoclipMaterial = new Material()
let videoTexture = new VideoTexture(firstVideoclip)
videoclipMaterial.albedoTexture = videoTexture
videoclipMaterial.emissiveTexture = videoTexture
videoclipMaterial.emissiveColor = Color3.White()
videoclipMaterial.emissiveIntensity = 1
videoTexture.pause()
videoTexture.volume = .25

myVideo.addComponent(screenPosition)
myVideo.addComponent(new PlaneShape())
myVideo.addComponent(videoclipMaterial)

let triggerBox = new TriggerBoxShape(new Vector3(2, 2, 2), new Vector3(13, 1, 5))

cube.addComponent(new TriggerComponent(triggerBox, {
    enableDebug: true,
    onCameraEnter: () => {
        engine.addEntity(myVideo)
    },
    onCameraExit : () => {
        engine.removeEntity(myVideo)
    }
}))

engine.addEntity(cube)
