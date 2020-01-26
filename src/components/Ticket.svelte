<script>
  import { onMount } from 'svelte'
  import { tickets } from 'store'

  export let id = null
  export let target = null
  export let duration = 0

  let mounted = false

  onMount(() => setTimeout(() => mounted = true))
</script>

<style>
  span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 7vw;
    height: 7vw;
    transform: translate(-50%, -50%);

    transition-property: all;
    transition-timing-function: linear;

    position: absolute;
    background: rgba(42, 160, 140, 0.8);
  }

  .UP-LEFT {
    left: 0%;
    top: 0%;
  }
  .UP {
    left: 50%;
    top: 0%;
  }
  .UP-RIGHT {
    left: 100%;
    top: 0%;
  }
  .LEFT {
    left: 0%;
    top: 50%;
  }
  .RIGHT {
    left: 0%;
    top: 100%;
  }
  .DOWN-LEFT {
    left: 0%;
    top: 100%;
  }
  .DOWN {
    left: 50%;
    top: 100%;
  }
  .DOWN-RIGHT {
    left: 100%;
    top: 100%;
  }

  .mounted {
    left: 50%;
    top: 50%;
  }
</style>

<span
  class={target}
  class:mounted
  style={`transition-duration: ${duration}ms;`}
  on:transitionend={tickets.land(id, target)} />
