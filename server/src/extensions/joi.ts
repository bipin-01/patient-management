import rawJoi from 'joi';

interface ExtendedJoi extends rawJoi.Root {
  stringArray(): rawJoi.ArraySchema;
}

export default rawJoi.extend((joi) => ({
  type: 'stringArray',
  base: joi.array(),
  coerce: (value) => {
    const returnValue = value && value.split ? value.split(',') : value;

    return { value: returnValue };
  }
})) as ExtendedJoi;
