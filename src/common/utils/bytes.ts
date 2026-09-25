/**
 * Formats a given byte size into human readable string (KB, MB, GB)
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

/**
 * Calculates byte-range chunks for large document streaming (e.g. 100MB-1GB)
 */
export function calculateByteChunks(
  totalBytes: number,
  chunkSize: number = 2 * 1024 * 1024 // 2MB default chunk
): Array<{ start: number; end: number; chunkIndex: number }> {
  const chunks = []
  let start = 0
  let index = 0

  while (start < totalBytes) {
    const end = Math.min(start + chunkSize - 1, totalBytes - 1)
    chunks.push({ start, end, chunkIndex: index })
    start = end + 1
    index++
  }

  return chunks
}
