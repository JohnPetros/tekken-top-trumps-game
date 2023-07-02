import { useEffect, useState } from "react";
import { Fighter as FighterData } from "../hooks/useGame";
import { Container, Background, Fighter, Attributes, Stat } from "./styles";

interface PlayerProps {
  fighter: FighterData | null;
  isBot?: boolean;
}

export function Player({ isBot = false, fighter }: PlayerProps) {
  const [attributesStats, setAttributesStats] = useState([]);

  function verifyAttributeValue(value: number, maxValue: number) {
    return value + 1 < maxValue / 10;
  }

  function getAttributesStats(attribute: [string, number]) {
    const [attributeName, attributeValue] = attribute;

    let stats = [];
    for (let i = 1; i <= 10; i++) {
      const isFilled = i <= attributeValue / 10;
      stats.push(<Stat isFilled={isFilled} />);
    }

    return {
      name: attributeName,
      stats,
    };
  }

  useEffect(() => {
    if (!fighter) return;
    const attributesStats = Object.entries(fighter.attributes).map(
      getAttributesStats
    );
    console.log(attributesStats);
  }, [fighter]);

  return (
    <Container isBot={isBot}>
      <Background
        animate={{ opacity: [0, 0.5] }}
        transition={{ duration: 0.4 }}
      />
      <Fighter
        isBot={isBot}
        image={`https://i.postimg.cc/${fighter.image}`}
        initial={{ x: isBot ? 40 : -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {fighter && (
          <>
            <Attributes>
              <dl>
                <dt>Force</dt>
                <dd>
                  {new Array(10).fill("").map((_, index) => {
                    const { force } = fighter.attributes;
                    const isFilled = verifyAttributeValue(index, force);
                    return <Stat key={String(index)} isFilled={isFilled} />;
                  })}
                </dd>
                <dt>Defense</dt>
                <dd>
                  {new Array(10).fill("").map((_, index) => {
                    const { defense } = fighter.attributes;
                    const isFilled = verifyAttributeValue(index, defense);
                    return <Stat key={String(index)} isFilled={isFilled} />;
                  })}
                </dd>
                <dt>Mobility</dt>
                <dd>
                  {new Array(10).fill("").map((_, index) => {
                    const { mobility } = fighter.attributes;
                    const isFilled = verifyAttributeValue(index, mobility);
                    return <Stat key={String(index)} isFilled={isFilled} />;
                  })}
                </dd>
              </dl>
            </Attributes>
            <strong>{fighter.name}</strong>
          </>
        )}
      </Fighter>
    </Container>
  );
}
