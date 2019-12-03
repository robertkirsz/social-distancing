import React from 'react'
import styled from 'styled-components'

export default function Lives({ children }) {
  return <Wrapper>{Array(children < 0 ? 0 : children).fill('❤️')}</Wrapper>
}

const Wrapper = styled.div`
  position: absolute;
  font-size: 24px;
  top: 24px;
  left: 24px;
  text-align: right;
`
