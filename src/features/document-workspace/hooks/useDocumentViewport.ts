import { useState, useCallback } from 'react'
import type { DocumentViewportState, ViewportMode } from '../types/documentWorkspace.types'

export function useDocumentViewport(initialPage: number = 1) {
  const [viewport, setViewport] = useState<DocumentViewportState>({
    zoom: 1.0,
    rotation: 0,
    currentPage: initialPage,
    mode: 'fit-width',
    isRendering: false,
  })

  const setZoom = useCallback((zoomOrUpdater: number | ((prev: number) => number)) => {
    setViewport((prev) => {
      const nextZoom =
        typeof zoomOrUpdater === 'function' ? zoomOrUpdater(prev.zoom) : zoomOrUpdater
      return {
        ...prev,
        zoom: Math.min(4.0, Math.max(0.25, Math.round(nextZoom * 100) / 100)),
        mode: 'free',
      }
    })
  }, [])

  const zoomIn = useCallback(() => {
    setZoom((z) => z + 0.15)
  }, [setZoom])

  const zoomOut = useCallback(() => {
    setZoom((z) => z - 0.15)
  }, [setZoom])

  const rotateClockwise = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360,
    }))
  }, [])

  const setCurrentPage = useCallback((pageNumber: number) => {
    setViewport((prev) => ({
      ...prev,
      currentPage: pageNumber,
    }))
  }, [])

  const setMode = useCallback((mode: ViewportMode) => {
    setViewport((prev) => ({
      ...prev,
      mode,
      zoom: mode === 'fit-page' ? 0.75 : 1.0,
    }))
  }, [])

  return {
    viewport,
    setZoom,
    zoomIn,
    zoomOut,
    rotateClockwise,
    setCurrentPage,
    setMode,
  }
}
