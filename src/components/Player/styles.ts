import styled from "styled-components";

interface Player {
  isBot: boolean;
}

export const Container = styled.div<Player>`
  display: flex;
  justify-content: ${({ isBot }) => (isBot ? "flex-end" : "flex-start")};
  align-items: flex-end;
  position: relative;

  > div {
    height: 64rem;
  }

  > div:first-child {
    order: ${({ isBot }) => (isBot ? 2 : 1)};
    transform: ${({ isBot }) => (isBot ? "scaleX(-1)" : "scaleX(1)")};
  }
`;

export const Background = styled.div`
  width: 24rem;
  border-radius: 8px 8px 0 0;

  background: linear-gradient(90deg, #9b28a1, #d638dd, transparent 95%);
  z-index: 1;
  opacity: 0.5;
`;

export const Fighter = styled.div<Player>`
  width: 100%;
  padding: ${({ isBot }) => (isBot ? "0 0 0 8rem" : "0 8rem 0 0")};

  position: absolute;
  left: ${({ isBot }) => (isBot ? 0 : 0)}rem;
  order: ${({ isBot }) => (isBot ? 1 : 2)};
  z-index: 5;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://i.postimg.cc/jjshZZkG/PAUL.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: -20rem center;
    transform: ${({ isBot }) => (isBot ? "scaleX(-1)" : "scaleX(1)")};
    z-index: -1;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ isBot }) => (isBot ? "flex-start" : "flex-end")};

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.white};
    align-self: ${({ isBot }) => (isBot ? "flex-start" : "flex-end")};

    font-size: 2.4rem;
    font: ${({ theme }) => theme.fonts.title};

    margin-top: 2.4rem;
  }
`;

export const Attributes = styled.div`
  background-color: ${({ theme }) => theme.colors.blue_700};

  width: max-content;
  padding: 2.4rem;
  border-radius: 8px;
  opacity: 0.9;

  transform: skew(-15deg);

  color: ${({ theme }) => theme.colors.white};

  dl {
    width: 100%;
    display: grid;
  }

  dt {
    margin-top: 8px;
  }

  dd {
    margin-top: 8px;
  }

  span {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    background: linear-gradient(90deg, #9b28a1, #d638dd);
    transform: skew(5deg, -5deg);
  }

  span + span {
    margin-left: 6px;
  }
`;
