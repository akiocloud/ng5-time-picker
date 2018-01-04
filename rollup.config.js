export default {
    input: 'dist/index.js',
    output: {
      file: 'dist/bundles/timePicker.umd.js',
      format: 'umd',
      name: 'ng.time-picker',
      sourcemap: false
    },
    globals: {
      '@angular/core': 'ng.core',
      'rxjs/Observable': 'Rx',
      'rxjs/ReplaySubject': 'Rx',
      'rxjs/add/operator/map': 'Rx.Observable.prototype',
      'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
      'rxjs/add/observable/fromEvent': 'Rx.Observable',
      'rxjs/add/observable/of': 'Rx.Observable'
    },
  }