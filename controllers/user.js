import { validationResult } from 'express-validator';
import { userRepository } from '../repositories/index.js';

//Login

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    await userRepository.login({ email, password })
    res.status(200).json({ message: "Login OK" })
}


// Registor

const registor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password, phoneNumber, address } = req.body;
    await userRepository.registor({ email, password, phoneNumber, address })
    res.status(200).json({ message: "Registor OK" })
}
export default { login, registor }