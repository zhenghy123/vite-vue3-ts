// import { UserConfig, ConfigEnv } from 'vite';
import { resolve } from 'path';
import { createVitePlugins } from './config/vite/plugin';
import proxy from './config/vite/proxy';
import { VITE_DROP_CONSOLE, VITE_PORT } from './config/constant';
import { generateModifyVars } from './config/themeConfig';
import { configManualChunk } from './config/vite/optimizer';
const packageName = require('./package.json').name;

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const isBuild = command === 'build';
  console.log('command===', command, mode);

  return {
    base: `/${packageName}/`,
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        { find: /^~/, replacement: resolve(__dirname, '') },
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },

    // plugins
    plugins: createVitePlugins(isBuild),

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },

    // server
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: VITE_PORT,
      open: true,
      cors: false,
      host: '0.0.0.0', // IP配置，支持从IP启动
      proxy,
    },

    // build
    build: {
      target: 'es2015',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: configManualChunk,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },

    //optimizeDeps
    // optimizeDeps: {
    //   include: ['ant-design-vue/es/locale/zh_CN', 'moment/dist/locale/zh-cn'],
    // },
  };
};
