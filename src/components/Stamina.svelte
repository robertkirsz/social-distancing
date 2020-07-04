<script>
  import { stamina, hand } from 'store'
  import { MAX_STAMINA, tirednessEffects, getTirednessLevel } from 'stuff'
  import StaminaBar from 'components/StaminaBar'

  $: value = ($stamina / MAX_STAMINA) * 100

  let previousTime = 0
  let timeout = null

  // TODO: Stamina should decrease faster

  hand.subscribe(({ lastPressedTime }) => {
    if (lastPressedTime !== previousTime) {
      clearTimeout(timeout)
      stamina.decrease()
      timeout = setTimeout(stamina.reset, tirednessEffects[getTirednessLevel(value)].cooldown)
      previousTime = lastPressedTime
    }
  })
</script>

<StaminaBar {value} style="position: absolute; top: 80px;" />
