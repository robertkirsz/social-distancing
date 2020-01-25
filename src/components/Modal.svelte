<script>

</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 320px;
    height: 400px;
    background: rgba(240, 240, 240, 0.8);
    border-radius: 8px;
    box-shadow: 0 4px 15px 2px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
  }
</style>

<div class="wrapper">
  <div class="content">
    <slot />
  </div>
</div>
