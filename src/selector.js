import EnhancedElement from './model/EnhancedElement';

export function select(query, context = document) {
  return new EnhancedElement(
    context[query.match(/\?$/) ? 'querySelector' : 'querySelectorAll'](query.split('?')[0])
  );
}
