import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// aws-sdk v2 js issue https://github.com/aws/aws-sdk-js/issues/1769#issuecomment-1139826624
import commonjs from '@rollup/plugin-commonjs';
const updateCommonjsPlugin = () => {
    const commonJs22 = commonjs({
      include: [/node_modules/],
      extensions: [".js", ".cjs"],
      strictRequires: true,
    });
  
    return {
      name: "new-common-js",
      options(rawOptions) {
        const plugins = Array.isArray(rawOptions.plugins)
          ? [...rawOptions.plugins]
          : rawOptions.plugins
          ? [rawOptions.plugins]
          : [];
  
        const index = plugins.findIndex(
          (plugin) => plugin && plugin.name === "commonjs"
        );
        if (index !== -1) {
          plugins.splice(index, 1, commonJs22);
        }
  
        const nextConfig = { ...rawOptions, plugins };
        return commonJs22.options.call(this, nextConfig);
      },
    };
  };


// https://vitejs.dev/config/
export default defineConfig({
type: 'module',
  plugins: [vue(), updateCommonjsPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      './runtimeConfig': './runtimeConfig.browser'
    }
  }
})
