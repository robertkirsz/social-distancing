<script>
  import { stamina, hand } from 'store'
  import { MAX_STAMINA, tirednessEffects, getTirednessLevel } from 'stuff'
  import StaminaBar from 'components/StaminaBar'

  $: value = ($stamina / MAX_STAMINA) * 100
  $: tirednessLevel = getTirednessLevel(value)

  let previousTime = 0
  let timeout = null

  hand.subscribe(({ lastPressedTime }) => {
    if (previousTime && lastPressedTime !== previousTime) {
      clearTimeout(timeout)
      stamina.decrease()
      timeout = setTimeout(stamina.reset, tirednessEffects[tirednessLevel].cooldown)
      previousTime = lastPressedTime
    }
  })
</script>

<StaminaBar {value} />
