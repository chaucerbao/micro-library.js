export function select(query, context = document) {
  var matches = {
      '#': 'getElementById',
      '.': 'getElementsByClassName',
      '@': 'getElementsByName',
      '=': 'getElementsByTagName',
      '?': 'querySelector',
      '*': 'querySelectorAll'
    },
    regex = /[#.@=?*]/.exec(query)[0];

  return (context[matches[regex]](query.split(regex)[1]));
}
