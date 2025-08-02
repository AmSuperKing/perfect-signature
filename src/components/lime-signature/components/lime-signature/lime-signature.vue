<template>
	<view class="signature-pad" :class="{ landscape: isLandscape }">
		<text class="signature-tips">请在此处签写</text>
		<view class="signature-area" v-if="isLandscape">
			<l-signature
			  ref="signatureRef"
				:key="isLandscape"
				uid="0"
			  disableScroll
				:penColor="penColor"
				:penSize="penSize"
				:minLineWidth="penSize"
				:maxLineWidth="penSize"
				:openSmooth="openSmooth"
				:boundingBox="boundingBox"
				landscape
			></l-signature>
		</view>
		<view class="signature-area" v-if="!isLandscape">
			<l-signature
			  ref="signatureRef"
				:key="!isLandscape"
				uid="1"
			  disableScroll
				:penColor="penColor"
				:penSize="penSize"
				:minLineWidth="penSize"
				:maxLineWidth="penSize"
				:openSmooth="openSmooth"
				:boundingBox="boundingBox"
			></l-signature>
		</view>

		<view class="screen-handler" @click="changeOrientation">
			<!-- #ifdef APP-NVUE -->
			<text>{{ isLandscape ? '横' : '竖' }}</text>
			<!-- #endif -->
			<!-- #ifndef APP-NVUE -->
      <!-- #ifndef APP  -->
			<up-icon customPrefix="iconfont" :name="isLandscape ? 'icon-portrait' : 'icon-landscape'" size="18"></up-icon>
      <!-- #endif -->
      <!-- #ifdef APP -->
      <image :src="isLandscape ? '/static/icons/icon-portrait.png' : '/static/icons/icon-landscape.png'" class="icon-image" />
      <!-- #endif -->
			<!-- #endif -->
		</view>

		<view class="tools-bar">
			<view class="tools-bar-item" @click="openConfigPopup">
				<!-- #ifdef APP-NVUE -->
				<text>设置</text>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
        <!-- #ifdef APP -->
        <image src="/static/icons/icon-pen-draw.png" class="icon-image" />
        <!-- #endif -->
				<!-- #ifndef APP  -->
        <up-icon customPrefix="iconfont" name="icon-pen-draw" size="18"></up-icon>
        <!-- #endif -->
				<!-- #endif -->
			</view>
      <view class="tools-bar-item" @click="openColorPalette">
				<!-- #ifdef APP-NVUE -->
				<text>色板</text>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
        <!-- #ifdef APP -->
        <image src="/static/icons/icon-color-palette.png" class="icon-image" />
        <!-- #endif -->
				<!-- #ifndef APP  -->
				<up-icon customPrefix="iconfont" name="icon-color-palette" size="18"></up-icon>
				<!-- #endif -->
        <!-- #endif -->
			</view>
			<view class="tools-bar-item" @click="handleUndo">
				<!-- #ifdef APP-NVUE -->
				<text>撤消</text>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
        <!-- #ifdef APP -->
        <image src="/static/icons/icon-undo.png" class="icon-image" />
        <!-- #endif -->
				<!-- #ifndef APP  -->
				<up-icon customPrefix="iconfont" name="icon-undo" size="18"></up-icon>
				<!-- #endif -->
        <!-- #endif -->
			</view>
			<view class="tools-bar-item" @click="handleRedo">
				<!-- #ifdef APP-NVUE -->
				<text>上一步</text>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
        <!-- #ifdef APP -->
        <image src="/static/icons/icon-redo.png" class="icon-image" />
        <!-- #endif -->
				<!-- #ifndef APP  -->
				<up-icon customPrefix="iconfont" name="icon-redo" size="18"></up-icon>
				<!-- #endif -->
        <!-- #endif -->
			</view>
			<view class="tools-bar-item" @click="handleClear">
				<!-- #ifdef APP-NVUE -->
				<text>清空</text>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
        <!-- #ifdef APP -->
        <image src="/static/icons/icon-clear.png" class="icon-image" />
        <!-- #endif -->
				<!-- #ifndef APP  -->
				<up-icon customPrefix="iconfont" name="icon-clear" size="18"></up-icon>
				<!-- #endif -->
        <!-- #endif -->
			</view>
			<view class="tools-bar-item" @click="saveSignatureImg">
				<!-- #ifdef APP-NVUE -->
				<text>保存</text>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
        <!-- #ifdef APP -->
        <image src="/static/icons/icon-download.png" class="icon-image" />
        <!-- #endif -->
				<!-- #ifndef APP  -->
				<up-icon customPrefix="iconfont" name="icon-download" size="18"></up-icon>
				<!-- #endif -->
        <!-- #endif -->
			</view>
		</view>

		<template v-if="!isLandscape">
			<up-popup ref="configPopupRef" v-model:show="showConfig">
				<view class="config-popup-wrap">
					<view class="config-popup-item">
						<view class="config-popup-item__title">笔锋</view>
						<view class="config-popup-item__more">
							<text class="config-popup-item__more-text">{{ openSmooth ? '是' : '否' }}</text>
							<up-switch v-model="openSmooth" size="16" />
						</view>
					</view>
					<view class="config-popup-item">
						<view class="config-popup-item__title">包围盒</view>
						<view class="config-popup-item__more">
							<text class="config-popup-item__more-text">{{ boundingBox ? '是' : '否' }}</text>
							<up-switch v-model="boundingBox" size="16" />
						</view>
					</view>
					<view v-if="showConfig" style="width: 100%;">
						<up-slider v-model="penSize" min="1" max="20" showValue  style="width: 95%;" />
					</view>
				</view>
			</up-popup>
		</template>

		<view class="landscape-config-popup" v-if="isLandscape && showConfig" @click="closeConfigPopup">
      <view class="landscape-config-overlay">
        <view class="landscape-config" @click.stop>
          <view class="landscape-config-item">
            <view class="landscape-config-item__title">笔锋</view>
            <view class="landscape-config-item__more">
              <text class="landscape-config-item__more-text">{{ openSmooth ? '是' : '否' }}</text>
              <up-switch v-model="openSmooth" size="16" />
            </view>
          </view>
          <view class="landscape-config-item">
            <view class="landscape-config-item__title">包围盒</view>
            <view class="landscape-config-item__more">
              <text class="landscape-config-item__more-text">{{ boundingBox ? '是' : '否' }}</text>
              <up-switch v-model="boundingBox" size="16" />
            </view>
          </view>
          <view class="landscape-config-item">
            <view class="landscape-config-item__title">画笔粗细</view>
            <StepNumber v-model="penSize" :min="1" :max="20"></StepNumber>
          </view>
        </view>
      </view>
    </view>

    <up-popup v-model:show="colorPaletteVisible" :mode="!isLandscape ? 'bottom' : 'left'">
      <view :class="{ 'landscape-wrap': isLandscape }">
        <view :class="isLandscape ? 'landscape-list' : 'portrait-list'">
          <view class="color-item" v-for="(color, index) in colorList" :key="index" :style="{ backgroundColor: color }" @click="handleColorSelect(color)">
            <!-- #ifndef APP -->
            <up-icon name="checkmark" size="14" :color="color === penColor && color !== '#ffffff' ? '#fff' : '#000'" v-if="color === penColor"></up-icon>
            <!-- #endif -->
            <!-- #ifdef APP -->
            <image
              v-if="color === penColor"
              :src="color === penColor && color !== '#ffffff' ? '/static/icons/icon-check-white.png' : '/static/icons/icon-check.png'"
              style="width: 14px;height: 14px;"
            />
            <!-- #endif -->
          </view>
        </view>
      </view>
    </up-popup>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import StepNumber from "@/components/step-number/step-number.vue";
