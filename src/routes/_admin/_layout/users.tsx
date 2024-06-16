import { useCreateAccountMutation, useGetUsersQuery } from '@/services/user/userApiSlice'
import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


const createAccountSchema = z.object({
  name: z.string().min(3, { message: 'Invalid name' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})


const Screen = () => {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [registerApi, { isLoading }] = useCreateAccountMutation()


  async function onSubmit(data: z.infer<typeof createAccountSchema>) {
    const { name, email, password } = data;
    try {
      const res = await registerApi({
        name,
        email,
        password,
      }).unwrap();
      toast.success(res.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.data?.message || error.error || 'Error: Something went wrong!'
      );
      console.log(error);
    }
  }

  const { data } = useGetUsersQuery();
  const users = data?.accounts || [];
  return (
    <div className='flex flex-col grow py-12 gap-8'>
      {/* no. of users found */}
      <div className='flex items-center mx-auto max-w-md w-full justify-between'>
        <p className='text-center text-2xl font-semibold w-max'>Users Found: {users.length}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className='bg-[#023047] text-base'
              disabled={isLoading}
            >
              {
                isLoading ? 'Creating Account...' : 'Create Account'
              }
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Account</DialogTitle>
              <DialogDescription>
                Enter the details for the new user account.
              </DialogDescription>
            </DialogHeader>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                  <div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input type='text' autoComplete='name' placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <Input type='email' autoComplete='email' placeholder="email@domain.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type='password' autoComplete='current-password' placeholder="********" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        className='bg-[#023047]'
                      >
                        Create Account
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className='flex flex-col gap-4 mx-auto'>
        {users.map((user) => (
          <Card key={user._id} className='max-w-2xl w-full flex justify-between'>
            <div className='flex '>
              <CardHeader>
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#023047] text-white cursor-pointer">
                  {
                    user?.name.split(' ').map((name) => name[0]).join('')
                  }
                </div>
              </CardHeader>
              <CardContent className='flex flex-col justify-center pt-6'>
                <CardTitle className=''>{user.name}</CardTitle>
                <CardDescription className='text-xl text-black'>{user.email}</CardDescription>
              </CardContent>
            </div>
            <CardFooter className=''>
              {/* user type based on isAdmin */}
              <p className='text-[#023047] font-semibold'>{user.isAdmin ? 'Admin' : 'User'}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


export const Route = createFileRoute('/_admin/_layout/users')({
  component: Screen
})