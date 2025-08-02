import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import uviewPlus from 'uview-plus'

export function createApp() {
	const app = createSSRApp(App);
	app.use(uviewPlus, () => {
		return {
			options: {
				// 修改config对象的属性
				config: {
					customIcon: {
						family: 'iconfont',
						url: 'https://at.alicdn.com/t/c/font_4987318_0qkc93gxwq8.ttf?t=1754010627143'
					},
					customIcons: {
						'icon-download' : '\ue631',
						'icon-color-palette': '\ue624',
						'icon-pen-draw': '\ue7b2',
						'icon-clear': '\ue900',
						'icon-undo': '\ue966',
						'icon-redo': '\ue937',
						'icon-landscape': '\ue6af',
						'icon-portrait': '\ue6fc'
					}
				}
			}
		}
	})
	return {
		app,
	};
}
