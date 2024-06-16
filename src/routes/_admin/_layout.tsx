import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import { clearAuth } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks";
import { useSignoutMutation } from "@/services/user/userApiSlice";
import { toast } from "sonner";




const Screen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useAppDispatch();
  const [signoutApi, { isLoading }] = useSignoutMutation();

  return (
    <main className='flex flex-col min-h-screen'>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <img

                      className="w-[172px] h-[59px] bg-red-300"
                      src="/logo.svg"
                      alt="BidAI"
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-[#023047] py-4">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6 pb-4">
          <div className="flex shrink-0 items-center">
            <img
              className="w-[172px] h-[59px]"
              src="/logo.svg"
              alt="BidAI"
            />
          </div>
          <Separator className='h-px bg-gray-200' />
          <nav className="flex flex-1 flex-col h-max">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <Link to="/analytics">
                <li className='text-xl text-white underline underline-offset-2'>
                  Analytics
                </li>
              </Link>
              <Link to="/users">
                <li className='text-xl text-white underline underline-offset-2'>
                  Users
                </li>
              </Link>
            </ul>
          </nav>

          <Button variant={"outline"}
            disabled={isLoading}
            onClick={async () => {
              try {
                const res = await signoutApi().unwrap();
                dispatch(clearAuth());
                toast.success(res.message);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } catch (error: any) {
                toast.error(
                  error?.data?.message || error.error || 'Error: Something went wrong!'
                );
                console.log(error);
              }
            }
            }
          >
            Signout
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:pl-72 grow">
        <main className="flex grow">
          <Outlet />
        </main>
      </div>
    </main>
  )
};


export const Route = createFileRoute('/_admin/_layout')({
  component: Screen
})