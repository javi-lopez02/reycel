import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/auth.context";
import { Button, Checkbox, Input, Link, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { BiLock, BiMailSend, BiUser } from "react-icons/bi";

function ModalRegister({ onClose, setIsRegister }: { onClose: () => void, setIsRegister: (value: boolean) => void }) {
  const [error, setError] = useState<Array<string>>([]);
  const { errors, signUp } = useAuth()

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (error.length > 0) {
      const time = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [error]);

  useEffect(() => {
    setError(errors)
  }, [errors])

  const handleSubmit = async () => {

    if (!emailRef.current?.value) {
      setError([...error, "Email name is required"]);
      return;
    }
    if (!passwordRef.current?.value) {
      setError([...error, "Password is required"]);
      return
    }
    if (!userNameRef.current?.value) {
      setError([...error, "User name is required"]);
      return;
    }

    signUp({ email: emailRef.current?.value, password: passwordRef.current?.value, username: userNameRef.current.value })
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <div

          className="flex items-center text-2xl font-bold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="./logo.png"
            alt="logo"
          />
          Reycel
        </div>
      </ModalHeader>
      <ModalBody>
        <h1 className="text-xl font-semibold leading-tight tracking-tight mb-3 text-gray-900 md:text-2xl dark:text-white">
          Crea tu cuenta
        </h1>
        {error.length > 0 &&
          error.map((err) => {
            return (
              <div
                className="bg-red-400 p-2 rounded-lg mx-auto w-4/5 flex items-center justify-center"
                key={err}
              >
                <h1 className="text-white font-bold">{err}</h1>
              </div>
            );
          })}
        <Input
          autoFocus
          ref={userNameRef}
          label="User Name"
          endContent={
            <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          placeholder="Enter your User Name"
          variant="bordered"
        />
        <Input
          ref={emailRef}
          endContent={
            <BiMailSend className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
        />
        <Input
          ref={passwordRef}
          endContent={
            <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
        />
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Recordar
          </Checkbox>
          <Link color="primary" href="#" size="sm">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="flex items-center  text-sm font-light text-gray-500 dark:text-gray-400">
          ¿Ya tienes una cuentas?
          <div onClick={()=>setIsRegister(false)} className="font-medium ml-3 text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
            Inicia sesión
          </div>
        </div>
      </ModalBody>
      <ModalFooter>

        <Button color="danger" variant="flat" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="primary" onClick={() => {
          handleSubmit()
        }} >
          Registrar
        </Button>
      </ModalFooter>
    </>
  );
}

export default ModalRegister