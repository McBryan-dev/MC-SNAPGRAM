import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom'

import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SignupValidation } from '../../lib/validation/index.ts';
import { Input } from "@/components/ui/input";
import Loader from '@/components/shared/Loader';

 
import { Button } from '../../components/ui/button';
import { useForm } from 'react-hook-form';   


//  SIGNUP FORM
 const SignUpForm = () => {

  const isLoading = false;
  
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })
  
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
      // const newUser = await createUserAccount(values);
  }
  
  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">

        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>

        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Snapgram, please enter your account details
        </p>

      

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NAME</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                
                <FormMessage /> 
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>USERNAME</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel>EMAIL</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel>PASSWORD</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex flex-centre gap-2">
                <Loader />Loading...
              </div>
            ) : "Submit"}
          </Button>

              <p className="text-small-regular text-light-2 text-center mt-2">
                ALREADY HAVE AN ACCOUNT? 
                <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Login</Link>
              </p>

        </form>
      </div>
    </Form>
  )
}

export default SignUpForm;