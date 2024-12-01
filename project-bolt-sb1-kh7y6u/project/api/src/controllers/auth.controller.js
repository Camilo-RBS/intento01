import User from '../models/User.model.js';
import { generateToken, validateRegistrationData } from '../utils/auth.utils.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const validation = validateRegistrationData(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const { email, password, name, lastName, age, address, role, latitude, longitude } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuario ya existe con este correo' });
    }

    const user = await User.create({
      email,
      password,
      name,
      lastName,
      age: parseInt(age),
      address,
      role,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      }
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
        token
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ 
      message: 'Error durante el registro',
      error: error.message 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor proporcione email y contraseña' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.json({
        _id: user._id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
        token
      });
    } else {
      res.status(401).json({ message: 'Email o contraseña inválidos' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ 
      message: 'Error durante el login',
      error: error.message 
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    res.status(500).json({ 
      message: 'Error al obtener datos del usuario',
      error: error.message 
    });
  }
};