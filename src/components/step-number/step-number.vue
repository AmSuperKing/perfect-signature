<template>
  <view
    class="step-number"
    :class="{ disabled: props.disabled }"
    :style="{ backgroundColor: props.disabled ? '#f5f5f5' : (props.bgColor || '#0000') }"
  >
    <view 
      class="minus-btn" 
      :class="{ disabled: props.disabled || currentValue <= Number(props.min) }" 
      @click="handleStepChange('minus')"
    >-</view>
    <input 
      type="number" 
      class="number-input" 
      :disabled="props.disabled"
      auto-blur 
      :value="currentValue" 
      @input="handleInput"
      @blur="handleBlur"
    />
    <view 
      class="plus-btn" 
      :class="{ disabled: props.disabled || currentValue >= Number(props.max) }" 
      @click="handleStepChange('plus')"
    >+</view>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: 0
  },
  min: {
    type: [String, Number],
    default: 0
  },
  max: {
    type: [String, Number],
    default: Number.MAX_SAFE_INTEGER
  },
  step: {
    type: [String, Number],
    default: 1
  },
  disabled: {
    type: Boolean,
    default: false
  },
  bgColor: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue', 'change'])

// 使用 ref 来存储当前值
const currentValue = ref(Number(props.modelValue))

// 监听 props.modelValue 的变化
watch(() => props.modelValue, (newVal) => {
  currentValue.value = Number(newVal)
})

// 处理输入事件
const handleInput = (e) => {
  const value = Number(e.detail.value)
  currentValue.value = value
  emits('update:modelValue', value)
  emits('change', value)
}

// 处理失去焦点事件，确保值在有效范围内
const handleBlur = () => {
  let value = currentValue.value
  
  // 确保值在 min 和 max 范围内
  if (value < Number(props.min)) {
    value = Number(props.min)
  } else if (value > Number(props.max)) {
    value = Number(props.max)
  }
  
  currentValue.value = value
  emits('update:modelValue', value)
  emits('change', value)
}

// 处理步进变化
const handleStepChange = (type) => {
  if (props.disabled) return
  
  const stepNum = Number(props.step)
  let newValue = currentValue.value
  
  if (type === 'plus' && newValue < Number(props.max)) {
    newValue = currentValue.value + stepNum
  } else if (type === 'minus' && newValue > Number(props.min)) {
    newValue = currentValue.value - stepNum
  }
  
  if (newValue !== currentValue.value) {
    currentValue.value = newValue
    emits('update:modelValue', newValue)
    emits('change', newValue)
  }
}
</script>

<style scoped>
.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #555;
  border-radius: 3px;
  border: 1px solid #ddd;
}
.minus-btn {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}
.plus-btn {
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
.minus-btn,
.plus-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  line-height: 20px;
  font-size: 15px;
  box-sizing: border-box;
  background-color: #f5f7fa;
  cursor: pointer;
}
.minus-btn.disabled,
.plus-btn.disabled {
  color: #ddd;
  cursor: not-allowed;
}

.number-input {
  width: 40px;
  min-height: 20px;
  max-height: 20px;
  line-height: 20px;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 12px;
  background-color: #fff;
  border: none;
  outline: none;
}
</style>