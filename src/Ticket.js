import React from 'react'
import styled from 'styled-components'

export default function Ticket({ zIndex, target, ...props }) {
  return (
    <Wrapper
      style={{
        zIndex
      }}
      {...props}
    >
      <span>{target}</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  margin: -25px 0 0 -25px;

  position: absolute;

  background: pink;
  border-radius: 4px;

  text-align: center;
  font-size: 12px;
`
