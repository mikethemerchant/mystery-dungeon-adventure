import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'

import Image from './Image'
import Description from './Description';
import data from './data/monsters.json';
import misses from './data/miss.json';
import hits from './data/hit.json';
import { calculateLevel } from './utils/utils';

import { setCredentials } from '../slices/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useUpdateUserMutation } from '../slices/usersApiSlice'

function Dungeon() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile] = useUpdateUserMutation();

  const [arrayIndex, setArrayIndex] = useState(0);
  const [monster, setMonster] = useState(data[arrayIndex])
  const [fightDescription, setFightDescription] = useState('')

  const [name, setName] = useState(userInfo?.name);
  const [hitpoints, setHitpoints] = useState(userInfo?.hitpoints);
  const [armor, setArmor] = useState(userInfo?.armor);
  const [attack, setAttack] = useState(userInfo?.attack);
  const [damage, setDamage] = useState(userInfo?.damage);
  const [level, setLevel] = useState(userInfo?.level);
  const [experience, setExperience] = useState(userInfo?.experience);



  useEffect(() => {
    // nothing here anymore
  }, [])

  const nameChange = event => setName(event.target.value)
  const hitpointsChange = event => setHitpoints(event.target.value)
  const attackChange = event => setAttack(event.target.value)
  const armorChange = event => setArmor(event.target.value)
  const damageChange = event => setDamage(event.target.value)
  const levelChange = event => setLevel(event.target.value)
  const experienceChange = event => setExperience(event.target.value)

  const nameMonsterChange = event => setMonster({name: event.target.value, hitpoints: monster.hitpoints, attack: monster.attack, defence: monster.defence, damage: monster.damage} )
  const hitpointsMonsterChange = event => setMonster({name: monster.name, hitpoints: event.target.value, attack: monster.attack, defence: monster.defence, damage: monster.damage} )
  const attackMonsterChange = event => setMonster({name: monster.name, hitpoints: monster.hitpoints, attack: event.target.value, defence: monster.defence, damage: monster.damage} )
  const defenceMonsterChange = event => setMonster({name: monster.name, hitpoints: monster.defence, attack: monster.attack, defence: event.target.value, damage: monster.damage} )
  const damageMonsterChange = event => setMonster({name: monster.name, hitpoints: monster.defence, attack: monster.attack, defence: monster.defence, damage: event.target.value} )

  const shouldHide = true;

  function nextClick() {
    if(hitpoints > 0) {
      const indexMax = data.length - 1;
      let randomInt = Math.floor((Math.random() * indexMax))+1;
      setArrayIndex(randomInt);
      setMonster(data[randomInt]);
      setFightDescription('');
    } else {
      // restart
      setArrayIndex(0);
      setMonster(data[0]);
      setFightDescription('');
      setHitpoints(userInfo?.hitpoints);
    }
  }

  function attackClick() {
    let result = ""; 
    if (arrayIndex === 0) {
      result += "You are not fighting anyone.";
    } else {
      if (hitpoints > 0 && monster.hitpoints > 0) {
        result += " " + UserAttack();
        if (monster.hitpoints <= 0) { // monster is dead
          setExperience(parseInt(experience) + parseInt(monster.experience));
          setLevel(calculateLevel(experience));
        }
      }
      if (hitpoints > 0 && monster.hitpoints > 0) {
        result += " " + MonsterAttack();
      }
      if(hitpoints <= 0 || monster.hitpoints <= 0) {
        if(hitpoints < monster.hitpoints) {
          result += " " + name + " is dead.";
        } else {
          result += " " + monster.name + " is dead.";
        }
      }
    }
    setFightDescription(result);
  }
            
  function UserAttack() {
    let attackValue = parseInt(userInfo.attack) + Math.floor(Math.random() * 20);
    let attackDamage = parseInt(userInfo.damage);
    const missMax = misses.length - 1;
    let missIndex = 1;
    const hitMax = hits.length - 1;
    let hitIndex = 1;

    let text = "";

    if (monster.hitpoints >= 1 && userInfo.hitpoints >= 1) {
      if (attackValue > monster.defence) {
        // hit
        monster.hitpoints -= attackDamage;
        hitIndex = Math.floor(Math.random() * hitMax) + 1;
        text = hits[hitIndex].description
          .replace("ATTACKER", userInfo.name)
          .replace("DEFENDER", monster.name);
      } else {
        // miss
        missIndex = Math.floor(Math.random() * missMax) + 1;
        text = misses[missIndex].description
          .replace("ATTACKER", userInfo.name)
          .replace("DEFENDER", monster.name);
      }
    }

    return text;
  }

  function MonsterAttack() {
    let attackValue = parseInt(monster.attack) + Math.floor(Math.random() * 20);
    let attackDamage = parseInt(monster.damage);
    const missMax = misses.length - 1;
    let missIndex = 1;
    const hitMax = hits.length - 1;
    let hitIndex = 1;

    let text = "";

    if (monster.hitpoints >= 1 && hitpoints >= 1) {
      if (attackValue > userInfo.armor) {
        // hit
        setHitpoints(hitpoints - attackDamage);
        hitIndex = Math.floor(Math.random() * hitMax) + 1;
        text = hits[hitIndex].description
          .replace("ATTACKER", monster.name)
          .replace("DEFENDER", name);
      } else {
        // miss
        missIndex = Math.floor(Math.random() * missMax) + 1;
        text = misses[missIndex].description
          .replace("ATTACKER", monster.name)
          .replace("DEFENDER", name);
      }
    }

    return text;
  }



  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ 
        id: userInfo._id,
        name,
        hitpoints,
        armor,
        attack,
        damage,
        experience
        }).unwrap();
      dispatch(setCredentials({...res}));
      //toast.success('Progress saved!');
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  }

  return (
    <>
      <Image arrayIndex={arrayIndex} />
      <div className='div-sticky basic-borders body-text'>
          <Description arrayIndex={arrayIndex} />
          {fightDescription}
          <div>
          <Form onSubmit={submitHandler}>
            <Button type='submit' color="primary" onClick={nextClick}>Next Room</Button>
          </Form>
          </div>
            <div >
              <input type="text" id="name" value={name} onChange={nameChange} style={{display: shouldHide ? 'none' : 'block'}} />
              <input type="text" id="hitpoints" value={hitpoints} onChange={hitpointsChange} style={{display: shouldHide ? 'none' : 'block'}} />
              <input type="text" id="attack" value={attack} onChange={attackChange} style={{display: shouldHide ? 'none' : 'block'}} />
              <input type="text" id="armor" value={armor} onChange={armorChange} style={{display: shouldHide ? 'none' : 'block'}} />
              <input type="text" id="damage" value={damage} onChange={damageChange} style={{display: shouldHide ? 'none' : 'block'}} />
              <input type="text" id="level" value={level} onChange={levelChange} style={{display: shouldHide ? 'none' : 'block'}} />
              <input type="text" id="experience" value={experience} onChange={experienceChange} style={{display: shouldHide ? 'none' : 'block'}} />
            </div>
            <div > 
              <input type="text" id="name" value={monster.name} onChange={nameMonsterChange} style={{display: shouldHide ? 'none' : 'block'}} />
              <input type="text" id="hitpoints" value={monster.hitpoints} onChange={hitpointsMonsterChange} style={{display: shouldHide ? 'none' : 'block'}} />
              <input type="text" id="attack" value={monster.attack} onChange={attackMonsterChange} style={{display: shouldHide ? 'none' : 'block'}} />
              <input type="text" id="defence" value={monster.defence} onChange={defenceMonsterChange} style={{display: shouldHide ? 'none' : 'block'}} />
              <input type="text" id="damage" value={monster.damage} onChange={damageMonsterChange} style={{display: shouldHide ? 'none' : 'block'}} />
            </div>
            <Button color="danger" onClick={attackClick} >Attack</Button>
      </div>
    </>
  );
}

export default Dungeon;
