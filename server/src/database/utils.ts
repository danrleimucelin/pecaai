export const schemaOptions = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: {
    createdAt: 'created_dtm',
    updatedAt: 'updated_dtm',
  },
};
