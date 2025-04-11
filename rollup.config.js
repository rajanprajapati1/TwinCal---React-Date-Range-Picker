import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(), // 👈 This ensures peer deps like react are not bundled
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    postcss({
      inject: true, // 👈 this will inject CSS directly into JS
      extract: true,
      modules: false,
      config: {
        path: './postcss.config.cjs',
      },
    }),  
    
  ]
};
