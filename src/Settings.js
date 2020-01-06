import React from 'react'
import styled from 'styled-components'
import Div from 'styled-kit/Div'

import { avatars } from 'stuff'

export default function Settings() {
  return (
    <Wrapper column itemsCenter>
      <Div wraps width={288}>
        {avatars.map(avatar => (
          <Div
            as="label"
            key={avatar}
            htmlFor={avatar}
            column
            itemsCenter
            width={40}
            margin={4}
          >
            <input id={avatar} type="radio" name="avatar" value={avatar} />
            <span>{avatar}</span>
          </Div>
        ))}
      </Div>
    </Wrapper>
  )
}

const Wrapper = styled(Div)`
  position: absolute;
  top: 20px;
  width: calc(100vw - 40px);
  max-width: 320px;
  height: 400px;
  background: rgba(240, 240, 240, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 15px 2px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);

  font-size: 40px;

  input {
    margin: 0;
  }
`
