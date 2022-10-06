'use strict';

module.exports = {
  name: require('./package').name,

  _getParentOptions() {
    let options;

    // The parent can either be an Addon or a Project. If it's an addon,
    // we want to use the app instead. This public method probably wasn't meant
    // for this, but it's named well enough that we can use it for this purpose.
    if (this.parent && !this.parent.isEmberCLIProject) {
      options = this.parent.options = this.parent.options || {};
    } else {
      options = this.app.options = this.app.options || {};
    }

    return options;
  },

  included() {
    this._super.included.apply(this, arguments);

    let parentOptions = this._getParentOptions();

    // Create babel options if they do not exist
    parentOptions.babel = parentOptions.babel || {};
    parentOptions.babel.plugins = parentOptions.babel.plugins || [];

    let hasPlugin = parentOptions.babel.plugins
      .filter((definition) => Array.isArray(definition))
      .some(
        (definition) =>
          definition[2] === 'filter-imports:ember-classic-decorator'
      );

    if (!hasPlugin) {
      parentOptions.babel.plugins.push([
        require.resolve('babel-plugin-filter-imports'),
        {
          imports: {
            'ember-classic-decorator': ['default'],
          },
        },
        'filter-imports:ember-classic-decorator',
      ]);
    }
  },
};
