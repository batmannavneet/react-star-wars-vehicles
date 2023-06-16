export function extractPageCount(
  prevUrl: string | null,
  nextUrl: string | null,
  count: number,
  countPerPage: number = 10
): number[] {
  if (prevUrl == null && nextUrl == null) {
    return count === 0 ? [0, 0] : [1, count]; //no records found or small subset found
  }

  if (prevUrl == null) {
    //first page
    return [1, countPerPage];
  }
  let prevPage: number = parseInt(prevUrl.substring(prevUrl.length - 1));

  if (nextUrl == null) {
    //last page
    return [prevPage * countPerPage, count];
  }
  let nextPage: number = parseInt(nextUrl.substring(prevUrl.length - 1));

  return [prevPage * countPerPage, (nextPage - 1) * countPerPage];
}
