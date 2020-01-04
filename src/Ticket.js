import React from 'react'
import styled from 'styled-components'

export default function Ticket(props) {
  return <Wrapper {...props}>{'🎫'}</Wrapper>
}

const Wrapper = styled.span`
  width: 50px;
  height: 50px;
  margin: -25px 0 0 -25px;
  position: absolute;
  font-size: 60px;
`
