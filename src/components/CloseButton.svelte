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
    width: 20px;
    height: 20px;
    padding: 0;
    position: relative;
    background: none;
    border: 3px solid;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    padding: 8px;
    box-sizing: content-box;
    transition: color var(--transition);
  }

  @media (max-width: 425px) {
    button {
      width: 12px;
      height: 12px;
    }
  }

  button::before,
  button::after {
    content: '';
    display: block;
    width: 60%;
    height: 3px;
    position: absolute;
    background-color: currentColor;
    border-radius: 10px;
    pointer-events: none;
    transition: transform 0.4s;
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
