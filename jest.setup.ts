import '@testing-library/jest-dom'

// Mock TransformStream
global.TransformStream = class TransformStream {
  readable = new ReadableStream()
  writable = new WritableStream()
}
