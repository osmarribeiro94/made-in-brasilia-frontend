import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import bsb_1 from "../../assets/bsb_1.jpg";
import bsb_2 from "../../assets/bsb_2.jpg";
import bsb_3 from "../../assets/bsb_3.jpg";
import { db } from "../../services/firebase";
import { iCreateUserDto } from "../../interfaces/iCreateUserDto";
import { createUserRequest } from "../../services/api";
import "./register.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Register = () => {
  const [image, setImage] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dto: iCreateUserDto = {
        email: newEmail,
        username: newUsername,
        password: newPassword,
      };

      const response = await createUserRequest(dto);

      if (response.status == 201) {
        const usersRef = collection(db, "users");
        await addDoc(usersRef, {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          createdAt: serverTimestamp(),
        });

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const imagesArray = [bsb_1, bsb_2, bsb_3];
    const random = Math.floor(Math.random() * 3);
    setImage(imagesArray[random]);
  }, []);

  return (
    <div className="register-container scale-up-hor-center-02">
      <div className="register-icons">
        <FiSun size={30} />
        <h3>Made in Brasília</h3>
      </div>
      <div className="register-image-container">
        <img className="register-image" src={image} alt="image" />
      </div>
      <div className="register-form-container gradient-bg">
        <h1>Crie sua conta</h1>
        <p>Preencha o formulário abaixo para se cadastrar</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-input-container">
            <TextField
              className="register-form-input"
              type={"email"}
              id="email"
              placeholder="Email"
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
            <TextField
              className="register-form-input"
              id="username"
              placeholder="Usuário"
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
            <TextField
              className="register-form-input"
              type={"password"}
              id="password"
              placeholder="Senha"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="gradient-bg-colorful" type="submit">
            <span>Cadastrar</span>
          </button>
        </form>
        <div></div>
      </div>
      <div className="register-login">
        <Link to={"/login"}>Entrar</Link>
      </div>
    </div>
  );
};

export default Register;
