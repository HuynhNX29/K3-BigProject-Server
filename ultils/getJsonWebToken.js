import jwt from "jsonwebtoken";

export class JWT {
  static GetJWT = ({ id, name }) => {
    const payload = { id, name };

    const token = jwt.sign(payload, process.env.SECRET_KEY);

    return token;
  };
}
