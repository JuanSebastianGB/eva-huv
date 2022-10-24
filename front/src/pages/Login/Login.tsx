import { createUserAdapter } from '@/adapters';
import { PrivateRoutes, PublicRoutes } from '@/models';
import { createUser, resetUser } from '@/redux/states/userSlice';
import { fetchAxiosLogin } from '@/services';
import { deleteManyFormLocalStorage, setLocalStorage } from '@/utilities';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, TextField } from '@mui/material';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
export interface LoginInterface {}

type Inputs = {
  password: string;
  email: string;
};

const validationSchema = yup.object({
  password: yup.string().required(),
  email: yup.string().required().email(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const response = await fetchAxiosLogin(createUserAdapter(formData));

    if (!response.data.error) {
      setLocalStorage('x-access-token', response.data.token);
      dispatch(createUser({ ...response.data.user, isLoggedIn: true }));
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
    }
  };

  useEffect(() => {
    dispatch(resetUser());
    deleteManyFormLocalStorage(['user', 'x-access-token']);
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  }, []);

  return (
    <div>
      <h2>Login</h2>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="email"
            type="email"
            fullWidth
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && <p role="alert">{errors.email?.message}</p>}
          <TextField
            label="password"
            type="password"
            fullWidth
            autoComplete="password"
            {...register('password')}
          />
          {errors.password && <p role="alert">{errors.password?.message}</p>}

          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
