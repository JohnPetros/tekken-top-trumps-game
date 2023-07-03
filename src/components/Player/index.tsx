import { useEffect, useState } from "react";
import { Fighter, useGame } from "../../hooks/useGame";
import {
  Container,
  Background,
  SelectedFighter,
  Attributes,
  Attribute,
  Checkbox,
  Stat,
  Placeholder,
  Check,
  Fighters,
  FighterCard,
} from "./styles";
import theme from "../../styles/theme";
import { Variants } from "framer-motion";

interface PlayerProps {
  selectedFighter: Fighter | null;
  fighters: Fighter[];
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

export function Player({
  selectedFighter,
  fighters,
  isBot = false,
  isWinner,
}: PlayerProps) {
  const {
    state: { selectedAttribute, stage, turn },
    dispatch,
  } = useGame();
  const [attributesStats, setAttributesStats] = useState<AattributesStats[]>(
    []
  );
  const color = theme.colors[isBot ? "red" : "blue_300"];
  const isDisabled = stage !== "attribute-selection" || turn === "playerTwo";

  function handleAttributeClick(attribute: string) {
    dispatch({ type: "setSelectedAttribute", payload: attribute });
  }

  function handleFighterCardClick(id: number) {
    const selectedFighter: Fighter = fighters.find(
      (fighter) => fighter.id === id
    )!;
    dispatch({ type: "setPlayerOneSelectedFighter", payload: selectedFighter });
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
    if (!selectedFighter) return;
    const attributesStats = Object.entries(selectedFighter.attributes).map(
      getAttributesStats
    );
    setAttributesStats(attributesStats);
  }, [selectedFighter]);

  useEffect(() => {
    if (stage === "attribute-selection" && !isBot) {
      dispatch({ type: "setPlayerOneSelectedFighter", payload: fighters[0] });
    }
  }, [stage]);

  return (
    <Container isBot={isBot} isWinner={isWinner}>
      <Background
        animate={{ opacity: [0, 0.5] }}
        transition={{ duration: 0.4 }}
        isBot={isBot}
      />
      {selectedFighter ? (
        <SelectedFighter
          key={selectedFighter.id}
          isBot={isBot}
          isDisabled={isDisabled}
          image={`https://i.postimg.cc/${selectedFighter.image}`}
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
                      !isDisabled ? handleAttributeClick(name) : null
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
            <strong>{selectedFighter.name}</strong>
          </>
        </SelectedFighter>
      ) : (
        <Placeholder isBot={isBot} />
      )}
      <Fighters>
        {fighters.map(({ id, image }) => {
          const isSelected = selectedFighter?.id === id;

          const shadowAnimation: Variants = {
            active: {
              boxShadow: [
                `0px 0px 12px 4px ${color}`,
                `0px 0px 12px 8px ${color}`,
              ],
              transition: {
                duration: 0.2,
                repeat: Infinity,
                repeatType: "mirror",
              },
            },
            desactive: {
              boxShadow: `0px 0px 0px transparent`,
            },
          };
          return (
            <FighterCard
              image={`https://i.postimg.cc/${image}`}
              variants={shadowAnimation}
              animate={isSelected ? "active" : "desactive"}
              isBot={isBot}
              onClick={() => handleFighterCardClick(id)}
            />
          );
        })}
      </Fighters>
    </Container>
  );
}
