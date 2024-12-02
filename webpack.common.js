const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // Entry point untuk aplikasi
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },

  // Output untuk bundel
  output: {
    filename: '[name].bundle.js', // Menggunakan nama bundel berdasarkan entry point
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Membersihkan folder output sebelum build baru
  },

  // Mengatur bagaimana berkas diproses
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // Memasukkan CSS ke dalam DOM
          'css-loader', // Memproses @import dan URL
        ],
      },
    ],
  },

  // Plugin yang digunakan
  plugins: [
    // Membersihkan direktori output sebelum build
    new CleanWebpackPlugin(),

    // Membuat berkas HTML dari template
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),

    // Menyalin aset dari folder public ke folder dist
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'dist'),
          globOptions: {
            // Ignore berkas di dalam folder images (opsional)
            // ignore: ['**/images/**'],
          },
        },
      ],
    }),

    // Menambahkan PWA dengan Service Worker
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'sw.bundle.js',
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        // Caching data dari API
        {
          urlPattern: ({ url }) =>
            url.href.startsWith('https://restaurant-api.dicoding.dev'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restoranku-api',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 24 * 60 * 60, // 1 hari
            },
          },
        },
        // Caching gambar dari API
        {
          urlPattern: ({ url }) =>
            url.href.startsWith('https://restaurant-api.dicoding.dev/images'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'restoranku-images',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            },
          },
        },
      ],
    }),

    // Mengoptimalkan gambar menggunakan Imagemin
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50, // Kualitas gambar
          progressive: true,
        }),
      ],
    }),

    // Menampilkan laporan bundel
    new BundleAnalyzerPlugin(),
  ],

  // Mengaktifkan Code Splitting otomatis
  optimization: {
    splitChunks: {
      chunks: 'all', // Menerapkan Code Splitting untuk semua jenis chunks (async dan sync)
      minSize: 20000, // Ukuran minimum untuk memisahkan bundel (20 KB)
      maxSize: 0, // Tidak ada batas maksimum
      minChunks: 1, // Modul dipakai setidaknya satu kali untuk dipisahkan
      maxAsyncRequests: 30, // Maksimal permintaan paralel untuk chunk async
      maxInitialRequests: 30, // Maksimal permintaan paralel untuk chunk awal
      automaticNameDelimiter: '-', // Pemisah nama otomatis
      cacheGroups: {
        // Mengatur bundel library pihak ketiga
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // Prioritas untuk cache ini
        },
        default: {
          minChunks: 2, // Modul digunakan di minimal dua tempat
          priority: -20,
          reuseExistingChunk: true, // Menggunakan chunk yang sudah ada jika memungkinkan
        },
      },
    },
  },
};
