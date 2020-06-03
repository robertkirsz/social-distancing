<script>
  import { fade } from 'svelte/transition'
  import { screens } from 'store'
  import CloseButton from 'components/CloseButton'
</script>

<div class="screen dots alternate column itemsCenter justifyCenter" transition:fade>
  <section class="shadow column" transition:fade>
    <div class="columnTop2">
      <div class="rowLeft2 itemsCenter justifyBetween marginLeft marginRight">
        <h3 class="nice flex justifyBetween" data-text="The author">The author</h3>
        <CloseButton style="color: pink;" on:click={() => screens.close('AUTHOR')} />
      </div>

      <div class="columnTop2 itemsCenter">
        <img src="author.png" alt="Author" />
        <span>
          <span class="emoji">☝️</span>
          That him
        </span>
      </div>

    </div>
  </section>
</div>

<style>
  section {
    max-width: 100%;
    max-height: 95vh;
    margin: 0 auto;
    border-radius: 25px;
    background: #eee;
    border: 3px solid pink;
  }

  section > div {
    height: 100%;
    padding: 16px 8px;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>
