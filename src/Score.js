import React from 'react'
import styled from 'styled-components'

export default function Score({ children }) {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  position: absolute;
  font-size: 24px;
  top: 24px;
  right: 24px;
  text-align: right;
`
