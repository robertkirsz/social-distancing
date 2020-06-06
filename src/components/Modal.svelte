<script>
  import { fade } from 'svelte/transition'
  import CloseButton from 'components/CloseButton'

  export let onClose = () => {}
  export let heading = ''
</script>

<div class="screen dots alternate column itemsCenter justifyCenter" transition:fade>
  <section class="shadow columnTop2">
    <div class="flexNone rowLeft2 justifyBetween">
      <h3 class="nice flex justifyBetween" data-text={heading}>{heading}</h3>
      <CloseButton style="color: var(--primary);" on:click={onClose} />
    </div>

    <div class="content-wrapper">
      <slot />
    </div>
  </section>
</div>

<style>
  section {
    max-width: 100%;
    max-height: 95vh;
    margin: 0 auto;
    padding: 16px;
    background: #eee;
    border: 3px solid var(--primary);
    border-radius: 25px;
    transition-property: border-color, box-shadow;
    transition-duration: var(--transition);
  }

  .content-wrapper {
    flex: 1;
    overflow: auto;
  }
</style>
