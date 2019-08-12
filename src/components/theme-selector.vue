<template>
  <div id="ThemeSelector">
    <span class="text">主题</span>
    <el-color-picker v-model="colors.primary"
                     @change="colorChange"
                     size="small"></el-color-picker>
  </div>
</template>

<script>
import generateColors from '../utils/color'
export default {
  name: 'ThemeSelector',
  data () {
    return {
      colors: {
        primary: '#409EFF'
      },
      primaryColor: '#409EFF',
      originalStyle: '',
      originalStylesheetCount: ''
    }
  },
  created () {
    this.getIndexStyle()
  },
  mounted () {
    this.$nextTick(() => {
      this.originalStylesheetCount = document.styleSheets.length
    })
  },
  methods: {
    colorChange (val) {
      this.primaryColor = this.colors.primary
      this.colors = Object.assign({}, this.colors, generateColors(this.colors.primary))
      this.writeNewStyle()
    },
    getStyleTemplate (data) {
      const colorMap = {
        '#3a8ee6': 'shade-1',
        '#409eff': 'primary',
        '#53a8ff': 'light-1',
        '#66b1ff': 'light-2',
        '#79bbff': 'light-3',
        '#8cc5ff': 'light-4',
        '#a0cfff': 'light-5',
        '#b3d8ff': 'light-6',
        '#c6e2ff': 'light-7',
        '#d9ecff': 'light-8',
        '#ecf5ff': 'light-9'
      }
      Object.keys(colorMap).forEach(key => {
        const value = colorMap[key]
        data = data.replace(new RegExp(key, 'ig'), value)
      })
      return data
    },
    getFile (url, isBlob = false) {
      return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest()
        client.responseType = isBlob ? 'blob' : ''
        client.onreadystatechange = () => {
          if (client.readyState !== 4) {
            return
          }
          if (client.status === 200) {
            const urlArr = client.responseURL.split('/')
            resolve({
              data: client.response,
              url: urlArr[urlArr.length - 1]
            })
          } else {
            reject(new Error(client.statusText))
          }
        }
        client.open('GET', url)
        client.send()
      })
    },
    getIndexStyle () {
      this.getFile('../../theme/index.css').then(({ data }) => {
        this.originalStyle = this.getStyleTemplate(data)
      })
    },
    writeNewStyle () {
      let cssText = this.originalStyle
      Object.keys(this.colors).forEach(key => {
        cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key])
      })

      if (this.originalStylesheetCount === document.styleSheets.length) {
        const style = document.createElement('style')
        style.innerText = cssText
        document.head.appendChild(style)
      } else {
        document.head.lastChild.innerText = cssText
      }
    }
  }
}
</script>
<style lang='scss' scoped>
#ThemeSelector {
  display: flex;
  align-items: center;
  .text {
    font-size: 12px;
    color: #667;
    margin-right: 8px;
  }
}
</style>
