# 签名画板工具 (Perfect Signature)

一个功能强大的移动端签名和绘图应用，支持横竖屏切换、多种画笔设置和颜色选择。

## APP
[通用apk](./dist/release/apk/__UNI__CEC06C5__20250802153816.apk)
[360渠道包](./dist//release/apk/__UNI__CEC06C5_360_20250802153816.apk)
[应用宝渠道包](./dist/release/apk/__UNI__CEC06C5_yyb_20250802153816.apk)
[华为渠道包](./dist/release/apk/__UNI__CEC06C5_huawei_20250802153816.apk)
[OPPO渠道包](./dist/release/apk/__UNI__CEC06C5_oppo_20250802153816.apk)
[VIVO渠道包](./dist/release/apk/__UNI__CEC06C5_vivo_20250802153816.apk)
[小米渠道包](./dist/release/apk/__UNI__CEC06C5_xiaomi_20250802153816.apk)
[应用宝渠道包](./dist/release/apk/__UNI__CEC06C5_yyb_20250802153816.apk)

## 功能特性

### 核心功能
- 🖋️ **手写签名**: 提供流畅的手写签名体验
- 🎨 **画板创作**: 支持自由绘图创作
- 🔄 **横竖屏切换**: 支持在横屏和竖屏模式间自由切换
- 🎨 **颜色选择**: 提供丰富的颜色选择器，支持自定义颜色
- 🖊️ **画笔设置**: 可调节画笔粗细、笔锋效果等参数
- 💾 **作品保存**: 支持将作品保存到设备相册

### 界面特色
- **横屏优化**: 横屏模式下工具栏自动旋转适配，提供更好的创作体验
- **竖屏简洁**: 竖屏模式下界面紧凑，操作便捷
- **响应式设计**: 自适应不同屏幕尺寸

### 技术特点
- **多端兼容**: 支持 Android、iOS、微信小程序、H5 等多平台
- **权限管理**: 完善的系统权限申请和管理机制
- **离线使用**: 所有功能均为本地处理，无需网络连接
- **隐私保护**: 不收集用户数据，作品仅保存在本地设备

## 技术架构

### 核心组件
- `lime-signature`: 主签名单元，包含完整的手写签名功能
- `l-signature`: 基础签名画板组件
- `step-number`: 数字步进器组件
- 颜色选择器和配置面板组件

### 技术栈
- Vue 3 (Composition API)
- UniApp 跨平台框架
- SCSS 样式预处理器

## 使用说明

### 基本操作
1. **切换方向**: 点击右上角方向按钮在横竖屏间切换
2. **设置画笔**: 点击"设置"按钮调整画笔粗细、笔锋等参数
3. **选择颜色**: 点击"色板"按钮选择或切换画笔颜色
4. **撤销/重做**: 使用撤销和重做功能修改作品
5. **清空画布**: 点击"清空"按钮清除当前作品
6. **保存作品**: 点击"保存"按钮将作品保存到相册

### 横屏模式特色
- 工具栏垂直显示在屏幕左侧
- 配置面板从左侧滑出
- 更大的创作空间

### 竖屏模式特色
- 底部工具栏水平排列
- 弹出式配置面板
- 适合单手操作

## 项目结构
src/ ├── components/ │ ├── lime-signature/ # 主签名单元 │ │ ├── components/ │ │ │ ├── lime-signature/ # 签名主组件 │ │ │ └── l-signature/ # 基础画板组件 │ └── step-number/ # 数字步进器组件 ├── pages/ │ └── index/ # 主页面 ├── static/ │ ├── icons/ # 图标资源 │ └── privacyDesc.html # 隐私政策 ├── utils/ │ └── imageSaver.js # 图片保存工具 ├── androidPrivacy.json # Android隐私配置 └── App.vue # 应用入口


## 权限说明

### Android 权限
- `WRITE_EXTERNAL_STORAGE`: 用于保存图片到相册

### iOS 权限
- `photoLibrary`: 用于保存图片到相册

### 小程序权限
- `writePhotosAlbum`: 用于保存图片到相册

## 隐私保护

本应用严格遵守隐私保护原则：
- 不收集任何用户个人信息
- 不上传用户创作内容
- 作品仅保存在用户设备本地
- 权限仅在必要时申请，且仅用于实现相关功能

详细请参阅[隐私政策](./static/privacyDesc.html)和[服务协议](./static/serviceAgreement.html)

## 开发说明

### 环境要求
- Node.js >= 14.0.0
- HBuilderX 或支持 UniApp 的开发环境

### 安装依赖
```bash
npm install
```
### 运行项目
```bash
# 运行到H5
npm run dev:h5

# 运行到微信小程序
npm run dev:mp-weixin

# 运行到APP
npm run dev:app
```

### 构建项目
```bash
# 构建H5
npm run build:h5

# 构建微信小程序
npm run build:mp-weixin

# 构建APP
npm run build:app
```

### 注意事项
保存图片功能需要相应系统权限，请在系统设置中开启
横竖屏切换会清空当前画布内容
应用为单机应用，所有数据均保存在本地设备
不同平台可能存在细微的显示差异
技术支持
如有问题，请联系：amsuperking@qq.com

版权信息
© 2025 Perfect Signature. 保留所有权利。