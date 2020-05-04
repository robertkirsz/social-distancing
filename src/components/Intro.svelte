<script>
  import { session } from 'store'
  let email = `a${Date.now()}@mock.com`
  let password = '123456'

  function handleSubmit(event) {
    event.preventDefault()
    session.manualSignIn(email, password)
  }
</script>

<h1>Deflect</h1>
<button on:click={session.signIn}>Start</button>

<form on:submit={handleSubmit}>
  <input bind:value={email} placeholder="Email" />
  <input bind:value={password} placeholder="Password" />
  <button type="submit">Manual login</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
</style>
