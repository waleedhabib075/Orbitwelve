// https://www.sanity.io/docs/structure-builder-cheat-sheet
// Using any type for StructureResolver to avoid import issues
// The structure function works correctly at runtime
export const structure = (S: any, context: any) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item: any) => item.getId() && !['post', 'category', 'author'].includes(item.getId()!),
      ),
    ])
