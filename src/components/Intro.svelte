<script>
  import { session, screen } from 'store'

  // TODO: remove in prod
  let email = `${Date.now()}@mock.com`
  let password = '123456'

  function handleSubmit(event) {
    event.preventDefault()
    session.manualSignIn(email, password)
  }
</script>

<h2>Social Distancing: The Game</h2>

<div>
  <button on:click={session.signIn}>Start</button>
  <button on:click={() => screen.open('HOW TO PLAY')}>How to play</button>

  <form on:submit={handleSubmit}>
    <input bind:value={email} placeholder="Email" />
    <input bind:value={password} placeholder="Password" />
    <button type="submit">Manual login</button>
  </form>
</div>

<style>
  h2 {
    text-align: center;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  div > *:not(:first-child) {
    margin-top: 8px;
  }

  form {
    display: flex;
    flex-direction: column;
  }
</style>
