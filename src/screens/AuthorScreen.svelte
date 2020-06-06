<script>
  import { fade } from 'svelte/transition'
  import { screens } from 'store'
  import Modal from 'components/Modal'
</script>

<Modal heading="The author" onClose={() => screens.close('AUTHOR')}>
  <div class="columnTop2 itemsCenter">
    <a href="slack://user?team=T029TTLEV&id=UCK9Y5UUQ" target="_blank" rel="noreferrer noopener">
      <img src="author.png" alt="Author" />
    </a>

    <span>
      <span class="emoji">☝️</span>
      That him
    </span>
  </div>
</Modal>

<style>
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
</style>
