<script>
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { score } from 'store'

  const progress = tweened($score, {
    duration: 400,
    easing: cubicOut
  })

  score.subscribe(progress.set)
</script>

<div>{Math.round($progress)}</div>

<style>
  div {
    position: absolute;
    font-size: 24px;
    top: 8px;
    right: 8px;
    text-align: right;
  }
</style>
