import EmberObject, { get } from '@ember/object';

const { keys } = Object;
const OPTION_KEYS = '__option_keys__';

const OptionsObject = EmberObject.extend({
  toObject() {
    return this[OPTION_KEYS].reduce((obj, key) => {
      obj[key] = get(this, key);
      return obj;
    }, {});
  }
});

// from https://github.com/offirgolan/ember-cp-validations/issues/635#issuecomment-485892681
export default class Options {
  constructor({ model, attribute, options = {} }) {
    const optionKeys = keys(options);
    const createParams = { [OPTION_KEYS]: optionKeys, model, attribute };

    return OptionsObject.extend(options).create(createParams);
  }
}
