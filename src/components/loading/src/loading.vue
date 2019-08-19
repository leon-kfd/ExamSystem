<template>
  <transition name="el-loading-fade"
              @after-leave="handleAfterLeave">
    <div v-show="visible"
         class="el-loading-mask"
         :style="{ backgroundColor: background || '' }"
         :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="el-loading-spinner">
        <!-- <svg v-if="!spinner"
             class="circular"
             viewBox="25 25 50 50">
          <circle class="path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none" />
        </svg> -->
        <svg version="1.1"
             v-if="!spinner"
             class="svg-loading"
             xmlns="http://www.w3.org/2000/svg"
             x="0"
             y="0"
             viewBox="0 0 38 38"
             preserveAspectRatio="xMinYMin meet">
          <text x="14"
                y="21"
                font-family="Monaco"
                font-size="2px"
                style="letter-spacing:0.6"
                fill="grey">Loading
            <animate attributeName="opacity"
                     values="0;1;0"
                     dur="1.8s"
                     repeatCount="indefinite" />
          </text>
          <path fill="#373a42"
                d="M20,35c-8.271,0-15-6.729-15-15S11.729,5,20,5s15,6.729,15,15S28.271,35,20,35z M20,5.203C11.841,5.203,5.203,11.841,5.203,20c0,8.159,6.638,14.797,14.797,14.797S34.797,28.159,34.797,20C34.797,11.841,28.159,5.203,20,5.203z">
          </path>
          <path fill="#ffffff"
                stroke="#7D7D7D"
                stroke-width="0.9"
                stroke-miterlimit="10"
                d="M5.203,20c0-8.159,6.638-14.797,14.797-14.797V5C11.729,5,5,11.729,5,20s6.729,15,15,15v-0.203C11.841,34.797,5.203,28.159,5.203,20z">
            <animateTransform attributeName="transform"
                              type="rotate"
                              from="0 20 20"
                              to="360 20 20"
                              calcMode="spline"
                              keySplines="0.4, 0, 0.2, 1"
                              keyTimes="0;1"
                              dur="2s"
                              repeatCount="indefinite" />
          </path>
          <path fill="#ffffff"
                stroke="#D0D1D1"
                stroke-width="0.5"
                stroke-miterlimit="10"
                d="M7.078,20c0-7.125,5.797-12.922,12.922-12.922V6.875C12.763,6.875,6.875,12.763,6.875,20S12.763,33.125,20,33.125v-0.203C12.875,32.922,7.078,27.125,7.078,20z">
            <animateTransform attributeName="transform"
                              type="rotate"
                              from="0 20 20"
                              to="360 20 20"
                              dur="1.8s"
                              repeatCount="indefinite" />
          </path>
        </svg>
        <i v-else
           :class="spinner"></i>
        <p v-if="text"
           class="el-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      text: null,
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: ''
    }
  },

  methods: {
    handleAfterLeave () {
      this.$emit('after-leave')
    },
    setText (text) {
      this.text = text
    }
  }
}
</script>
<style lang="scss">
.el-loading-spinner {
  width: 100% !important;
  height: 100% !important;
  text-align: center !important;
  position: absolute !important;
  top: 0 !important;
  margin-top: 0 !important;
}
.svg-loading {
  height: 80%;
  width: auto;
  max-width: 400px;
  max-height: 400px;
}
</style>
