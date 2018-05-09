/**
 * Created by yubh on 2017/12/23.
 */

module.exports = ({ file, options, env })=>{
    if(env === 'production'){
        return {
            plugins: [
                require('autoprefixer'),
                require('cssnano'),
            ]
        }
    }else{
        return{
            plugins: [
                require('autoprefixer'),
                require('cssnano'),

            ]
        }
    }
}







// module.exports = {
//     plugins: {
//         'cssnano': {},
//         'autoprefixer':{}
//     }
// }

// plugins: {
//     'postcss-import': {},
//     'postcss-cssnext': {},
//     'cssnano': {}
// }
// plugins:[require('autoprefixer')]
//  plugins:{
//      'autoprefixer':{}
//  },

// module.exports = ({ file, options, env }) => ({
//     //parser: file.extname === '.sss' ? 'sugarss' : false,
//     plugins: {
//         // 'postcss-import': { root: file.dirname },
//         // 'postcss-cssnext': options.cssnext ? options.cssnext : false,
//         'autoprefixer': env == 'production' ? options.autoprefixer : false,
//         'cssnano': env === 'production' ? options.cssnano : false
//     }
// })

// module.exports = ({ file, options, env }) => {
//     console.log('fifile.extnamele::::',file.extname)
//     console.log('options',options)
// }