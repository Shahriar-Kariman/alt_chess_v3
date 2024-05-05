import * as THREE from 'three'
import { board } from './board'
import { lights, translate } from './global'
import { camera, renderer } from './main'

const scene = new THREE.Scene()

// ray caster
const raycaster = new THREE.Raycaster

const on_cast = (event)=>{
  const coords = new THREE.Vector2(
    (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    -((event.clientY / renderer.domElement.clientHeight) * 2 - 1)
  )
  raycaster.setFromCamera(coords, camera)

  const intersections = raycaster.intersectObjects(b1.squares.children, true)

  if(intersections.length>0){
    console.log(intersections[0].object.name)
  }
}

document.addEventListener('mousedown',on_cast)

// lights
scene.add(lights)

// custom geometry (stars)
const starsGemoetry = new THREE.BufferGeometry()
const starCount = 1400

const starPositions = new Float32Array(starCount * 3)

const starsGemoetryRadius = 70

for(let i = 0; i < starCount*3; i+=3){
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2*v-1)
  starPositions[i] = starsGemoetryRadius * Math.sin(phi) * Math.cos(theta)
  starPositions[i+1] = starsGemoetryRadius * Math.sin(phi) * Math.sin(theta)
  starPositions[i+2] = starsGemoetryRadius * Math.cos(phi)
}

starsGemoetry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))

const starsMaterial = new THREE.PointsMaterial()
starsMaterial.size = 0.2
starsMaterial.sizeAttenuation = true

const stars = new THREE.Points(starsGemoetry,starsMaterial)
stars.name = "stars"
scene.add(stars)

// board
const b1 = new board(translate)
scene.add(b1.squares)

export {
  scene
}