import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { register } from '../../store/slices/authSlice'
import { AppDispatch } from '../../store'

const AuthContainer = styled(motion.div)`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`

const Button = styled(motion.button)`
  padding: 0.75rem;
  background-color: var(--color-accent-blue);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas")
      return
    }

    try {
      await dispatch(register({ 
        email, 
        password, 
        firstName, 
        lastName 
      })).unwrap()
      navigate('/')
    } catch (error: any) {
      console.error('Échec de l\'inscription', error)
    }
  }

  return (
    <AuthContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Inscription</h2>
      <Form onSubmit={handleRegister}>
        <Input 
          type="text" 
          placeholder="Prénom" 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required 
        />
        <Input 
          type="text" 
          placeholder="Nom" 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required 
        />
        <Input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <Input 
          type="password" 
          placeholder="Mot de passe" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <Input 
          type="password" 
          placeholder="Confirmer le mot de passe" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required 
        />
        <Button 
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          S'inscrire
        </Button>
      </Form>
    </AuthContainer>
  )
}

export default Register
