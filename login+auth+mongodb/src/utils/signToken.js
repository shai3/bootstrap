import JWT from 'jsonwebtoken';

export default function signToken(decoded, days = 7) {
	return JWT.sign(decoded, process.env.AUTH_SECRET_KEY, { expiresIn: `${days}d` });
}
