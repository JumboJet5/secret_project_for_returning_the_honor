import { delay, fromEvent, interval, startWith } from "rxjs";

const score = document.getElementById('score')
const container = document.getElementById('container')
const gardenArea = document.getElementById('garden-area')
const harvestArea = document.getElementById('harvest-area')
const harvester = document.getElementById('harvester')
let valuableBlocks: HTMLDivElement[] = []

const $mousemove = fromEvent(container, 'mousemove')

const minMaxValue = (min: number, value: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

$mousemove.subscribe((event: MouseEvent) => {
  const x = minMaxValue(0, event.pageX - harvestArea.offsetLeft - container.offsetLeft, harvestArea.clientWidth)
  harvester.style.setProperty('--x', `${x}px`)
})

const $spawnInterval = interval(5_000).pipe(startWith(-1)).pipe(delay(1_000))
const $tickInterval = interval(200)

$spawnInterval.subscribe((value) => {
  const rand = Math.random()
  const x = rand * gardenArea.clientWidth
  const valueBlock = document.createElement('div')
  valueBlock.classList.add('value-block')
  valueBlock.style.setProperty('--x', `${x}px`)
  valueBlock.style.setProperty('--y', `${0}px`)
  gardenArea.appendChild(valueBlock)

  valuableBlocks.push(valueBlock)
})

let blockSpeed = 4
let points = 0
$tickInterval.subscribe(() => {
  const prevPoints = points
  const harvesterX = +harvester.style.getPropertyValue('--x').replace('px', '')
  const removeSet = new Set<HTMLElement>()

  valuableBlocks.map((block) => {
    const y = +block.style.getPropertyValue('--y').replace('px', '')
    const nextY = y + blockSpeed

    // remove on fall down
    if (nextY >= gardenArea.clientHeight) {
      removeSet.add(block)
      block.remove()
      return
    }

    // move down if not possible to harvest
    if (nextY + harvester.clientHeight < gardenArea.clientHeight) {
      block.style.setProperty('--y', `${nextY}px`)
      return
    }

    // check collisions with harvester
    const x = +block.style.getPropertyValue('--x').replace('px', '')
    const harvestRange = {
      left: x - harvester.clientWidth,
      right: x + block.clientWidth + harvester.clientWidth
    }
    const hasCollision = harvestRange.left < harvesterX && harvesterX < harvestRange.right

    // if no collision move down
    if (!hasCollision) {
      block.style.setProperty('--y', `${nextY}px`)
      return
    }

    removeSet.add(block)
    block.remove()
    points++
  })

  valuableBlocks = valuableBlocks.filter((block) => !removeSet.has(block))

  if (prevPoints !== points) {
    score.innerText = `Points: ${points}`
  }
})
