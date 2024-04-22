import { fromEvent } from "rxjs";

console.log('Hello World!')

let x: number | null = null

const container = document.getElementById('container')
const pointer = document.getElementById('pointer')

const $mousedown = fromEvent(container, 'mousedown')
const $mousemove = fromEvent(container, 'mousemove')
const $mouseup = fromEvent(container, 'mouseup')

$mousedown.subscribe((event: MouseEvent) => {
  const x = event.pageX - container.offsetLeft
  pointer.style.setProperty('--x', `${x}px`)
})

$mousemove.subscribe((event: MouseEvent) => {
  const x = event.pageX - container.offsetLeft
  pointer.style.setProperty('--x', `${x}px`)
})

$mouseup.subscribe(() => {
  x = null
  console.log(x)
})
