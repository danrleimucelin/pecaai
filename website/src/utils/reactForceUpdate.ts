/* eslint-disable no-plusplus */
import React, { useState } from 'react'

// create your forceUpdate hook
export default function useForceUpdate() {
  const [value, setValue] = useState(false) // integer state
  return () => setValue(actValue => !actValue) // update the state to force render
}
