import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email es requerido'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido']
  },
  password: {
    type: String,
    required: [true, 'Contraseña es requerida'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  name: {
    type: String,
    required: [true, 'Nombre es requerido'],
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  age: {
    type: Number,
    min: [0, 'La edad no puede ser negativa']
  },
  address: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: {
      values: ['entrenador', 'jugador'],
      message: 'El rol debe ser entrenador o jugador'
    },
    required: [true, 'Rol es requerido']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

export default User;