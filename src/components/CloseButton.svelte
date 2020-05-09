<script>
  export let style = null
</script>

<button on:click {style} />

<style>
  button {
    flex: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: inherit;
    width: 25px;
    height: 25px;
    padding: 0;
    position: relative;
    background: none;
    border: 2px solid currentColor;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    padding: 8px;
    box-sizing: content-box;
  }

  @media (max-width: 425px) {
    button {
      width: 14px;
      height: 14px;
    }
  }

  button::before,
  button::after {
    content: '';
    display: block;
    width: 60%;
    height: 3px;
    position: absolute;
    background: currentColor;
    transition: 400ms;
    border-radius: 10px;
    pointer-events: none;
  }

  button::before {
    transform: rotate(-45deg);
  }

  button::after {
    transform: rotate(45deg);
  }

  button:hover::before {
    transform: rotate(45deg);
  }

  button:hover::after {
    transform: rotate(135deg);
  }
</style>
