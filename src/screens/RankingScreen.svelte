<script>
  import { screens } from 'store'
  import Modal from 'components/Modal'
  import Ranking from 'components/Ranking'
</script>

<Modal heading="Ranking" onClose={() => screens.close('RANKING')}>
  <Ranking />
</Modal>
