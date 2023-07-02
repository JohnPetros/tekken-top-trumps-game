import { Container, Background, Fighter, Attributes } from "./styles";

interface Player {
  isBot?: boolean;
}

export function Player({ isBot = false }: Player) {
  return (
    <Container isBot={isBot}>
      <Background />
      <Fighter isBot={isBot}>
        <Attributes>
          <dl>
            <dt>Force</dt>
            <dd>
              {new Array(10).fill("").map((_, index) => (
                <span />
              ))}
            </dd>
            <dt>Defense</dt>
            <dd>
              {new Array(10).fill("").map((_, index) => (
                <span />
              ))}
            </dd>
            <dt>Mobility</dt>
            <dd>
              {new Array(10).fill("").map((_, index) => (
                <span />
              ))}
            </dd>
          </dl>
        </Attributes>
        <strong>Paul</strong>
      </Fighter>
    </Container>
  );
}
