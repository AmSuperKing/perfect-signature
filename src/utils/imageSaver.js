// imageSaver.js - 修复 MP 和 H5 端实现
import permision from "@/js_sdk/wa-permission/permission.js";

// 检测APP端权限
// #ifdef APP
export async function requestAppPermission() {
  const platform = uni.getSystemInfoSync().platform;
  if (platform === "android") {
    const status = await permision.requestAndroidPermission(
      "android.permission.WRITE_EXTERNAL_STORAGE"
    );
    return status === 1;
  } else if (platform === "ios") {
    const status = await permision.judgeIosPermission("photoLibrary");
    return status === 1;
  }
  return true;
}
// #endif

// 检测小程序权限
// #ifdef MP
export async function checkAlbumPermission() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.writePhotosAlbum"]) {
          resolve(true);
        } else {
          wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: () => resolve(true),
            fail: () => resolve(false),
          });
        }
      },
      fail: reject,
    });
  });
}
// #endif

// APP端保存图片
// #ifdef APP
export function saveBase64ToAlbumAPP(data) {
  return new Promise((resolve, reject) => {
    // 检查是否为base64数据
    const isBase64 = /^data:image\/(\w+);base64,/.test(data);
    
    if (isBase64) {
      // 处理Base64数据
      const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(data) || [];
      
      if (!format || !bodyData) {
        reject(new Error('无效的Base64图片数据'));
        return;
      }
      
      try {
        const buffer = uni.base64ToArrayBuffer(bodyData);
        // 生成临时文件路径
        const filePath = `${uni.env.USER_DATA_PATH}/temp_${Date.now()}.${format}`;
        
        uni.getFileSystemManager().writeFile({
          filePath,
          data: buffer,
          encoding: 'binary',
          success() {
            uni.saveImageToPhotosAlbum({
              filePath,
              success: () => resolve({ success: true, message: "图片保存成功" }),
              fail: (err) => {
                reject(new Error("APP保存相册失败: " + JSON.stringify(err)));
              },
            });
          },
          fail: (err) => {
            reject(new Error('写入图片文件数据失败: ' + JSON.stringify(err)));
          }
        });
      } catch (error) {
        reject(new Error('处理Base64图片数据时发生错误: ' + error.message));
      }
    } else {
      // 处理文件路径
      uni.saveImageToPhotosAlbum({
        filePath: data,
        success: () => resolve({ success: true, message: "图片保存成功" }),
        fail: (err) => {
          reject(new Error("APP保存相册失败: " + JSON.stringify(err)));
        },
      });
    }
  });
}
// #endif

// 微信小程序端保存图片
// #ifdef MP
export function saveBase64ToAlbumMP(data) {
  return new Promise((resolve, reject) => {
    // 检查是否为base64数据
    const isBase64 = /^data:image\/(\w+);base64,/.test(data);
    
    if (isBase64) {
      // 移除Base64前缀
      const dataContent = data.replace(/^data:image\/\w+;base64,/, "");
      const filePath = `${uni.env.USER_DATA_PATH}/temp_${Date.now()}.png`;
      const fs = uni.getFileSystemManager();
      
      fs.writeFile({
        filePath,
        data: dataContent,
        encoding: "base64",
        success: () => {
          uni.saveImageToPhotosAlbum({
            filePath,
            success: () => resolve({ success: true, message: "图片保存成功" }),
            fail: (err) => reject(new Error("小程序保存失败: " + JSON.stringify(err))),
          });
        },
        fail: (err) => reject(new Error("小程序写入文件失败: " + JSON.stringify(err))),
      });
    } else {
      // 处理文件路径
      uni.saveImageToPhotosAlbum({
        filePath: data,
        success: () => resolve({ success: true, message: "图片保存成功" }),
        fail: (err) => reject(new Error("小程序保存失败: " + JSON.stringify(err))),
      });
    }
  });
}
// #endif

// H5端保存图片
// #ifdef H5
export function saveBase64ToAlbumH5(data) {
  return new Promise((resolve, reject) => {
    try {
      // 检查是否为base64数据
      const isBase64 = /^data:image\/(\w+);base64,/.test(data);
      
      if (isBase64) {
        const base64Data = data.split(",")[1] || data;
        const binary = atob(base64Data);
        const buffer = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          buffer[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([buffer], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = `image_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          resolve({ success: true, message: "图片保存成功" });
        }, 100);
      } else {
        // 对于H5端的文件路径，我们尝试通过fetch获取文件内容再保存
        fetch(data)
          .then(response => response.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `image_${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              resolve({ success: true, message: "图片保存成功" });
            }, 100);
          })
          .catch(error => {
            reject(new Error('H5端获取文件失败: ' + error.message));
          });
      }
    } catch (error) {
      reject(new Error('H5端保存图片失败: ' + error.message));
    }
  });
}
// #endif

// 统一保存接口
export async function saveBase64Image(data) {
  try {
    // 权限处理
    let hasPermission = true;
    // #ifdef APP
    hasPermission = await requestAppPermission();
    // #endif
    // #ifdef MP
    hasPermission = await checkAlbumPermission();
    // #endif
    
    if (!hasPermission) {
      throw new Error("没有相册写入权限");
    }
    
    // 分端保存
    // #ifdef APP
    return await saveBase64ToAlbumAPP(data);
    // #endif
    // #ifdef MP
    return await saveBase64ToAlbumMP(data);
    // #endif
    // #ifdef H5
    return await saveBase64ToAlbumH5(data);
    // #endif
    // #ifndef APP || MP || H5
    throw new Error("不支持的平台");
    // #endif
  } catch (err) {
    return { success: false, message: `保存失败: ${err.message || err}` };
  }
}