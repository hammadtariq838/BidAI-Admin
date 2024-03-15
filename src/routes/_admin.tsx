import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Navigate, Outlet } from '@tanstack/react-router'
import { useSignoutMutation } from '@/services/user/userApiSlice';
import { toast } from 'sonner';
import { clearAuth } from '@/features/auth/authSlice';

const AdminRoute = () => {
  const dispatch = useAppDispatch();
  const [signoutApi] = useSignoutMutation();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  return (
    user ? (
      user.account.isAdmin ? <Outlet /> : (
        async () => {
          try {
            await signoutApi().unwrap();
            dispatch(clearAuth());
            toast.error('You are not authorized to access this page');
            navigate({ to: '/sign-in' })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            toast.error(
              error?.data?.message || error.error || 'Error: Something went wrong!'
            );
            console.log(error);
          }
        }
      )
    ) : <Navigate to="/sign-in" replace />
  )
}

export const Route = createFileRoute('/_admin')({
  component: AdminRoute
})