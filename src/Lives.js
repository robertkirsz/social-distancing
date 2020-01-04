import React from 'react'
import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'

export default function Lives() {
  const lives = useStoreState(({ lives }) => lives.value)
  return <Wrapper>{Array(lives < 0 ? 0 : lives).fill('❤️')}</Wrapper>
}

const Wrapper = styled.div`
  position: absolute;
  font-size: 24px;
  top: 24px;
  left: 24px;
  text-align: right;
`
