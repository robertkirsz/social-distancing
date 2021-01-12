<script>
  import { screens } from 'store'
  import Modal from 'components/Modal'
  import Leaderboard from 'components/Leaderboard' 
</script>

<Modal heading="Leaderboard" onClose={() => screens.close('LEADERBOARD')}>
  <Leaderboard />
</Modal>
