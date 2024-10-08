'use client'
import { useRef, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import ArtGL from './main.js'
import { loadedImagesState } from '@/stores/worksStates'
import { useAtom } from 'jotai'

export const ArtWork = () => {
  const canvasRef = useRef(null)
  const [GL, setGL] = useState<ArtGL>()
  const router = usePathname()?.replace('/', '')
  const path = !router ? 'index' : router
  const [loadedImage, setLoadedImage] = useAtom(loadedImagesState)
  let loadedShapeCount: number[] = []

  useEffect(() => {
    setGL(new ArtGL({ canvas: canvasRef.current }))
  }, [])

  useEffect(() => {
    if (!GL) return
    if (path !== 'index') {
      loadedImage.length !== 0 && setLoadedImage([])
      loadedShapeCount = []
    }
    GL.deformation(path)
  }, [GL, path])

  useEffect(() => {
    if (!GL || path !== 'index' || loadedImage.length === 0) return
    handlerShapes(loadedImage)
  }, [loadedImage])

  const handlerShapes = (addLoadedCounts: Array<number>) => {
    const composeIndex = addLoadedCounts.filter(
      (value) => !loadedShapeCount.includes(value)
    )
    composeIndex.map((num) => {
      if (!GL) return
      const textures = document.querySelectorAll('.canvas_img')
      if (textures[num]) {
        GL.addShape(textures[num], num)
        loadedShapeCount.push(num)
      }
    })
  }

  return (
    <section
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1',
      }}
    >
      <canvas ref={canvasRef}></canvas>
    </section>
  )
}
