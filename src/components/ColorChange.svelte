<script>
  import { randomItem, shuffleArray, palettes } from 'stuff'

  function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace('#', '')
    var r = parseInt(hexcolor.substr(0, 2), 16)
    var g = parseInt(hexcolor.substr(2, 2), 16)
    var b = parseInt(hexcolor.substr(4, 2), 16)
    var yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? 'black' : 'white'
  }

  const root = document.documentElement
  const variables = ['--primary', '--secondary', '--shadow']

  function toggleColors() {
    const palette = [...randomItem(palettes)]
    shuffleArray(palette)
    variables.forEach(variable => {
      const color = palette.pop()
      if (variable === '--primary') {
        root.style.setProperty('--contrast-text', getContrastYIQ(color))
      }
      root.style.setProperty(variable, color)
    })
  }
</script>

<button on:click={toggleColors} />

<style>
  button {
    width: 20px;
    height: 20px;
    background: linear-gradient(to right, #a8e6cf, #dcedc1, #ffd3b6, #ffaaa5, #ff8b94);
    border: none;
    outline: none;
    border-radius: 50%;
    position: absolute;
    top: 16px;
    left: calc(50% - 10px);
    z-index: 10;
  }
</style>
