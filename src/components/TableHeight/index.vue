<template>
  <div style="width:100%">
    <el-table :data="list" stripe border style="width: 100%" >
        <slot>
            <div>table set window height</div>
        </slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Sticky',
    props: {
      list: {
        type: Array,
        default: 0
      },
      page: {
        type: String,
        default: false,
      },
      from: {
        type: String,
        default: false,
      }
    },
    data() {
      return {
        active: false,
        position: '',
        currentTop: '',
        width: undefined,
        height: undefined,
        child: null,
        stickyHeight: 0
      };
    },
    methods: {
      sticky() {
        if (this.active) {
          return
        }
        this.position = 'fixed';
        this.active = true;
        this.width = this.width + 'px';
      },
      reset() {
        if (!this.active) {
          return
        }
        this.position = '';
        this.width = 'auto'
        this.active = false
      },
      handleResize() {
        this.width = this.$el.getBoundingClientRect().width;
        const offsetTop = this.$el.getBoundingClientRect().top;
        if (offsetTop <= this.stickyTop) {
          this.sticky();
          return
        }
        this.reset()
      }
    },
    mounted() {
      this.height = this.$el.getBoundingClientRect().height;
      window.addEventListener('resize', this.handleResize);
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    }
  };
</script>