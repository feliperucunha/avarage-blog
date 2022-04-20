export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'comment',
      type: 'text',
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Comments will not show on the blog without approval'
    },
    {
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }]
    }
  ],
}
