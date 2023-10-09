/* import './App.css'; */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { useState, useEffect } from 'react';

import Image from './Image'
import Description from './Description';
import data from './data/monsters.json';
import misses from './data/miss.json';
import hits from './data/hit.json';

function Dungeon() {
  const [arrayIndex, setArrayIndex] = useState(0);
  const [character, setCharacter] = useState(JSON.parse(window.localStorage.getItem('character')) || {name: 'enter name', hitpoints: 30, attack: 5, defence: 15, damage: 4})
  const [monster, setMonster] = useState(data[arrayIndex])
  const [fightDescription, setFightDescription] = useState('')

  useEffect(() => {
    window.localStorage.setItem('character', JSON.stringify(character))
  }, [character])

  const nameChange = event => setCharacter({name: event.target.value, hitpoints: character.hitpoints, attack: character.attack, defence: character.defence, damage: character.damage} )
  const hitpointsChange = event => setCharacter({name: character.name, hitpoints: event.target.value, attack: character.attack, defence: character.defence, damage: character.damage} )
  const attackChange = event => setCharacter({name: character.name, hitpoints: character.hitpoints, attack: event.target.value, defence: character.defence, damage: character.damage} )
  const defenceChange = event => setCharacter({name: character.name, hitpoints: character.defence, attack: character.attack, defence: event.target.value, damage: character.damage} )
  const damageChange = event => setCharacter({name: character.name, hitpoints: character.defence, attack: character.attack, defence: character.defence, damage: event.target.value} )

  function onButttonClick() {
    if(character.hitpoints > 0) {
      const indexMax = data.length - 1;
      let randomInt = Math.floor((Math.random() * indexMax))+1;
      setArrayIndex(randomInt);
      setMonster(data[randomInt]);
      setFightDescription('');
    } else {
      setArrayIndex(0);
      setMonster(data[0]);
      setFightDescription('');
      setCharacter({name: 'enter name', hitpoints: 30, attack: 5, defence: 15, damage: 4})
    }


  }

  function onAttackClick() {
    let result = ""; 
    if (arrayIndex === 0) {
      result += "You are not fighting anyone.";
    } else {
      if (character.hitpoints > 0 && monster.hitpoints > 0) {
        result += " " + fight(character, monster);
      }
      if (character.hitpoints > 0 && monster.hitpoints > 0) {
        result += " " + fight(monster, character);
      }
      if(character.hitpoints <= 0 || monster.hitpoints <= 0) {
        if(character.hitpoints < monster.hitpoints) {
          result += " " + character.name + " is dead.";
        } else {
          result += " " + monster.name + " is dead.";
        }
      }
    }
    setFightDescription(result);
  }
                  

  function fight(attacker, defender) {
    let attackValue = parseInt(attacker.attack) + Math.floor(Math.random() * 20);
    let attackDamage = parseInt(attacker.damage);
    const missMax = misses.length - 1;
    let missIndex = 1;
    const hitMax = hits.length - 1;
    let hitIndex = 1;

    let text = "";
    
    if (defender.hitpoints >= 1 && attacker.hitpoints >= 1) {
      if (attackValue > defender.defence) {  // hit
        defender.hitpoints -= attackDamage;
        hitIndex = Math.floor((Math.random() * hitMax))+1;
        text = hits[hitIndex].description.replace("ATTACKER", attacker.name).replace("DEFENDER", defender.name);
      } else { // miss
        missIndex = Math.floor((Math.random() * missMax))+1;
        text = misses[missIndex].description.replace("ATTACKER", attacker.name).replace("DEFENDER", defender.name);
      }
    }

    return text;
  }

  const nameMonsterChange = event => setMonster({name: event.target.value, hitpoints: monster.hitpoints, attack: monster.attack, defence: monster.defence, damage: monster.damage} )
  const hitpointsMonsterChange = event => setMonster({name: monster.name, hitpoints: event.target.value, attack: monster.attack, defence: monster.defence, damage: monster.damage} )
  const attackMonsterChange = event => setMonster({name: monster.name, hitpoints: monster.hitpoints, attack: event.target.value, defence: monster.defence, damage: monster.damage} )
  const defenceMonsterChange = event => setMonster({name: monster.name, hitpoints: monster.defence, attack: monster.attack, defence: event.target.value, damage: monster.damage} )
  const damageMonsterChange = event => setMonster({name: monster.name, hitpoints: monster.defence, attack: monster.attack, defence: monster.defence, damage: event.target.value} )

  return (
    <>
      <Image arrayIndex={arrayIndex} />
      <div className='div-sticky basic-borders body-text'>
          <Description arrayIndex={arrayIndex} />
          {fightDescription}
          <div>
            <Button color="primary" onClick={onButttonClick}>Next</Button>
            <Button color="danger" onClick={onAttackClick}>Attack</Button>
          </div>
          <div >
            <input type="text" id="name" value={character.name} onChange={nameChange} />
            <input type="text" id="hitpoints" value={character.hitpoints} onChange={hitpointsChange} />
            <input type="text" id="attack" value={character.attack} onChange={attackChange} />
            <input type="text" id="defence" value={character.defence} onChange={defenceChange} />
            <input type="text" id="damage" value={character.damage} onChange={damageChange} />
          </div>
          <div > 
            <input type="text" id="name" value={monster.name} onChange={nameMonsterChange} />
            <input type="text" id="hitpoints" value={monster.hitpoints} onChange={hitpointsMonsterChange} />
            <input type="text" id="attack" value={monster.attack} onChange={attackMonsterChange} />
            <input type="text" id="defence" value={monster.defence} onChange={defenceMonsterChange} />
            <input type="text" id="damage" value={monster.damage} onChange={damageMonsterChange} />
          </div>
      </div>
    </>
  );
}

export default Dungeon;
