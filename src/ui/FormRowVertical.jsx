import React from "react";
import styled from "styled-components";

const StyledFormRowVerticle = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 0.8rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    width: 100%;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

function FormRowVerticle({ label, children }) {
  return (
    <StyledFormRowVerticle>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
    </StyledFormRowVerticle>
  );
}

export default FormRowVerticle;
