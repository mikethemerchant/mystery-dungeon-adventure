import { useState, useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { setCredentials } from '../slices/authSlice'
import { useUpdateUserMutation } from '../slices/usersApiSlice'

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [level, setLevel] = useState('');
    const [experience, setExperience] = useState('');
    const [hitpoints, setHitpoints] = useState('');
    const [armor, setArmor] = useState('');
    const [attack, setAttack] = useState('');
    const [fortitude, setFortitude] = useState('');
    const [reflex, setReflex] = useState('');
    const [will, setWill] = useState('');
    const [strength, setStrength] = useState('');
    const [dexterity, setDexterity] = useState('');
    const [constitution, setConstitution] = useState('');
    const [intelligence, setIntelligence] = useState('');
    const [wisdom, setWisdom] = useState('');
    const [charisma, setCharisma] = useState('');

    //const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading } ] = useUpdateUserMutation();

    useEffect( () => {
        setName(userInfo?.name);
        setEmail(userInfo?.email);
        setLevel(userInfo?.level);
        setExperience(userInfo?.experience);
        setHitpoints(userInfo?.hitpoints);
        setArmor(userInfo?.armor);
        setAttack(userInfo?.attack);
        setFortitude(userInfo?.fortitude);
        setReflex(userInfo?.reflex);
        setWill(userInfo?.will);
        setStrength(userInfo?.strength);
        setDexterity(userInfo?.dexterity);
        setConstitution(userInfo?.constitution);
        setIntelligence(userInfo?.intelligence);
        setWisdom(userInfo?.wisdom);
        setCharisma(userInfo?.charisma);
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match'); // everything works but when you close the box it says can't prevent default.
        } else {
            try {
              const res = await updateProfile({ 
                id: userInfo._id,
                name,
                email,
                password,
                level,
                experience,
                hitpoints,
                armor,
                attack,
                fortitude,
                reflex,
                will,
                strength,
                dexterity,
                constitution,
                intelligence,
                wisdom,
                charisma
               }).unwrap();
              dispatch(setCredentials({...res}));
              toast.success('Profile Updated');
            } catch (error) {
              toast.error(error?.data?.message || error?.error);
            }
        }
    }

    return (
        <FormContainer>
            <h1>Update Profile</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={ (e) => setName(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={ (e) => setConfirmPassword(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='level'>
                    <Form.Label>Level</Form.Label>
                    <Form.Control
                        type='level'
                        placeholder='Level'
                        value={level}
                        onChange={ (e) => setLevel(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='experience'>
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                        type='experience'
                        placeholder='Experience'
                        value={experience}
                        onChange={ (e) => setExperience(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='hitpoints'>
                    <Form.Label>Hitpoints</Form.Label>
                    <Form.Control
                        type='hitpoints'
                        placeholder='Hitpoints'
                        value={hitpoints}
                        onChange={ (e) => setHitpoints(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='armor'>
                    <Form.Label>Armor</Form.Label>
                    <Form.Control
                        type='armor'
                        placeholder='Armor'
                        value={armor}
                        onChange={ (e) => setArmor(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='attack'>
                    <Form.Label>Attack</Form.Label>
                    <Form.Control
                        type='attack'
                        placeholder='Attack'
                        value={attack}
                        onChange={ (e) => setAttack(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='fortitude'>
                    <Form.Label>Fortitude</Form.Label>
                    <Form.Control
                        type='fortitude'
                        placeholder='Fortitude'
                        value={fortitude}
                        onChange={ (e) => setFortitude(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='reflex'>
                    <Form.Label>Reflex</Form.Label>
                    <Form.Control
                        type='reflex'
                        placeholder='Reflex'
                        value={reflex}
                        onChange={ (e) => setReflex(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='will'>
                    <Form.Label>Will</Form.Label>
                    <Form.Control
                        type='will'
                        placeholder='will'
                        value={will}
                        onChange={ (e) => setWill(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='strength'>
                    <Form.Label>Strength</Form.Label>
                    <Form.Control
                        type='strength'
                        placeholder='strength'
                        value={strength}
                        onChange={ (e) => setStrength(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='dexterity'>
                    <Form.Label>Dexterity</Form.Label>
                    <Form.Control
                        type='dexterity'
                        placeholder='dexterity'
                        value={dexterity}
                        onChange={ (e) => setDexterity(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='constitution'>
                    <Form.Label>Constitution</Form.Label>
                    <Form.Control
                        type='constitution'
                        placeholder='constitution'
                        value={constitution}
                        onChange={ (e) => setConstitution(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='intelligence'>
                    <Form.Label>Intelligence</Form.Label>
                    <Form.Control
                        type='intelligence'
                        placeholder='intelligence'
                        value={intelligence}
                        onChange={ (e) => setIntelligence(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='wisdom'>
                    <Form.Label>Wisdom</Form.Label>
                    <Form.Control
                        type='wisdom'
                        placeholder='wisdom'
                        value={wisdom}
                        onChange={ (e) => setWisdom(e.target.value) }> 
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='charisma'>
                    <Form.Label>Charisma</Form.Label>
                    <Form.Control
                        type='charisma'
                        placeholder='charisma'
                        value={charisma}
                        onChange={ (e) => setCharisma(e.target.value) }> 
                    </Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Button type='submit' variant='primary' className='mt-3'>
                    Update
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ProfileScreen