import { useEffect, useState } from "react";
import { Fighter as FighterData, useGame } from "../../hooks/useGame";
import {
  Container,
  Background,
  Fighter,
  Attributes,
  Attribute,
  Checkbox,
  Stat,
  Placeholder,
  Check,
} from "./styles";
import theme from "../../styles/theme";

interface PlayerProps {
  fighter: FighterData | null;
  isBot?: boolean;
  isWinner: boolean | null;
}

interface Stat {
  id: number;
  isFilled: boolean;
}

interface AattributesStats {
  name: string;
  stats: Stat[];
}

export function Player({ fighter, isBot = false, isWinner }: PlayerProps) {
  const {
    state: { selectedAttribute, stage },
    dispatch,
  } = useGame();
  const [attributesStats, setAttributesStats] = useState<AattributesStats[]>(
    []
  );
  const color = theme.colors[isBot ? "red" : "blue_300"];
  const hasEvents =
    stage !== "fighterTwo-selection" && stage !== "round-result";

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
    <Container isBot={isBot} isWinner={isWinner}>
      <Background
        animate={{ opacity: [0, 0.5] }}
        transition={{ duration: 0.4 }}
        isBot={isBot}
      />
      {fighter ? (
        <Fighter
          key={fighter.id}
          isBot={isBot}
          hasEvents={hasEvents}
          image={`https://i.postimg.cc/${fighter.image}`}
          initial={{ x: isBot ? 20 : -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <>
            <Attributes>
              <dl>
                {attributesStats.map(({ name, stats }) => (
                  <Attribute
                    color={color}
                    onClick={() =>
                      hasEvents ? handleAttributeClick(name) : null
                    }
                  >
                    <dt
                      style={{
                        color:
                          selectedAttribute === name
                            ? theme.colors[isBot ? "red" : "blue_300"]
                            : "inherit",
                      }}
                    >
                      <Checkbox
                        isChecked={selectedAttribute === name}
                        color={color}
                      >
                        {selectedAttribute === name && (
                          <Check
                            animate={{ rotate: [-90, 0] }}
                            transition={{ ease: "linear", duration: 0.2 }}
                          >
                            ✔
                          </Check>
                        )}
                      </Checkbox>
                      {name}
                    </dt>
                    <dd>
                      {stats.map(({ id, isFilled }) => {
                        return (
                          <Stat
                            key={String(id)}
                            isFilled={isFilled}
                            isBot={isBot}
                            color={color}
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
