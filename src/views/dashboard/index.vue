<template>
    <div class="dashboard-container">
        <default-dashboard/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import DefaultDashboard from './default/index';
    export default {
      name: 'dashboard',
      components: { DefaultDashboard },
      data() {
        return {
          currentRole: 'EditorDashboard'
        }
      },
      computed: {
        ...mapGetters([
          'name',
          'avatar',
          'roles',
          'email',
          'telephone',
        ])
      }
    }
</script>
