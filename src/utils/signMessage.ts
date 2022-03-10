import config from '../config'

export const createPermitMessageData = () => {
  const messageTypes = {
    User: [
      {
        name: 'id',
        type: 'string',
      },
    ],
    // Metadata: [
    //   {
    //     name: 'id',
    //     type: 'string',
    //   },
    //   {
    //     name: 'value',
    //     type: 'string',
    //   },
    // ],
    // Image: [
    //   { name: 'id', type: 'string' },
    //   { name: 'type', type: 'string' },
    // ],
    // Tag: [
    //   {
    //     name: 'id',
    //     type: 'string',
    //   },
    // ],
    // Category: [
    //   {
    //     name: 'id',
    //     type: 'string',
    //   },
    //   {
    //     name: 'title',
    //     type: 'string',
    //   },
    // ],
    Content: [
      { name: 'title', type: 'string' },
      {
        name: 'content',
        type: 'string',
      },
      // {
      //   name: 'categories',
      //   type: 'Category',
      // },
      // {
      //   name: 'tags',
      //   type: 'Tag',
      // },
      // {
      //   name: 'images',
      //   type: 'Image',
      // },
      // {
      //   name: 'metadata',
      //   type: 'Metadata',
      // },
      {
        name: 'user',
        type: 'User',
      },
    ],
    Wiki: [
      { name: 'id', type: 'string' },
      { name: 'version', type: 'uint256' },
      { name: 'language', type: 'string' },
      {
        name: 'content',
        type: 'Content',
      },
    ],
  }

  return messageTypes
}
