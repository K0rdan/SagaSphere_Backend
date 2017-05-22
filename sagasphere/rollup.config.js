let globals = {}, externals = [
  "express",
  "express-session",
  "colors",
  "cookie-parser",
  "body-parser",
  "mysql"
];

for(let i in externals){
  globals[externals[i]] = externals[i];
}

export default {
  entry: 'src/index.js',
  dest: 'dist/bundle.js',
  format: 'umd',
  external: externals,
  globals: globals
};