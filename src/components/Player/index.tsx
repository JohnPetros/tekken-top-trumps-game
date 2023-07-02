import { useEffect, useState } from "react";
import { Fighter as FighterData, useGame } from "../../hooks/useGame";
import {
  Container,
  Background,
  Fighter,
  Attributes,
  Attribute,
  Check,
  Stat,
  Placeholder,
} from "./styles";
import theme from "../../styles/theme";

interface PlayerProps {
  fighter: FighterData | null;
  isBot?: boolean;
}

interface Stat {
  id: number;
  isFilled: boolean;
}

interface AattributesStats {
  name: string;
  stats: Stat[];
}

export function Player({ fighter, isBot = false }: PlayerProps) {
  const {
    state: { selectedAttribute },
    dispatch,
  } = useGame();
  const [attributesStats, setAttributesStats] = useState<AattributesStats[]>(
    []
  );

  function handleAttributeClick(attribute: string) {
    dispatch({ type: "setSelectedAttribute", payload: attribute });
  }

  function getAttributesStats(attribute: [string, number]) {
    const [attributeName, attributeValue] = attribute;

    let stats = [];
    for (let i = 1; i <= 10; i++) {
      const isFilled = i <= attributeValue / 10;
      stats.push({ id: i, isFilled });
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
    setAttributesStats(attributesStats);
  }, [fighter]);

  return (
    <Container isBot={isBot}>
      <Background
        animate={{ opacity: [0, 0.5] }}
        transition={{ duration: 0.4 }}
        isBot={isBot}
      />
      {fighter ? (
        <Fighter
          key={fighter.id}
          isBot={isBot}
          image={`https://i.postimg.cc/${fighter.image}`}
          initial={{ x: isBot ? 40 : -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <>
            <Attributes>
              <dl>
                {attributesStats.map(({ name, stats }) => (
                  <Attribute
                    isBot={isBot}
                    onClick={() => handleAttributeClick(name)}
                  >
                    <dt
                      style={{
                        color:
                          selectedAttribute === name
                            ? theme.colors.blue_300
                            : "inherit",
                      }}
                    >
                      <Check
                        isChecked={selectedAttribute === name}
                        isBot={isBot}
                      />
                      {name}
                    </dt>
                    <dd>
                      {stats.map(({ id, isFilled }) => {
                        return (
                          <Stat
                            key={String(id)}
                            isFilled={isFilled}
                            isBot={isBot}
                            isSelected={selectedAttribute === name}
                          />
                        );
                      })}
                    </dd>
                  </Attribute>
                ))}
              </dl>
            </Attributes>
            <strong>{fighter.name}</strong>
          </>
        </Fighter>
      ) : (
        <Placeholder isBot={isBot} />
      )}
    </Container>
  );
}