import LSignature from '@/components/lime-signature/components/l-signature/l-signature.vue';
import { saveBase64Image } from "@/utils/imageSaver";

const signatureRef = ref()
const penColor = ref('#000000');
const penSize = ref(2);
const isLandscape = ref(false);
const openSmooth = ref(true);
const boundingBox = ref(false);
const showConfig = ref(false);
const colorPaletteVisible = ref(false);
const colorList = [
  '#000000','#111111','#222222','#333333','#444444','#666666','#999999','#cccccc','#eeeeee','#ffffff',
  '#ff0000','#ff0033','#ff3399','#ff33cc','#cc00ff','#9900ff','#cc00cc','#cc0099','#cc3399','#cc0066',
  '#cc3300','#cc6600','#ff9933','#ff9966','#ff9999','#ff99cc','#ff99ff','#cc66ff','#9966ff','#cc33ff',
  '#663300','#996600','#996633','#cc9900','#a58800','#cccc00','#ffff66','#ffff99','#ffffcc','#ffcccc',
  '#336600','#669900','#009900','#009933','#00cc00','#66ff66','#339933','#339966','#009999','#33cccc',
  '#003366','#336699','#3366cc','#0099ff','#000099','#0000cc','#660066','#993366','#993333','#800000'
]

const changeOrientation = () => {
	handleClear()
	isLandscape.value = !isLandscape.value;
}

const openConfigPopup = () => {
  closeColorPalette()
	showConfig.value = true
}

const closeConfigPopup = () => {
	showConfig.value = false
}

