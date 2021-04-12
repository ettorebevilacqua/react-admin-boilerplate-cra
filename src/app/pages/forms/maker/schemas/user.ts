const userSchema = {
  type: 'object',
  title: 'headline',
  properties: {
    call_count: {
      type: 'number',
      minimum: 2,
      maximum: 10,
      view: {
        sizeMd: 3,
      },
    },
    privacy: {
      type: 'boolean',
      default: true,
      view: {
        sizeMd: 12,
      },
    },
    spam: {
      type: 'boolean',
      view: {
        sizeMd: 12,
      },
    },
    accepted: {
      type: 'boolean',
      view: {
        sizeMd: 12,
      },
    },
    type: {
      type: 'string',
      widget: 'Select',
      default: 'customer',
      view: {
        sizeMd: 3,
      },
      enum: ['customer', 'supplier', 'buyer', 'business', 'partner'],
    },
  },
  required: ['call_count', 'type'],
};

export default userSchema;
