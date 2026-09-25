/// <reference lib="webworker" />

export interface WorkerRasterizePayload {
  pageNumber: number
  scale: number
  tileX: number
  tileY: number
  tileSize?: number
}

self.onmessage = (e: MessageEvent) => {
  const { id, action, payload } = e.data

  if (action === 'rasterizePageTile') {
    const { pageNumber, scale, tileX, tileY } = payload as WorkerRasterizePayload

    // Simulate off-thread tile rendering / rasterization calculations
    const simulatedComputationTime = 20
    const start = performance.now()
    while (performance.now() - start < simulatedComputationTime) {
      // Simulate CPU compute
    }

    self.postMessage({
      id,
      action,
      payload: {
        pageNumber,
        tileX,
        tileY,
        scale,
        renderedAt: Date.now(),
        success: true,
      },
    })
  } else if (action === 'calculatePageHash') {
    self.postMessage({
      id,
      action,
      payload: {
        hash: 'worker_sha256_mock_hash_verified',
        success: true,
      },
    })
  }
}