const saveSignatureImg = () => {
  closeConfigPopup()
  closeColorPalette()
  
  signatureRef.value?.canvasToTempFilePath({
    quality: 1,
    success: (res) => {
      if (res.isEmpty) {
        uni.showToast({
          title: '请先画点什么吧~',
          icon: 'none',
          duration: 3000
        })
        return
      }
      if (res.tempFilePath) {
        saveBase64Image(res.tempFilePath)
        uni.showToast({ title: "保存成功", icon: "success" });
      } else {
        uni.showToast({ 
          title: "保存失败，请稍后重试", 
          icon: "none", 
          mask: true, 
          duration: 2000 
        });
      }
    },
    fail: (err) => {
      uni.showToast({
        title: '保存失败，请稍后重试',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    }
  })
}

const openColorPalette = () => {
  closeConfigPopup()
  colorPaletteVisible.value = true
}

const closeColorPalette = () => {
  colorPaletteVisible.value = false
}

const handleColorSelect = (color) => {
  penColor.value = color
  closeColorPalette()
}

const handleUndo = () => {
	closeConfigPopup()
  closeColorPalette()
	signatureRef.value?.undo()
}

const handleRedo = () => {
	closeConfigPopup()
  closeColorPalette()
	signatureRef.value?.restore()
}

const handleClear = () => {
	closeConfigPopup()
  closeColorPalette()
	signatureRef.value?.clear()
}
</script>

<style lang="scss" scoped>
.signature-pad {
	/* #ifndef APP-NVUE */
	height: calc(100vh - var(--window-top));
	/* #endif */
	/* #ifdef APP-NVUE */
	flex: 1;
	/* #endif */
	.signature-tips {
		position: absolute;
		/* #ifndef APP-NVUE */
		left: 50%;
		top: 50%;
		/* #endif */
		/* #ifdef APP-NVUE */
		left: 375rpx;
		top: 375rpx;
		/* #endif */
		font-size: 60rpx;
		color: #f5f5f5;
		opacity: 0.5;
		transform: translate(-50%, -50%);
		z-index: -1;
		transition: transform 0.3s;
	}
	.signature-area {
		/* #ifndef APP-NVUE */
		height: calc(100vh - var(--window-top) - 120rpx);
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}
	.tools-bar {
	  position: relative;
	  z-index: 999999;
	  display: flex;
		/* #ifdef APP-NVUE */
	  flex-direction: row;
	  /* #endif */
		/* #ifndef APP-NVUE */
	  padding-bottom: constant(safe-area-inset-bottom);
	  padding-bottom: env(safe-area-inset-bottom);
	  /* #endif */
	  height: 60px;
		background-color: $uni-bg-color;
	  box-shadow: 0 -10rpx 30rpx rgba(0, 0, 0, 0.05);
	  &-item {
	    flex: 1;
		  /* #ifndef APP-NVUE */
	    display: flex;
			/* #endif */
	    align-items: center;
	    justify-content: center;
			color: $uni-text-color-grey;
	    opacity: 0.6;
	    transition: opacity 0.1s ease-out;
		}
	}

	&.landscape {
		.signature-tips {
			transform: translate(-50%,-50%) rotate(90deg);
		}
    .signature-area {
      /* #ifndef APP-NVUE */
      height: calc(100vh - var(--window-top));
      /* #endif */
    }
		.tools-bar {
			position: absolute;
			left: 10rpx;
			bottom: 10rpx;
			z-index: 1;
			transform: rotate(90deg) translate(-100%, 0%);
			transform-origin: bottom left;
			padding: 0 16rpx;
			border-radius: 25px;
			box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
			&-item {
				padding: 16rpx;
			}
		}
	}
	.screen-handler {
		position: absolute;
		right: 10rpx;
		top: 10rpx;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 30px;
		border: 1px solid #ddd;
		border-radius: $uni-border-radius-lg;
		background-color: $uni-bg-color;
	}
}

.config-popup {
	&-wrap {
		width: 100%;
		padding: 5px 10px 60px 10px;
		box-sizing: border-box;
		color: $uni-text-color;
		background-color: $uni-bg-color;
	}

	&-item {
		flex: 1;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 5px;
		box-sizing: border-box;
		&__title {
			font-size: 14px;
		}
		&__more {
			flex-direction: row;
			&-text {
				font-size: 12px;
				color: #999;
			}
		}
	}
}

.landscape-config-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1999;
  transition: display 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);
}

.landscape-config-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // overflow: hidden;
  // background-color: #fff;
}

.landscape-config {
  flex: 1;
  padding: 10px;
  border-radius: 3px;
  transform: rotate(90deg);
  background-color: $uni-bg-color;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    margin-bottom: 12px;
  }
}

.portrait-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
  grid-auto-flow: row;
  direction: ltr;
  gap: 10px;
  padding: 10px 10px 70px 10px;
  box-sizing: border-box;
  background-color: $uni-bg-color;  
}
.landscape-wrap {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.landscape-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap-reverse;
  min-width: 375rpx;
  max-height: 100vh;
  gap: 10px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
  background-color: $uni-bg-color;
  .color-item {
    transform: rotate(90deg);
  }
}
.color-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: 2px;
  color: $uni-text-color-inverse;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.icon-image {
  width: 18px;
  height: 18px;
}
</style>