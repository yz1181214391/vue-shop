module.exports = {
  // presets: [
  //   '@vue/cli-plugin-babel/preset'
  // ],
  // plugins: [
  //   [
  //     'component',
  //     {
  //       libraryName: 'element-ui',
  //       styleLibraryName: 'theme-chalk'
  //     }
  //   ]
  // ]


    "presets": [
      "@vue/app",
      ["@babel/preset-env", { "modules": false }]
    ],
    "plugins": [["component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]]

}
