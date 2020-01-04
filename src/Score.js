import React from 'react'
import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'

export default function Score() {
  return <Wrapper>{useStoreState(({ score }) => score.value)}</Wrapper>
}

const Wrapper = styled.div`
  position: absolute;
  font-size: 24px;
  top: 24px;
  right: 24px;
  text-align: right;
`
